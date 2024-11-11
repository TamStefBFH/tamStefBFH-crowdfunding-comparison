import { calculateUtilityAnalysis } from '../utils/utilityAnalysis/calculation';

describe('calculateUtilityAnalysis', () => {
  test('should correctly calculate the score for each provider based on weighted criteria', () => {
    const params = [
      { criteria: 'price-performance', weight: '30' },
      { criteria: 'quality', weight: '20' },
      { criteria: 'flexibility', weight: '20' },
      { criteria: 'additional-services', weight: '10' },
      { criteria: 'location', weight: '20' },
    ];

    const gymiProvidersData = [
      {
        Preiskategorie: 'A', 
        Mitarbeiter: 5, // Kleine Gruppe
        Qualitaetsbewertung: 1, // Sehr gut
        Unterrichttage: 4,
        "Kursart (Intensiv- oder Langzeitkurs)": 'Beide',
        "E-Learning": true,
        "Eigene Lernunterlagen": true,
        Nachholmoeglichkeiten: true,
        "Unterstützung außerhalb Unterrichtszeit": true,
        WeitereZusatzleistungen: true,
        Standort: 'Zürich',
      },
      {
        Preiskategorie: 'C', 
        Mitarbeiter: 15, // Größere Gruppe
        Qualitaetsbewertung: 3, // Schlecht
        Unterrichttage: 1,
        "Kursart (Intensiv- oder Langzeitkurs)": 'Langzeit',
        "E-Learning": false,
        "Eigene Lernunterlagen": false,
        Nachholmoeglichkeiten: false,
        "Unterstützung außerhalb Unterrichtszeit": false,
        WeitereZusatzleistungen: false,
        Standort: 'Bern',
      },
    ];

    const result = calculateUtilityAnalysis(params, gymiProvidersData);
    
    // Beispielhafte erwartete Werte für die Scores basierend auf den Kriterien und Gewichten
    expect(result[0].score).toBeCloseTo(4.5, 1); // Hohe Bewertung aufgrund der positiven Eigenschaften
    expect(result[1].score).toBeCloseTo(2.0, 1); // Niedrigere Bewertung aufgrund der eingeschränkten Eigenschaften
  });
});
