#!/bin/bash

echo "========================================"
echo "    INICIANDO INFRAESTRUTURA COMPLETA"
echo "========================================"
echo

echo "1. Parando tudo..."
docker-compose down
echo

echo "2. Construindo e iniciando todos os servicos..."
docker-compose up -d --build
echo

echo "3. Aguardando servicos ficarem disponiveis..."
sleep 15

echo "4. Criando tabelas no banco..."
docker exec -i lavi-postgres psql -U postgres -d lavi_db < create-tables.sql
echo

echo "========================================"
echo "    INFRAESTRUTURA PRONTA!"
echo "========================================"
echo
echo "URLs de acesso:"
echo "- Aplicacao Next.js: http://200.129.240.80:10097"
echo "- Nginx (Proxy): http://200.129.240.80:10097"
echo "- Banco PostgreSQL: 200.129.240.80:50097"
echo "- SSH: 200.129.240.80:20097"
echo
echo "Para parar tudo: docker-compose down"
echo "Para ver logs: docker-compose logs -f"
echo
echo "Pressione qualquer tecla para continuar..."
read -n 1 -s
