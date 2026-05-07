import { getContactMessages } from '@/lib/data';
import { markMessageRead, deleteMessage } from '../actions';
import type { ContactMessage } from '@/lib/types';
import { Mail, MailOpen, Trash2, Clock, MessageSquare } from 'lucide-react';
import { ActionButton } from '../components/AdminFormWrapper';

export default async function AdminMessages() {
    const messages = await getContactMessages();

    const unread = messages.filter(m => !m.is_read);
    const read = messages.filter(m => m.is_read);

    return (
        <div className="space-y-8 max-w-5xl">
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400/20 to-gold-400/5 border border-gold-400/20 flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-gold-400" />
                    </div>
                    <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
                        Messages
                    </h1>
                </div>
                <p className="text-xs text-gray-500 tracking-wide ml-11">
                    {unread.length} unread · {messages.length} total messages
                </p>
            </div>

            {/* Unread Messages */}
            {unread.length > 0 && (
                <div className="space-y-3">
                    <h2 className="text-[10px] text-gold-400 uppercase tracking-[0.2em] font-bold flex items-center gap-2 mb-4">
                        <Mail className="w-3 h-3" /> Unread ({unread.length})
                    </h2>
                    {unread.map((msg: ContactMessage) => (
                        <div key={msg.id} className="admin-card p-5 space-y-3 border-gold-400/15 bg-gradient-to-r from-gold-400/[0.03] to-transparent">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                                        <span className="text-sm text-white font-medium">{msg.name}</span>
                                        <span className="text-[9px] text-gray-500 font-mono bg-white/[0.03] px-2 py-0.5 rounded">{msg.email}</span>
                                    </div>
                                    <p className="text-sm text-gray-300 leading-relaxed">{msg.message}</p>
                                    <div className="flex items-center gap-2 mt-3 text-[9px] text-gray-600">
                                        <Clock className="w-3 h-3" />
                                        {new Date(msg.created_at).toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                    <ActionButton
                                        action={markMessageRead}
                                        hiddenFields={{ id: msg.id }}
                                        className="p-2.5 rounded-xl border border-white/[0.06] text-gray-500 hover:text-emerald-400 hover:border-emerald-500/20 hover:bg-emerald-500/10 transition-all duration-300"
                                    >
                                        <MailOpen className="w-4 h-4" />
                                    </ActionButton>
                                    <ActionButton
                                        action={deleteMessage}
                                        hiddenFields={{ id: msg.id }}
                                        className="p-2.5 rounded-xl border border-white/[0.06] text-gray-500 hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/10 transition-all duration-300"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </ActionButton>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Read Messages */}
            {read.length > 0 && (
                <div className="space-y-3">
                    <h2 className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold flex items-center gap-2 mb-4">
                        <MailOpen className="w-3 h-3" /> Read ({read.length})
                    </h2>
                    {read.map((msg: ContactMessage) => (
                        <div key={msg.id} className="admin-card p-5 space-y-3 opacity-60 hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                                        <span className="text-sm text-gray-300 font-medium">{msg.name}</span>
                                        <span className="text-[9px] text-gray-600 font-mono bg-white/[0.02] px-2 py-0.5 rounded">{msg.email}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 leading-relaxed">{msg.message}</p>
                                    <div className="flex items-center gap-2 mt-3 text-[9px] text-gray-700">
                                        <Clock className="w-3 h-3" />
                                        {new Date(msg.created_at).toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                                <ActionButton
                                    action={deleteMessage}
                                    hiddenFields={{ id: msg.id }}
                                    className="p-2.5 rounded-xl border border-white/[0.04] text-gray-700 hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/10 transition-all duration-300"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </ActionButton>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {messages.length === 0 && (
                <div className="admin-card p-16 text-center">
                    <Mail className="w-10 h-10 text-gray-800 mx-auto mb-4" />
                    <p className="text-gray-600 text-sm uppercase tracking-widest mb-2">No messages yet</p>
                    <p className="text-[10px] text-gray-700">Messages from the contact form will appear here</p>
                </div>
            )}
        </div>
    );
}
