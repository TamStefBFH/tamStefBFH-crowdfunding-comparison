"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var puppeteer_1 = __importDefault(require("puppeteer"));
var supabase_js_1 = require("@supabase/supabase-js");
var supabase = (0, supabase_js_1.createClient)(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
// Liste der Anbieter mit Intensiv- und Langzeitkurs-URLs
var providers = [
    {
        name: "Gymivorbereitung Zuerich",
        urls: [
            { type: "Intensiv", url: "https://gymivorbereitung-zuerich.ch/kurzzeit/sportferien" },
            { type: "Langzeit", url: "https://gymivorbereitung-zuerich.ch/langzeit/sportferien" },
        ]
    },
    {
        name: "Lern-Forum.ch",
        urls: [
            { type: "Intensiv", url: "https://www.lern-forum.ch/gymivorbereitung-zuerich/kurzgymnasium" },
            { type: "Langzeit", url: "https://www.lern-forum.ch/gymivorbereitung-zuerich/langgymnasium" },
        ]
    },
    {
        name: "avidii Gymivorbereitung",
        urls: [
            { type: "Intensiv", url: "https://avidii.ch/gymivorbereitung-kurzzeitgymnasium" },
            { type: "Langzeit", url: "https://avidii.ch/gymivorbereitung-langzeitgymnasium" },
        ]
    },
    {
        name: "Learning Culture",
        urls: [
            { type: "Intensiv", url: "https://www.learningculture.ch/kurse/kurzgymi-pruefung" },
            { type: "Langzeit", url: "https://www.learningculture.ch/kurse/langgymi-pruefung" },
        ]
    },
    {
        name: "Gymivorbereitung-Fokus",
        urls: [
            { type: "Intensiv", url: "https://www.gymivorbereitung-fokus.ch/kurse/gymivorbereitungskurs-kurzzeit" },
            { type: "Langzeit", url: "https://www.gymivorbereitung-fokus.ch/kurse/gymivorbereitungskurs-langzeit" },
        ]
    },
    {
        name: "Nachilfe Akademie",
        urls: [
            { type: "Intensiv", url: "https://nachhilfeakademie.ch/kurzgymnasium/" },
            { type: "Langzeit", url: "https://nachhilfeakademie.ch/langzeitgymnasium/" },
        ]
    },
    {
        name: "Schule Zuerich Nord",
        urls: [
            { type: "Intensiv", url: "https://szn.ch/angebote/gymikurs/" },
            { type: "Langzeit", url: "https://szn.ch/angebote/gymikurs/" },
        ]
    },
    {
        name: "Open Learning Space",
        urls: [
            { type: "Intensiv", url: "https://www.ols-zuerich.ch/vorbereitungskurs-sek/" },
            { type: "Langzeit", url: "https://www.ols-zuerich.ch/vorbereitungskurs-primar/" },
        ]
    },
    {
        name: "Schlaumacher",
        urls: [
            { type: "Intensiv", url: "https://www.schlaumacher.ch/gymivorbereitung-zuerich/#product-8676" },
            { type: "Langzeit", url: "https://www.schlaumacher.ch/gymivorbereitung-zuerich/#product-8676" },
        ]
    },
    {
        name: "Logos Lehrerteam",
        urls: [
            { type: "Intensiv", url: "https://securedb.ch/fmi/webd/Diva_Gast?homeurl=https://www.logos-lehrerteam.ch" },
            { type: "Langzeit", url: "https://securedb.ch/fmi/webd/Diva_Gast?homeurl=https://www.logos-lehrerteam.ch" },
        ]
    },
    {
        name: "Lern Terrasse",
        urls: [
            { type: "Intensiv", url: "https://lernterrasse.ch/2-oder-3-sekundarstufe-gymi-kurs/" },
            { type: "Langzeit", url: "https://lernterrasse.ch/6-klasse-gymi-kurs/" },
        ]
    },
    {
        name: "Anbieter LearningCube",
        urls: [
            { type: "Intensiv", url: "https://www.learningcube.ch/courses/gymi-vorbereitung-kurzzeit-mittwoch-nachmittag/" },
            { type: "Intensiv", url: "https://www.learningcube.ch/courses/gymi-vorbereitung-kurzzeit-samstag-nachmittag/" },
            { type: "Intensiv", url: "https://www.learningcube.ch/courses/gymi-vorbereitung-kurzzeit-mittwoch/" },
            { type: "Intensiv", url: "https://www.learningcube.ch/courses/gymi-vorbereitung-kurzzeit/" },
            { type: "Langzeit", url: "https://www.learningcube.ch/courses/gymi-vorbereitung-langzeit-2/" },
            { type: "Langzeit", url: "https://www.learningcube.ch/courses/gymi-vorbereitung-langzeit-samstag-vormittag/" },
            { type: "Langzeit", url: "https://www.learningcube.ch/courses/gymi-vorbereitung-langzeit-mittwoch-abend/" },
            { type: "Langzeit", url: "https://www.learningcube.ch/courses/gymi-vorbereitung-langzeit-samstag/" },
            { type: "Langzeit", url: "https://www.learningcube.ch/courses/gymi-vorbereitung-langzeit/" }
        ]
    }
];
function scrapeWebsite() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, _i, providers_1, provider, urls, courseDetails, _a, _b, entry, url, page, selectors, scrapedStandort, _c, selectors_1, selector, _d, error_1, _e, existingGymiProvider, fetchGymiError, _f, existingCourseDetails, fetchCourseDetailsError, error_2;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    browser = null;
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 26, 27, 30]);
                    console.log('🚀 Starte den Scraping-Prozess...');
                    return [4 /*yield*/, puppeteer_1.default.launch({ headless: true })];
                case 2:
                    browser = _g.sent();
                    _i = 0, providers_1 = providers;
                    _g.label = 3;
                case 3:
                    if (!(_i < providers_1.length)) return [3 /*break*/, 25];
                    provider = providers_1[_i];
                    console.log("\uD83D\uDD04 Scraping f\u00FCr Anbieter: ".concat(provider.name));
                    urls = [];
                    courseDetails = {};
                    _a = 0, _b = provider.urls;
                    _g.label = 4;
                case 4:
                    if (!(_a < _b.length)) return [3 /*break*/, 19];
                    entry = _b[_a];
                    url = entry.url;
                    console.log("\uD83C\uDF10 Besuche URL: ".concat(url));
                    page = null;
                    _g.label = 5;
                case 5:
                    _g.trys.push([5, 14, 15, 18]);
                    return [4 /*yield*/, browser.newPage()];
                case 6:
                    page = _g.sent();
                    return [4 /*yield*/, page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 })];
                case 7:
                    _g.sent();
                    urls.push(url);
                    selectors = ['.Kursort', '.standort', '.Ort', '.location', '.course-location'];
                    scrapedStandort = null;
                    _c = 0, selectors_1 = selectors;
                    _g.label = 8;
                case 8:
                    if (!(_c < selectors_1.length)) return [3 /*break*/, 13];
                    selector = selectors_1[_c];
                    _g.label = 9;
                case 9:
                    _g.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, page.$eval(selector, function (el) { var _a; return ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || null; })];
                case 10:
                    scrapedStandort = _g.sent();
                    if (scrapedStandort) {
                        console.log("\uD83D\uDCCD Standort gefunden mit Selektor \"".concat(selector, "\": ").concat(scrapedStandort));
                        return [3 /*break*/, 13];
                    }
                    return [3 /*break*/, 12];
                case 11:
                    _d = _g.sent();
                    return [3 /*break*/, 12];
                case 12:
                    _c++;
                    return [3 /*break*/, 8];
                case 13:
                    // ✅ Standardwert "Zürich", wenn kein Standort gefunden wurde
                    if (!scrapedStandort) {
                        console.warn("\u26A0\uFE0F Standort nicht gefunden auf URL: ".concat(url, ". Standardwert \"Z\u00FCrich\" wird verwendet."));
                        scrapedStandort = 'Zürich';
                    }
                    // Speichere den Standort
                    courseDetails = {
                        Standort: scrapedStandort,
                        FAQ: true,
                        Pruefungsarchiv: false,
                    };
                    return [3 /*break*/, 18];
                case 14:
                    error_1 = _g.sent();
                    console.error("\u274C Fehler beim Scraping von ".concat(url, ":"), error_1.message);
                    return [3 /*break*/, 18];
                case 15:
                    if (!page) return [3 /*break*/, 17];
                    return [4 /*yield*/, page.close()];
                case 16:
                    _g.sent();
                    _g.label = 17;
                case 17: return [7 /*endfinally*/];
                case 18:
                    _a++;
                    return [3 /*break*/, 4];
                case 19:
                    // ✅ GymiProviders-Update
                    console.log('🛠️ Überprüfe GymiProviders in der Datenbank...');
                    return [4 /*yield*/, supabase
                            .from('GymiProviders')
                            .select('*')
                            .eq('Name', provider.name)
                            .maybeSingle()];
                case 20:
                    _e = _g.sent(), existingGymiProvider = _e.data, fetchGymiError = _e.error;
                    if (fetchGymiError) {
                        console.error('❌ Fehler beim Abrufen von GymiProviders:', fetchGymiError.message);
                        return [3 /*break*/, 24];
                    }
                    if (!existingGymiProvider) {
                        console.warn("\u26A0\uFE0F Kein GymiProvider gefunden f\u00FCr Anbieter: ".concat(provider.name));
                        return [3 /*break*/, 24];
                    }
                    console.log('🛠️ Aktualisiere GymiProviders...');
                    return [4 /*yield*/, supabase
                            .from('GymiProviders')
                            .update({
                            URL: urls,
                            "Preis-Kategorie": "Standard",
                            "Intensiver Kurs": true,
                            Aufsatzkorrektur: true,
                            "E-Learning": false,
                        })
                            .eq('ID', existingGymiProvider.ID)];
                case 21:
                    _g.sent();
                    console.log('✅ GymiProviders aktualisiert.');
                    // ✅ CourseDetails-Update nur, wenn GymiProvider-ID vorhanden ist
                    if (!(existingGymiProvider === null || existingGymiProvider === void 0 ? void 0 : existingGymiProvider.ID)) {
                        console.warn("\u26A0\uFE0F Keine g\u00FCltige GymiProvider-ID f\u00FCr Anbieter: ".concat(provider.name));
                        return [3 /*break*/, 24];
                    }
                    console.log('🛠️ Überprüfe CourseDetails in der Datenbank...');
                    return [4 /*yield*/, supabase
                            .from('CourseDetails')
                            .select('*')
                            .eq('ID', existingGymiProvider.ID)
                            .maybeSingle()];
                case 22:
                    _f = _g.sent(), existingCourseDetails = _f.data, fetchCourseDetailsError = _f.error;
                    if (fetchCourseDetailsError) {
                        console.error('❌ Fehler beim Abrufen von CourseDetails:', fetchCourseDetailsError.message);
                        return [3 /*break*/, 24];
                    }
                    console.log('🛠️ Aktualisiere CourseDetails...');
                    return [4 /*yield*/, supabase
                            .from('CourseDetails')
                            .update(courseDetails)
                            .eq('ID', existingGymiProvider.ID)];
                case 23:
                    _g.sent();
                    console.log('✅ CourseDetails erfolgreich aktualisiert.');
                    _g.label = 24;
                case 24:
                    _i++;
                    return [3 /*break*/, 3];
                case 25:
                    console.log('✅ Scraping-Prozess abgeschlossen!');
                    return [3 /*break*/, 30];
                case 26:
                    error_2 = _g.sent();
                    console.error('❌ Allgemeiner Fehler beim Scraping:', error_2.message);
                    return [3 /*break*/, 30];
                case 27:
                    if (!browser) return [3 /*break*/, 29];
                    return [4 /*yield*/, browser.close()];
                case 28:
                    _g.sent();
                    _g.label = 29;
                case 29:
                    console.log('🛑 Browser geschlossen.');
                    return [7 /*endfinally*/];
                case 30: return [2 /*return*/];
            }
        });
    });
}
// Starte den Scraping-Prozess
scrapeWebsite().catch(function (error) {
    return console.error('❌ Fehler beim Starten von scrapeWebsite:', error.message);
});
