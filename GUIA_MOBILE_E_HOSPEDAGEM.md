# 📱 Guia de Acesso Remoto, Hospedagem e Android (Capacitor)
> **Sanar Farmaco • Guia Oficial de Conectividade e Mobile**

---

## 1. 🌐 ACESSO REMOTO NO CELULAR (REDE WI-FI LOCAL)

Se o seu computador e o seu celular estiverem conectados na **mesma rede Wi-Fi**, você pode acessar o **Sanar Farmaco** imediatamente no celular:

### Passo a Passo:
1. No terminal do computador, dentro da pasta do projeto, execute:
   ```bash
   npm run serve:network
   ```
2. No navegador do seu celular (Chrome no Android ou Safari no iOS), digite o endereço:
   ```text
   http://192.168.7.10:8080
   ```
3. O aplicativo abrirá adaptado para a tela do celular, com todos os recursos táteis, Sanarbook e simulador de receituário.

> 💡 **Dica de PWA / App:** No Chrome do Android, clique nos três pontinhos e selecione **"Adicionar à tela inicial"** para transformar em um app com ícone próprio sem barra de navegação!

---

## 2. 🌍 HOSPEDAGEM GRATUITA NA NUVEM (ACESSO GLOBAL DE QUALQUER LUGAR)

Para acessar o **Sanar Farmaco** de qualquer lugar (via 4G/5G, fora de casa ou na faculdade):

### Opção A: Vercel (Recomendado - 30 segundos)
1. No terminal do projeto, execute:
   ```bash
   npx vercel
   ```
2. Siga as instruções no terminal (faça login ou crie conta gratuita).
3. Em segundos você receberá uma URL pública segura com HTTPS (ex: `https://sanar-farmaco.vercel.app`).

### Opção B: Netlify Drop / Cloudflare Pages (Sem usar terminal)
1. Acesse [app.netlify.com/drop](https://app.netlify.com/drop) ou [pages.cloudflare.com](https://pages.cloudflare.com).
2. Arraste a pasta `www` ou a raiz do projeto para o navegador.
3. O deploy é imediato e permanente.

---

## 3. 🤖 COMPILAÇÃO DO APP NATIVO ANDROID (CAPACITOR)

O ambiente Android com **Capacitor** já está 100% configurado na pasta `android/`.

### Como abrir e compilar o APK no Android Studio:
1. Abra o **Android Studio** no seu computador.
2. Selecione **"Open"** e escolha a pasta:
   ```text
   c:\Users\ryant\Desktop\prova 3 de farmaco\android
   ```
3. Aguarde o Gradle sincronizar os arquivos.
4. Para gerar o instalador do aplicativo para o celular:
   - Clique no menu superior: `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`.
   - Quando finalizar, clique em `locate` para pegar o arquivo `app-debug.apk` e envie para o seu celular via WhatsApp, Drive ou cabo USB.
5. Para testar direto no celular conectado via USB:
   - Ative a *Depuração USB* nas opções de desenvolvedor do seu celular Android.
   - Conecte o cabo e clique no botão verde **Run (Play)** no Android Studio.

### Como atualizar o app Android após mudar o código web:
Sempre que fizer alterações no `index.html` e quiser sincronizar com o Android:
```bash
npm run cap:sync
```
Ele atualiza automaticamente a pasta nativa do Android.
