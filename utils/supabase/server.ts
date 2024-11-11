import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createClient = () => {
  const cookieStore = cookies(); // Direktes synchrones Objekt

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookie = await cookieStore.then(store => store.get(name));
          return cookie?.value;
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            await cookieStore.then(store => store.set({ name, value, ...options }));
          } catch (error) {
            // Fehler ignorieren, wenn von einer Server-Komponente gesetzt wird
          }
        },
        async remove(name: string, options: CookieOptions) {
          try {
            await cookieStore.then(store => store.set({ name, value: '', ...options }));
          } catch (error) {
            // Fehler ignorieren, wenn von einer Server-Komponente entfernt wird
          }
        },
      },
    }
  );
};
