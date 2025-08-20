@echo off
echo ========================================
echo    INICIANDO INFRAESTRUTURA COMPLETA
echo ========================================
echo.

echo 1. Parando tudo...
docker-compose down
echo.

echo 2. Construindo e iniciando todos os servicos...
docker-compose up -d --build
echo.

echo 3. Aguardando servicos ficarem disponiveis...
timeout /t 15 /nobreak >nul

echo 4. Criando tabelas no banco...
docker exec -i lavi-postgres psql -U postgres -d lavi_db < create-tables.sql
echo.

echo ========================================
echo    INFRAESTRUTURA PRONTA!
echo ========================================
echo.
echo URLs de acesso:
echo - Aplicacao: http://localhost:3000
echo - Site (Nginx): http://localhost
echo - Banco: localhost:5433
echo.
echo Para parar tudo: docker-compose down
echo Para ver logs: docker-compose logs -f
echo.
pause
