#!/bin/bash

while true; do
    clear
    echo "========================================"
    echo "    GERENCIADOR LAVI - INFRAESTRUTURA"
    echo "========================================"
    echo
    echo "Escolha uma opcao:"
    echo "1. Iniciar todos os servicos"
    echo "2. Parar todos os servicos"
    echo "3. Reiniciar todos os servicos"
    echo "4. Ver status dos servicos"
    echo "5. Ver logs dos servicos"
    echo "6. Acessar banco de dados"
    echo "7. Sair"
    echo

    read -p "Digite sua escolha (1-7): " choice

    case $choice in
        1)
            echo "Iniciando servicos..."
            ./start-all.sh
            ;;
        2)
            echo "Parando servicos..."
            ./stop-all.sh
            ;;
        3)
            echo "Reiniciando servicos..."
            docker-compose restart
            echo "Servicos reiniciados!"
            sleep 3
            ;;
        4)
            echo "Status dos servicos:"
            docker-compose ps
            echo
            echo "Pressione qualquer tecla para continuar..."
            read -n 1 -s
            ;;
        5)
            ./logs.sh
            ;;
        6)
            echo "Acessando banco de dados..."
            docker-compose exec postgres psql -U postgres -d lavi_db
            ;;
        7)
            echo "Saindo..."
            exit 0
            ;;
        *)
            echo "Opcao invalida!"
            sleep 2
            ;;
    esac
done
