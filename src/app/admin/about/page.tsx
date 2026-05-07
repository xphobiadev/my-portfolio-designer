import { getSettings } from '@/lib/data';
import { updateSettings } from '../actions';
import { User, Upload } from 'lucide-react';
import { AdminFormWrapper } from '../components/AdminFormWrapper';

export default async function AdminAbout() {
    const settings = await getSettings();

    return (
        <div className="space-y-8 max-w-4xl">
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400/20 to-gold-400/5 border border-gold-400/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-gold-400" />
                    </div>
                    <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
                        About Page
                    </h1>
                </div>
                <p className="text-xs text-gray-500 tracking-wide ml-11">
                    Manage your biography and portrait image
                </p>
            </div>

            <AdminFormWrapper action={updateSettings} submitLabel="Save About Settings" className="space-y-6">
                <input type="hidden" name="type" value="about" />

                {/* Biography */}
                <div className="admin-card p-6 space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                        <User className="w-4 h-4 text-gold-400" />
                        <h3 className="text-xs text-gold-400 uppercase tracking-[0.15em] font-bold">Biography</h3>
                    </div>
                    <div>
                        <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2 block font-medium">About Bio Text</label>
                        <textarea
                            name="about_bio"
                            defaultValue={settings?.about_bio || ''}
                            placeholder="Write your biography here... Use line breaks to separate paragraphs."
                            rows={10}
                            required
                            className="admin-input resize-none leading-relaxed"
                        />
                        <p className="text-[8px] text-gray-700 mt-1.5 ml-1">Use line breaks to separate paragraphs. They will be displayed as separate blocks on the about page.</p>
                    </div>
                </div>

                {/* Portrait Image */}
                <div className="admin-card p-6 space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                        <Upload className="w-4 h-4 text-gold-400" />
                        <h3 className="text-xs text-gold-400 uppercase tracking-[0.15em] font-bold">Portrait Image</h3>
                    </div>

                    {settings?.about_image && (
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                            <div className="w-20 h-20 rounded-xl overflow-hidden bg-obsidian-800 border border-white/[0.04]">
                                <img src={settings.about_image} alt="Current portrait" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-medium">Current Image</p>
                                <p className="text-[8px] text-gray-600 mt-1 truncate max-w-xs">{settings.about_image.split('/').pop()}</p>
                            </div>
                        </div>
                    )}

                    <div className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01]">
                        <input
                            type="file"
                            name="about_image"
                            accept="image/*"
                            className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[9px] file:uppercase file:tracking-widest file:bg-white/10 file:text-white hover:file:bg-white/20 transition-colors w-full cursor-pointer"
                        />
                    </div>
                </div>
            </AdminFormWrapper>
        </div>
    );
}
