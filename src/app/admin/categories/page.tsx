import { getCategoriesList } from '@/lib/data';
import { createCategory, deleteCategory } from '@/app/admin/actions';
import type { Category } from '@/lib/types';
import { Layers, Trash2, Plus } from 'lucide-react';
import { AdminFormWrapper, ActionButton } from '../components/AdminFormWrapper';

export default async function AdminCategories() {
    const categories: Category[] = await getCategoriesList();
    const rootCategories = categories.filter(c => !c.parent_id);

    return (
        <div className="space-y-8 max-w-5xl">
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 flex items-center justify-center">
                        <Layers className="w-4 h-4 text-purple-400" />
                    </div>
                    <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
                        Categories
                    </h1>
                </div>
                <p className="text-xs text-gray-500 tracking-wide ml-11">
                    {categories.length} categories total
                </p>
            </div>

            {/* Create Category Form */}
            <div className="admin-card p-6">
                <div className="flex items-center gap-3 mb-5">
                    <Plus className="w-4 h-4 text-gold-400" />
                    <h3 className="text-xs text-gold-400 uppercase tracking-[0.15em] font-bold">Add New Category</h3>
                </div>
                <AdminFormWrapper action={createCategory} submitLabel="Add" className="flex flex-col md:flex-row gap-4 flex-wrap">
                    <div className="flex-1">
                        <input
                            type="text"
                            name="name"
                            placeholder="Category Name"
                            required
                            className="admin-input"
                        />
                    </div>
                    <div className="w-full md:w-64">
                        <select
                            name="parent_id"
                            className="admin-input appearance-none cursor-pointer"
                        >
                            <option value="" className="bg-[#0a0a0a]">No Parent (Root)</option>
                            {rootCategories.map(cat => (
                                <option key={cat.id} value={cat.id} className="bg-[#0a0a0a]">{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </AdminFormWrapper>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat: Category) => (
                    <div
                        key={cat.id}
                        className={`group p-5 rounded-2xl border transition-all duration-300 hover:border-gold-400/15 ${cat.parent_id
                                ? 'border-white/[0.03] bg-white/[0.01] ml-4'
                                : 'border-white/[0.05] bg-white/[0.02]'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${cat.parent_id ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-gold-400/10 border border-gold-400/20'}`}>
                                    <Layers className={`w-4 h-4 ${cat.parent_id ? 'text-purple-400' : 'text-gold-400'}`} />
                                </div>
                                <div>
                                    <span className="text-sm text-white tracking-wide block font-medium">{cat.name}</span>
                                    {cat.parent_id && (
                                        <span className="text-[8px] text-purple-400 uppercase tracking-[0.2em] font-bold">Subcategory</span>
                                    )}
                                    {cat.slug && (
                                        <span className="text-[8px] text-gray-700 block font-mono">/{cat.slug}</span>
                                    )}
                                </div>
                            </div>

                            <ActionButton
                                action={deleteCategory}
                                hiddenFields={{ id: cat.id }}
                                className="p-2 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-gray-700 hover:text-red-400 transition-all duration-300 border border-transparent hover:border-red-500/20"
                            >
                                <Trash2 className="w-4 h-4" />
                            </ActionButton>
                        </div>
                    </div>
                ))}
                {categories.length === 0 && (
                    <div className="col-span-full admin-card p-16 text-center">
                        <Layers className="w-8 h-8 text-gray-800 mx-auto mb-3" />
                        <p className="text-gray-600 text-xs uppercase tracking-widest">No categories yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
