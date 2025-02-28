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
var UtilityAnalysisInteraction_1 = __importDefault(require("../components/UtilityAnalysisInteraction"));
var server_1 = require("@/utils/supabase/server");
var UtilityAnalysis = function () { return __awaiter(void 0, void 0, void 0, function () {
    var supabase, _a, GymiProviders, errorProviders, _b, CourseDetails, errorCourseDetails, transformedGymiProviders;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, server_1.createServerSupabaseClient)()];
            case 1:
                supabase = _c.sent();
                return [4 /*yield*/, supabase
                        .from("GymiProviders")
                        .select("ID, Name, \"Preis Langzeit Kurs\", \"Preis Intensiver Kurs\", \"E-Learning\", Aufsatzkorrektur, Einzelkurse")];
            case 2:
                _a = _c.sent(), GymiProviders = _a.data, errorProviders = _a.error;
                if (errorProviders) {
                    console.error("Error fetching Gymi providers data:", errorProviders);
                }
                return [4 /*yield*/, supabase
                        .from("CourseDetails")
                        .select("ID, \"Preis pro Woche Langzeitkurs\", \"Dauer der Kurse in Wochen Langzeitkurs\", \"Eigene Lernunterlagen\", \"Kursart (Intensiv- oder Langzeitkurs)\", Unterrichttag, Standort, Pruefungsarchiv, Beratungsgespraech, Qualitaetsbewertung, Nachholmoeglichkeiten")];
            case 3:
                _b = _c.sent(), CourseDetails = _b.data, errorCourseDetails = _b.error;
                if (errorCourseDetails) {
                    console.error("Error fetching Course details data:", errorCourseDetails);
                }
                transformedGymiProviders = (GymiProviders === null || GymiProviders === void 0 ? void 0 : GymiProviders.map(function (provider) { return ({
                    id: provider.ID,
                    name: provider.Name || 'Name nicht verfügbar',
                    pricePerformance: provider["Preis Langzeit Kurs"] || provider["Preis Intensiver Kurs"] || 'Nicht verfügbar',
                    additionalServices: provider["E-Learning"] || provider.Aufsatzkorrektur || provider.Einzelkurse ? 'Ja' : 'Nein',
                }); })) || [];
                return [2 /*return*/, (<div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <UtilityAnalysisInteraction_1.default GymiProviders={transformedGymiProviders} CourseDetails={CourseDetails || []}/>
      </div>
    </div>)];
        }
    });
}); };
exports.default = UtilityAnalysis;
