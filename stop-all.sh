#!/bin/bash

echo "========================================"
echo "    PARANDO INFRAESTRUTURA COMPLETA"
echo "========================================"
echo

echo "1. Parando todos os servicos..."
docker-compose down
echo

echo "2. Removendo containers parados..."
docker container prune -f
echo

echo "3. Removendo redes não utilizadas..."
docker network prune -f
echo

echo "========================================"
echo "    INFRAESTRUTURA PARADA!"
echo "========================================"
echo
echo "Para iniciar tudo novamente: ./start-all.sh"
echo
echo "Pressione qualquer tecla para continuar..."
read -n 1 -s
