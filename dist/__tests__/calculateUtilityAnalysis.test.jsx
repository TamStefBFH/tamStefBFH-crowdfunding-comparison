"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calculation_1 = require("../utils/utilityAnalysis/calculation");
describe('calculateUtilityAnalysis Functions', function () {
    var weightParams = {
        pricePerformance: 30,
        quality: 20,
        flexibility: 20,
        additionalServices: 10,
        location: 20,
    };
    var provider = {
        "Preis-Kategorie": 'A',
        "Maximale Anzahl der Teilnehmer": '5',
        Qualitaetsbewertung: 1,
        Unterrichttag: 'Montag,Dienstag,Freitag',
        "Kursart (Intensiv- oder Langzeitkurs)": 'Beides',
        "E-Learning": true,
        "Eigene Lernunterlagen": true,
        Nachholmoeglichkeiten: true,
        "Unterstuezung ausserhalb Unterrichtszeit": true,
        Pruefungsarchiv: true,
        Aufsatzkorrektur: true,
        Standort: 'Zürich',
    };
    test('should calculate price-performance correctly', function () {
        var result = (0, calculation_1.calculatePricePerformance)(provider, weightParams.pricePerformance);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(weightParams.pricePerformance);
    });
    test('should calculate quality correctly', function () {
        var result = (0, calculation_1.calculateQuality)(provider, weightParams.quality);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(weightParams.quality);
    });
    test('should calculate flexibility correctly', function () {
        var result = (0, calculation_1.calculateFlexibility)(provider, weightParams.flexibility);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(weightParams.flexibility);
    });
    test('should calculate additional services correctly', function () {
        var result = (0, calculation_1.calculateAdditionalServices)(provider, provider, weightParams.additionalServices);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(weightParams.additionalServices);
    });
    test('should calculate location correctly', function () {
        var result = (0, calculation_1.calculateLocation)(provider, weightParams.location);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(weightParams.location);
    });
});
