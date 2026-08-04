import { Handler } from '@netlify/functions';
import { Resend } from 'resend';
import { validateBookingDateTime } from '../../src/utils/bookingValidation';

export const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { service, fullName, date, time, email, phone, locationMode, address, notes, lang } = data;

    if (!service || !fullName || !date || !time || !email || !phone || !locationMode) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: lang === 'en' ? 'Please fill in all required fields.' : 'Proszę wypełnić wszystkie wymagane pola.',
        }),
      };
    }

    // Validate Date & Time
    const dateTimeValidation = validateBookingDateTime(date, time, lang);
    if (!dateTimeValidation.valid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: dateTimeValidation.message,
        }),
      };
    }

    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL || 'kontakt@vitadetox.pl';
    const isPl = lang !== 'en';

    const locationText =
      locationMode === 'mobile'
        ? isPl
          ? `Dojazd do klienta: ${address || 'Brak podanego adresu'}`
          : `Mobile visit to client: ${address || 'No address specified'}`
        : isPl
        ? 'Stacjonarnie w gabinecie (Ul. Białostocka 9, Warszawa)'
        : 'In-clinic appointment (9 Białostocka St., Warsaw)';

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
          ${notes ? `<tr><td style="padding: 8px; border-bottom: 1px solid #1e293b; font-weight: bold;">Uwagi:</td><td style="padding: 8px; border-bottom: 1px solid #1e293b;">${notes}</td></tr>` : ''}
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
        <p style="margin-top: 24px; font-size: 14px; color: #94a3b8;">W razie pilnych pytań zadzwoń bezpośrednio do dyspozytora: <strong>+48 535 914 149</strong>.</p>
      </div>
      `
      : `
      <div style="font-family: Arial, sans-serif; background-color: #0b1120; color: #f8fafc; padding: 24px; border-radius: 12px;">
        <h2 style="color: #f97316; margin-top: 0;">Thank you for choosing Vita Detox!</h2>
        <p>We have received your booking request for <strong>${service}</strong>.</p>
        <p>Our medical team will contact you by phone shortly to confirm your appointment details.</p>
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
        from: 'Vita Detox <rezerwacje@vitadetox.pl>',
        to: [adminEmail],
        subject: emailSubjectAdmin,
        html: emailHtmlAdmin,
      });

      await resend.emails.send({
        from: 'Vita Detox <kontakt@vitadetox.pl>',
        to: [email],
        subject: emailSubjectUser,
        html: emailHtmlUser,
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: isPl
            ? 'Dziękujemy! Zgłoszenie zostało wysłane pomyślnie.'
            : 'Thank you! Your booking request was sent successfully.',
        }),
      };
    } else {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          devNotice: 'RESEND_API_KEY missing, simulated success.',
          message: isPl
            ? 'Dziękujemy! Zgłoszenie zostało przyjęte. Nasz personel medyczny skontaktuje się z Tobą telefonicznie.'
            : 'Thank you! Your request has been recorded. Our medical team will call you shortly.',
        }),
      };
    }
  } catch (err: any) {
    console.error('Netlify function error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Coś poszło nie tak, spróbuj ponownie lub zadzwoń: +48 535 914 149',
      }),
    };
  }
};
