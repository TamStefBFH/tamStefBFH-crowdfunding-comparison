'use client';
import {useState} from 'react';
import {
  calculateAdditionalServices,
  calculateFlexibility,
  calculateLocation,
  calculatePricePerformance,
  calculateQuality
} from '../utils/utilityAnalysis/calculation'; // Importieren der Berechnungsfunktionen
import {checkForm} from '../utils/utilityAnalysis/checkForm'; // Importieren der Formularvalidierung
import GymiProviderOverview, {RatedGymiProviders} from './GymiProviderOverview';
import {Database} from "@/database.types";

export interface  TransformedGymiProviders {
  id: number;
  name: string;
  pricePerformance: string | number;
  additionalServices: string;
}

type CourseDetailsType = Database['public']['Tables']['CourseDetails']['Row'];

interface UtilityAnalysisInteractionProps {
  GymiProviders: TransformedGymiProviders[];
  CourseDetails: CourseDetailsType[]
}

const UtilityAnalysisInteraction = ({ GymiProviders, CourseDetails }: UtilityAnalysisInteractionProps) => {
  const [ratedGymiProviders, setRatedGymiProviders] = useState<RatedGymiProviders[]>([]); // Zustand für die berechneten Anbieter
  const [params, setParams] = useState([ // Zustand für die Eingabewerte der Kriterien und Gewichtungen
    { id: 1, weight: '', criteria: '' },
    { id: 2, weight: '', criteria: '' },
    { id: 3, weight: '', criteria: '' },
    { id: 4, weight: '', criteria: '' },
    { id: 5, weight: '', criteria: '' },
  ]);

  // Funktion, um die Gewichtung zu ändern
  const handleTitleChange = (index: any, newWeight: any) => {
    const updatedParams = [...params];
    updatedParams[index].weight = newWeight;
    setParams(updatedParams);
  };

  // Funktion, um das Kriterium zu ändern
  const handleContentChange = (index: any, newCriteria: any) => {
    const updatedParams = [...params];
    updatedParams[index].criteria = newCriteria;
    setParams(updatedParams);
  };

  // Funktion, die aufgerufen wird, wenn der Benutzer auf "Ausrechnen" klickt
  const saveChanges = () => {
    const correctForm = checkForm(params); // Überprüfen, ob die Eingaben korrekt sind
    if (correctForm === true) {
      if (GymiProviders && GymiProviders.length > 0) {
        // Mapping der GymiProvider-Daten und der CourseDetails-Daten
        const mappedProviders: RatedGymiProviders[] = GymiProviders.map((provider) => {
          const courseDetail = CourseDetails.find((detail) => detail.ID === provider.id) || {}; // Finden der zugehörigen CourseDetails-Daten

          // Berechnungen für die verschiedenen Kriterien
          const pricePerformance = calculatePricePerformance(provider, params.find(p => p.criteria === 'price-performance')?.weight || 0);
          const quality = calculateQuality(courseDetail, params.find(p => p.criteria === 'quality')?.weight || 0);
          const flexibility = calculateFlexibility(courseDetail, params.find(p => p.criteria === 'flexibility')?.weight || 0);
          const additionalServices = calculateAdditionalServices(provider, courseDetail, params.find(p => p.criteria === 'additional-services')?.weight || 0);
          const location = calculateLocation(courseDetail, params.find(p => p.criteria === 'location')?.weight || 0);

          return {
            id: provider.id,
            provider: provider.name,
            pricePerformance,
            quality,
            flexibility,
            additionalServices,
            location,
            totalScore: pricePerformance + quality + flexibility + additionalServices + location, // Gesamtbewertung berechnen
          };
        });

        // Sortieren der berechneten Anbieter nach ihrem Gesamt-Score
        const ratedGymiProvidersList = mappedProviders.sort((a, b) => {
          return b.totalScore - a.totalScore;
        });
        setRatedGymiProviders(ratedGymiProvidersList); // Speichern der berechneten Anbieter
      } else {
        console.error("No data available for Gymi providers");
        alert("Keine Daten für Gymi-Anbieter verfügbar.");
      }
    } else {
      alert(correctForm); // Fehlermeldung wenn das Formular nicht korrekt angezeigt wird
    }
  };

  // Funktion, um die Liste zurückzusetzen und neu zu berechnen
  const deleteList = () => {
    setRatedGymiProviders([]); // Zurücksetzen der berechneten Anbieter
    setParams([ // Zurücksetzen der Eingabewerte für Kriterien und Gewichtungen
      { id: 1, weight: '', criteria: '' },
      { id: 2, weight: '', criteria: '' },
      { id: 3, weight: '', criteria: '' },
      { id: 4, weight: '', criteria: '' },
      { id: 5, weight: '', criteria: '' },
    ]);
  };

  return (
    <div>
      {ratedGymiProviders.length === 0 ? (
        <div>
          <div className="mb-5">
            <h2 className="text-2xl font-semibold leading-tight mb-2">
              Nutzwertanalyse
            </h2>
          </div>
          <p>
            Bitte wählen Sie Kriterien, die für die Nutzwertanalyse verwendet
            werden sollen aus. <br />
            Die Kriterien müssen einzeln gewichtet werden. Die Endsumme muss 100% ergeben.
          </p>
          <form action="">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Kriterien
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Gewichtung - Total max. 100%
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {params.map((param, index) => (
                      <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <select
                            className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                            value={param.criteria === '' ? '' : param.criteria}
                            onChange={(e) => handleContentChange(index, e.target.value)}
                          >
                            <option value="" disabled hidden>
                              Kriterium auswählen
                            </option>
                            <option value="price-performance">Preis-Leistungs-Verhältnis</option>
                            <option value="quality">Qualität des Unterrichts</option>
                            <option value="flexibility">Flexibilität der Kursgestaltung</option>
                            <option value="additional-services">Zusatzleistungen</option>
                            <option value="location">Standort</option>
                          </select>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <input
                            className="p-16 bg-white focus:outline-none focus:shadow-outline border border-gray-500 rounded-md py-2 px-2 block appearance-none leading-normal"
                            type="number"
                            placeholder="Gewichtung"
                            value={param.weight}
                            onChange={(e) => handleTitleChange(index, e.target.value)}
                          />
                          <p className="ml-2">%</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </form>
          <button
            onClick={saveChanges}
            className="bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Ausrechnen
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={deleteList}
            className="bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Neu ausrechnen
          </button>
          <GymiProviderOverview gymiProviders={ratedGymiProviders} courseDetails={CourseDetails} score={0} />
        </>
      )}
    </div>
  );
};

export default UtilityAnalysisInteraction;
