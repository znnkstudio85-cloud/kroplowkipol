import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SERVICES_DATA } from '../data/servicesData';
import { BookingFormData, BookingResponse } from '../types';
import {
  getTodayDateStr,
  getInitialValidDateStr,
  getMaxDateStr,
  WORK_HOURS,
  isSunday,
  isTimeSlotValidForDate,
  validateBookingDateTime
} from '../utils/bookingValidation';
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Car,
  FileText,
  Send,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  PhoneCall
} from 'lucide-react';

interface BookingFormProps {
  selectedServicePreFill?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ selectedServicePreFill }) => {
  const { t, language } = useLanguage();

  const todayStr = getTodayDateStr();
  const initialDateStr = getInitialValidDateStr();
  const maxDateStr = getMaxDateStr(90);

  const [formData, setFormData] = useState<BookingFormData>({
    service: '',
    fullName: '',
    date: initialDateStr,
    time: '12:00',
    email: '',
    phone: '',
    locationMode: 'mobile',
    address: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<BookingResponse | null>(null);

  // Sync pre-filled service when user clicks "Umów wizytę" from service cards
  useEffect(() => {
    if (selectedServicePreFill) {
      setFormData((prev) => ({ ...prev, service: selectedServicePreFill }));
    }
  }, [selectedServicePreFill]);

  // Ensure default date is valid
  useEffect(() => {
    setFormData((prev) => {
      const curDate = prev.date || initialDateStr;
      const curTime = prev.time || '';
      return { ...prev, date: curDate, time: curTime };
    });
  }, [initialDateStr]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'date') {
      setErrors((prev) => ({ ...prev, date: '' }));
      setFormData((prev) => ({ ...prev, date: value }));
    } else if (name === 'time') {
      // Replace dot with colon and limit to 5 characters max (HH:MM)
      let sanitized = value.replace('.', ':');
      sanitized = sanitized.replace(/[^0-9:]/g, '');
      if (sanitized.length > 5) {
        sanitized = sanitized.slice(0, 5);
      }
      setFormData((prev) => ({ ...prev, time: sanitized }));
      setErrors((prev) => ({ ...prev, time: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.service) {
      newErrors.service = language === 'pl' ? 'Wybierz usługę' : 'Please select a service';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = language === 'pl' ? 'Podaj imię i nazwisko' : 'Please enter full name';
    }

    // Comprehensive Date & Time Validation
    const dateTimeVal = validateBookingDateTime(formData.date, formData.time, language);
    if (!dateTimeVal.valid && dateTimeVal.message) {
      newErrors.date = dateTimeVal.message;
      newErrors.time = dateTimeVal.message;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = language === 'pl' ? 'Podaj poprawny adres e-mail' : 'Enter a valid email address';
    }

    const phoneRegex = /^[+\d\s-]{8,15}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      newErrors.phone = language === 'pl' ? 'Podaj poprawny numer telefonu (min. 8 cyfr)' : 'Enter a valid phone number';
    }

    if (formData.locationMode === 'mobile' && !formData.address.trim()) {
      newErrors.address = language === 'pl' ? 'Podaj adres dojazdu' : 'Please enter address for mobile visit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/send-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          lang: language,
        }),
      });

      const data: BookingResponse = await res.json();
      setResponse(data);
    } catch (err) {
      console.error('Booking submission error:', err);
      setResponse({
        success: false,
        message: language === 'en'
          ? 'Something went wrong. Please try again or call +48 535 914 149'
          : 'Coś poszło nie tak, spróbuj ponownie lub zadzwoń: +48 535 914 149',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResponse(null);
    setFormData((prev) => ({
      ...prev,
      fullName: '',
      email: '',
      phone: '',
      address: '',
      notes: '',
    }));
  };

  return (
    <section id="booking" className="py-20 bg-[#FAF8F5] text-[#14261C] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EADBC8] border border-[#D8C4B6] text-[#1B3B2B] text-xs font-black uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5" />
            <span>{language === 'pl' ? 'Szybka Rezerwacja Online 24/7' : 'Fast 24/7 Online Booking'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#14261C] italic uppercase tracking-tight">
            {t.booking.title}
          </h2>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {t.booking.subtitle}
          </p>
        </div>

        {/* Main Bento Card Container */}
        <div className="bg-white rounded-3xl border border-[#EADBC8] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          
          {/* Subtle Ambient Accent */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#FF6321]/10 rounded-full blur-3xl pointer-events-none" />

          {response ? (
            /* Submission Result View */
            <div className="text-center py-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
              {response.success ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t.booking.successTitle}</h3>
                  <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                    {t.booking.successDesc}
                  </p>

                  {/* Summary Box */}
                  <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs text-slate-300 space-y-2">
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="font-semibold text-slate-400">{language === 'pl' ? 'Zabieg:' : 'Service:'}</span>
                      <span className="font-bold text-orange-400">{formData.service}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="font-semibold text-slate-400">{language === 'pl' ? 'Termin:' : 'Date & Time:'}</span>
                      <span className="font-bold text-white">{formData.date}, {formData.time}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="font-semibold text-slate-400">{language === 'pl' ? 'Tryb:' : 'Mode:'}</span>
                      <span className="font-bold text-slate-200">
                        {formData.locationMode === 'mobile'
                          ? (language === 'pl' ? `Dojazd: ${formData.address}` : `Mobile: ${formData.address}`)
                          : (language === 'pl' ? 'Stacjonarnie w gabinecie' : 'In-clinic')}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="font-semibold text-slate-400">{language === 'pl' ? 'Kontakt:' : 'Contact:'}</span>
                      <span className="font-bold text-white">{formData.phone}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 text-xs font-bold text-slate-300 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition-colors"
                    >
                      {language === 'pl' ? 'Złóż kolejne zgłoszenie' : 'Book another session'}
                    </button>
                    <a
                      href="tel:+48535914149"
                      className="px-6 py-3 text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>{language === 'pl' ? 'Zadzwoń do dyspozytora' : 'Call Dispatcher'}</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center">
                    <AlertTriangle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t.booking.errorTitle}</h3>
                  <p className="text-sm text-slate-300 max-w-lg mx-auto">
                    {response.message}
                  </p>

                  <div className="pt-4">
                    <a
                      href="tel:+48535914149"
                      className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl shadow-lg shadow-orange-500/30 hover:scale-105 transition-all"
                    >
                      <PhoneCall className="w-5 h-5 animate-pulse" />
                      <span>{t.booking.phoneDirect}: +48 535 914 149</span>
                    </a>
                  </div>

                  <div>
                    <button
                      onClick={() => setResponse(null)}
                      className="text-xs text-slate-400 underline hover:text-white"
                    >
                      {language === 'pl' ? 'Spróbuj ponowić formularz' : 'Try form again'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Service Dropdown */}
              <div className="space-y-2">
                <label className="block text-xs font-black text-[#14261C] uppercase tracking-wider">
                  {t.booking.serviceLabel} *
                </label>
                <div className="relative">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-[#FAF8F5] border ${
                      errors.service ? 'border-rose-500' : 'border-[#EADBC8]'
                    } rounded-xl text-sm text-[#14261C] font-medium focus:outline-none focus:border-[#1B3B2B] focus:ring-1 focus:ring-[#1B3B2B] transition-colors appearance-none cursor-pointer`}
                  >
                    <option value="" className="bg-white text-gray-500">{t.booking.selectPlaceholder}</option>
                    {SERVICES_DATA.map((srv) => {
                      const name = language === 'pl' ? srv.namePl : srv.nameEn;
                      return (
                        <option key={srv.id} value={name} className="bg-white text-[#14261C]">
                          {name} — {srv.pricePLN} zł
                        </option>
                      );
                    })}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">
                    ▼
                  </div>
                </div>
                {errors.service && <p className="text-xs text-rose-600 font-bold">{errors.service}</p>}
              </div>

              {/* Service Type Indicator: Mobile Delivery Only */}
              <div className="space-y-2">
                <label className="block text-xs font-black text-[#14261C] uppercase tracking-wider">
                  {t.booking.locationTypeLabel} *
                </label>
                <div className="p-4 rounded-2xl bg-[#1B3B2B] text-[#FAF8F5] border border-[#2D5A3F] flex items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EADBC8] text-[#1B3B2B] flex items-center justify-center shrink-0">
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-[#EADBC8] block">
                        {t.booking.modeMobile}
                      </span>
                      <span className="text-[11px] text-gray-200">
                        {language === 'pl' ? 'Usługi wyłącznie mobilne z dojazdem pod wskazany adres' : 'Mobile service delivered straight to your address'}
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-[10px] font-black uppercase bg-[#2D5A3F] text-[#EADBC8] border border-[#8FAF96]/30 rounded-full shrink-0 hidden sm:inline-block">
                    ● 24/7 Warszawa
                  </span>
                </div>
              </div>

              {/* Address Field */}
              <div className="space-y-2 animate-in fade-in duration-200">
                <label className="block text-xs font-black text-[#14261C] uppercase tracking-wider">
                  {t.booking.addressLabel} *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#1B3B2B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder={t.booking.addressPlaceholder}
                    className={`w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border ${
                      errors.address ? 'border-rose-500' : 'border-[#EADBC8]'
                    } rounded-xl text-sm text-[#14261C] font-medium placeholder-gray-400 focus:outline-none focus:border-[#1B3B2B] focus:ring-1 focus:ring-[#1B3B2B] transition-colors`}
                  />
                </div>
                {errors.address && <p className="text-xs text-rose-600 font-bold">{errors.address}</p>}
              </div>

              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-black text-[#14261C] uppercase tracking-wider">
                    {t.booking.fullNameLabel} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#1B3B2B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder={t.booking.fullNamePlaceholder}
                      className={`w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border ${
                        errors.fullName ? 'border-rose-500' : 'border-[#EADBC8]'
                      } rounded-xl text-sm text-[#14261C] font-medium placeholder-gray-400 focus:outline-none focus:border-[#1B3B2B] focus:ring-1 focus:ring-[#1B3B2B] transition-colors`}
                    />
                  </div>
                  {errors.fullName && <p className="text-xs text-rose-600 font-bold">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-black text-[#14261C] uppercase tracking-wider">
                    {t.booking.phoneLabel} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#1B3B2B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t.booking.phonePlaceholder}
                      className={`w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border ${
                        errors.phone ? 'border-rose-500' : 'border-[#EADBC8]'
                      } rounded-xl text-sm text-[#14261C] font-medium placeholder-gray-400 focus:outline-none focus:border-[#1B3B2B] focus:ring-1 focus:ring-[#1B3B2B] transition-colors`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-rose-600 font-bold">{errors.phone}</p>}
                </div>
              </div>

              {/* Email & Date / Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2 sm:col-span-1">
                  <label className="block text-xs font-black text-[#14261C] uppercase tracking-wider">
                    {t.booking.emailLabel} *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#1B3B2B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.booking.emailPlaceholder}
                      className={`w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border ${
                        errors.email ? 'border-rose-500' : 'border-[#EADBC8]'
                      } rounded-xl text-sm text-[#14261C] font-medium placeholder-gray-400 focus:outline-none focus:border-[#1B3B2B] focus:ring-1 focus:ring-[#1B3B2B] transition-colors`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-rose-600 font-bold">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-black text-[#14261C] uppercase tracking-wider">
                    {t.booking.dateLabel} *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#1B3B2B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      name="date"
                      min={todayStr}
                      max={maxDateStr}
                      value={formData.date}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border ${
                        errors.date ? 'border-rose-500' : 'border-[#EADBC8]'
                      } rounded-xl text-sm text-[#14261C] font-medium focus:outline-none focus:border-[#1B3B2B] focus:ring-1 focus:ring-[#1B3B2B] transition-colors`}
                    />
                  </div>
                  {errors.date && <p className="text-xs text-rose-600 font-bold">{errors.date}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-black text-[#14261C] uppercase tracking-wider">
                    {t.booking.timeLabel} * ({language === 'pl' ? 'CAŁODOBOWO 24/7, PON-NIEDZ' : '24/7 ROUND THE CLOCK, MON-SUN'})
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#1B3B2B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      placeholder="12:00"
                      maxLength={5}
                      className={`w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border ${
                        errors.time ? 'border-rose-500' : 'border-[#EADBC8]'
                      } rounded-xl text-sm text-[#14261C] font-medium placeholder-gray-400 focus:outline-none focus:border-[#1B3B2B] focus:ring-1 focus:ring-[#1B3B2B] transition-colors`}
                    />
                  </div>
                  {errors.time && <p className="text-xs text-rose-600 font-bold">{errors.time}</p>}
                </div>
              </div>

              {/* Notes field */}
              <div className="space-y-2">
                <label className="block text-xs font-black text-[#14261C] uppercase tracking-wider">
                  {t.booking.notesLabel}
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-[#1B3B2B] absolute left-3.5 top-3.5" />
                  <textarea
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder={t.booking.notesPlaceholder}
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#EADBC8] rounded-xl text-sm text-[#14261C] font-medium placeholder-gray-400 focus:outline-none focus:border-[#1B3B2B] focus:ring-1 focus:ring-[#1B3B2B] transition-colors"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 text-sm font-black text-[#FAF8F5] bg-[#1B3B2B] uppercase rounded-xl hover:bg-[#2D5A3F] border border-[#2D5A3F] shadow-sm transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-[#EADBC8]" />
                      <span>{t.booking.submitting}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 text-[#EADBC8]" />
                      <span>{t.booking.submitBtn}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Call Hotline Fallback Notice */}
              <div className="text-center pt-2">
                <p className="text-xs text-gray-600">
                  {t.booking.urgentCallText}{' '}
                  <a
                    href="tel:+48535914149"
                    className="font-bold text-[#1B3B2B] hover:underline inline-flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-[#1B3B2B]" />
                    <span>+48 535 914 149</span>
                  </a>
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
