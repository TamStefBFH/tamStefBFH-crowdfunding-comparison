import GymiProviderOverview from '@/components/GymiProviderOverview';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function Index() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: gymiProviders } = await supabase.from("gymiProviders").select();

    return (
        <>
            <GymiProviderOverview gymiProviders={gymiProviders} />
        </>
    );
}
