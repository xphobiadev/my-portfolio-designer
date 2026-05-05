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
                                        {settings?.contact_phone || '+212 6 12 34 56 78'}
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
                                    <p className="text-xs md:text-sm text-gray-300">{dict.contact.locationValue}</p>
                                </div>
                            </div>
                        </div>

                        {/* Social links */}
                        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/[0.04]">
                            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-600 mb-4 md:mb-5">{dict.contact.followMe}</p>
                            <div className="flex flex-wrap gap-2 md:gap-3">
                                {[
                                    { name: 'Instagram', url: settings?.contact_instagram },
                                    { name: 'Behance', url: settings?.contact_behance },
                                    { name: 'LinkedIn', url: settings?.contact_linkedin },
                                ].filter(s => s.url).map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url!}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 md:px-4 py-2 border border-white/[0.06] rounded-full text-[10px] uppercase tracking-[0.15em] text-gray-500 hover:text-gold-400 hover:border-gold-400/20 active:text-gold-400 transition-all duration-500"
                                    >
                                        {social.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Right: Contact Form ── */}
                    <div className="relative">
                        <div className="absolute -inset-4 md:-inset-8 bg-gold-400/[0.02] rounded-[3rem] blur-3xl pointer-events-none" aria-hidden="true" />
                        <ContactForm dict={dict.contact} />
                    </div>
                </div>
            </div>
        </div>
    );
}
