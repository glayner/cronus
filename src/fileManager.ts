
import fs from 'fs'

export function appendLog(message: any, isError = false): void {
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

export async function getOrSaveToken(token?: string) {
  const pathToken = './logs/token.txt'
  return new Promise<string>((resolve, reject) => {
    if (token) {
      
      appendLog(`Salvou novo token ${token}`)
      fs.writeFile(pathToken, token, (err) => {
        if (err) { reject(err) } else {
          resolve(token)
        }
      })
    } else {
     
      fs.readFile(pathToken, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          appendLog(`Pegou token antigo ${data}`)
          resolve(data);
        }
      });
    }
  })

}