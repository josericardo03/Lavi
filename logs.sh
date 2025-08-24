#!/bin/bash

echo "========================================"
echo "    VISUALIZANDO LOGS DOS SERVICOS"
echo "========================================"
echo

echo "Escolha o servico para ver os logs:"
echo "1. Aplicacao (app)"
echo "2. Banco de dados (postgres)"
echo "3. Nginx"
echo "4. Todos os servicos"
echo "5. Sair"
echo

read -p "Digite sua escolha (1-5): " choice

case $choice in
    1)
        echo "Logs da aplicacao:"
        docker-compose logs -f app
        ;;
    2)
        echo "Logs do banco de dados:"
        docker-compose logs -f postgres
        ;;
    3)
        echo "Logs do Nginx:"
        docker-compose logs -f nginx
        ;;
    4)
        echo "Logs de todos os servicos:"
        docker-compose logs -f
        ;;
    5)
        echo "Saindo..."
        exit 0
        ;;
    *)
        echo "Opcao invalida!"
        exit 1
        ;;
esac
