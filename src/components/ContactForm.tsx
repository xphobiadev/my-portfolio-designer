'use client';

import { useState, useRef, useCallback, useTransition } from 'react';
import { submitContactMessage } from '@/app/admin/actions';

interface ContactFormProps {
  dict: {
    formTitle: string;
    formSubtitle: string;
    yourName: string;
    namePlaceholder: string;
    yourEmail: string;
    emailPlaceholder: string;
    yourMessage: string;
    messagePlaceholder: string;
    send: string;
    privacy: string;
    whatsappCta: string;
    whatsappOr: string;
  };
  whatsappNumber?: string;
}

interface FieldState {
  value: string;
  touched: boolean;
  error: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateName(value: string): string {
  if (!value.trim()) return 'Veuillez saisir votre nom (min. 2 caractères)';
  if (value.trim().length < 2) return 'Veuillez saisir votre nom (min. 2 caractères)';
  return '';
}

function validateEmail(value: string): string {
  if (!value.trim()) return 'Veuillez saisir une adresse email valide';
  if (!EMAIL_REGEX.test(value.trim())) return 'Veuillez saisir une adresse email valide';
  return '';
}

function validateMessage(value: string): string {
  if (!value.trim()) return 'Votre message doit contenir au minimum 10 caractères';
  if (value.trim().length < 10) return 'Votre message doit contenir au minimum 10 caractères';
  return '';
}

export function ContactForm({ dict, whatsappNumber }: ContactFormProps) {
  const [name, setName] = useState<FieldState>({ value: '', touched: false, error: '' });
  const [email, setEmail] = useState<FieldState>({ value: '', touched: false, error: '' });
  const [message, setMessage] = useState<FieldState>({ value: '', touched: false, error: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleBlur = useCallback((field: 'name' | 'email' | 'message') => {
    switch (field) {
      case 'name':
        setName((prev) => ({ ...prev, touched: true, error: validateName(prev.value) }));
        break;
      case 'email':
        setEmail((prev) => ({ ...prev, touched: true, error: validateEmail(prev.value) }));
        break;
      case 'message':
        setMessage((prev) => ({ ...prev, touched: true, error: validateMessage(prev.value) }));
        break;
    }
  }, []);

  const handleChange = useCallback((field: 'name' | 'email' | 'message', value: string) => {
    setSubmitError(false);
    switch (field) {
      case 'name':
        setName((prev) => ({
          value,
          touched: prev.touched,
          error: prev.touched ? validateName(value) : '',
        }));
        break;
      case 'email':
        setEmail((prev) => ({
          value,
          touched: prev.touched,
          error: prev.touched ? validateEmail(value) : '',
        }));
        break;
      case 'message':
        setMessage((prev) => ({
          value,
          touched: prev.touched,
          error: prev.touched ? validateMessage(value) : '',
        }));
        break;
    }
  }, []);

  const getFieldClasses = (field: FieldState) => {
    const base =
      'w-full bg-white/[0.03] border rounded-xl px-4 md:px-5 py-3.5 md:py-4 text-white text-sm focus:ring-2 focus:ring-white focus:outline-none focus:bg-white/[0.05] transition-all duration-500 placeholder:text-gray-700';
    if (!field.touched) return `${base} border-white/[0.06]`;
    if (field.error) return `${base} border-red-500 focus:ring-red-400`;
    return `${base} border-green-500 focus:ring-green-400`;
  };

  const isFormValid =
    !validateName(name.value) && !validateEmail(email.value) && !validateMessage(message.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(false);

    // Touch all fields to show errors
    setName((prev) => ({ ...prev, touched: true, error: validateName(prev.value) }));
    setEmail((prev) => ({ ...prev, touched: true, error: validateEmail(prev.value) }));
    setMessage((prev) => ({ ...prev, touched: true, error: validateMessage(prev.value) }));

    if (!isFormValid) return;

    const formData = new FormData();
    formData.append('name', name.value.trim());
    formData.append('email', email.value.trim());
    formData.append('message', message.value.trim());

    startTransition(async () => {
      try {
        const result = await submitContactMessage(null, formData);
        if (result?.success) {
          setSubmitted(true);
          setName({ value: '', touched: false, error: '' });
          setEmail({ value: '', touched: false, error: '' });
          setMessage({ value: '', touched: false, error: '' });
        } else {
          setSubmitError(true);
        }
      } catch {
        setSubmitError(true);
      }
    });
  };

  if (submitted) {
    return (
      <div className="relative p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl border border-green-500/20 bg-obsidian-800/40 backdrop-blur-xl flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-3">✓ Message envoyé !</h3>
        <p className="text-gray-400 text-sm md:text-base max-w-sm mb-8">
          Votre message a bien été envoyé. Je vous répondrai dans les plus brefs délais.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-3 border border-gold-400/30 rounded-xl text-gold-400 text-sm uppercase tracking-wider hover:bg-gold-400/10 transition-all duration-300"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* WhatsApp direct contact CTA */}
      {(() => {
        const waNumber = (whatsappNumber ?? '212600891594').replace(/[^0-9]/g, '');
        const waUrl = `https://wa.me/${waNumber}`;
        return (
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center gap-3 w-full py-4 md:py-5 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/[0.06] hover:bg-[#25D366]/[0.12] hover:border-[#25D366]/60 transition-all duration-500 transform hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,211,102,0.15)]"
      >
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="text-[#25D366] font-heading font-semibold uppercase tracking-[0.15em] text-xs md:text-sm group-hover:text-white transition-colors duration-500">
          {dict.whatsappCta}
        </span>
      </a>
        );
      })()}

      {/* OR divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-[1px] bg-white/[0.06]" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600">{dict.whatsappOr}</span>
        <div className="flex-1 h-[1px] bg-white/[0.06]" />
      </div>

    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="relative p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl border border-white/[0.06] bg-obsidian-800/40 backdrop-blur-xl space-y-6 md:space-y-8"
    >
      <div className="mb-2 md:mb-4">
        <h2 className="text-lg md:text-xl font-heading font-bold uppercase tracking-wide text-white mb-1.5 md:mb-2">
          {dict.formTitle}
        </h2>
        <p className="text-xs text-gray-500 font-light">{dict.formSubtitle}</p>
      </div>

      {/* Submit error message */}
      {submitError && (
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-center">
          <p className="text-red-400 text-sm">
            Une erreur est survenue. Veuillez réessayer ou me contacter directement.
          </p>
        </div>
      )}

      {/* Name */}
      <div className="relative group">
        <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-1.5 md:mb-2 block font-medium">
          {dict.yourName} <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder={dict.namePlaceholder}
            autoComplete="name"
            value={name.value}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            className={getFieldClasses(name)}
          />
          {name.touched && !name.error && (
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        {name.touched && name.error && (
          <p className="text-red-400 text-sm mt-1">{name.error}</p>
        )}
        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-400/50 group-focus-within:w-full transition-all duration-700" aria-hidden="true" />
      </div>

      {/* Email */}
      <div className="relative group">
        <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-1.5 md:mb-2 block font-medium">
          {dict.yourEmail} <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder={dict.emailPlaceholder}
            autoComplete="email"
            value={email.value}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={getFieldClasses(email)}
          />
          {email.touched && !email.error && (
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        {email.touched && email.error && (
          <p className="text-red-400 text-sm mt-1">{email.error}</p>
        )}
        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-400/50 group-focus-within:w-full transition-all duration-700" aria-hidden="true" />
      </div>

      {/* Message */}
      <div className="relative group">
        <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-1.5 md:mb-2 block font-medium">
          {dict.yourMessage} <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <textarea
            name="message"
            placeholder={dict.messagePlaceholder}
            rows={5}
            value={message.value}
            onChange={(e) => handleChange('message', e.target.value)}
            onBlur={() => handleBlur('message')}
            className={`${getFieldClasses(message)} resize-none`}
          />
          {message.touched && !message.error && (
            <svg className="absolute right-4 top-4 w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        {message.touched && message.error && (
          <p className="text-red-400 text-sm mt-1">{message.error}</p>
        )}
        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-400/50 group-focus-within:w-full transition-all duration-700" aria-hidden="true" />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-gradient-to-r from-gold-400 to-gold-500 text-black font-heading tracking-[0.15em] md:tracking-[0.2em] font-bold uppercase py-4 md:py-5 rounded-xl hover:from-white hover:to-white transition-all duration-500 transform hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(212,175,55,0.2)] magnetic-btn text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isPending ? 'Envoi en cours...' : dict.send}
      </button>

      <p className="text-[9px] text-gray-700 text-center uppercase tracking-wider">
        {dict.privacy}
      </p>
    </form>
    </div>
  );
}
