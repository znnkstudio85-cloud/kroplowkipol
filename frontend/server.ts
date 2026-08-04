import express from "express";
import path from "path";
import { Resend } from "resend";
import { createServer as createViteServer } from "vite";
import { validateBookingDateTime } from "./src/utils/bookingValidation";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for booking submissions
  app.post(
    ["/api/send-booking", "/.netlify/functions/send-booking", "/netlify/functions/send-booking"],
    async (req, res) => {
      try {
        const { service, fullName, date, time, email, phone, locationMode, address, notes, lang } = req.body;

        if (!service || !fullName || !date || !time || !email || !phone || !locationMode) {
          return res.status(400).json({
            success: false,
            message:
              lang === "en"
                ? "Please fill in all required fields."
                : "Proszę wypełnić wszystkie wymagane pola.",
          });
        }

        // Validate Date & Time server-side
        const dateTimeValidation = validateBookingDateTime(date, time, lang);
        if (!dateTimeValidation.valid) {
          return res.status(400).json({
            success: false,
            message: dateTimeValidation.message,
          });
        }

        const apiKey = process.env.RESEND_API_KEY;
        const adminEmail = process.env.ADMIN_EMAIL || "kontakt@vitadetox.pl";
        const isPl = lang !== "en";

        const locationText =
          locationMode === "mobile"
            ? isPl
              ? `Dojazd do klienta: ${address || "Brak podanego adresu"}`
              : `Mobile visit to client: ${address || "No address specified"}`
            : isPl
            ? "Stacjonarnie w gabinecie (Ul. Białostocka 9, Warszawa)"
            : "In-clinic appointment (9 Białostocka St., Warsaw)";

        const emailSubjectAdmin = `[VITA DETOX] Nowe zgłoszenie: ${service} - ${fullName}`;
        const emailHtmlAdmin = `
          <div style="font-family: Arial, sans-serif; background-color: #0b1120; color: #f8fafc; padding: 24px; border-radius: 12px;">
            <h2 style="color: #f97316; margin-top: 0;">Nowa rezerwacja kroplówki witaminowej - Vita Detox</h2>
            <table style="width: 100%; text-align: left; border-collapse: collapse; color: #e2e8f0;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #1e293b; font-weight: bold; width: 160px;">Usługa:</td><td style="padding: 8px; border-bottom: 1px solid #1e293b;">${service}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #1e293b; font-weight: bold;">Imię i nazwisko:</td><td style="padding: 8px; border-bottom: 1px solid #1e293b;">${fullName}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #1e293b; font-weight: bold;">Data i godzina:</td><td style="padding: 8px; border-bottom: 1px solid #1e293b;">${date} o godz. ${time}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #1e293b; font-weight: bold;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #1e293b;">${email}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #1e293b; font-weight: bold;">Telefon:</td><td style="padding: 8px; border-bottom: 1px solid #1e293b;">${phone}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #1e293b; font-weight: bold;">Tryb zabiegu:</td><td style="padding: 8px; border-bottom: 1px solid #1e293b;">${locationText}</td></tr>
              ${notes ? `<tr><td style="padding: 8px; border-bottom: 1px solid #1e293b; font-weight: bold;">Uwagi:</td><td style="padding: 8px; border-bottom: 1px solid #1e293b;">${notes}</td></tr>` : ""}
            </table>
          </div>
        `;

        const emailSubjectUser = isPl
          ? `Potwierdzenie zgłoszenia - Vita Detox (${service})`
          : `Booking Confirmation - Vita Detox (${service})`;

        const emailHtmlUser = isPl
          ? `
          <div style="font-family: Arial, sans-serif; background-color: #0b1120; color: #f8fafc; padding: 24px; border-radius: 12px;">
            <h2 style="color: #f97316; margin-top: 0;">Dziękujemy za wybranie Vita Detox!</h2>
            <p>Otrzymaliśmy Twoje zgłoszenie na zabieg <strong>${service}</strong>.</p>
            <p>Nasz personel medyczny skontaktuje się z Tobą telefonicznie w celu potwierdzenia terminu i szczegółów wizyty.</p>
            <hr style="border: 0; border-top: 1px solid #334155; margin: 20px 0;" />
            <h3 style="color: #38bdf8;">Podsumowanie zgłoszenia:</h3>
            <ul>
              <li><strong>Zabieg:</strong> ${service}</li>
              <li><strong>Data i czas:</strong> ${date}, godz. ${time}</li>
              <li><strong>Miejsce / Tryb:</strong> ${locationText}</li>
              <li><strong>Telefon kontaktowy:</strong> ${phone}</li>
            </ul>
            <p style="margin-top: 24px; font-size: 14px; color: #94a3b8;">W razie pytań zadzwoń bezpośrednio do naszego dyspozytora: <strong>+48 535 914 149</strong>.</p>
          </div>
          `
          : `
          <div style="font-family: Arial, sans-serif; background-color: #0b1120; color: #f8fafc; padding: 24px; border-radius: 12px;">
            <h2 style="color: #f97316; margin-top: 0;">Thank you for choosing Vita Detox!</h2>
            <p>We have received your booking request for <strong>${service}</strong>.</p>
            <p>Our medical personnel will contact you shortly by phone to confirm your appointment details.</p>
            <hr style="border: 0; border-top: 1px solid #334155; margin: 20px 0;" />
            <h3 style="color: #38bdf8;">Booking Summary:</h3>
            <ul>
              <li><strong>Service:</strong> ${service}</li>
              <li><strong>Date & Time:</strong> ${date} at ${time}</li>
              <li><strong>Location Mode:</strong> ${locationText}</li>
              <li><strong>Contact Phone:</strong> ${phone}</li>
            </ul>
            <p style="margin-top: 24px; font-size: 14px; color: #94a3b8;">For urgent inquiries, call our direct line: <strong>+48 535 914 149</strong>.</p>
          </div>
          `;

        if (apiKey) {
          const resend = new Resend(apiKey);

          await resend.emails.send({
            from: "Vita Detox <rezerwacje@vitadetox.pl>",
            to: [adminEmail],
            subject: emailSubjectAdmin,
            html: emailHtmlAdmin,
          });

          await resend.emails.send({
            from: "Vita Detox <kontakt@vitadetox.pl>",
            to: [email],
            subject: emailSubjectUser,
            html: emailHtmlUser,
          });

          return res.json({
            success: true,
            message: isPl
              ? "Dziękujemy! Zgłoszenie zostało wysłane pomyślnie."
              : "Thank you! Your booking request was sent successfully.",
          });
        } else {
          console.log("[VITA DETOX LOG] Booking received (RESEND_API_KEY not set):", {
            service,
            fullName,
            date,
            time,
            email,
            phone,
            locationMode,
          });
          return res.json({
            success: true,
            devNotice: "RESEND_API_KEY is missing in env, simulated success.",
            message: isPl
              ? "Dziękujemy! Zgłoszenie zostało przyjęte. Nasz personel medyczny skontaktuje się z Tobą telefonicznie."
              : "Thank you! Your request has been recorded. Our medical team will call you shortly.",
          });
        }
      } catch (err: any) {
        console.error("Booking handler error:", err);
        return res.status(500).json({
          success: false,
          message:
            req.body?.lang === "en"
              ? "Something went wrong. Please try again or call +48 535 914 149"
              : "Coś poszło nie tak, spróbuj ponownie lub zadzwoń: +48 535 914 149",
        });
      }
    }
  );

  // Vite middleware for dev / static files for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Kroplowki24 server running on http://localhost:${PORT}`);
  });
}

startServer();
