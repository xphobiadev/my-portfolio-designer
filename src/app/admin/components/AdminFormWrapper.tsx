"use client"

import { useActionState, useEffect, useState } from 'react'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import type { ActionResult } from '../actions'

type ServerAction = (prevState: ActionResult | null, formData: FormData) => Promise<ActionResult>

interface AdminFormWrapperProps {
    action: ServerAction
    children: React.ReactNode
    submitLabel?: string
    className?: string
}

export function AdminFormWrapper({ action, children, submitLabel = 'Save', className = '' }: AdminFormWrapperProps) {
    const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(action, null)
    const [showStatus, setShowStatus] = useState(false)

    useEffect(() => {
        if (state) {
            setShowStatus(true)
            const timer = setTimeout(() => setShowStatus(false), 4000)
            return () => clearTimeout(timer)
        }
    }, [state])

    return (
        <form action={formAction} className={className}>
            {children}

            {/* Status Toast */}
            {showStatus && state && (
                <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs uppercase tracking-widest mt-4 ${state.success
                    ? 'text-green-400 bg-green-500/10 border border-green-500/20'
                    : 'text-red-400 bg-red-500/10 border border-red-500/20'
                    }`}>
                    {state.success ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                    <span>{state.success ? 'Saved successfully!' : state.error || 'An error occurred'}</span>
                </div>
            )}

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={isPending}
                    className="flex items-center gap-2 bg-gold-400 text-black px-6 py-3 rounded-lg text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                >
                    {isPending && <Loader2 className="w-3 h-3 animate-spin" />}
                    {isPending ? 'Saving...' : submitLabel}
                </button>
            </div>
        </form>
    )
}

interface ActionButtonProps {
    action: ServerAction
    children: React.ReactNode
    className?: string
    hiddenFields?: Record<string, string>
    confirmMessage?: string
}

export function ActionButton({ action, children, className = '', hiddenFields = {}, confirmMessage }: ActionButtonProps) {
    const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(action, null)
    const [showError, setShowError] = useState(false)

    useEffect(() => {
        if (state && !state.success) {
            setShowError(true)
            const timer = setTimeout(() => setShowError(false), 4000)
            return () => clearTimeout(timer)
        }
    }, [state])

    return (
        <form action={formAction} className="inline-flex flex-col items-center">
            {Object.entries(hiddenFields).map(([name, value]) => (
                <input key={name} type="hidden" name={name} value={value} />
            ))}
            <button
                type="submit"
                disabled={isPending}
                className={`${className} ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={(e) => {
                    if (confirmMessage && !window.confirm(confirmMessage)) {
                        e.preventDefault()
                    }
                }}
            >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
            </button>
            {showError && state && !state.success && (
                <span className="text-[8px] text-red-400 mt-1 whitespace-nowrap">{state.error}</span>
            )}
        </form>
    )
}
