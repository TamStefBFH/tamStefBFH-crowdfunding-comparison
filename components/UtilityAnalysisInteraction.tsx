'use client';
import { useState } from 'react';
import { calculateUtilityAnalysis } from '../utils/utilityAnalysis/calculation';
import { checkForm } from '../utils/utilityAnalysis/checkForm';
import { sortList } from '../utils/utilityAnalysis/sortList';
import GymiProviderOverview from './GymiProviderOverview';

const UtilityAnalysisInteraction = ({ GymiProviders, CourseDetails }: { GymiProviders: any[], CourseDetails: any[] }) => {
  const [ratedGymiProviders, setRatedGymiProviders] = useState<any[]>([]);
  const [params, setParams] = useState([
    { id: 1, weight: '', criteria: '' },
    { id: 2, weight: '', criteria: '' },
    { id: 3, weight: '', criteria: '' },
    { id: 4, weight: '', criteria: '' },
    { id: 5, weight: '', criteria: '' },
  ]);

  const handleTitleChange = (index: number, newWeight: string) => {
    const updatedParams = [...params];
    updatedParams[index].weight = newWeight;
    setParams(updatedParams);
  };

  const handleContentChange = (index: number, newCriteria: string) => {
    const updatedParams = [...params];
    updatedParams[index].criteria = newCriteria;
    setParams(updatedParams);
  };

  const saveChanges = () => {
    const correctForm = checkForm(params);
    if (correctForm === true) {
      if (GymiProviders && GymiProviders.length > 0) {
        const mappedProviders = GymiProviders.map((provider: any, index: number) => {
          const courseDetail = CourseDetails[index] || {};

          let pricePerformance = 0;
          if (provider.Preiskategorie === 'A' && provider.Mitarbeiter <= 5) {
            pricePerformance = 3;
          } else if (provider.Preiskategorie === 'B' && provider.Mitarbeiter <= 10) {
            pricePerformance = 2;
          } else if (provider.Preiskategorie === 'C' && provider.Mitarbeiter <= 15) {
            pricePerformance = 1;
          }

          const quality = courseDetail.Qualitaetsbewertung ?? 0;

          let flexibility = 3;
          if (courseDetail.Unterrichttage >= 4 && courseDetail["Kursart (Intensiv- oder Langzeitkurs)"] === "Beide") {
            flexibility = 1;
          } else if (courseDetail.Unterrichttage >= 2 && courseDetail["Kursart (Intensiv- oder Langzeitkurs)"] === "Eine") {
            flexibility = 2;
          }

          let additionalServicesScore = 0;
          if (provider["E-Learning"]) additionalServicesScore += 1;
          if (courseDetail["Eigene Lernunterlagen"]) additionalServicesScore += 1;
          if (courseDetail.Nachholmöglichkeiten) additionalServicesScore += 1;
          if (courseDetail["Unterstützung außerhalb Unterrichtszeit"]) additionalServicesScore += 1;

          return {
            name: provider.Name || 'Name nicht verfügbar',
            pricePerformance,
            quality,
            flexibility,
            additionalServices: additionalServicesScore >= 4 ? 3 : additionalServicesScore >= 2 ? 2 : 1,
            location: courseDetail.Standort || 'Standort nicht verfügbar',
          };
        });

        const ratedGymiProvidersList = sortList(calculateUtilityAnalysis(params, mappedProviders));
        setRatedGymiProviders(ratedGymiProvidersList);
      } else {
        console.error("No data available for Gymi providers");
        alert("Keine Daten für Gymi-Anbieter verfügbar.");
      }
    } else {
      alert(correctForm);
    }
  };

  const deleteList = () => {
    setRatedGymiProviders([]);
    setParams([
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
            Die Kriterien müssen einzeln gewichtet werden. Dabei ist zu
            beachten, dass die Summe am Ende 100% ergeben muss.
          </p>
          <form>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Kriterien
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Gewichtung - total max 100%
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {params.map((param, index) => (
                      <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <select
                            className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                            value={param.criteria || ''}
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
          <GymiProviderOverview gymiProviders={ratedGymiProviders} />
        </>
      )}
    </div>
  );
};

export default UtilityAnalysisInteraction;

