@echo off
echo ========================================
echo    CONFIGURANDO BANCO SIMPLES LAVI
echo ========================================
echo.

echo 1. Parando e limpando tudo...
docker-compose down -v
echo.

echo 2. Iniciando banco PostgreSQL...
docker-compose up -d
echo.

echo 3. Aguardando banco ficar disponivel...
timeout /t 10 /nobreak >nul

echo 4. Criando tabelas...
docker exec -i lavi-postgres psql -U postgres -d lavi_db < create-tables.sql
echo.

echo 5. Testando conexao...
docker exec -it lavi-postgres psql -U postgres -d lavi_db -c "SELECT COUNT(*) FROM usuarios;"
echo.

echo ========================================
echo    BANCO PRONTO! AGORA EXECUTE:
echo ========================================
echo.
echo npx prisma generate
echo npx prisma studio
echo.
echo Para parar: docker-compose down
echo.
pause
