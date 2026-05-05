import { getSettings } from '@/lib/data';
import { updateSettings } from '../actions';
import { Mail, Phone, Globe, Link2 } from 'lucide-react';

export default async function AdminContact() {
    const settings = await getSettings();

    return (
        <div className="space-y-8 max-w-4xl">
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400/20 to-gold-400/5 border border-gold-400/20 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-gold-400" />
                    </div>
                    <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
                        Contact Info
                    </h1>
                </div>
                <p className="text-xs text-gray-500 tracking-wide ml-11">
                    Manage contact details displayed on the website
                </p>
            </div>

            <form action={updateSettings} className="space-y-6">
                <input type="hidden" name="type" value="contact" />

                {/* Email & Phone */}
                <div className="admin-card p-6 space-y-5">
                    <div className="flex items-center gap-3 mb-4">
                        <Mail className="w-4 h-4 text-gold-400" />
                        <h3 className="text-xs text-gold-400 uppercase tracking-[0.15em] font-bold">Primary Contact</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2 font-medium">
                                <Mail className="w-3 h-3" /> Email Address
                            </label>
                            <input
                                type="email"
                                name="contact_email"
                                defaultValue={settings?.contact_email || ''}
                                placeholder="hello@example.com"
                                required
                                className="admin-input"
                            />
                        </div>
                        <div>
                            <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2 font-medium">
                                <Phone className="w-3 h-3" /> Phone Number
                            </label>
                            <input
                                type="text"
                                name="contact_phone"
                                defaultValue={settings?.contact_phone || ''}
                                placeholder="+212 6 12 34 56 78"
                                className="admin-input"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="admin-card p-6 space-y-5">
                    <div className="flex items-center gap-3 mb-4">
                        <Globe className="w-4 h-4 text-gold-400" />
                        <h3 className="text-xs text-gold-400 uppercase tracking-[0.15em] font-bold">Social Media</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2 font-medium">
                                <Globe className="w-3 h-3" /> Instagram
                            </label>
                            <input
                                type="url"
                                name="contact_instagram"
                                defaultValue={settings?.contact_instagram || ''}
                                placeholder="https://instagram.com/username"
                                className="admin-input"
                            />
                        </div>
                        <div>
                            <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2 font-medium">
                                <Globe className="w-3 h-3" /> Behance
                            </label>
                            <input
                                type="url"
                                name="contact_behance"
                                defaultValue={settings?.contact_behance || ''}
                                placeholder="https://behance.net/username"
                                className="admin-input"
                            />
                        </div>
                        <div>
                            <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2 font-medium">
                                <Link2 className="w-3 h-3" /> LinkedIn
                            </label>
                            <input
                                type="url"
                                name="contact_linkedin"
                                defaultValue={settings?.contact_linkedin || ''}
                                placeholder="https://linkedin.com/in/username"
                                className="admin-input"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button type="submit" className="admin-btn">
                        Save Contact Info
                    </button>
                </div>
            </form>
        </div>
    );
}
