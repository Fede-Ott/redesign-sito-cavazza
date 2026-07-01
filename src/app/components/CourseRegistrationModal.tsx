import { useEffect, useState } from 'react';
import { X, AlertCircle, User, Mail, Phone, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { Button } from './Button';

interface CourseRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  language: 'it' | 'en';
}

export function CourseRegistrationModal({ isOpen, onClose, courseName, language }: CourseRegistrationModalProps) {
  const buildInitialFormData = () => ({
    corso: courseName,
    pagamento: 'fisica',
    ecm: 'no',
    cognome: '',
    nome: '',
    sesso: '',
    qualifica: '',
    altroQualifica: '',
    luogoNascita: '',
    dataNascita: '',
    codiceFiscale: '',
    indirizzo: '',
    cap: '',
    citta: '',
    provincia: '',
    email: '',
    telefono: '',
    consenso: false
  });

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState(buildInitialFormData);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const t = (key: string) => {
    const translations: Record<string, { it: string; en: string }> = {
      'title': { it: 'Iscrizione al Corso', en: 'Course Registration' },
      'subtitle': { it: 'Compila il modulo per iscriverti al corso', en: 'Fill out the form to register for the course' },
      'corso': { it: 'Corso al quale si desidera iscriversi', en: 'Course to register for' },
      'pagamento': { it: 'Pagamento per conto di', en: 'Payment on behalf of' },
      'fisica': { it: 'Persona fisica', en: 'Individual' },
      'giuridica': { it: 'Persona giuridica (con partita iva)', en: 'Legal entity (with VAT number)' },
      'ecm': { it: 'Riconoscimento crediti ECM', en: 'ECM credits recognition' },
      'si': { it: 'Sì', en: 'Yes' },
      'no': { it: 'No', en: 'No' },
      'cognome': { it: 'Cognome *', en: 'Last Name *' },
      'nome': { it: 'Nome *', en: 'First Name *' },
      'sesso': { it: 'Sesso *', en: 'Gender *' },
      'maschio': { it: 'Maschio', en: 'Male' },
      'femmina': { it: 'Femmina', en: 'Female' },
      'altro': { it: 'Altro', en: 'Other' },
      'qualifica': { it: 'Qualifica *', en: 'Qualification *' },
      'qualifica.placeholder': { it: '-- Seleziona qualifica --', en: '-- Select qualification --' },
      'luogoNascita': { it: 'Luogo di nascita *', en: 'Place of birth *' },
      'dataNascita': { it: 'Data di nascita *', en: 'Date of birth *' },
      'codiceFiscale': { it: 'Codice fiscale *', en: 'Tax code *' },
      'indirizzo': { it: 'Indirizzo *', en: 'Address *' },
      'cap': { it: 'CAP *', en: 'ZIP Code *' },
      'citta': { it: 'Città *', en: 'City *' },
      'provincia': { it: 'Provincia *', en: 'Province *' },
      'email': { it: 'Email *', en: 'Email *' },
      'telefono': { it: 'Telefono *', en: 'Phone *' },
      'consenso': { it: 'Esprimo il consenso al trattamento dei miei dati personali', en: 'I consent to the processing of my personal data' },
      'submit': { it: 'Invia Richiesta', en: 'Submit Request' },
      'cancel': { it: 'Annulla', en: 'Cancel' },
      'success.title': { it: 'Iscrizione Inviata!', en: 'Registration Sent!' },
      'success.message': { it: 'Grazie per la tua iscrizione. Riceverai una conferma via email entro 24-48 ore.', en: 'Thank you for your registration. You will receive a confirmation email within 24-48 hours.' },
      'success.button': { it: 'Chiudi', en: 'Close' },
      'required': { it: '* Campi obbligatori', en: '* Required fields' }
    };
    return translations[key]?.[language] || key;
  };

  useEffect(() => {
    if (!isOpen) return;

    setStep('form');
    setFormData(buildInitialFormData());
    setErrors({});
    setTouched({});
  }, [isOpen, courseName]);

  if (!isOpen) return null;

  const qualifiche = [
    'Oculista', 'Ortottista', 'Ottico', 'Optometrista', 'Fisico Sanitario',
    'Psicologo', 'Psicoterapeuta', 'Educatore', 'Pedagogista', 'TNPEE',
    'Assistente alla comunicazione', 'Terapista occupazionale', 'Tiflologo',
    'Operatore di orientamento e mobilità', 'Tecnico della riabilitazione psichiatrica',
    'Assistente sociale', 'Infermiere', 'Infermiere pediatrico', 'Infermiere di comunità',
    'Chinesiologo', 'Logopedista', 'Insegnante', 'Genitore', 'Studente', 'Altro'
  ];

  const validateField = (name: string, value: string): string | undefined => {
    const req = language === 'it' ? 'Campo obbligatorio' : 'Required field';
    if (!value.trim()) return req;
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return language === 'it' ? 'Email non valida' : 'Invalid email';
    if (name === 'telefono' && !/^[\d\s+()-]{8,}$/.test(value)) return language === 'it' ? 'Numero non valido' : 'Invalid phone number';
    if (name === 'codiceFiscale' && value.length !== 16) return language === 'it' ? 'Deve essere di 16 caratteri' : 'Must be 16 characters';
    if (name === 'cap' && !/^\d{5}$/.test(value)) return language === 'it' ? 'CAP non valido (5 cifre)' : 'Invalid ZIP (5 digits)';
    if (name === 'provincia' && value.length !== 2) return language === 'it' ? 'Inserisci la sigla (2 lettere)' : 'Enter 2-letter code';
    return undefined;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const value = (formData as Record<string, string>)[field] || '';
    setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
  };

  const getInputClass = (field: string) => {
    const base = 'w-full px-4 py-3 border-2 bg-background focus:outline-none focus:ring-4 rounded-[5px]';
    return touched[field] && errors[field]
      ? `${base} border-red-600 focus:ring-red-600/20 focus:border-red-600`
      : `${base} border-border focus:ring-primary/20 focus:border-primary`;
  };

  const errMsg = (field: string) => touched[field] && errors[field] ? (
    <div className="flex items-center gap-2 mt-2 text-sm text-red-600" role="alert">
      <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      <span>{errors[field]}</span>
    </div>
  ) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const req = language === 'it' ? 'Campo obbligatorio' : 'Required field';
    const textFields = ['cognome','nome','sesso','qualifica','luogoNascita','dataNascita','codiceFiscale','indirizzo','cap','citta','provincia','email','telefono'];
    const newErrors: Record<string, string | undefined> = {};
    const allTouched: Record<string, boolean> = {};
    textFields.forEach((field) => {
      allTouched[field] = true;
      const value = (formData as Record<string, string>)[field] || '';
      if (!value.trim()) { newErrors[field] = req; return; }
      if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) newErrors[field] = language === 'it' ? 'Email non valida' : 'Invalid email';
      if (field === 'telefono' && !/^[\d\s+()-]{8,}$/.test(value)) newErrors[field] = language === 'it' ? 'Numero non valido' : 'Invalid phone number';
      if (field === 'codiceFiscale' && value.length !== 16) newErrors[field] = language === 'it' ? 'Deve essere di 16 caratteri' : 'Must be 16 characters';
      if (field === 'cap' && !/^\d{5}$/.test(value)) newErrors[field] = language === 'it' ? 'CAP non valido (5 cifre)' : 'Invalid ZIP (5 digits)';
      if (field === 'provincia' && value.length !== 2) newErrors[field] = language === 'it' ? 'Inserisci la sigla (2 lettere)' : 'Enter 2-letter code';
    });
    if (!formData.consenso) newErrors['consenso'] = language === 'it' ? 'Obbligatorio per procedere' : 'Required to proceed';
    allTouched['consenso'] = true;
    setTouched(prev => ({ ...prev, ...allTouched }));
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setTimeout(() => { setStep('success'); }, 500);
  };

  const handleClose = () => {
    setStep('form');
    setFormData(buildInitialFormData());
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
        className="bg-card border-4 border-primary max-w-3xl w-full p-6 md:p-8 my-8 max-h-[90vh] overflow-y-auto rounded-[9px]"
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
                className="min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-secondary rounded-sm transition-colors flex-shrink-0"
                aria-label={language === 'it' ? 'Chiudi' : 'Close'}
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Corso */}
              <div>
                <label htmlFor="corso" className="block font-medium mb-2">
                  {t('corso')} *
                </label>
                <input
                  type="text"
                  id="corso"
                  value={formData.corso}
                  readOnly
                  className="w-full px-4 py-3 border-2 border-border bg-secondary rounded-[5px]"
                />
              </div>

              {/* Pagamento e ECM */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2">{t('pagamento')} *</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="pagamento"
                        value="fisica"
                        checked={formData.pagamento === 'fisica'}
                        onChange={(e) => setFormData({ ...formData, pagamento: e.target.value })}
                        className="w-5 h-5"
                      />
                      <span>{t('fisica')}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="pagamento"
                        value="giuridica"
                        checked={formData.pagamento === 'giuridica'}
                        onChange={(e) => setFormData({ ...formData, pagamento: e.target.value })}
                        className="w-5 h-5"
                      />
                      <span>{t('giuridica')}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-2">{t('ecm')} *</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="ecm"
                        value="si"
                        checked={formData.ecm === 'si'}
                        onChange={(e) => setFormData({ ...formData, ecm: e.target.value })}
                        className="w-5 h-5"
                      />
                      <span>{t('si')}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="ecm"
                        value="no"
                        checked={formData.ecm === 'no'}
                        onChange={(e) => setFormData({ ...formData, ecm: e.target.value })}
                        className="w-5 h-5"
                      />
                      <span>{t('no')}</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Dati personali */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cognome" className="block font-medium mb-2">
                    <User className="w-4 h-4 inline mr-2" aria-hidden="true" />
                    {t('cognome')}
                  </label>
                  <input
                    type="text"
                    id="cognome"
                    value={formData.cognome}
                    onChange={(e) => handleChange('cognome', e.target.value)}
                    onBlur={() => handleBlur('cognome')}
                    className={getInputClass('cognome')}
                    aria-invalid={!!(touched.cognome && errors.cognome)}
                  />
                  {errMsg('cognome')}
                </div>

                <div>
                  <label htmlFor="nome" className="block font-medium mb-2">
                    {t('nome')}
                  </label>
                  <input
                    type="text"
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => handleChange('nome', e.target.value)}
                    onBlur={() => handleBlur('nome')}
                    className={getInputClass('nome')}
                    aria-invalid={!!(touched.nome && errors.nome)}
                  />
                  {errMsg('nome')}
                </div>
              </div>

              {/* Sesso e Qualifica */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2">{t('sesso')}</label>
                  <select
                    id="sesso"
                    value={formData.sesso}
                    onChange={(e) => handleChange('sesso', e.target.value)}
                    onBlur={() => handleBlur('sesso')}
                    className={getInputClass('sesso')}
                    aria-invalid={!!(touched.sesso && errors.sesso)}
                  >
                    <option value="">--</option>
                    <option value="M">{t('maschio')}</option>
                    <option value="F">{t('femmina')}</option>
                    <option value="A">{t('altro')}</option>
                  </select>
                  {errMsg('sesso')}
                </div>

                <div>
                  <label htmlFor="qualifica" className="block font-medium mb-2">
                    {t('qualifica')}
                  </label>
                  <select
                    id="qualifica"
                    value={formData.qualifica}
                    onChange={(e) => handleChange('qualifica', e.target.value)}
                    onBlur={() => handleBlur('qualifica')}
                    className={getInputClass('qualifica')}
                    aria-invalid={!!(touched.qualifica && errors.qualifica)}
                  >
                    <option value="">{t('qualifica.placeholder')}</option>
                    {qualifiche.map((q) => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                  {errMsg('qualifica')}
                </div>
              </div>

              {/* Nascita */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="luogoNascita" className="block font-medium mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" aria-hidden="true" />
                    {t('luogoNascita')}
                  </label>
                  <input
                    type="text"
                    id="luogoNascita"
                    value={formData.luogoNascita}
                    onChange={(e) => handleChange('luogoNascita', e.target.value)}
                    onBlur={() => handleBlur('luogoNascita')}
                    className={getInputClass('luogoNascita')}
                    aria-invalid={!!(touched.luogoNascita && errors.luogoNascita)}
                  />
                  {errMsg('luogoNascita')}
                </div>

                <div>
                  <label htmlFor="dataNascita" className="block font-medium mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" aria-hidden="true" />
                    {t('dataNascita')}
                  </label>
                  <input
                    type="date"
                    id="dataNascita"
                    value={formData.dataNascita}
                    onChange={(e) => handleChange('dataNascita', e.target.value)}
                    onBlur={() => handleBlur('dataNascita')}
                    className={getInputClass('dataNascita')}
                    aria-invalid={!!(touched.dataNascita && errors.dataNascita)}
                  />
                  {errMsg('dataNascita')}
                </div>
              </div>

              {/* Codice fiscale */}
              <div>
                <label htmlFor="codiceFiscale" className="block font-medium mb-2">
                  {t('codiceFiscale')}
                </label>
                <input
                  type="text"
                  id="codiceFiscale"
                  value={formData.codiceFiscale}
                  onChange={(e) => handleChange('codiceFiscale', e.target.value.toUpperCase())}
                  onBlur={() => handleBlur('codiceFiscale')}
                  className={getInputClass('codiceFiscale')}
                  aria-invalid={!!(touched.codiceFiscale && errors.codiceFiscale)}
                />
                {errMsg('codiceFiscale')}
              </div>

              {/* Indirizzo */}
              <div>
                <label htmlFor="indirizzo" className="block font-medium mb-2">
                  {t('indirizzo')}
                </label>
                <input
                  type="text"
                  id="indirizzo"
                  value={formData.indirizzo}
                  onChange={(e) => handleChange('indirizzo', e.target.value)}
                  onBlur={() => handleBlur('indirizzo')}
                  className={getInputClass('indirizzo')}
                  aria-invalid={!!(touched.indirizzo && errors.indirizzo)}
                />
                {errMsg('indirizzo')}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="cap" className="block font-medium mb-2">
                    {t('cap')}
                  </label>
                  <input
                    type="text"
                    id="cap"
                    value={formData.cap}
                    onChange={(e) => handleChange('cap', e.target.value)}
                    onBlur={() => handleBlur('cap')}
                    className={getInputClass('cap')}
                    aria-invalid={!!(touched.cap && errors.cap)}
                  />
                  {errMsg('cap')}
                </div>

                <div>
                  <label htmlFor="citta" className="block font-medium mb-2">
                    {t('citta')}
                  </label>
                  <input
                    type="text"
                    id="citta"
                    value={formData.citta}
                    onChange={(e) => handleChange('citta', e.target.value)}
                    onBlur={() => handleBlur('citta')}
                    className={getInputClass('citta')}
                    aria-invalid={!!(touched.citta && errors.citta)}
                  />
                  {errMsg('citta')}
                </div>

                <div>
                  <label htmlFor="provincia" className="block font-medium mb-2">
                    {t('provincia')}
                  </label>
                  <input
                    type="text"
                    id="provincia"
                    maxLength={2}
                    value={formData.provincia}
                    onChange={(e) => handleChange('provincia', e.target.value.toUpperCase())}
                    onBlur={() => handleBlur('provincia')}
                    className={getInputClass('provincia')}
                    aria-invalid={!!(touched.provincia && errors.provincia)}
                  />
                  {errMsg('provincia')}
                </div>
              </div>

              {/* Contatti */}
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
                  />
                  {errMsg('email')}
                </div>

                <div>
                  <label htmlFor="telefono" className="block font-medium mb-2">
                    <Phone className="w-4 h-4 inline mr-2" aria-hidden="true" />
                    {t('telefono')}
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => handleChange('telefono', e.target.value)}
                    onBlur={() => handleBlur('telefono')}
                    className={getInputClass('telefono')}
                    aria-invalid={!!(touched.telefono && errors.telefono)}
                  />
                  {errMsg('telefono')}
                </div>
              </div>

              {/* Consenso */}
              <div className="bg-secondary rounded-sm p-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={formData.consenso}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, consenso: e.target.checked }));
                      if (touched.consenso) setErrors(prev => ({ ...prev, consenso: e.target.checked ? undefined : (language === 'it' ? 'Obbligatorio per procedere' : 'Required to proceed') }));
                    }}
                    onBlur={() => {
                      setTouched(prev => ({ ...prev, consenso: true }));
                      if (!formData.consenso) setErrors(prev => ({ ...prev, consenso: language === 'it' ? 'Obbligatorio per procedere' : 'Required to proceed' }));
                    }}
                    className="w-5 h-5 mt-1 flex-shrink-0"
                  />
                  <span className="text-sm">{t('consenso')} *</span>
                </label>
                {touched.consenso && errors.consenso && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-red-600" role="alert">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <span>{errors.consenso}</span>
                  </div>
                )}
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
