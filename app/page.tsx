import UtilityAnalysisInteraction from '../components/UtilityAnalysisInteraction';
import { createClient } from '@/utils/supabase/server';

const UtilityAnalysis = async () => {
  const supabase = await createClient();
  const { data: GymiProviders, error: errorProviders } = await supabase.from("GymiProviders").select();
  const { data: CourseDetails, error: errorCourseDetails } = await supabase.from("CourseDetails").select();

  if (errorProviders) {
    console.error("Error fetching Gymi providers data:", errorProviders);
  }
  if (errorCourseDetails) {
    console.error("Error fetching Course details data:", errorCourseDetails);
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <UtilityAnalysisInteraction GymiProviders={GymiProviders || []} CourseDetails={CourseDetails || []} />
      </div>
    </div>
  );
};

export default UtilityAnalysis;
