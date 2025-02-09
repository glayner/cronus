import "dotenv/config";
import { getJSessionId, toClockIn } from "./clockIn";
import { appendLog, getOrSaveToken } from './fileManager';
import { isHolliday, isVacation } from "./holliday";

async function run() {

  if (isVacation()) {
    appendLog('Férias')
    return
  }
  const holliday = isHolliday()
  if (holliday) {
    appendLog(`Feriado: ${holliday.dia}`)
    return
  }

  const jSessionId = await getJSessionId()
    .catch(err => {
      appendLog(err, true)
      return ''
    });

  const token = await getOrSaveToken(jSessionId)

  appendLog('jSessionId: ' + token)
  await toClockIn(jSessionId);
}

export async function main(schedule = false) {
  appendLog('entrou')

  const now = new Date();
  console.log(now.toLocaleString('pt-br'))
  if (schedule) {
    return run()
  } else {
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const day = now.getDay()

    // Horários desejados: 7h, 12h, 13h, 16h
    if (
      (hour === 7 || hour === 12 || hour === 13 || hour === 16) && minutes == 0 &&
      day !== 6 && day !== 0
    ) {
      return run()
    } else {
      appendLog('não é a hora certa de bater ponto')
    }
  }
}