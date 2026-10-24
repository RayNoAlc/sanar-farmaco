@echo off
chcp 65001 > nul
echo ================================================================
echo       SANAR FARMACO - SERVIDOR LOCAL PARA USO NO CELULAR
echo ================================================================
echo.
echo No seu celular conectado ao mesmo Wi-Fi, abra o Chrome e acesse:
echo.
echo        http://192.168.7.10:3000
echo.
echo No Chrome do celular, toque em "Instalar aplicativo" ou nos
echo 3 pontinhos -> "Adicionar a tela inicial" para instalar como App!
echo.
echo Para encerrar o servidor, feche esta janela.
echo ================================================================
echo.
npx serve www -l 3000
