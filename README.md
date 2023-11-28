# Passo 1
Altere o arquivo .env.example para .env e altere as variáveis de ambiente
# Passo 2
Altere o arquivo src/vacations.ts com os dados das suas férias
# Passo 3
Instale as dependencias
```
npm install
```
# Passo 4
instale o playwright
```
npx playwright install
```
# Passo 5
se tiver em uma distribuição unix que possua crontab siga esse passo:
## 5.1
adicione permissão de execução no script de instalação
```
chmod +x ./scripts/install.sh
```
## 5.2
execute o script de instalação a partir da raiz do projeto
```
./scripts/install.sh
```