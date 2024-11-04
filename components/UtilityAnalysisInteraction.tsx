'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client'; // Korrekte Importanpassung
import { calculateUtilityAnalysis } from '../utils/utilityAnalysis/calculation';
import { checkForm } from '../utils/utilityAnalysis/checkForm';
import { sortList } from '../utils/utilityAnalysis/sortList';
import GymiProviderOverview from './GymiProviderOverview';

const UtilityAnalysisInteraction = () => {
  const [gymiProviders, setGymiProviders] = useState<any[]>([]);
  const [courseDetails, setCourseDetails] = useState<any[]>([]);
  const [ratedGymiProviders, setRatedGymiProviders] = useState<any[]>([]);
  const [params, setParams] = useState([
    { id: 1, weight: 30, criteria: 'price' },
    { id: 2, weight: 20, criteria: 'quality' },
    { id: 3, weight: 20, criteria: 'flexibility' },
    { id: 4, weight: 10, criteria: 'extras' },
    { id: 5, weight: 20, criteria: 'location' },
  ]);

  useEffect(() => {
    // Fetch data from Supabase when component mounts
    const fetchData = async () => {
      try {
        // Fetch data from GymiProviders table
        const { data: gymiProvidersData, error: gymiProvidersError } = await supabase.from('GymiProviders').select('*');
        if (gymiProvidersError) {
          console.error('Error fetching GymiProviders data:', gymiProvidersError.message);
        } else {
          setGymiProviders(gymiProvidersData);
        }

        // Fetch data from CourseDetails table
        const { data: courseDetailsData, error: courseDetailsError } = await supabase.from('CourseDetails').select('*');
        if (courseDetailsError) {
          console.error('Error fetching CourseDetails data:', courseDetailsError.message);
        } else {
          setCourseDetails(courseDetailsData);
        }

      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };

    fetchData();
  }, []);

  const handleWeightChange = (index: any, newWeight: any) => {
    const updatedParams = [...params];
    updatedParams[index].weight = newWeight;
    setParams(updatedParams);
  };

  const saveChanges = () => {
    const correctForm = checkForm(params);
    if (correctForm === true) {
      // Combine data from both tables if needed before scoring
      const combinedData = gymiProviders.map((provider) => {
        const courseDetail = courseDetails.find((course) => course.ID === provider.ID);
        return { ...provider, ...courseDetail };
      });

      // Calculates the utility analysis and sorts the list
      const ratedGymiProvidersList = sortList(calculateUtilityAnalysis(params, combinedData));
      setRatedGymiProviders(ratedGymiProvidersList);
    } else {
      // Alerts the user with the specific error message
      alert(correctForm);
    }
  };

  const deleteList = () => {
    // Reset the list and the params
    setRatedGymiProviders([]);
    setParams([
      { id: 1, weight: 30, criteria: 'price' },
      { id: 2, weight: 20, criteria: 'quality' },
      { id: 3, weight: 20, criteria: 'flexibility' },
      { id: 4, weight: 10, criteria: 'extras' },
      { id: 5, weight: 20, criteria: 'location' },
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
            Bitte wählen Sie die Kriterien aus, die für die Nutzwertanalyse verwendet werden sollen. <br />
            Jedes Kriterium muss individuell gewichtet werden. Die Gesamtgewichtung muss 100% ergeben.
          </p>
          <form action="">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Kriterium
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Gewichtung (max 100%)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {params.map((param, index) => (
                      <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            {param.criteria}
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center flex-row">
                            <input
                              className="p-2 bg-white focus:outline-none border border-gray-500 rounded-md block appearance-none leading-normal"
                              type="number"
                              placeholder="Gewichtung"
                              value={param.weight}
                              onChange={(e) => handleWeightChange(index, e.target.value)}
                            />
                            <p className="ml-2">%</p>
                          </div>
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
            Neu berechnen
          </button>
          <GymiProviderOverview gymiProviders={ratedGymiProviders} />
        </>
      )}
    </div>
  );
};

export default UtilityAnalysisInteraction;

