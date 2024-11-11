import UtilityAnalysisInteraction from '../components/UtilityAnalysisInteraction';
import { createClient } from '@/utils/supabase/server';

interface GymiProvider {
  ID: number;
  Name: string;
  "Preis Langzeit Kurs"?: number;
  "Preis Intensiver Kurs"?: number;
  "E-Learning"?: boolean;
  Aufsatzkorrektur?: boolean;
  Einzelkurse?: boolean;
}

interface CourseDetail {
  ID: number;
  "Preis pro Woche Langzeitkurs"?: number;
  "Dauer der Kurse in Wochen Langzeitkurs"?: number;
  "Eigene Lernunterlagen"?: boolean;
  "Kursart (Intensiv- oder Langzeitkurs)"?: string;
  Unterrichttag?: string;
  Standort?: string;
  Pruefungsarchiv?: boolean;
  Beratungsgespraech?: boolean;
  Qualitaetsbewertung?: number;
  Nachholmoeglichkeiten?: boolean;
}

const UtilityAnalysis = async () => {
  const supabase = await createClient();

  // GymiProviders-Daten abrufen
  const { data: GymiProviders, error: errorProviders } = await supabase
    .from("GymiProviders")
    .select(`ID, Name, "Preis Langzeit Kurs", "Preis Intensiver Kurs", "E-Learning", Aufsatzkorrektur, Einzelkurse`);

  if (errorProviders) {
    console.error("Error fetching Gymi providers data:", errorProviders);
  }

  // CourseDetails-Daten abrufen
  const { data: CourseDetails, error: errorCourseDetails } = await supabase
    .from("CourseDetails")
    .select(`ID, "Preis pro Woche Langzeitkurs", "Dauer der Kurse in Wochen Langzeitkurs", "Eigene Lernunterlagen", "Kursart (Intensiv- oder Langzeitkurs)", Unterrichttag, Standort, Pruefungsarchiv, Beratungsgespraech, Qualitaetsbewertung, Nachholmoeglichkeiten`);

  if (errorCourseDetails) {
    console.error("Error fetching Course details data:", errorCourseDetails);
  }

  // Daten-Transformation für GymiProviders
  const transformedGymiProviders = GymiProviders?.map((provider: GymiProvider) => ({
    id: provider.ID,
    name: provider.Name || 'Name nicht verfügbar', // Name wird hier korrekt gesetzt
    pricePerformance: provider["Preis Langzeit Kurs"] ?? provider["Preis Intensiver Kurs"] ?? 'Nicht verfügbar',
    additionalServices: provider["E-Learning"] || provider.Aufsatzkorrektur || provider.Einzelkurse ? 'Ja' : 'Nein',
  })) || [];

  // Daten-Transformation für CourseDetails, falls erforderlich
  const transformedCourseDetails = CourseDetails?.map((detail: CourseDetail) => ({
    id: detail.ID,
    pricePerWeek: detail["Preis pro Woche Langzeitkurs"] ?? 'Nicht verfügbar',
    durationWeeks: detail["Dauer der Kurse in Wochen Langzeitkurs"] ?? 'Nicht verfügbar',
    ownLearningMaterials: detail["Eigene Lernunterlagen"] ? 'Ja' : 'Nein',
    courseType: detail["Kursart (Intensiv- oder Langzeitkurs)"] || 'Nicht verfügbar',
    teachingDay: detail.Unterrichttag || 'Nicht verfügbar',
    location: detail.Standort || 'Standort nicht verfügbar',
    examArchive: detail.Pruefungsarchiv ? 'Ja' : 'Nein',
    consulting: detail.Beratungsgespraech ? 'Ja' : 'Nein',
    qualityRating: detail.Qualitaetsbewertung ?? 'Nicht verfügbar',
    catchUpOptions: detail.Nachholmoeglichkeiten ? 'Ja' : 'Nein',
  })) || [];

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <UtilityAnalysisInteraction GymiProviders={transformedGymiProviders} CourseDetails={transformedCourseDetails} />
      </div>
    </div>
  );
};

export default UtilityAnalysis;
