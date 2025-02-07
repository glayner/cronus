import "dotenv/config";
import { chromium } from "playwright";
import { appendLog } from './fileManager';

const LOGIN_URL = String(process.env.LOGIN_URL)


export async function toClockIn(jSessionId: string): Promise<void> {
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
      longitude: String(process.env.LOGIN_LONG),
      timezone: 'America/Sao_Paulo',
      ip: String(process.env.LOGIN_IP),
      ipInterno: '',
      fotoBase64: '',
      tipo: 'padrao',
      tokenLocalizador: ''
    })
  };

  fetch(`${LOGIN_URL}/localizador/registrarPonto`, options)
    .then(response => response.ok ? response.json() : response.text().then(r => { throw new Error(r) }))
    .then(response => appendLog(response))
    .catch(err => appendLog(err, true));
}


export async function getJSessionId(): Promise<string> {
  appendLog("Abrindo navegador...");
  const browser = await chromium.launch({ headless: true, });
  const context = await browser.newContext({ ignoreHTTPSErrors: true, permissions: ['geolocation'], });
  const page = await context.newPage();


  appendLog(`Redirecionando para ${LOGIN_URL}/ponto`);
  await page.goto(LOGIN_URL + '/ponto');

  await page.getByText("Registrar Ponto").click();
  await page.waitForResponse(r => {
    console.log(r.url())
    return r.url() === `${LOGIN_URL}/ponto/localizador/localizador/carregarTela`
  })
  const cokkie = await context.cookies()
  const jSessionId = cokkie.find(c => c.name === 'JSESSIONID')
  appendLog(jSessionId);

  if (!jSessionId) {
    throw new Error('JSESSIONID não encontrado')
  }
  await browser.close()

  return jSessionId.value

}