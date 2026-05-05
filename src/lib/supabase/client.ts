import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error('[Supabase Browser] Missing env vars:', {
            hasUrl: !!supabaseUrl,
            hasAnonKey: !!supabaseKey,
        });
        // Return a client that will fail gracefully in browser
        return createBrowserClient(
            'https://placeholder.supabase.co',
            'placeholder-key'
        );
    }

    return createBrowserClient(supabaseUrl, supabaseKey);
}
