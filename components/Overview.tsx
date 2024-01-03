'use client';
import React, { useState } from "react";
import Link from 'next/link'

const  Overview = ({ crowdfundingProvider }: { crowdfundingProvider: any}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>();

  const toggleModal = (providerId: number) => {
    setShowModal(!showModal);
    if (crowdfundingProvider) {
        setSelectedProvider(crowdfundingProvider[providerId]);
    }
}


  return (
      <div>
          {/*---------------------------------------- AFTER CALCULATION ---------------------------------------- */}
          <div className="flex min-h-screen flex-col items-start">
              <h1 className="text-3xl flex" >All Crowdfunding Provider</h1>
              <div className="container my-12 mx-auto ">
                  <div className="flex flex-wrap -mx-1 lg:-mx-4">
                      {crowdfundingProvider && crowdfundingProvider.map((provider: any, index: number) => (
                          <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" key={index}>
                              <article className="overflow-hidden rounded-lg shadow-lg">
                                  {/*For loop over the criteria that can be chosen*/}
                                  <a>
                                      <img alt="Placeholder" className="block h-64 w-full" src={`${provider.logo && provider.logo}`}></img>
                                  </a>

                                  <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                      <h1 className="text-lg">
                                          {provider.name}
                                      </h1>
                                      {provider.score ? (
                                        <p className="text-grey-darker text-sm">
                                          Score: {provider.score}
                                      </p>
                                      ): null}
                                      
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
                                              <div className="relative w-auto my-6 mx-auto max-w-md">
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
                                                                          <img className="block h-full w-full " src={`${selectedProvider && selectedProvider.logo}`} />
                                                                      </div>
                                                                  </div>
                                                                  {provider.score ? (
                                                                  <span className="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-yellow-400 text-sm font-medium text-white select-none">
                                                                      <p className="flex items-start font-medium text-white">
                                                                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" ><path d="M12 .587l3.668 7.431 8.332 1.21-6.001 5.848 1.416 8.265L12 18.896l-7.415 4.445 1.416-8.265-6.001-5.848 8.332-1.21z" strokeWidth="2.2" fill="none" stroke="white" /></svg>
                                                                          {selectedProvider && selectedProvider.score}
                                                                      </p>
                                                                  </span>
                                                                  ): null}
                                                              </div>

                                                              <div className="mt-4 ml-2">
                                                                  <h2 className="font-medium text-base md:text-lg text-gray-800 line-clamp-1" title="New York">
                                                                      {selectedProvider && selectedProvider.name}
                                                                  </h2>
                                                                  <p className="mt-2 text-sm text-gray-800" title="New York, NY 10004, United States">
                                                                      {selectedProvider && selectedProvider.description}
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
                                                                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill='none' stroke="black" strokeWidth="2.2"></path>
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
  )
}
export default Overview;
