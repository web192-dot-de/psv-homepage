# Penzliner SV Handball — Hugo-Homepage

## Struktur

```
penzliner-sv-hugo/
├── hugo.toml                  # ALLE Vereinsdaten, Farben & Logo werden HIER geändert
├── content/
│   └── _index.md               # Titel & Hero-Text der Startseite
├── layouts/
│   ├── _default/baseof.html    # Grundgerüst (Header + Footer um jede Seite)
│   ├── index.html              # Aufbau der Startseite
│   └── partials/
│       ├── head.html           # Meta-Tags + gibt die Farben als CSS-Variablen aus
│       ├── header.html         # Navigation + Logo
│       └── footer.html         # Kontaktdaten
├── static/
│   ├── css/style.css           # Design — nutzt NUR var(--color-...), keine Farben hartcodiert
│   └── images/                 # HIER dein Logo ablegen (siehe unten)
└── archetypes/default.md       # Vorlage für neue Seiten (hugo new ...)
```

---

## Voraussetzung: Hugo installieren (in WSL)

```bash
sudo apt install hugo
hugo version
```

Falls das eine sehr alte Version installiert (Ubuntu-Repos hinken oft hinterher),
alternativ die "extended"-Version von der offiziellen Release-Seite laden:
https://github.com/gohugoio/hugo/releases (Datei `hugo_extended_...linux-amd64.deb`)

---

## Lokal starten

```bash
cd penzliner-sv-hugo
hugo server
```

Im Browser öffnen: **http://localhost:1313** — Änderungen an Dateien werden automatisch
neu geladen (Live Reload), kein manueller Neustart nötig.

---

## Farben ändern

Alles in **`hugo.toml`**, im Block `[params]`:

```toml
colorNavy       = "#0F1E4C"
colorRoyal      = "#1E3FA0"
colorGold       = "#F0B429"
colorPaper      = "#F4F6FB"
colorCharcoal   = "#12204F"
```

Werte anpassen, Datei speichern — `hugo server` übernimmt es automatisch. Das gesamte
CSS reagiert darauf, weil es ausschließlich `var(--color-navy)` etc. nutzt statt
fester Farbwerte.

---

## Logo einsetzen

1. Eigenes Logo (idealerweise PNG mit transparentem Hintergrund, min. 200×200px) nach
   `static/images/logo.png` legen
2. Falls ein anderer Dateiname gewünscht ist, in `hugo.toml` anpassen:
   ```toml
   logo = "/images/dein-dateiname.png"
   ```

Ohne Logo-Datei zeigt die Seite automatisch einen einfachen Wappen-Platzhalter
(Raute in euren Farben) an — die Seite bricht also nicht, falls das Logo mal fehlt.

---

## Portal-Link aktivieren (später)

Sobald ihr euch für das externe Spielplan-Portal entschieden habt, in `hugo.toml`:

```toml
portalUrl   = "https://euer-portal-link.de"
portalLabel = "Spielplan & Ergebnisse ansehen"
```

Der Button erscheint dann automatisch im Hero-Bereich der Startseite.

---

## Produktions-Build (für den Upload zu manitu)

```bash
hugo
```

Erzeugt einen fertigen, statischen Ordner **`public/`** — **genau dessen Inhalt**
(nicht den Ordner selbst) lädst du per FTP in das Subdomain-Verzeichnis bei manitu hoch.

---

## Responsive-Verhalten

Das CSS nutzt `clamp()` für die Hero-Überschrift und Breakpoints bei 820px/700px
für Navigation und Vereinsgeschichte-Sektion. Getestet werden sollte auf:
- Mobil (< 480px)
- Tablet (768px)
- Desktop (> 1024px)
