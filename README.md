# Gymi-Vergleich

## Thema der Arbeit
m Rahmen dieser Arbeit habe ich eine Webapplikation entwickelt, die Gymi-Vorbereitungskurse im Kanton Zürich vergleicht und bewertet. Dazu wurde ein Scoring-System implementiert, das auf verschiedenen Kriterien wie Preis-Leistungs-Verhältnis, Unterrichtsqualität, Flexibilität, Zusatzleistungen und Standort basiert. Die Webapplikation ermöglicht es den Nutzern, die Gewichtung der Bewertungskriterien individuell anzupassen und so eine personalisierte Bewertung der verschiedenen Anbieter zu erhalten. Um die erforderlichen Kursdaten zu extrahieren, habe ich Web Scraping mit Puppeteer eingesetzt, das die automatisierte Erhebung von Informationen direkt von den Webseiten der Anbieter ermöglicht. Die extrahierten Daten werden in der Datenbank in Supabase abgespeichert.

## Lokal ausführen
1. Repository klonen: git clone https://github.com/DEIN_REPOSITORY_LINK.git
2. In das Verzeichnis wechseln: cd DEIN_REPOSITORY_NAME
3. Abhängigkeiten installieren: npm install
4. Supabase konfigurieren (API-Schlüssel und URL in .env-Datei)
5. Web-Scraping ausführen:
   - tsc --build --clean (entfernt alte Build-Dateien und stellt sicher, dass alle Dateien frisch kompiliert werden.)
   - tsc (kompiliert alle TypeScript-Dateien zu JavaScript.)
   - node dist/app/scraping/scraper.js (führt das kompilierte JavaScript-Scraping-Skript aus.)
6. Webapplikation starten: npm run dev
7. Anwendung unter http://localhost:3000 testen

