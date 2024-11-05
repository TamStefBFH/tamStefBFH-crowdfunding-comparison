import UtilityAnalysisInteraction from "../../components/UtilityAnalysisInteraction";
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

const UtilityAnalysis = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: gymiProviders } = await supabase.from("gymiProviders").select();

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <UtilityAnalysisInteraction gymiProvidersData={gymiProviders} />
      </div>
    </div>
  );
};

export default UtilityAnalysis;
