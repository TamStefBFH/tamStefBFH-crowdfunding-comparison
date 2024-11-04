export const calculateUtilityAnalysis = (params: any, gymiProviderData: any) => {
  gymiProviderData.map((provider: any) => {
    // Preis-Leistungs-Verhältnis
    let scorePrice = 0;
    if (provider['Preiskategorie'] === 'A') scorePrice += 3;
    else if (provider['Preiskategorie'] === 'B') scorePrice += 2;
    else if (provider['Preiskategorie'] === 'C') scorePrice += 1;

    const participantNumber = Number(provider['Maximale Anzahl der Teilnehmer']);
    if (participantNumber <= 5) scorePrice += 3;
    else if (participantNumber <= 10) scorePrice += 2;
    else scorePrice += 1;

    scorePrice = Math.round(scorePrice / 2);

    // Qualität des Unterrichts
    const scoreQuality = Number(provider['Qualitaetsbewertung']);

    // Flexibilität der Kursgestaltung
    let scoreFlexibility = 0;
    const courseDays = provider['Unterrichttag']?.split(',').length || 0;
    if (courseDays >= 4) scoreFlexibility += 3;
    else if (courseDays >= 2) scoreFlexibility += 2;
    else scoreFlexibility += 1;

    scoreFlexibility += provider['Kursart (Intensiv- oder Langzeitkurs)'] === 'Beide' ? 2 : 1;
    scoreFlexibility = scoreFlexibility >= 5 ? 3 : (scoreFlexibility >= 3 ? 2 : 1);

    // Zusatzleistungen
    let scoreExtras = 0;
    if (provider['Eigene Lernunterlagen']) scoreExtras += 1;
    if (provider['Nachholmoeglichkeiten']) scoreExtras += 1;
    if (provider['Unterstuezung ausserhalb Unterrichtszeit']) scoreExtras += 1;
    if (provider['E-Learning']) scoreExtras += 1;
    if (provider['Pruefungsarchiv']) scoreExtras += 1;

    scoreExtras = scoreExtras >= 4 ? 3 : (scoreExtras >= 2 ? 2 : 1);

    // Standort
    const scoreLocation = courseDays >= 4 ? 3 : (courseDays >= 2 ? 2 : 1);

    // Gewichtungen anwenden
    const weightPrice = Number(params.find((param: { criteria: string; }) => param.criteria === 'price')?.weight) || 0;
    const weightQuality = Number(params.find((param: { criteria: string; }) => param.criteria === 'quality')?.weight) || 0;
    const weightFlexibility = Number(params.find((param: { criteria: string; }) => param.criteria === 'flexibility')?.weight) || 0;
    const weightExtras = Number(params.find((param: { criteria: string; }) => param.criteria === 'extras')?.weight) || 0;
    const weightLocation = Number(params.find((param: { criteria: string; }) => param.criteria === 'location')?.weight) || 0;

    // Gesamtpunktzahl berechnen
    provider.score = Number(
      ((scorePrice * weightPrice) +
        (scoreQuality * weightQuality) +
        (scoreFlexibility * weightFlexibility) +
        (scoreExtras * weightExtras) +
        (scoreLocation * weightLocation)) / 100
    ).toFixed(2);
  });

  return gymiProviderData;
};
