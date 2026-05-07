import { getSettings } from '@/lib/data';
import { updateSettings } from '../actions';
import { Settings, FileText, Type } from 'lucide-react';
import { AdminFormWrapper } from '../components/AdminFormWrapper';

export default async function AdminSettings() {
    const settings = await getSettings();

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold uppercase text-white tracking-wide">
                    General Settings
                </h1>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                    Global site configuration
                </p>
            </div>

            {/* Footer Settings */}
            <AdminFormWrapper action={updateSettings} submitLabel="Save Footer" className="rounded-xl border border-white/5 bg-white/[0.02] p-6 space-y-5">
                <input type="hidden" name="type" value="footer" />
                <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gold-400" />
                    <h3 className="text-[10px] text-gold-400 uppercase tracking-[0.2em] font-bold">Footer Settings</h3>
                </div>

                <div>
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block">Footer Copyright Text</label>
                    <input
                        name="footer_text"
                        defaultValue={settings?.footer_text || ''}
                        placeholder="© Mohamed Bouliani. Tous droits réservés."
                        className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50 transition-colors placeholder:text-gray-600"
                    />
                </div>
            </AdminFormWrapper>

            {/* Branding & Marquee Settings */}
            <AdminFormWrapper action={updateSettings} submitLabel="Save Branding" className="rounded-xl border border-white/5 bg-white/[0.02] p-6 space-y-5">
                <input type="hidden" name="type" value="branding" />
                <div className="flex items-center gap-3">
                    <Type className="w-4 h-4 text-gold-400" />
                    <h3 className="text-[10px] text-gold-400 uppercase tracking-[0.2em] font-bold">Branding &amp; Marquee</h3>
                </div>

                <div>
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block">Logo Text (initials shown in header/footer)</label>
                    <input
                        name="logo_text"
                        maxLength={5}
                        defaultValue={settings?.logo_text ?? 'MB'}
                        placeholder="MB"
                        className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50 transition-colors placeholder:text-gray-600"
                    />
                </div>

                <div>
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block">Marquee Words (comma-separated)</label>
                    <textarea
                        name="marquee_words"
                        rows={2}
                        defaultValue={settings?.marquee_words ?? ''}
                        placeholder="DESIGN,PHOTOGRAPHY,VIDEO,AUDIO,FULL-STACK,CYBERSECURITY,MOTION,EVENTS"
                        className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-lg text-white text-sm focus:outline-none focus:border-gold-400/50 transition-colors placeholder:text-gray-600 resize-none"
                    />
                    <p className="text-[9px] text-gray-600 mt-1">Comma-separated list, e.g.: DESIGN,PHOTOGRAPHY,VIDEO</p>
                </div>
            </AdminFormWrapper>

            {/* Current Configuration Overview */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 space-y-5">
                <div className="flex items-center gap-3">
                    <Settings className="w-4 h-4 text-gold-400" />
                    <h3 className="text-[10px] text-gold-400 uppercase tracking-[0.2em] font-bold">Current Configuration</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { label: 'Site Title', value: settings?.site_title },
                        { label: 'Site Description', value: settings?.site_description },
                        { label: 'Hero Title', value: settings?.hero_title },
                        { label: 'Hero Subtitle', value: settings?.hero_subtitle },
                        { label: 'About Bio', value: settings?.about_bio ? `${settings.about_bio.substring(0, 50)}...` : null },
                        { label: 'About Image', value: settings?.about_image ? '✓ Uploaded' : null },
                        { label: 'Contact Email', value: settings?.contact_email },
                        { label: 'Contact Phone', value: settings?.contact_phone },
                        { label: 'Instagram', value: settings?.contact_instagram },
                        { label: 'Behance', value: settings?.contact_behance },
                        { label: 'LinkedIn', value: settings?.contact_linkedin },
                        { label: 'Footer Text', value: settings?.footer_text },
                        { label: 'Logo Text', value: settings?.logo_text },
                        { label: 'Marquee Words', value: settings?.marquee_words ? `${settings.marquee_words.substring(0, 40)}...` : null },
                        { label: 'Stat: Years', value: settings?.stat_years },
                        { label: 'Stat: Projects', value: settings?.stat_projects },
                        { label: 'Stat: Awards', value: settings?.stat_awards },
                        { label: 'Stat: Clients', value: settings?.stat_clients },
                    ].map(item => (
                        <div key={item.label} className="p-3 rounded-lg bg-black/20 border border-white/5">
                            <p className="text-[9px] text-gray-600 uppercase tracking-widest mb-1">{item.label}</p>
                            <p className={`text-xs truncate ${item.value ? 'text-gray-300' : 'text-gray-700'}`}>
                                {item.value || 'Not set'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
