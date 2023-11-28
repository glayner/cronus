import { chromium } from "playwright";
import "dotenv/config";
import { isHolliday, isVacation } from "./holliday";
import fs from 'fs'

const loginUrl = String(process.env.LOGIN_URL) 

function appendLog(message: any, isError = false): void {
  if (isError) {
    console.error(message)
    fs.appendFile('./logs/error.txt', new Date().toLocaleString('pt-BR') + JSON.stringify(message) + '\n', (err) => {
      if (err) console.error(err)
    })
    return
  } else {
    console.log(message)
    fs.appendFile('./logs/log.txt', new Date().toLocaleString('pt-BR') + JSON.stringify(message) + '\n', (err) => {
      if (err) console.error(err)
    })
  }
}

async function toClockIn(jSessionId: string): Promise<void> {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: 'JSESSIONID=' + jSessionId
    },
    body: new URLSearchParams({
      usuario: String(process.env.LOGIN_USER),
      senha: String(process.env.LOGIN_PWD),
      idcliente: 'ponto',
      latitude: String(process.env.LOGIN_LAT),
      longitude:String(process.env.LOGIN_LONG),
      timezone: 'America/Sao_Paulo',
      ip: String(process.env.LOGIN_IP),
      fotoBase64: ''
    })
  };

  fetch( `${loginUrl}/registrarPonto`, options)
    .then(response => response.json())
    .then(response => appendLog(response))
    .catch(err => appendLog(err, true));
}

async function getJSessionId(): Promise<string> {
  appendLog("Abrindo navegador...");
  const browser = await chromium.launch({ headless: true, });
  const context = await browser.newContext({ ignoreHTTPSErrors: true, permissions: ['geolocation'], });
  const page = await context.newPage();


  appendLog(`Redirecionando para ${loginUrl}`);
  await page.goto(loginUrl);

  await page.getByText("Registrar Ponto").click();
  await page.waitForResponse(r => r.url() === `${loginUrl}/carregarTela`)
  const cokkie = await context.cookies()
  const jSessionId = cokkie.find(c => c.name === 'JSESSIONID')
  appendLog(jSessionId);

  if (!jSessionId) {
    throw new Error('JSESSIONID não encontrado')
  }
  await browser.close()

  return jSessionId.value

}

async function main() {
  appendLog('entrou')
  
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const day = now.getDay()

  console.log(now.toLocaleString('pt-br'))

  // Horários desejados: 7h, 12h, 13h, 16h
  if (
    (hour === 7 || hour === 12 || hour === 13 || hour === 16) && minutes == 0 &&
    day !== 6 && day !== 0
  ) {

    if (isVacation()) {
      appendLog('Férias')
      return
    }
    const holliday = isHolliday()
    if (holliday) {
      appendLog(`Feriado: ${holliday.dia}`)
    }

    const jSessionId = await getJSessionId();
    appendLog('jSessionId: '+jSessionId)
    await toClockIn(jSessionId);
  } else {
    appendLog('não é a hora certa de bater ponto')
  }
}


main()