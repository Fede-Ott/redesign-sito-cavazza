import { useState } from 'react';
import { Users, BookOpen, Download, Video, FileText, ExternalLink, Monitor, Briefcase, Database, Phone, Mail } from 'lucide-react';
import { Button } from '../components/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CourseRegistrationModal } from '../components/CourseRegistrationModal';
import { type Lang } from '../i18n';
import { trainingImages } from '../data/siteImages';

interface FormazionePageProps {
  language: Lang;
  onHomeClick: () => void;
}

export function FormazionePage({ language, onHomeClick }: FormazionePageProps) {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const t = (key: string) => {
    const translations: Record<string, { it: string; en: string }> = {
      'breadcrumb.formazione': { it: "Formazione", en: "Training" },
      'page.title': { it: "Scuola e Formazione", en: "School and Training" },
      'page.subtitle': { it: "Percorsi formativi e strumenti didattici per l'autonomia e l'inclusione", en: "Training paths and educational tools for autonomy and inclusion" },

      'professional.title': { it: "Formazione Professionale", en: "Professional Training" },
      'professional.intro': { it: "L'Istituto Cavazza offre corsi di formazione professionale per persone non vedenti e ipovedenti, con l'obiettivo di favorire un inserimento lavorativo qualificato.", en: "The Cavazza Institute offers professional training courses for blind and visually impaired people, with the aim of facilitating qualified job placement." },

      'centralinista.title': { it: "Centralinista – Operatore dell'informazione nella comunicazione", en: "Switchboard Operator – Information Operator in Communication" },
      'centralinista.subtitle': { it: "Corso di qualifica professionale", en: "Professional qualification course" },
      'centralinista.destinatari': { it: "Destinatari", en: "Recipients" },
      'centralinista.destinatari.desc': { it: "Persone disoccupate non vedenti ed ipovedenti", en: "Unemployed blind and visually impaired people" },
      'centralinista.obiettivi': { it: "Obiettivi", en: "Objectives" },
      'centralinista.obiettivi.desc': { it: "Formazione di operatori telefonici con competenze in comunicazione, gestione dei dati e delle informazioni, rapporto tra azienda e utenti. Il corso favorisce un inserimento lavorativo più celere e meglio rispondente alle necessità dei datori di lavoro.", en: "Training of telephone operators with skills in communication, data and information management, company-user relations. The course facilitates faster job placement better suited to employers' needs." },
      'centralinista.durata': { it: "Durata", en: "Duration" },
      'centralinista.durata.desc': { it: "1200 ore totali (40 ore settimanali)", en: "1200 total hours (40 hours per week)" },
      'centralinista.qualifica': { it: "Qualifica finale", en: "Final Qualification" },
      'centralinista.qualifica.desc': { it: "L'esame finale è contemporaneamente: esame di qualifica, esame abilitante per l'iscrizione all'albo dei centralinisti telefonici non vedenti, conforme alla Legge 113/85 (collocamento obbligatorio).", en: "The final exam is simultaneously: qualification exam, qualifying exam for registration in the registry of blind telephone operators, in accordance with Law 113/85 (compulsory placement)." },
      'centralinista.cta': { it: "Iscriviti al Corso", en: "Register for Course" },

      'altri.corsi.title': { it: "Altri Corsi Professionali", en: "Other Professional Courses" },
      'altri.corsi.desc': { it: "L'Istituto organizza, autonomamente o con il CTC (Centro di Formazione della Camera di Commercio di Bologna), corsi di alfabetizzazione informatica, approfondimento informatico e dinamiche della comunicazione moderna, destinati a privati, aziende ed enti per l'aggiornamento e riqualificazione professionale dei centralinisti telefonici.", en: "The Institute organizes, independently or with the CTC (Training Center of the Bologna Chamber of Commerce), computer literacy courses, advanced IT courses and modern communication dynamics, aimed at individuals, companies and institutions for the updating and retraining of telephone operators." },

      'braille.operatori.title': { it: "Corsi Braille per Operatori Scolastici e Genitori", en: "Braille Courses for School Operators and Parents" },
      'braille.operatori.desc': { it: "Corso di 10 ore dedicato a genitori e operatori scolastici di utenti seguiti dal Servizio di Consulenza Educativa. Include laboratorio di scrittura, laboratorio di lettura e indicazioni sul percorso didattico per l'insegnamento del Braille. Attivazione al bisogno, frequenza gratuita.", en: "10-hour course dedicated to parents and school operators of users followed by the Educational Consulting Service. Includes writing workshop, reading workshop and instructions on the educational path for teaching Braille. Activation on demand, free attendance." },

      'aggiornamento.title': { it: "Corso Aggiornamento per Centralinisti e Operatori Non Vedenti Occupati", en: "Refresher Course for Switchboard Operators and Employed Blind Operators" },
      'aggiornamento.desc': { it: "Percorsi di aggiornamento professionale per centralinisti e operatori non vedenti già occupati, con focus su nuove tecnologie, dinamiche di comunicazione moderna e competenze trasversali.", en: "Professional refresher courses for already employed switchboard operators and blind operators, focusing on new technologies, modern communication dynamics and soft skills." },

      'formazione.educativa.title': { it: "Formazione per Operatori Educativi e Scolastici", en: "Training for Educational and School Operators" },
      'formazione.educativa.desc': { it: "Corsi di formazione specializzati per insegnanti, educatori e operatori scolastici su tematiche legate alla disabilità visiva, metodologie didattiche inclusive, ausili tecnologici e strategie pedagogiche.", en: "Specialized training courses for teachers, educators and school operators on issues related to visual disability, inclusive teaching methodologies, technological aids and pedagogical strategies." },

      'scuola.title': { it: "Scuola e Strumenti Didattici", en: "School and Educational Tools" },
      'scuola.intro': { it: "Materiali, software e risorse didattiche per supportare l'apprendimento di studenti non vedenti e ipovedenti.", en: "Materials, software and educational resources to support the learning of blind and visually impaired students." },

      'cisad.title': { it: "CISAD - Centro Informatico per la Sperimentazione degli Ausili Didattici", en: "CISAD - IT Center for Educational Aids Experimentation" },
      'cisad.intro': { it: "Centro che fornisce supporto tecnico e professionale agli alunni non vedenti e agli insegnanti impegnati nell'integrazione scolastica, nato nel 1999 su iniziativa della Federazione Nazionale delle Istituzioni pro ciechi di Roma.", en: "Center that provides technical and professional support to blind students and teachers engaged in school integration, established in 1999 on the initiative of the National Federation of Institutions for the Blind of Rome." },
      'cisad.flash.title': { it: "Cisadflash: novità e notizie", en: "Cisadflash: news and updates" },
      'cisad.flash.desc': { it: "Newsletter con aggiornamenti su ausili, tecnologie assistive, normative e novità nel campo della tiflodidattica.", en: "Newsletter with updates on aids, assistive technologies, regulations and news in the field of typhlology education." },
      'cisad.articoli.title': { it: "Articoli e documenti", en: "Articles and documents" },
      'cisad.articoli.desc': { it: "Raccolta di articoli scientifici, documenti tecnici e materiali di approfondimento su ausili informatici e metodologie didattiche.", en: "Collection of scientific articles, technical documents and in-depth materials on IT aids and teaching methodologies." },
      'cisad.origini.title': { it: "Origini e scopi del CISAD", en: "Origins and purposes of CISAD" },
      'cisad.origini.desc': { it: "Storia del Centro, obiettivi, attività di informazione e documentazione, sviluppo tecnologico e collaborazioni con istituzioni partner.", en: "History of the Center, objectives, information and documentation activities, technological development and collaborations with partner institutions." },

      'accessibilita.opere.title': { it: "Schede Accessibilità Opere Multimediali", en: "Multimedia Accessibility Sheets" },
      'accessibilita.opere.desc': { it: "Schede tecniche dettagliate sull'accessibilità di opere multimediali, contenuti audiovisivi e risorse digitali per studenti con disabilità visiva.", en: "Detailed technical sheets on the accessibility of multimedia works, audiovisual content and digital resources for students with visual disabilities." },

      'software.title': { it: "Software Didattici", en: "Educational Software" },
      'software.intro': { it: "Una raccolta di software gratuiti sviluppati per facilitare l'apprendimento e lo studio.", en: "A collection of free software developed to facilitate learning and study." },

      'diario.title': { it: "Diario Scolastico Elettronico", en: "Electronic School Diary" },
      'diario.desc': { it: "Software per la gestione del diario scolastico completamente accessibile con screen reader e display Braille.", en: "Software for managing school diary fully accessible with screen reader and Braille display." },
      'diario.download': { it: "Scarica Diario", en: "Download Diary" },

      'braillekoine.title': { it: "BrailleKoiné: un software per fare greco", en: "BrailleKoiné: Greek language software" },
      'braillekoine.desc': { it: "Software specifico per lo studio del greco antico con supporto Braille e sintesi vocale.", en: "Specific software for studying ancient Greek with Braille support and voice synthesis." },
      'braillekoine.download': { it: "Scarica BrailleKoiné", en: "Download BrailleKoiné" },

      'braillemat.title': { it: "Matematica e BrailleMat", en: "Mathematics and BrailleMat" },
      'braillemat.desc': { it: "Software per lo studio della matematica con notazione Braille matematica e funzioni avanzate di calcolo.", en: "Software for studying mathematics with Braille mathematical notation and advanced calculation functions." },
      'braillemat.download': { it: "Scarica BrailleMat", en: "Download BrailleMat" },

      'winrar.title': { it: "Corso rapido di WinRar", en: "Quick WinRar Course" },
      'winrar.author': { it: "di Nunziante Esposito", en: "by Nunziante Esposito" },
      'winrar.desc': { it: "Guida completa all'uso di WinRar per comprimere e decomprimere file in modo accessibile.", en: "Complete guide to using WinRar to compress and decompress files in an accessible way." },
      'winrar.download': { it: "Scarica Corso", en: "Download Course" },

      'word.title': { it: "20 lezioni su Word", en: "20 Word Lessons" },
      'word.author': { it: "di Carlo Loiodice", en: "by Carlo Loiodice" },
      'word.desc': { it: "Corso completo in 20 lezioni per imparare a usare Microsoft Word con screen reader.", en: "Complete course in 20 lessons to learn how to use Microsoft Word with screen reader." },
      'word.download': { it: "Scarica Corso", en: "Download Course" },

      'invito.braille.title': { it: "Invito al Braille: Corso interattivo per l'apprendimento del Braille", en: "Introduction to Braille: Interactive course for learning Braille" },
      'invito.braille.desc': { it: "Corso interattivo per l'apprendimento del sistema Braille rivolto a persone adulte vedenti (insegnanti, genitori, operatori). Include tre macrosezioni: Alfabeto, Simbologia matematica e Notazione musicale.", en: "Interactive course for learning the Braille system aimed at sighted adults (teachers, parents, operators). Includes three macro-sections: Alphabet, Mathematical symbolism and Musical notation." },
      'invito.braille.features': { it: "Caratteristiche del corso", en: "Course features" },
      'invito.braille.feature1': { it: "Unità didattiche sequenziali con accesso libero", en: "Sequential teaching units with free access" },
      'invito.braille.feature2': { it: "Controllo prerequisiti e verifiche finali", en: "Prerequisites check and final assessments" },
      'invito.braille.feature3': { it: "Esercizi di consolidamento e arricchimento", en: "Consolidation and enrichment exercises" },
      'invito.braille.feature4': { it: "Storia delle origini del sistema Braille", en: "History of the origins of the Braille system" },
      'invito.braille.access': { it: "Accedi al Corso Online", en: "Access Online Course" },

      'video.placeholder': { it: "Video guida in lavorazione", en: "Tutorial video in progress" },
      'contact.info': { it: "Per maggiori informazioni sui corsi di formazione:", en: "For more information on training courses:" },
      'contact.email.general': { it: "Email Formazione Generale", en: "General Training Email" },
      'contact.email.professional': { it: "Email Formazione Professionale", en: "Professional Training Email" }
    };

    return translations[key]?.[language] || key;
  };

  const handleRegisterCourse = (courseName: string) => {
    setSelectedCourse(courseName);
    setShowRegistrationModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Course Registration Modal */}
      <CourseRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        courseName={selectedCourse}
        language={language}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: t('breadcrumb.formazione') }]}
        onHomeClick={onHomeClick}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t('page.title')}</h1>
          <p className="text-base opacity-95 max-w-3xl">
            {t('page.subtitle')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* ── SEZIONE 1: FORMAZIONE PROFESSIONALE ── */}
        <div id="formazione-professionale" className="mb-32">
          <h2 className="text-2xl font-bold mb-2 flex items-start md:items-center gap-3 text-left">
            <Briefcase className="w-6 h-6 text-primary" aria-hidden="true" />
            {t('professional.title')}
          </h2>
          <p className="text-base text-muted-foreground mb-6">{t('professional.intro')}</p>

          <div className="grid grid-cols-1 md:grid-cols-8 gap-6 items-stretch">
            {/* Immagini */}
            <div className="flex flex-col gap-6 h-full md:col-span-3">
              <div className="relative overflow-hidden rounded-xl shadow-lg h-[320px] md:h-[360px] bg-muted/40">
                <img
                  src={trainingImages.professional}
                  alt={language === 'it' ? 'Studenti durante un corso per centralinisti' : 'Students during a switchboard operator course'}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-xl shadow-lg h-[320px] md:h-[360px] bg-muted/40">
                <img
                  src={trainingImages.professionalAlternate}
                  alt={language === 'it' ? 'Corso di formazione professionale' : 'Professional training course'}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="hidden md:block md:col-span-1" aria-hidden="true" />

            {/* Contenuto testuale — corso Centralinista */}
            <div className="md:col-span-4 border-2 border-[#135DCD] rounded-xl p-6 bg-transparent">
              <h3 className="text-lg font-bold mb-2">{t('centralinista.title')}</h3>
              <p className="text-base text-muted-foreground mb-6">{t('centralinista.subtitle')}</p>

              <div className="flex flex-col gap-4 mb-6">
                <div className="rounded-xl p-4 bg-[#EEF4FF]">
                  <h4 className="text-base font-bold mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" aria-hidden="true" />
                    {t('centralinista.destinatari')}
                  </h4>
                  <p className="text-sm text-black">{t('centralinista.destinatari.desc')}</p>
                </div>
                <div className="rounded-xl p-4 bg-[#EEF4FF]">
                  <h4 className="text-base font-bold mb-2">{t('centralinista.durata')}</h4>
                  <p className="text-sm text-black">{t('centralinista.durata.desc')}</p>
                </div>
                <div className="rounded-xl p-4 bg-[#EEF4FF]">
                  <h4 className="text-base font-bold mb-2">{t('centralinista.obiettivi')}</h4>
                  <p className="text-sm text-black">{t('centralinista.obiettivi.desc')}</p>
                </div>
                <div className="rounded-xl p-4 bg-[#EEF4FF]">
                  <h4 className="text-base font-bold mb-2">{t('centralinista.qualifica')}</h4>
                  <p className="text-sm text-black">{t('centralinista.qualifica.desc')}</p>
                </div>
              </div>

              <Button
                variant="primary"
                onClick={() => handleRegisterCourse(t('centralinista.title'))}
                className="w-full md:w-auto font-bold"
              >
                {t('centralinista.cta')}
              </Button>
            </div>
          </div>

          {/* Altri corsi — 3 card */}
          <div className="mt-16">
            <h3 className="text-lg font-bold mb-3">{t('altri.corsi.title')}</h3>
            <p className="text-base leading-relaxed mb-6">{t('altri.corsi.desc')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-transparent border-2 border-[#135DCD] rounded-xl p-6 flex flex-col">
                <h4 className="text-base font-bold mb-3">{t('braille.operatori.title')}</h4>
                <p className="text-sm leading-relaxed mb-4 flex-1">{t('braille.operatori.desc')}</p>
                <div className="bg-[#EEF4FF] text-black rounded-lg px-4 py-2 text-center text-sm mb-4">
                  10 {language === 'it' ? 'ore · Gratuito' : 'hours · Free'}
                </div>
                <Button variant="primary" onClick={() => handleRegisterCourse(t('braille.operatori.title'))} className="w-full font-bold">
                  {t('centralinista.cta')}
                </Button>
              </div>
              <div className="bg-transparent border-2 border-[#135DCD] rounded-xl p-6 flex flex-col">
                <h4 className="text-base font-bold mb-3">{t('aggiornamento.title')}</h4>
                <p className="text-sm leading-relaxed mb-4 flex-1">{t('aggiornamento.desc')}</p>
                <Button variant="primary" onClick={() => handleRegisterCourse(t('aggiornamento.title'))} className="w-full font-bold">
                  {t('centralinista.cta')}
                </Button>
              </div>
              <div className="bg-transparent border-2 border-[#135DCD] rounded-xl p-6 flex flex-col">
                <h4 className="text-base font-bold mb-3">{t('formazione.educativa.title')}</h4>
                <p className="text-sm leading-relaxed mb-4 flex-1">{t('formazione.educativa.desc')}</p>
                <Button variant="primary" onClick={() => handleRegisterCourse(t('formazione.educativa.title'))} className="w-full font-bold">
                  {t('centralinista.cta')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── SEZIONE 2: SCUOLA E STRUMENTI DIDATTICI ── */}
        <div id="scuola-strumenti" className="mb-32">
          <h2 className="text-2xl font-bold mb-2 flex items-start md:items-center gap-3 text-left">
            <BookOpen className="w-6 h-6 text-primary" aria-hidden="true" />
            {t('scuola.title')}
          </h2>
          <p className="text-base text-muted-foreground mb-6">{t('scuola.intro')}</p>

          {/* Schede accessibilità — riga singola piena larghezza */}
          <div className="mb-6 border-2 border-[#135DCD] rounded-xl p-6 bg-transparent">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" aria-hidden="true" />
              {t('accessibilita.opere.title')}
            </h3>
            <p className="text-base leading-relaxed mb-4">{t('accessibilita.opere.desc')}</p>
            <Button className="font-bold" variant="primary">
              <FileText className="w-4 h-4 mr-2" aria-hidden="true" />
              {language === 'it' ? 'Consulta le Schede' : 'View Sheets'}
            </Button>
          </div>

          {/* Software — griglia 3 card */}
          <div className="mt-16 border-2 border-[#135DCD] rounded-xl p-6 bg-transparent">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-3">
              <Monitor className="w-6 h-6 text-primary" aria-hidden="true" />
              {t('software.title')}
            </h3>
            <p className="text-base leading-relaxed mb-6">{t('software.intro')}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Diario */}
              <div className="bg-[#EEF4FF] border border-[#D6E4FF] rounded-xl p-6 flex flex-col shadow-sm">
                <h4 className="text-base font-bold mb-3">{t('diario.title')}</h4>
                <p className="text-sm leading-relaxed mb-4 flex-1">{t('diario.desc')}</p>
                <div className="flex flex-col gap-2">
                  <Button className="font-bold w-full" variant="primary">
                    <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                    {t('diario.download')}
                  </Button>
                  <Button className="font-bold w-full" variant="outline">
                    <Video className="w-4 h-4 mr-2" aria-hidden="true" />
                    {language === 'it' ? 'Guarda la guida video' : 'Watch video guide'}
                  </Button>
                </div>
              </div>
              {/* BrailleKoiné */}
              <div className="bg-[#EEF4FF] border border-[#D6E4FF] rounded-xl p-6 flex flex-col shadow-sm">
                <h4 className="text-base font-bold mb-3">{t('braillekoine.title')}</h4>
                <p className="text-sm leading-relaxed mb-4 flex-1">{t('braillekoine.desc')}</p>
                <div className="flex flex-col gap-2">
                  <Button className="font-bold w-full" variant="primary">
                    <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                    {t('braillekoine.download')}
                  </Button>
                  <Button className="font-bold w-full" variant="outline">
                    <Video className="w-4 h-4 mr-2" aria-hidden="true" />
                    {language === 'it' ? 'Guarda la guida video' : 'Watch video guide'}
                  </Button>
                </div>
              </div>
              {/* BrailleMat */}
              <div className="bg-[#EEF4FF] border border-[#D6E4FF] rounded-xl p-6 flex flex-col shadow-sm">
                <h4 className="text-base font-bold mb-3">{t('braillemat.title')}</h4>
                <p className="text-sm leading-relaxed mb-4 flex-1">{t('braillemat.desc')}</p>
                <div className="flex flex-col gap-2">
                  <Button className="font-bold w-full" variant="primary">
                    <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                    {t('braillemat.download')}
                  </Button>
                  <Button className="font-bold w-full" variant="outline">
                    <Video className="w-4 h-4 mr-2" aria-hidden="true" />
                    {language === 'it' ? 'Guarda la guida video' : 'Watch video guide'}
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-8 gap-6 items-stretch">
              <div className="md:col-span-3 flex flex-col gap-6">
                <div className="bg-[#EEF4FF] border border-[#D6E4FF] rounded-xl p-6 flex flex-col shadow-sm">
                  <h4 className="text-base font-bold mb-1">{t('winrar.title')}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{t('winrar.author')}</p>
                  <p className="text-sm leading-relaxed mb-4 flex-1">{t('winrar.desc')}</p>
                  <Button className="font-bold w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                    {t('winrar.download')}
                  </Button>
                </div>

                <div className="bg-[#EEF4FF] border border-[#D6E4FF] rounded-xl p-6 flex flex-col shadow-sm">
                  <h4 className="text-base font-bold mb-1">{t('word.title')}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{t('word.author')}</p>
                  <p className="text-sm leading-relaxed mb-4 flex-1">{t('word.desc')}</p>
                  <Button className="font-bold w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                    {t('word.download')}
                  </Button>
                </div>
              </div>

              <div className="md:col-span-5 bg-[#EEF4FF] border border-[#D6E4FF] rounded-xl p-6 flex flex-col shadow-sm">
                <h4 className="text-lg font-bold mb-4">{t('invito.braille.title')}</h4>
                <p className="text-base leading-relaxed mb-6">{t('invito.braille.desc')}</p>
                <h5 className="text-base font-bold mb-3">{t('invito.braille.features')}</h5>
                <ul className="space-y-2 mb-6">
                  {[
                    t('invito.braille.feature1'),
                    t('invito.braille.feature2'),
                    t('invito.braille.feature3'),
                    t('invito.braille.feature4'),
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-lg leading-none mt-0.5" aria-hidden="true">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://www.cavazza.it/invitoalbraille/html/invitobraille.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[56px] bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors no-underline self-start"
                >
                  <ExternalLink className="w-5 h-5" aria-hidden="true" />
                  {t('invito.braille.access')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── SEZIONE 3: CISAD ── */}
        <div id="cisad" className="mb-32">
          <div className="border-2 border-[#135DCD] rounded-xl p-6 bg-transparent">
            <h2 className="text-2xl font-bold mb-2 flex items-start md:items-center gap-3 text-left">
              <Database className="w-6 h-6 text-primary" aria-hidden="true" />
              {t('cisad.title')}
            </h2>
            <p className="text-base text-muted-foreground mb-6">{t('cisad.intro')}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="#cisad-flash"
              className="bg-[#EEF4FF] hover:bg-[#E6EFFF] border border-[#D6E4FF] rounded-xl p-6 transition-colors no-underline block shadow-sm"
            >
              <h3 className="text-lg font-bold mb-2">{t('cisad.flash.title')}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t('cisad.flash.desc')}</p>
              <span className="inline-flex rounded-md bg-[#135DCD] px-4 py-2 text-sm font-semibold text-white">
                {language === 'it' ? 'Leggi Newsletter' : 'Read Newsletter'}
              </span>
            </a>
            <a
              href="#cisad-articoli"
              className="bg-[#EEF4FF] hover:bg-[#E6EFFF] border border-[#D6E4FF] rounded-xl p-6 transition-colors no-underline block shadow-sm"
            >
              <h3 className="text-lg font-bold mb-2">{t('cisad.articoli.title')}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t('cisad.articoli.desc')}</p>
              <span className="inline-flex rounded-md bg-[#135DCD] px-4 py-2 text-sm font-semibold text-white">
                {language === 'it' ? 'Consulta Articoli' : 'Browse Articles'}
              </span>
            </a>
            <a
              href="#cisad-origini"
              className="bg-[#EEF4FF] hover:bg-[#E6EFFF] border border-[#D6E4FF] rounded-xl p-6 transition-colors no-underline block shadow-sm"
            >
              <h3 className="text-lg font-bold mb-2">{t('cisad.origini.title')}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t('cisad.origini.desc')}</p>
              <span className="inline-flex rounded-md bg-[#135DCD] px-4 py-2 text-sm font-semibold text-white">
                {language === 'it' ? 'Scopri di più' : 'Learn more'}
              </span>
            </a>
            </div>
          </div>
        </div>

        {/* ── CONTATTI FORMAZIONE ── */}
        <div id="contatti-formazione" className="mb-16">
          <h2 className="text-2xl font-bold mb-3 text-black">
            {language === 'it' ? 'Contatti Formazione' : 'Training Contacts'}
          </h2>
          <p className="text-sm mb-6 text-black/80">{t('contact.info')}</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <div className="bg-transparent border-2 border-[#D75220] rounded-xl p-5 md:p-6 self-start">
              <div className="flex items-center gap-2 mb-3">
                <Phone className="w-5 h-5 text-[#D75220] flex-shrink-0" aria-hidden="true" />
                <h3 className="text-base font-bold m-[0px] text-black">{language === 'it' ? 'Telefono' : 'Phone'}</h3>
              </div>
              <a href="tel:+39051332090" className="mb-10 block text-[16px] text-[#D75220]">+39 051 33 20 90</a>
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-[#D75220] flex-shrink-0" aria-hidden="true" />
                <h3 className="text-base font-bold m-[0px] text-black">{t('contact.email.general')}</h3>
              </div>
              <a href="mailto:formazione@cavazza.it" className="text-sm text-[#D75220]">formazione@cavazza.it</a>
            </div>

            <div className="bg-transparent border-2 border-[#D75220] rounded-xl p-4 md:p-5 self-start">
              <p className="mb-1 text-sm font-bold text-black">{t('contact.email.general')}</p>
              <a href="mailto:formazione@cavazza.it" className="text-[15px] text-[#D75220]">formazione@cavazza.it</a>
            </div>

            <div className="bg-transparent border-2 border-[#D75220] rounded-xl p-4 md:p-5 self-start">
              <p className="mb-1 text-sm font-bold text-black">{t('contact.email.professional')}</p>
              <a href="mailto:formazioneprofessionale@cavazza.it" className="text-[15px] text-[#D75220]">formazioneprofessionale@cavazza.it</a>
            </div>

            <div className="bg-transparent border-2 border-[#D75220] rounded-xl p-4 md:p-5 self-start">
              <p className="mb-1 text-sm font-bold text-black">{language === 'it' ? 'Centro CISAD' : 'CISAD Center'}</p>
              <a href="mailto:cisad@cavazza.it" className="text-[15px] text-[#D75220]">cisad@cavazza.it</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
