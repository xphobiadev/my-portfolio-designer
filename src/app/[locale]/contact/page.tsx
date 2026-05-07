import { getSettings } from '@/lib/data';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';
import { ContactForm } from '@/components/ContactForm';

export const dynamic = 'force-dynamic';

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);
    const settings = await getSettings();

    const whatsappNumber = (settings?.contact_whatsapp ?? '+212600891594').replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;

    return (
        <div className="pt-24 md:pt-32 pb-0 relative min-h-screen">
            {/* Background glows */}
            <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-gradient-to-l from-gold-400/[0.02] to-transparent blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-1/3 h-[400px] bg-gradient-to-r from-gold-400/[0.01] to-transparent blur-3xl pointer-events-none" aria-hidden="true" />

            <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start">

                    {/* ── Left: Contact Info ── */}
                    <div className="lg:sticky lg:top-32">
                        <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6">
                            <span className="w-6 md:w-8 h-[1px] bg-gold-400/60" aria-hidden="true" />
                            <span className="text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-gold-400 uppercase font-medium">
                                {dict.contact.eyebrow}
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold uppercase leading-[0.85] tracking-tight mb-6 md:mb-8 text-white">
                            {dict.contact.title}
                            <br />
                            <span className="gradient-text">{dict.contact.titleHighlight}</span>
                        </h1>

                        <p className="text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed font-light mb-10 md:mb-16 max-w-md">
                            {dict.contact.subtitle}
                        </p>

                        {/* Contact cards */}
                        <div className="space-y-3 md:space-y-6">
                            <a
                                href={`mailto:${settings?.contact_email || 'hello@mohamedbouliani.com'}`}
                                className="group flex items-center gap-4 md:gap-5 p-3.5 md:p-4 rounded-xl border border-white/[0.04] hover:border-gold-400/20 hover:bg-white/[0.02] transition-all duration-500"
                            >
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center group-hover:bg-gold-400/20 transition-colors duration-500 flex-shrink-0">
                                    <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-gold-400" aria-hidden="true" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-600 mb-0.5 md:mb-1">{dict.contact.email}</p>
                                    <p className="text-xs md:text-sm text-gray-300 group-hover:text-gold-400 transition-colors duration-500 truncate">
                                        {settings?.contact_email || 'hello@mohamedbouliani.com'}
                                    </p>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-gray-600 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex-shrink-0" aria-hidden="true" />
                            </a>

                            <a
                                href={`tel:${settings?.contact_phone || '+212612345678'}`}
                                className="group flex items-center gap-4 md:gap-5 p-3.5 md:p-4 rounded-xl border border-white/[0.04] hover:border-gold-400/20 hover:bg-white/[0.02] transition-all duration-500"
                            >
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center group-hover:bg-gold-400/20 transition-colors duration-500 flex-shrink-0">
                                    <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-gold-400" aria-hidden="true" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-600 mb-0.5 md:mb-1">{dict.contact.phone}</p>
                                    <p className="text-xs md:text-sm text-gray-300 group-hover:text-gold-400 transition-colors duration-500">
                                        <span dir="ltr">{settings?.contact_phone || '+212 6 12 34 56 78'}</span>
                                    </p>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-gray-600 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex-shrink-0" aria-hidden="true" />
                            </a>

                            <div className="flex items-center gap-4 md:gap-5 p-3.5 md:p-4 rounded-xl border border-white/[0.04]">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-gold-400" aria-hidden="true" />
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-600 mb-0.5 md:mb-1">{dict.contact.location}</p>
                                    <p className="text-xs md:text-sm text-gray-300">{settings?.contact_location ?? dict.contact.locationValue}</p>
                                </div>
                            </div>

                            {/* WhatsApp direct contact */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 md:gap-5 p-3.5 md:p-4 rounded-xl border border-[#25D366]/20 hover:border-[#25D366]/50 hover:bg-[#25D366]/[0.04] transition-all duration-500"
                            >
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors duration-500 flex-shrink-0">
                                    <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-600 mb-0.5 md:mb-1">{dict.contact.whatsapp}</p>
                                    <p className="text-xs md:text-sm text-gray-300 group-hover:text-[#25D366] transition-colors duration-500">
                                        <span dir="ltr">{settings?.contact_whatsapp ?? dict.contact.whatsappValue}</span>
                                    </p>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-gray-600 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex-shrink-0" aria-hidden="true" />
                            </a>
                        </div>

                        {/* Social links */}
                        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/[0.04]">
                            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-600 mb-4 md:mb-5">{dict.contact.followMe}</p>
                            <div className="flex flex-wrap gap-2 md:gap-3">
                                {[
                                    { name: 'Instagram', url: settings?.contact_instagram || 'https://instagram.com' },
                                    { name: 'Behance', url: settings?.contact_behance || 'https://behance.net' },
                                    { name: 'LinkedIn', url: settings?.contact_linkedin || 'https://linkedin.com' },
                                ].map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 md:px-4 py-2 border border-white/[0.06] rounded-full text-[10px] uppercase tracking-[0.15em] text-gray-500 hover:text-gold-400 hover:border-gold-400/20 active:text-gold-400 transition-all duration-500"
                                    >
                                        <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                                        {social.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Right: Contact Form ── */}
                    <div className="relative">
                        <div className="absolute -inset-4 md:-inset-8 bg-gold-400/[0.02] rounded-[3rem] blur-3xl pointer-events-none" aria-hidden="true" />
                        <ContactForm dict={dict.contact} whatsappNumber={settings?.contact_whatsapp ?? '+212600891594'} />
                    </div>
                </div>
            </div>
        </div>
    );
}
