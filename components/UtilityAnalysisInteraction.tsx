'use client';
import { useState } from 'react';
import { calculateUtilityAnalysis } from '../utils/utilityAnalysis/calculation';
import { checkForm } from '../utils/utilityAnalysis/checkForm';
import { sortList } from '../utils/utilityAnalysis/sortList';
import GymiProviderOverview from './GymiProviderOverview';

const UtilityAnalysisInteraction = ({ GymiProviders, CourseDetails }: { GymiProviders: any, CourseDetails: any }) => {
  const [ratedGymiProviders, setRatedGymiProviders] = useState<any[]>([]);
  const [params, setParams] = useState([
    { id: 1, weight: '', criteria: '' },
    { id: 2, weight: '', criteria: '' },
    { id: 3, weight: '', criteria: '' },
    { id: 4, weight: '', criteria: '' },
    { id: 5, weight: '', criteria: '' },
  ]);

  const handleTitleChange = (index: any, newWeight: any) => {
    const updatedParams = [...params];
    updatedParams[index].weight = newWeight;
    setParams(updatedParams);
  };

  const handleContentChange = (index: any, newCriteria: any) => {
    const updatedParams = [...params];
    updatedParams[index].criteria = newCriteria;
    setParams(updatedParams);
  };

  const saveChanges = () => {
    const correctForm = checkForm(params);
    if (correctForm === true) {
      if (GymiProviders && GymiProviders.length > 0) {
        // Map GymiProviders and CourseDetails data using the matching ID
        const mappedProviders = GymiProviders.map((provider: any) => {
          // Find the corresponding CourseDetail entry based on ID
          const courseDetail = CourseDetails.find((detail: any) => detail.ID === provider.ID) || {};

          return {
            pricePerformance: provider["Preis Langzeit Kurs"] || provider["Preis Intensiver Kurs"],
            quality: courseDetail.Qualitaetsbewertung || 'Nicht verfügbar',
            flexibility: courseDetail["Kursart (Intensiv- oder Langzeitkurs)"] || 'Nicht verfügbar',
            additionalServices: provider["E-Learning"] || provider.Aufsatzkorrektur || provider.Einzelkurse ? 'Ja' : 'Nein',
            location: courseDetail.Standort || 'Standort nicht verfügbar',
          };
        });

        // Calculates the utility analysis and sorts the list
        const ratedGymiProvidersList = sortList(calculateUtilityAnalysis(params, mappedProviders));
        setRatedGymiProviders(ratedGymiProvidersList);
      } else {
        console.error("No data available for Gymi providers");
        alert("Keine Daten für Gymi-Anbieter verfügbar.");
      }
    } else {
      // Alerts the user with the specific error message
      alert(correctForm);
    }
  };

  const deleteList = () => {
    // Reset the list and the params
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
            beachten, dass die Summe am Ende 100% ergeben muss
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
          <GymiProviderOverview gymiProviders={ratedGymiProviders} score={0}></GymiProviderOverview>
        </>
      )}
    </div>
  );
};

export default UtilityAnalysisInteraction;