'use client';
import { useState, useEffect, Dispatch, SetStateAction, JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactFragment, ReactPortal } from 'react';
import { checkForm, calculateUtilityAnalysis } from '../app/utility-analysis/calculation';
import Link from 'next/link'

interface Props {
    value: string
    setValue: Dispatch<SetStateAction<string>>
  }

const UtilityAnalysisInteraction = ({ crowdfundingProviderData }: { crowdfundingProviderData: any}) => {

    //console.log('crowdfundingProviderData: ', crowdfundingProviderData);
    const [selectedProvider, setSelectedProvider] = useState<any>();
    const [showModal, setShowModal] = useState(false);
    const [ratedCrowdFundingProvider, setRatedCrowdFundingProvider] = useState<any[]>([]);
    const [params, setParams] = useState([
        { id: 1, weight: '', criteria: '' },
        { id: 2, weight: '', criteria: '' },
        { id: 3, weight: '', criteria: '' },
      ]);

    const toggleModal = (providerId: number) => {
        setShowModal(!showModal);
        // set selected provider for modal
        setSelectedProvider(crowdfundingProviderData[providerId]);
    };

    const handleTitleChange = (index:any, newWeight:any) => {
    const updatedParams = [...params];
    updatedParams[index].weight = newWeight;
    setParams(updatedParams);
    };

    const handleContentChange = (index:any, newCriteria:any) => {
    const updatedParams = [...params];
    updatedParams[index].criteria = newCriteria;
    setParams(updatedParams);
    };  

    const sortRatedCrowdFundingProvider = (list: any[], way: string) => {
        if (way == 'asc') {
            list.sort((a, b) => {
                return a.score - b.score;
            });
        } else if (way == 'desc') {
            list.sort((a, b) => {
                return b.score - a.score;
            });
        }
        return list
    };

    const saveChanges = () => {
        const correctForm = checkForm(params);
        if (correctForm === true) {
            //calculates the utility analysis and sorts the list 
            const ratedCrowdFundingProviderList = sortRatedCrowdFundingProvider(calculateUtilityAnalysis(params, crowdfundingProviderData),'desc');
            setRatedCrowdFundingProvider(ratedCrowdFundingProviderList);
        } else {
            //alerts the user with the specific error message
            alert(correctForm);
        }
      };

      const deleteList = () => {
        setRatedCrowdFundingProvider([]);
      }

  useEffect(() => {
    // Hier könntest du Code hinzufügen, der auf der Client-Seite ausgeführt wird
    console.log('ClientComponent wurde auf der Client-Seite initialisiert.');
  }, []);


  return (
    <div>
      {ratedCrowdFundingProvider.length === 0 ? (
        <div>
          <p>
            Bitte wählen Sie Kriterien, die für die Nutzwertanalyse verwendet
            werden sollen aus. <br />
            Die Kriterien müssen einzeln Gewichtet werden. Dabei ist zu
            beachtenm, dass die Summe am Ende 100% ergeben muss
          </p>
          <form action="">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full"
                            src="https://cdn-icons-png.flaticon.com/512/6404/6404370.png"
                            alt=""
                          />
                        </div>
                        Kriterien
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full"
                            src="   https://cdn-icons-png.flaticon.com/512/847/847345.png"
                            alt=""
                          />
                        </div>
                        Gewichtung - total max 100%
                      </th>
                    </tr>
                  </thead>
                  {/*For loop over the criteria that can be chosen*/}
                  <tbody>
                    {params.map((param, index) => (
                      <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="relative">
                              <select
                                className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                                value={param.criteria === '' ? '' : param.criteria}
                                onChange={(e) => handleContentChange(index, e.target.value)}

                              >
                                <option value="" disabled hidden>
                                  Kriterium auswählen
                                </option>
                                <option value="reach">Reichweite</option>
                                <option value="cost">Kosten</option>
                                <option value="trustworthiness">Vertrauenswürdigkeit</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                  className="fill-current h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center flex-row" >
                            <input
                              className="p-16 bg-white focus:outline-none focus:shadow-outline border border-gray-500 rounded-md py-2 px-2 block appearance-none leading-normal"
                              type="email"
                              placeholder="Gewichtung"
                              value={param.weight}
                              onChange={(e) => handleTitleChange(index, e.target.value)}
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
          >Ausrechnen</button>
        </div>
      ) : (
        <div>
          {/*---------------------------------------- AFTER CALCULATION ---------------------------------------- */}
          <div className="flex min-h-screen flex-col items-start">
            <h1 className="text-3xl flex" >All Crowdfunding Provider</h1>
            <p>
              Auf dieser Seite sehen Sie eine Liste aller Crowdfunding Provider, die nach der Nutzwertanalyse bewertet wurden.
            </p>
            <button
              onClick={deleteList}
              className="bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
            >Neu ausrechnen</button>
            <div className="container my-12 mx-auto ">
              <div className="flex flex-wrap -mx-1 lg:-mx-4">
                {crowdfundingProviderData.map((provider: any, index: number) => (
                  <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" key={index}>
                    <article className="overflow-hidden rounded-lg shadow-lg">
                      {/*For loop over the criteria that can be chosen*/}
                      <a>
                        <img alt="Placeholder" className="block h-auto w-full" src="https://picsum.photos/600/400/?random"></img>
                      </a>

                      <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                        <h1 className="text-lg">
                            {provider.name}
                        </h1>
                        <p className="text-grey-darker text-sm">
                          Score: {provider.score}
                        </p>
                      </header>

                      <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                        <a className="flex items-center no-underline hover:underline text-black">
                          <button
                            className="bg-gray-700 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow "
                            type="button"
                            onClick={() => toggleModal(index)}
                          >
                            More Information
                          </button>
                          <p className="ml-2 text-sm">
                            more info tbd
                          </p>
                        </a>
                      </footer>
                    </article>
                    <>
                      {showModal ? (
                        <>
                          <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                          >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                              {/*content*/}
                              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                  <h3 className="text-3xl font-semibold">
                                    Provider
                                  </h3>
                                  <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                  >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                      ×
                                    </span>
                                  </button>
                                </div>
                                {/*body*/}
                                <div className="relative mx-auto w-full">
                                  <div className="shadow p-4 rounded-lg bg-white">
                                    <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
                                      <div className="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                                        <div className="absolute inset-0 bg-black ">
                                          <img className="block h-full w-full " src="https://picsum.photos/600/400/?random" />
                                        </div>
                                      </div>
                                      <span className="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-yellow-400 text-sm font-medium text-white select-none">
                                        <p className="flex items-start font-medium text-white">
                                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" ><path d="M12 .587l3.668 7.431 8.332 1.21-6.001 5.848 1.416 8.265L12 18.896l-7.415 4.445 1.416-8.265-6.001-5.848 8.332-1.21z" stroke-width="2.2" fill="none" stroke="white" /></svg>
                                          {selectedProvider && selectedProvider.score}
                                        </p>
                                      </span>
                                    </div>

                                    <div className="mt-4 ml-2">
                                      <h2 className="font-medium text-base md:text-lg text-gray-800 line-clamp-1" title="New York">
                                        {selectedProvider && selectedProvider.name}
                                      </h2>
                                      <p className="mt-2 text-sm text-gray-800" title="New York, NY 10004, United States">
                                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                                      </p>
                                    </div>

                                    <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-8 ml-2">
                                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                                      <i className="fi fi-sr-signal-stream mr-2 mb-0 flex"></i>
                                        <span className="mt-2 xl:mt-0">
                                          Reach: {selectedProvider && selectedProvider.reach}
                                        </span>
                                      </p>
                                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                                        <svg className="inline-block w-5 h-5 xl:w-4 xl:h-4 mr-3 fill-current text-gray-800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill='none' stroke="black" stroke-width="2.2"></path>
                                        </svg>
                                        <span className="mt-2 xl:mt-0">
                                          Trustworthiness: {selectedProvider && selectedProvider.trustworthiness}
                                        </span>
                                      </p>
                                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                                      <i className="fi fi-rr-coins mr-2 mb-0 flex"></i>
                                        <span className="mt-2 xl:mt-0">
                                          Cost: {selectedProvider && selectedProvider.cost}
                                        </span>
                                      </p>
                                    </div>

                                    <div className="grid grid-cols-2 mt-8">
                                      <div className="flex items-center">
                                        <Link href={selectedProvider && selectedProvider.url} target='_blank'>
                                          <p className="ml-2 text-gray-800 line-clamp-1">
                                            {selectedProvider && selectedProvider.url}
                                          </p>
                                        </Link>
                                      </div>

                                    </div>
                                  </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                  <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                      ) : null}
                    </>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UtilityAnalysisInteraction;