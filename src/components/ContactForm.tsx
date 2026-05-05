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
  };
}

interface FieldState {
  value: string;
  touched: boolean;
  error: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

function validateName(value: string): string {
  if (!value.trim()) return 'Name is required';
  if (value.trim().length < 2) return 'Name must be at least 2 characters';
  return '';
}

function validateEmail(value: string): string {
  if (!value.trim()) return 'Email is required';
  if (!EMAIL_REGEX.test(value.trim())) return 'Please enter a valid email address';
  return '';
}

function validateMessage(value: string): string {
  if (!value.trim()) return 'Message is required';
  if (value.trim().length < 10) return `Message must be at least 10 characters (${value.trim().length}/10)`;
  return '';
}

export function ContactForm({ dict }: ContactFormProps) {
  const [name, setName] = useState<FieldState>({ value: '', touched: false, error: '' });
  const [email, setEmail] = useState<FieldState>({ value: '', touched: false, error: '' });
  const [message, setMessage] = useState<FieldState>({ value: '', touched: false, error: '' });
  const [submitted, setSubmitted] = useState(false);
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
      'w-full bg-white/[0.03] border rounded-xl px-4 md:px-5 py-3.5 md:py-4 text-white text-sm focus:outline-none focus:bg-white/[0.05] transition-all duration-500 placeholder:text-gray-700';
    if (!field.touched) return `${base} border-white/[0.06] focus:border-gold-400/40`;
    if (field.error) return `${base} border-red-500 focus:border-red-400`;
    return `${base} border-green-500 focus:border-green-400`;
  };

  const isFormValid =
    !validateName(name.value) && !validateEmail(email.value) && !validateMessage(message.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      await submitContactMessage(formData);
      setSubmitted(true);
      setName({ value: '', touched: false, error: '' });
      setEmail({ value: '', touched: false, error: '' });
      setMessage({ value: '', touched: false, error: '' });
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
        <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-3">Message Sent!</h3>
        <p className="text-gray-400 text-sm md:text-base max-w-sm mb-8">
          Thank you for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-3 border border-gold-400/30 rounded-xl text-gold-400 text-sm uppercase tracking-wider hover:bg-gold-400/10 transition-all duration-300"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
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
        {isPending ? 'Sending...' : dict.send}
      </button>

      <p className="text-[9px] text-gray-700 text-center uppercase tracking-wider">
        {dict.privacy}
      </p>
    </form>
  );
}
