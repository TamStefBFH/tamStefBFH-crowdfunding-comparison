'use client';
import React, { useState } from "react";
import Link from 'next/link';
import { Database } from "@/database.types";

// Typen für GymiProviders und CourseDetails
type GymiProviders = Database['public']['Tables']['GymiProviders']['Row'];
type CourseDetails = Database['public']['Tables']['CourseDetails']['Row'];

interface GymiProviderOverviewProps {
    gymiProviders: GymiProviders[];
    courseDetails: CourseDetails[]; // Übergebene CourseDetails
    score: number;
}

const GymiProviderOverview = ({ gymiProviders, courseDetails, score }: GymiProviderOverviewProps) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState<any>();

    const toggleModal = (providerId: number) => {
        if (gymiProviders && gymiProviders[providerId]) {
            const selectedProvider = gymiProviders[providerId];
            // Finde das passende CourseDetail
            const courseDetail = courseDetails.find((detail) => detail.ID === selectedProvider.ID);
            setSelectedProvider({ ...selectedProvider, courseDetail });
            setShowModal(!showModal);
        } else {
            console.error("Ungültiger Anbieter oder Index");
        }
    };

    return (
        <div>
            <div className="flex min-h-screen flex-col items-start">
                <h1 className="text-3xl flex mt-7">All Gymi Providers</h1>
                <div className="container my-12 mx-auto">
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        {gymiProviders && gymiProviders.map((provider, index: number) => {
                            const courseDetail = courseDetails.find((detail) => detail.ID === provider.ID); // Verknüpfe CourseDetails
                            return (
                                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" key={index}>
                                    <article className="overflow-hidden rounded-lg shadow-lg">
                                        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                            <h1 className="text-lg">{provider.Name || 'Name nicht verfügbar'}</h1>
                                            {score ? (
                                                <p className="text-grey-darker text-sm">Score: {score}</p>
                                            ) : (
                                                <p className="text-grey-darker text-sm">Score: Nicht verfügbar</p>
                                            )}
                                        </header>

                                        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                                            <button
                                                className="bg-gray-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow"
                                                type="button"
                                                onClick={() => toggleModal(index)}
                                            >
                                                Mehr Informationen
                                            </button>
                                            <p className="ml-2">
                                                <i className="fi fi-rr-marker mr-2 mb-0"></i>
                                                {courseDetail?.Standort || 'Standort nicht verfügbar'}
                                            </p>
                                        </footer>
                                    </article>

                                    {showModal && selectedProvider && selectedProvider === gymiProviders[index] ? (
                                        <div>
                                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                                <div className="relative w-auto my-6 mx-auto max-w-md">
                                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                                            <h3 className="text-3xl font-semibold">Provider</h3>
                                                            <button
                                                                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                onClick={() => setShowModal(false)}
                                                            >
                                                                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                                                            </button>
                                                        </div>
                                                        <div className="relative mx-auto w-full">
                                                            <div className="shadow p-4 rounded-lg bg-white">
                                                                <div className="mt-4 ml-2">
                                                                    <h2 className="font-medium text-base md:text-lg text-gray-800 line-clamp-1">
                                                                        {selectedProvider.name || 'Name nicht verfügbar'}
                                                                    </h2>
                                                                    <p className="mt-2 text-sm text-gray-800">
                                                                        {selectedProvider.description || 'Beschreibung nicht verfügbar'}
                                                                    </p>
                                                                </div>
                                                                <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-8 ml-2">
                                                                    <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                                                                        <i className="fi fi-sr-signal-stream mr-2 mb-0 flex"></i>
                                                                        <span className="mt-2 xl:mt-0">
                                                                            Preis-Leistungs-Verhältnis: {selectedProvider.pricePerformance || 'Nicht verfügbar'}
                                                                        </span>
                                                                    </p>
                                                                    <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                                                                        <i className="fi fi-bs-heart mr-2 mb-0 flex"></i>
                                                                        <span className="mt-2 xl:mt-0">
                                                                            Qualität des Unterrichts: {selectedProvider.quality || 'Nicht verfügbar'}
                                                                        </span>
                                                                    </p>
                                                                    <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                                                                        <i className="fi fi-rr-coins mr-2 mb-0 flex"></i>
                                                                        <span className="mt-2 xl:mt-0">
                                                                            Flexibilität der Kursgestaltung: {selectedProvider.flexibility || 'Nicht verfügbar'}
                                                                        </span>
                                                                    </p>
                                                                    <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                                                                        <i className="fi fi-rr-marker mr-2 mb-0"></i>
                                                                        <span className="mt-2 xl:mt-0">
                                                                            Standort: {selectedProvider.location || 'Standort nicht verfügbar'}
                                                                        </span>
                                                                    </p>
                                                                    <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                                                                        <i className="fi fi-rr-book-section mr-2 mb-0 flex"></i>
                                                                        <span className="mt-2 xl:mt-0">
                                                                            Zusatzleistungen: {selectedProvider.additionalServices || 'Nicht verfügbar'}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                                <div className="grid grid-cols-2 mt-8">
                                                                    <div className="flex items-center">
                                                                        {selectedProvider.url ? (
                                                                            <Link href={selectedProvider.url} target='_blank'>
                                                                                <p className="ml-2 text-gray-800 line-clamp-1">
                                                                                    {selectedProvider.url}
                                                                                </p>
                                                                            </Link>
                                                                        ) : (
                                                                            <p className="ml-2 text-gray-800 line-clamp-1">Keine URL verfügbar</p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                            <button
                                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                type="button"
                                                                onClick={() => setShowModal(false)}
                                                            >
                                                                Schliessen
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="opacity-5 fixed inset-0 z-40 bg-black"></div>
                                        </div>
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GymiProviderOverview;
