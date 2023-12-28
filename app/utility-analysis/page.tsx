import UserInputComponent from "../../components/userInputComponent";
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';


const UtilityAnalysis = async () => {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore);
  const { data: crowdfundingProvider } = await supabase.from("crowdfundingProvider").select();

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="mb-5">
          <h2 className="text-2xl font-semibold leading-tight mb-2">
            Nutzwertanalyse
          </h2>
          <p>
            Bitte wählen Sie Kriterien, die für die Nutzwertanalyse verwendet
            werden sollen aus. <br />
            Die Kriterien müssen einzeln Gewichtet werden. Dabei ist zu
            beachtenm, dass die Summe am Ende 100% ergeben muss
          </p>
        </div>
        <UserInputComponent crowdfundingProviderData={crowdfundingProvider} />
      </div>
    </div>
  );
};

export default UtilityAnalysis;



