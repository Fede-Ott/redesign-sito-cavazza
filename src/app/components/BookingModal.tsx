import { useState } from 'react';
import { X, AlertCircle, Calendar, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from './Button';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  language: 'it' | 'en';
}

export function BookingModal({ isOpen, onClose, serviceName, language }: BookingModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    service: serviceName,
    preferredDate: '',
    preferredTime: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const t = (key: string) => {
    const translations: Record<string, { it: string; en: string }> = {
      'title': { it: 'Prenota un Appuntamento', en: 'Book an Appointment' },
      'subtitle': { it: 'Compila il modulo per richiedere un appuntamento. Ti ricontatteremo per confermare la data.', en: 'Fill out the form to request an appointment. We will contact you to confirm the date.' },
      'name': { it: 'Nome e Cognome *', en: 'Full Name *' },
      'email': { it: 'Email *', en: 'Email *' },
      'phone': { it: 'Telefono *', en: 'Phone *' },
      'age': { it: 'Età', en: 'Age' },
      'service': { it: 'Servizio Richiesto', en: 'Requested Service' },
      'preferredDate': { it: 'Data Preferita', en: 'Preferred Date' },
      'preferredTime': { it: 'Orario Preferito', en: 'Preferred Time' },
      'notes': { it: 'Note aggiuntive', en: 'Additional notes' },
      'submit': { it: 'Invia Richiesta', en: 'Submit Request' },
      'cancel': { it: 'Annulla', en: 'Cancel' },
      'success.title': { it: 'Richiesta Inviata!', en: 'Request Sent!' },
      'success.message': { it: 'Grazie per la tua richiesta. Il nostro staff ti contatterà entro 24-48 ore per confermare l\'appuntamento.', en: 'Thank you for your request. Our staff will contact you within 24-48 hours to confirm the appointment.' },
      'success.button': { it: 'Chiudi', en: 'Close' },
      'required': { it: '* Campi obbligatori', en: '* Required fields' }
    };
    return translations[key]?.[language] || key;
  };

  const validateField = (name: string, value: string): string | undefined => {
    const req = language === 'it' ? 'Campo obbligatorio' : 'Required field';
    switch (name) {
      case 'name':
        if (!value.trim()) return req;
        if (value.trim().length < 3) return language === 'it' ? 'Minimo 3 caratteri' : 'Minimum 3 characters';
        break;
      case 'email':
        if (!value.trim()) return req;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return language === 'it' ? 'Email non valida' : 'Invalid email';
        break;
      case 'phone':
        if (!value.trim()) return req;
        if (!/^[\d\s+()-]{8,}$/.test(value)) return language === 'it' ? 'Numero non valido' : 'Invalid phone number';
        break;
    }
    return undefined;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, (formData as Record<string, string>)[field] || '');
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const getInputClass = (field: string) => {
    const base = 'w-full px-4 py-3 border-2 bg-background focus:outline-none focus:ring-4 rounded-[5px]';
    return touched[field] && errors[field]
      ? `${base} border-red-600 focus:ring-red-600/20 focus:border-red-600`
      : `${base} border-border focus:ring-primary/20 focus:border-primary`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = ['name', 'email', 'phone'];
    const newErrors: Record<string, string | undefined> = {};
    const allTouched: Record<string, boolean> = {};
    requiredFields.forEach((field) => {
      allTouched[field] = true;
      const error = validateField(field, (formData as Record<string, string>)[field] || '');
      if (error) newErrors[field] = error;
    });
    setTouched(prev => ({ ...prev, ...allTouched }));
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setTimeout(() => {
      setStep('success');
    }, 500);
  };

  const handleClose = () => {
    setStep('form');
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      service: serviceName,
      preferredDate: '',
      preferredTime: '',
      notes: ''
    });
    setErrors({});
    setTouched({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleClose}
    >
      <div
        className="bg-card border-4 border-primary max-w-2xl w-full p-6 md:p-8 my-8 max-h-[90vh] overflow-y-auto rounded-[9px]"
        onClick={(e) => e.stopPropagation()}
      >
        {step === 'form' ? (
          <>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{t('title')}</h2>
                <p className="text-muted-foreground">{t('subtitle')}</p>
              </div>
              <button
                onClick={handleClose}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-secondary rounded-sm transition-colors"
                aria-label={language === 'it' ? 'Chiudi' : 'Close'}
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-medium mb-2">
                  <User className="w-4 h-4 inline mr-2" aria-hidden="true" />
                  {t('name')}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={getInputClass('name')}
                  aria-invalid={!!(touched.name && errors.name)}
                  aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                />
                {touched.name && errors.name && (
                  <div id="name-error" className="flex items-center gap-2 mt-2 text-sm text-red-600" role="alert">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block font-medium mb-2">
                    <Mail className="w-4 h-4 inline mr-2" aria-hidden="true" />
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={getInputClass('email')}
                    aria-invalid={!!(touched.email && errors.email)}
                    aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                  />
                  {touched.email && errors.email && (
                    <div id="email-error" className="flex items-center gap-2 mt-2 text-sm text-red-600" role="alert">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block font-medium mb-2">
                    <Phone className="w-4 h-4 inline mr-2" aria-hidden="true" />
                    {t('phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    className={getInputClass('phone')}
                    aria-invalid={!!(touched.phone && errors.phone)}
                    aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined}
                  />
                  {touched.phone && errors.phone && (
                    <div id="phone-error" className="flex items-center gap-2 mt-2 text-sm text-red-600" role="alert">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="age" className="block font-medium mb-2">
                  {t('age')}
                </label>
                <input
                  type="number"
                  id="age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary rounded-[5px]"
                />
              </div>

              <div>
                <label htmlFor="service" className="block font-medium mb-2">
                  {t('service')}
                </label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary rounded-[9px]"
                >
                  <option value="">
                    {language === 'it' ? '-- Seleziona un servizio --' : '-- Select a service --'}
                  </option>
                  <option value="Servizio di Consulenza Educativa (SCE)">
                    {language === 'it' ? 'Servizio di Consulenza Educativa (SCE)' : 'Educational Consulting Service'}
                  </option>
                  <option value="Centro Ipovisione">
                    {language === 'it' ? 'Centro Ipovisione' : 'Low Vision Center'}
                  </option>
                  <option value="Ausilioteca Augusto Romagnoli">
                    {language === 'it' ? 'Ausilioteca Augusto Romagnoli' : 'Augusto Romagnoli Aid Library'}
                  </option>
                  <option value="Vita indipendente">
                    {language === 'it' ? 'Vita indipendente' : 'Independent Living'}
                  </option>
                  <option value="Orientamento e Mobilità">
                    {language === 'it' ? 'Orientamento e Mobilità' : 'Orientation and Mobility'}
                  </option>
                  <option value="Consulenze ICT">
                    {language === 'it' ? 'Consulenze ICT e Accessibilità' : 'ICT and Accessibility Consulting'}
                  </option>
                  <option value="Supporto al Lavoro">
                    {language === 'it' ? 'Supporto al Lavoro' : 'Work Support'}
                  </option>
                  <option value="Servizi per Famiglie">
                    {language === 'it' ? 'Servizi per Famiglie' : 'Services for Families'}
                  </option>
                  <option value="Servizi per Scuole e Professionisti">
                    {language === 'it' ? 'Servizi per Scuole e Professionisti' : 'Services for Schools and Professionals'}
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferredDate" className="block font-medium mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" aria-hidden="true" />
                    {t('preferredDate')}
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary rounded-[5px]"
                  />
                </div>

                <div>
                  <label htmlFor="preferredTime" className="block font-medium mb-2">
                    {t('preferredTime')}
                  </label>
                  <select
                    id="preferredTime"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full border-2 border-border bg-background focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary rounded-[9px] px-[18px] py-[17px]"
                  >
                    <option value="">--</option>
                    <option value="9:00-10:00">9:00-10:00</option>
                    <option value="10:00-11:00">10:00-11:00</option>
                    <option value="11:00-12:00">11:00-12:00</option>
                    <option value="14:00-15:00">14:00-15:00</option>
                    <option value="15:00-16:00">15:00-16:00</option>
                    <option value="16:00-17:00">16:00-17:00</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block font-medium mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" aria-hidden="true" />
                  {t('notes')}
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary rounded-[5px]"
                />
              </div>

              <p className="text-sm text-muted-foreground">{t('required')}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" variant="primary" className="flex-1">
                  {t('submit')}
                </Button>
                <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                  {t('cancel')}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-20 h-20 mx-auto mb-6 text-primary" aria-hidden="true" />
            <h2 className="text-3xl font-bold mb-4">{t('success.title')}</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              {t('success.message')}
            </p>
            <Button variant="primary" onClick={handleClose}>
              {t('success.button')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
