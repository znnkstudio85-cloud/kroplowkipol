# Kroplówki24 — Serwis Kroplówek Witaminowych (PL/EN)

Strona internetowa i system rezerwacji online dla usługi **Kroplówki24** — kroplówki witaminowe z dojazdem do klienta oraz stacjonarnie.

---

## 🚀 Wdrożenie na Netlify (Deployment Instructions)

### 1. Zmienne Środowiskowe w Netlify (RESEND_API_KEY)
1. Zaloguj się do panelu [Netlify](https://app.netlify.com).
2. Przejdź do swojego projektu -> **Site configuration** -> **Environment variables**.
3. Dodaj nową zmienną środowiskową:
   - **Key:** `RESEND_API_KEY`
   - **Value:** Twój klucz API pobrany z panelu [Resend Dashboard](https://resend.com/api-keys)
4. (Opcjonalnie) Dodaj zmienną adresu e-mail administratora:
   - **Key:** `ADMIN_EMAIL`
   - **Value:** `kontakt@kroplowki24.pl`

---

### 2. Podpinanie Domen kroplowki24.com oraz kroplowki24.pl w Netlify
1. W panelu Netlify przejdź do **Domain management** -> **Add custom domain**.
2. Wpisz `kroplowki24.com` i zatwierdź. Powtórz proces dla `kroplowki24.pl`.
3. Skonfiguruj rekordy w panelu rejestratora domen (np. OVH, Cyberfolks, Nazwa.pl):
   - Ustaw serwery DNS Netlify (Netlify DNS) dla obu domen:
     - `dns1.p01.nsone.net`
     - `dns2.p01.nsone.net`
     - `dns3.p01.nsone.net`
     - `dns4.p01.nsone.net`
   - LUB ustaw rekord **A** wskazujący na IP Netlify (`75.2.60.5`) oraz rekord **CNAME** dla subdomeny `www` wskazujący na adres Twojej aplikacji Netlify (`twoja-nazwa.netlify.app`).

---

### 3. Weryfikacja Domeny w Resend API (Rekordy DNS)
Aby wysyłać e-maile potwierdzające z własnego adresu w domenie `@kroplowki24.pl` lub `@kroplowki24.com`:
1. Zaloguj się na [Resend.com](https://resend.com/domains) i kliknij **Add Domain**.
2. Wpisz domenę `kroplowki24.pl` (lub `kroplowki24.com`).
3. Resend wygeneruje wymagane rekordy DNS do wklejenia w panelu zarządzania domeną:
   - **DKIM (TXT):** `resend._domainkey` -> Dedykowana wartość wygenerowana przez Resend
   - **SPF (TXT):** `v=spf1 include:amazonses.com ~all` (lub dedykowana od Resend)
   - **DMARC (TXT):** `_dmarc` -> `v=DMARC1; p=none;`
4. Po wklejeniu rekordów w DNS kliknij **Verify Domain** w panelu Resend.

---

## 🛠️ Architektura Projektu

- **Frontend:** React 19 + Tailwind CSS v4 + Lucide React + Motion
- **Backend / API:** Netlify Functions (`/netlify/functions/send-booking.ts`) + Express dev server (`server.ts`)
- **E-mail Service:** Resend API integration
- **Languages:** Dwujęzyczność PL/EN z natywnym przełącznikiem w menu

---

## ⚡ Lokalne uruchomienie (Development)

```bash
npm install
npm run dev
```

Aplikacja uruchomi się pod adresem `http://localhost:3000`.
