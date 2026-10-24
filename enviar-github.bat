@echo off
chcp 65001 > nul
echo ================================================================
echo       SANAR FARMACO - AUTOMACAO DE ENVIO PARA O GITHUB
echo ================================================================
echo.
echo O projeto ja esta 100%% versionado com o workflow do GitHub Actions!
echo.
echo Passo a passo:
echo 1. Crie um novo repositorio vazio no seu GitHub (ex: https://github.com/new)
echo 2. Copie a URL do repositorio (HTTPS)
echo.
set /p REPO_URL="Cole a URL do seu repositorio GitHub aqui: "

if "%REPO_URL%"=="" (
    echo.
    echo Nenhuma URL fornecida. Operacao cancelada.
    pause
    exit /b
)

echo.
echo Conectando ao repositorio remoto...
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main

echo.
echo Enviando arquivos e iniciando a geracao do APK na nuvem...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================================
    echo SUCESSO! Projeto enviado para o GitHub!
    echo.
    echo O GitHub Actions ja comecou a compilar o seu APK automaticamente!
    echo Para baixar o .apk no seu celular:
    echo 1. Abra o seu repositorio no navegador
    echo 2. Clique na aba 'Actions'
    echo 3. Clique no workflow 'Build Android APK'
    echo 4. Baixe o arquivo 'SanarFarmaco-debug-apk' direto no celular!
    echo ================================================================
) else (
    echo.
    echo [AVISO] Ocorreu uma falha no envio.
    echo Verifique se voce esta logado no Git com sua conta do GitHub
    echo ou use o GitHub Desktop para publicar o repositorio.
)

echo.
pause
