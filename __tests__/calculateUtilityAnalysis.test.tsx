import { calculateUtilityAnalysis } from '../utils/utilityAnalysis/calculation';

describe('calculateUtilityAnalysis', () => {
  test('should correctly calculate the score for each provider', () => {
    const params = [
      { criteria: 'price-performance', weight: '30' },
      { criteria: 'quality', weight: '20' },
      { criteria: 'flexibility', weight: '20' },
      { criteria: 'additional-services', weight: '10' },
      { criteria: 'location', weight: '20' },
    ];
    const gymiProvidersData = [
      {
        'Preis-Kategorie': 'A',
        'Maximale Anzahl der Teilnehmer': '5',
        'Qualität des Unterrichts': 3,
        'Unterrichtstage': 4,
        'Kursart': 'Beide',
        'E-Learning': true,
        'Eigene Lernunterlagen': true,
        'Nachholmöglichkeiten': false,
        'Direkte Unterstützung': true,
        'Weitere Zusatzleistungen': true,
      },
      {
        'Preis-Kategorie': 'B',
        'Maximale Anzahl der Teilnehmer': '10',
        'Qualität des Unterrichts': 2,
        'Unterrichtstage': 3,
        'Kursart': 'Langzeit',
        'E-Learning': false,
        'Eigene Lernunterlagen': true,
        'Nachholmöglichkeiten': true,
        'Direkte Unterstützung': false,
        'Weitere Zusatzleistungen': false,
      },
    ];
    const result = calculateUtilityAnalysis(params, gymiProvidersData);
    expect(result[0].score).toBe('4.50'); // example expected score based on criteria and weights
    expect(result[1].score).toBe('3.20'); // example expected score based on criteria and weights
  });
});
