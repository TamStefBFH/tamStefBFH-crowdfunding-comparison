import UtilityAnalysisInteraction from '../components/UtilityAnalysisInteraction';
import { createClient } from '@/utils/supabase/server';

interface GymiProviders {
  ID: number;
  Name: string;
  "Preis Langzeit Kurs"?: number;
  "Preis Intensiver Kurs"?: number;
  "E-Learning"?: boolean;
  Aufsatzkorrektur?: boolean;
  Einzelkurse?: boolean;
}

const UtilityAnalysis = async () => {
  const supabase = await createClient();

  // GymiProviders-Daten abrufen mit korrekt formatierten Spaltennamen
  const { data: GymiProviders, error: errorProviders } = await supabase
    .from("GymiProviders")
    .select(`ID, Name, "Preis Langzeit Kurs", "Preis Intensiver Kurs", "E-Learning", Aufsatzkorrektur, Einzelkurse`) as { data: GymiProviders[]; error: any };

  if (errorProviders) {
    console.error("Error fetching Gymi providers data:", errorProviders);
  }

  // CourseDetails-Daten abrufen mit korrekt formatierten Spaltennamen
  const { data: CourseDetails, error: errorCourseDetails } = await supabase
    .from("CourseDetails")
    .select(`ID, "Preis pro Woche Langzeitkurs", "Dauer der Kurse in Wochen Langzeitkurs", "Eigene Lernunterlagen", "Kursart (Intensiv- oder Langzeitkurs)", Unterrichttag, Standort, Pruefungsarchiv, Beratungsgespraech, Qualitaetsbewertung, Nachholmoeglichkeiten`);

  if (errorCourseDetails) {
    console.error("Error fetching Course details data:", errorCourseDetails);
  }

  // Daten-Transformation für GymiProviders
  const transformedGymiProviders = GymiProviders?.map((provider: GymiProviders) => ({
    id: provider.ID,
    name: provider.Name || 'Name nicht verfügbar',
    pricePerformance: provider["Preis Langzeit Kurs"] || provider["Preis Intensiver Kurs"] || 'Nicht verfügbar',
    additionalServices: provider["E-Learning"] || provider.Aufsatzkorrektur || provider.Einzelkurse ? 'Ja' : 'Nein',
  })) || [];

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <UtilityAnalysisInteraction GymiProviders={transformedGymiProviders} CourseDetails={CourseDetails || []} />
      </div>
    </div>
  );
};

export default UtilityAnalysis;
