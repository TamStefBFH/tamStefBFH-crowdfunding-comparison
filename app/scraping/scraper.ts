import 'dotenv/config';
import puppeteer, { Browser, Page } from 'puppeteer';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/database.types';

type ScrapedDataGymiProviders = Database['public']['Tables']['GymiProviders']['Insert'];
type ScrapedDataCourseDetails = Database['public']['Tables']['CourseDetails']['Insert'];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Liste der Anbieter mit Intensiv- und Langzeitkurs-URLs
const providers = [
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
    name: "LearningCube",
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

async function scrapeWebsite(): Promise<void> {
  let browser: Browser | null = null;

  try {
    console.log('🚀 Starte den Scraping-Prozess...');
    browser = await puppeteer.launch({ headless: true });

    for (const provider of providers) {
      console.log(`🔄 Scraping für Anbieter: ${provider.name}`);

      const urls: string[] = [];
      let courseDetails: Partial<ScrapedDataCourseDetails> = {};

      for (const entry of provider.urls) {
        const url = entry.url;
        console.log(`🌐 Besuche URL: ${url}`);

        let page: Page | null = null;
        try {
          page = await browser.newPage();
          await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
          urls.push(url);

          // ✅ Flexibler Selektor für Standort
          const selectors = ['.Kursort', '.standort', '.Ort', '.location', '.course-location'];
          let scrapedStandort = null;

          for (const selector of selectors) {
            try {
              scrapedStandort = await page.$eval(selector, (el) => el.textContent?.trim() || null);
              if (scrapedStandort) {
                console.log(`📍 Standort gefunden mit Selektor "${selector}": ${scrapedStandort}`);
                break;
              }
            } catch {
              // Ignoriere Fehler für nicht gefundene Selektoren
            }
          }

          // ✅ Standardwert "Zürich", wenn kein Standort gefunden wurde
          if (!scrapedStandort) {
            console.warn(`⚠️ Standort nicht gefunden auf URL: ${url}. Standardwert "Zürich" wird verwendet.`);
            scrapedStandort = 'Zürich';
          }

          // Speichere den Standort
          courseDetails = {
            Standort: scrapedStandort,
            FAQ: true,
            Pruefungsarchiv: false,
          };
        } catch (error: any) {
          console.error(`❌ Fehler beim Scraping von ${url}:`, error.message);
        } finally {
          if (page) await page.close();
        }
      }

      // ✅ GymiProviders-Update
      console.log('🛠️ Überprüfe GymiProviders in der Datenbank...');
      const { data: existingGymiProvider, error: fetchGymiError } = await supabase
        .from('GymiProviders')
        .select('*')
        .eq('Name', provider.name)
        .maybeSingle();

      if (fetchGymiError) {
        console.error('❌ Fehler beim Abrufen von GymiProviders:', fetchGymiError.message);
        continue;
      }

      if (!existingGymiProvider) {
        console.warn(`⚠️ Kein GymiProvider gefunden für Anbieter: ${provider.name}`);
        continue;
      }

      console.log('🛠️ Aktualisiere GymiProviders...');
      await supabase
        .from('GymiProviders')
        .update({
          URL: urls,
          "Preis-Kategorie": "Standard",
          "Intensiver Kurs": true,
          Aufsatzkorrektur: true,
          "E-Learning": false,
        })
        .eq('ID', existingGymiProvider.ID);
      console.log('✅ GymiProviders aktualisiert.');

      // ✅ CourseDetails-Update nur, wenn GymiProvider-ID vorhanden ist
      if (!existingGymiProvider?.ID) {
        console.warn(`⚠️ Keine gültige GymiProvider-ID für Anbieter: ${provider.name}`);
        continue;
      }

      console.log('🛠️ Überprüfe CourseDetails in der Datenbank...');
      const { data: existingCourseDetails, error: fetchCourseDetailsError } = await supabase
        .from('CourseDetails')
        .select('*')
        .eq('ID', existingGymiProvider.ID)
        .maybeSingle();

      if (fetchCourseDetailsError) {
        console.error('❌ Fehler beim Abrufen von CourseDetails:', fetchCourseDetailsError.message);
        continue;
      }

      console.log('🛠️ Aktualisiere CourseDetails...');
      await supabase
        .from('CourseDetails')
        .update(courseDetails)
        .eq('ID', existingGymiProvider.ID);

      console.log('✅ CourseDetails erfolgreich aktualisiert.');
    }

    console.log('✅ Scraping-Prozess abgeschlossen!');
  } catch (error: any) {
    console.error('❌ Allgemeiner Fehler beim Scraping:', error.message);
  } finally {
    if (browser) await browser.close();
    console.log('🛑 Browser geschlossen.');
  }
}

// Starte den Scraping-Prozess
scrapeWebsite().catch((error) =>
  console.error('❌ Fehler beim Starten von scrapeWebsite:', error.message)
);