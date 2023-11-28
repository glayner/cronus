#!/usr/bin/env bash

# Executar chmod +x ./scripts/install.sh antes
echo
echo 'Atenção!'
echo "Executar esse script a partir da pasta raíz do projeto './scripts/install.sh'"
echo

# Verifica se o Node.js está disponível
if ! command -v node &> /dev/null; then
    echo "Node.js não encontrado. Verifique se está instalado."
    exit 1
fi

if [ -f "./scripts/run.sh" ]; then
    echo "O arquivo run.sh já existe."

    # Verifica se o arquivo run.sh é executável
    if [ -x "./scripts/run.sh" ]; then
        echo 
        
    else
        echo "Tornando arquivo run.sh como executável..."
        chmod +x ./scripts/run.sh
    fi
else
    echo
    echo "Criando runner run.sh..."
    
    echo "#!/bin/bash" > ./scripts/run.sh
    echo "export NVM_DIR=\"\$HOME/.nvm\"" >> ./scripts/run.sh
    echo "[ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\" " >> ./scripts/run.sh
    echo "" >> ./scripts/run.sh
    echo "cd $(pwd)" >> ./scripts/run.sh
    echo "$(which npm) start " >> ./scripts/run.sh
    chmod +x ./scripts/run.sh
fi

if crontab -l | grep -q "$(pwd)/scripts/run.sh"; then
    echo "O job já está em execução no crontab."
else
    # Adiciona no crontab um job que executado esse serviço 
    # todo minuto 0 as 7,12,13 e 16h de segunda até sexta e salva log de todo retorno
    echo "Adicionando job de execução no crontab."
    crontab -l > arquivo_temporario
    echo "0 7,12,13,16 * * 1-5 $(pwd)/scripts/run.sh >> $(pwd)/logs/cron_log.log 2>&1" >> arquivo_temporario
    crontab arquivo_temporario
    rm arquivo_temporario
fi

messageBox()   {
    local s=("$@")             # Recebe as linhas de texto como argumentos
    local largura_terminal=$(tput cols)
    local max_length=0          # Inicializa a variável para o comprimento máximo da linha
    local padding=4             # Define o espaço de preenchimento da caixa
    local start_color=$(tput setaf 3)
    local end_color=$(tput sgr 0)

    # Encontra o comprimento máximo entre as linhas de texto
    for line in "${s[@]}"; do
        (( ${#line} > max_length )) && max_length=${#line}
    done

    local max_total_length=$((largura_terminal - (3 * padding)))
  
    if (( max_length + (2 * padding) > largura_terminal )); then
         max_length=$max_total_length
    fi

    quebrar_linha() {
        local linha="$1"
        local max_length=$max_total_length  # Define o comprimento máximo ajustado
        while [ ${#linha} -gt $max_length ]; do
            local parte="${linha:0:$max_length}"
            linha="${linha:$max_length}"
            printLineBox "$parte"
        done
        [ ${#linha} -gt 0 ] && printLineBox "$linha"
    }


    printLineBox(){
      local linha="$@"
      printf '│%*s%-*s%*s│\n' $padding '' "$(( (max_length - ${#linha}) / 2 ))" "$linha" $((( (max_length - ${#linha} + 1) / 2 ) + $padding))
    }

    echo "$start_color┌$(printf '─%.0s' $(seq 1 $((max_length + (2 * padding)))))┐"

    # Desenha a caixa com o texto centralizado
    # echo "┌$(printf '─%.0s' $(seq 1 $((max_length + padding))))┐"  # Linha superior da caixa

    for line in "${s[@]}"; do

     if (( ${#line} > largura_terminal - (2 * padding) - 4 )); then  # Verifica se a linha é muito longa
            quebrar_linha "$line"
        else
            printLineBox "$line"
        fi
        # Centraliza o texto dentro da caixa
        # printLineBox $line
    done

    echo "└$(printf '─%.0s' $(seq 1 $((max_length + (2 * padding)))))┘$end_color"  # Linha inferior da caixa
}

echo
echo "Instalação finalizada"

echo

messageBox "ALTERE A DATA DE SUAS FÉRIAS EM ./src/vacations.ts"