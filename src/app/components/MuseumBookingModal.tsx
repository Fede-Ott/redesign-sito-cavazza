import { X, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from './Button';
import { type Lang } from '../i18n';

interface MuseumBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  museumName: string;
  language: Lang;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  visitors?: string;
}

export function MuseumBookingModal({ isOpen, onClose, museumName, language }: MuseumBookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    visitors: '1',
    notes: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const t = (key: string) => {
    const translations: Record<string, { it: string; en: string }> = {
      'modal.title': { it: "Prenota Visita Guidata", en: "Book Guided Tour" },
      'form.name': { it: "Nome e Cognome", en: "Full Name" },
      'form.email': { it: "Email", en: "Email" },
      'form.phone': { it: "Telefono", en: "Phone" },
      'form.date': { it: "Data Preferita", en: "Preferred Date" },
      'form.time': { it: "Orario Preferito", en: "Preferred Time" },
      'form.visitors': { it: "Numero Visitatori", en: "Number of Visitors" },
      'form.notes': { it: "Note o Richieste Speciali (opzionale)", en: "Notes or Special Requests (optional)" },
      'form.submit': { it: "Invia Richiesta", en: "Submit Request" },
      'form.cancel': { it: "Annulla", en: "Cancel" },
      'error.required': { it: "Campo obbligatorio", en: "Required field" },
      'error.email': { it: "Email non valida", en: "Invalid email" },
      'error.phone': { it: "Numero di telefono non valido", en: "Invalid phone number" },
      'error.date': { it: "Seleziona una data futura", en: "Select a future date" },
      'error.visitors': { it: "Numero minimo: 1", en: "Minimum: 1" },
      'success.title': { it: "Richiesta Inviata!", en: "Request Sent!" },
      'success.message': { it: "La tua richiesta di prenotazione è stata ricevuta. Ti contatteremo entro 24 ore per confermare data e orario.", en: "Your booking request has been received. We will contact you within 24 hours to confirm date and time." },
      'success.close': { it: "Chiudi", en: "Close" }
    };
    return translations[key]?.[language] || key;
  };

  if (!isOpen) return null;

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return t('error.required');
        if (value.trim().length < 3) return language === 'it' ? 'Minimo 3 caratteri' : 'Minimum 3 characters';
        break;
      case 'email':
        if (!value.trim()) return t('error.required');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t('error.email');
        break;
      case 'phone':
        if (!value.trim()) return t('error.required');
        if (!/^[\d\s+()-]{8,}$/.test(value)) return t('error.phone');
        break;
      case 'date':
        if (!value) return t('error.required');
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) return t('error.date');
        break;
      case 'time':
        if (!value) return t('error.required');
        break;
      case 'visitors':
        if (!value || parseInt(value) < 1) return t('error.visitors');
        break;
    }
    return undefined;
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors({ ...errors, [field]: error });
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors({ ...errors, [field]: error });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    const allTouched: Record<string, boolean> = {};

    ['name', 'email', 'phone', 'date', 'time', 'visitors'].forEach((field) => {
      allTouched[field] = true;
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        newErrors[field as keyof FormErrors] = error;
      }
    });

    setTouched(allTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', phone: '', date: '', time: '', visitors: '1', notes: '' });
    setErrors({});
    setTouched({});
    setIsSuccess(false);
    onClose();
  };

  const getInputClassName = (fieldName: string) => {
    const baseClass = "w-full px-4 py-3 bg-background border-2 rounded-lg min-h-[48px] transition-colors";
    const hasError = touched[fieldName] && errors[fieldName as keyof FormErrors];

    if (hasError) {
      return `${baseClass} border-red-600 focus:border-red-600 focus:ring-2 focus:ring-red-600/20`;
    }
    return `${baseClass} border-border focus:border-primary`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-background border-4 border-primary rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {isSuccess ? (
          <div className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">{t('success.title')}</h2>
              <p className="text-base leading-relaxed mb-6">{t('success.message')}</p>
              <Button variant="primary" onClick={handleClose} className="w-full">
                {t('success.close')}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-6 border-b-2 border-border">
              <h2 className="text-2xl font-bold">
                {t('modal.title')}
              </h2>
              <button
                onClick={handleClose}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-secondary rounded-lg transition-colors"
                aria-label={language === 'it' ? 'Chiudi' : 'Close'}
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-6">
                <p className="text-base font-medium text-muted-foreground">
                  {museumName}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-2">
                    {t('form.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    className={getInputClassName('name')}
                    aria-invalid={!!(touched.name && errors.name)}
                    aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                  />
                  {touched.name && errors.name && (
                    <div id="name-error" className="flex items-center gap-2 mt-2 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2">
                    {t('form.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={getInputClassName('email')}
                    aria-invalid={!!(touched.email && errors.email)}
                    aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                  />
                  {touched.email && errors.email && (
                    <div id="email-error" className="flex items-center gap-2 mt-2 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-bold mb-2">
                    {t('form.phone')} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    className={getInputClassName('phone')}
                    aria-invalid={!!(touched.phone && errors.phone)}
                    aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined}
                  />
                  {touched.phone && errors.phone && (
                    <div id="phone-error" className="flex items-center gap-2 mt-2 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-bold mb-2">
                      {t('form.date')} *
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      onBlur={() => handleBlur('date')}
                      className={getInputClassName('date')}
                      aria-invalid={!!(touched.date && errors.date)}
                      aria-describedby={touched.date && errors.date ? 'date-error' : undefined}
                    />
                    {touched.date && errors.date && (
                      <div id="date-error" className="flex items-center gap-2 mt-2 text-sm text-red-600">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                        <span>{errors.date}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-sm font-bold mb-2">
                      {t('form.time')} *
                    </label>
                    <input
                      type="time"
                      id="time"
                      value={formData.time}
                      onChange={(e) => handleChange('time', e.target.value)}
                      onBlur={() => handleBlur('time')}
                      className={getInputClassName('time')}
                      aria-invalid={!!(touched.time && errors.time)}
                      aria-describedby={touched.time && errors.time ? 'time-error' : undefined}
                    />
                    {touched.time && errors.time && (
                      <div id="time-error" className="flex items-center gap-2 mt-2 text-sm text-red-600">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                        <span>{errors.time}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="visitors" className="block text-sm font-bold mb-2">
                    {t('form.visitors')} *
                  </label>
                  <input
                    type="number"
                    id="visitors"
                    min="1"
                    value={formData.visitors}
                    onChange={(e) => handleChange('visitors', e.target.value)}
                    onBlur={() => handleBlur('visitors')}
                    className={getInputClassName('visitors')}
                    aria-invalid={!!(touched.visitors && errors.visitors)}
                    aria-describedby={touched.visitors && errors.visitors ? 'visitors-error' : undefined}
                  />
                  {touched.visitors && errors.visitors && (
                    <div id="visitors-error" className="flex items-center gap-2 mt-2 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                      <span>{errors.visitors}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-bold mb-2">
                    {t('form.notes')}
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    className="w-full px-4 py-3 bg-background border-2 border-border rounded-lg focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (language === 'it' ? 'Invio...' : 'Submitting...') : t('form.submit')}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                >
                  {t('form.cancel')}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
