@echo off
chcp 65001 > nul
echo =======================================================
echo          SANAR FARMACO - GERADOR DE APK ANDROID
echo =======================================================
echo.
echo 1. Sincronizando arquivos web para a pasta nativa...
call node sync-www.js
call npx cap sync android
echo.
echo 2. Tentando compilar APK via Gradle Wrapper...
cd android
call gradlew.bat assembleDebug
if %ERRORLEVEL% EQU 0 (
    echo.
    echo =======================================================
    echo SUCESSO! APK gerado com sucesso em:
    echo android\app\build\outputs\apk\debug\app-debug.apk
    copy /Y "app\build\outputs\apk\debug\app-debug.apk" "..\SanarFarmaco.apk"
    echo.
    echo O arquivo SanarFarmaco.apk foi copiado para a raiz da pasta!
    echo =======================================================
) else (
    echo.
    echo [AVISO] O Gradle precisa do Android Studio ou JDK 17 configurado.
    echo Tentando abrir o projeto diretamente no Android Studio...
    cd ..
    call npx cap open android
)
pause
