import { cookies } from 'next/headers';
import UtilityAnalysisInteraction from '../../components/UtilityAnalysisInteraction';
import { createClient } from '@/utils/supabase/client';

const UtilityAnalysis = async () => {
  // Supabase Client erstellen
  const supabase = createClient();

  // Abfrage der GymiProviders-Tabelle
  const { data: GymiProviders, error: errorProviders } = await supabase.from("GymiProviders").select();
  
  // Abfrage der CourseDetails-Tabelle
  const { data: CourseDetails, error: errorCourseDetails } = await supabase.from("CourseDetails").select();
  
  // Logge die Fehler oder die Daten in der Konsole
  if (errorProviders) {
    console.error("Error fetching Gymi providers data:", errorProviders);
  } else {
    console.log("Fetched GymiProviders data:", GymiProviders);
  }

  if (errorCourseDetails) {
    console.error("Error fetching Course details data:", errorCourseDetails);
  } else {
    console.log("Fetched CourseDetails data:", CourseDetails);
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <UtilityAnalysisInteraction 
          GymiProviders={GymiProviders || []} 
          CourseDetails={CourseDetails || []} 
        />
      </div>
    </div>
  );
};

export default UtilityAnalysis;
