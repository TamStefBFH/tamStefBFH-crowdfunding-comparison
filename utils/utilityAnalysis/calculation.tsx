export const calculateUtilityAnalysis = (params: any, GymiProviders: any) => { 
  // Überprüfe, ob GymiProviders vorhanden ist und Daten enthält
  if (!GymiProviders || GymiProviders.length === 0) {
    console.error("GymiProviders is null or empty");
    return [];
  }

  GymiProviders.map((provider: any, index: number) => {
    // Preis-Leistungs-Verhältnis Berechnung
    const priceWeight = Number(params.find((param: { criteria: string; }) => param.criteria === 'price-performance')?.weight);
    let scorePricePerformance = 0;
    if (provider['Preis-Kategorie'] === 'A') {
      scorePricePerformance += 3;
    } else if (provider['Preis-Kategorie'] === 'B') {
      scorePricePerformance += 2;
    } else if (provider['Preis-Kategorie'] === 'C') {
      scorePricePerformance += 1;
    }
    const maxParticipants = parseInt(provider['Maximale Anzahl der Teilnehmer']);
    if (maxParticipants <= 5) {
      scorePricePerformance += 3;
    } else if (maxParticipants <= 10) {
      scorePricePerformance += 2;
    } else {
      scorePricePerformance += 1;
    }
    const scorePrice = (scorePricePerformance / 6) * priceWeight;

    // Qualität des Unterrichts Berechnung
    const qualityWeight = Number(params.find((param: { criteria: string; }) => param.criteria === 'quality')?.weight);
    const scoreQuality = (provider['Qualität des Unterrichts'] / 3) * qualityWeight;

    // Flexibilität der Kursgestaltung Berechnung
    const flexibilityWeight = Number(params.find((param: { criteria: string; }) => param.criteria === 'flexibility')?.weight);
    let scoreFlexibility = 0;
    if (provider['Unterrichtstage'] >= 4) {
      scoreFlexibility += 3;
    } else if (provider['Unterrichtstage'] >= 2) {
      scoreFlexibility += 2;
    } else {
      scoreFlexibility += 1;
    }
    if (provider['Kursart'] === 'Beide') {
      scoreFlexibility += 2;
    } else {
      scoreFlexibility += 1;
    }
    const scoreFlex = (scoreFlexibility / 5) * flexibilityWeight;

    // Zusatzleistungen Berechnung
    const additionalServicesWeight = Number(params.find((param: { criteria: string; }) => param.criteria === 'additional-services')?.weight);
    let scoreAdditionalServices = 0;
    scoreAdditionalServices += provider['E-Learning'] ? 1 : 0;
    scoreAdditionalServices += provider['Eigene Lernunterlagen'] ? 1 : 0;
    scoreAdditionalServices += provider['Nachholmöglichkeiten'] ? 1 : 0;
    scoreAdditionalServices += provider['Direkte Unterstützung'] ? 1 : 0;
    scoreAdditionalServices += provider['Weitere Zusatzleistungen'] ? 1 : 0;
    const scoreAdditional = (scoreAdditionalServices / 5) * additionalServicesWeight;

    // Standort Berechnung
    const locationWeight = Number(params.find((param: { criteria: string; }) => param.criteria === 'location')?.weight);
    let scoreLocation = 0;
    if (provider['Unterrichtstage'] >= 4) {
      scoreLocation = 3;
    } else if (provider['Unterrichtstage'] >= 2) {
      scoreLocation = 2;
    } else {
      scoreLocation = 1;
    }
    const scoreLoc = (scoreLocation / 3) * locationWeight;

    // Gesamtscore Berechnung
    provider.score = Number(scorePrice + scoreQuality + scoreFlex + scoreAdditional + scoreLoc).toFixed(2);
  });

  return GymiProviders;
};