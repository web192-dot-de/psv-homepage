# Penzliner SV Handball — Hugo-Homepage

Statische Vereinsseite mit Hugo. Es gibt keine Datenbank und kein CMS. Inhalte sind Textdateien,
Spielpläne sind CSV-Dateien, alle Vereinsdaten und Farben stehen zentral in `hugo.toml`.

---

## Struktur

```
├── hugo.toml                       # Vereinsdaten, Farben, Logo, Portal-Link, Wartungs-Popup
├── content/
│   ├── _index.md                   # Titel & Hero-Text der Startseite
│   ├── impressum/index.md
│   ├── datenschutz/index.md
│   └── mannschaften/
│       ├── 1-herren/               # EIN Ordner pro Mannschaft ("Page Bundle")
│       │   ├── index.md            #   Daten + Text der Mannschaft
│       │   └── team.jpg            #   Teamfoto (optional)
│       └── …
├── assets/spielplaene/             # Spielpläne als CSV (siehe unten)
├── layouts/
│   ├── _default/baseof.html        # Grundgerüst (Head, Header, Footer, nav.js)
│   ├── index.html                  # Startseite + Wartungs-Popup
│   ├── mannschaften/list.html      # Übersicht: Karten im Raster (/mannschaften/)
│   ├── mannschaften/single.html    # Detailseite einer Mannschaft
│   ├── shortcodes/spielplan.html   # Spielplan-Tabelle aus CSV
│   └── partials/                   # head, header, footer
└── static/
    ├── css/style.css               # Design (nutzt CSS-Variablen aus hugo.toml)
    ├── fonts/                      # Schriften lokal (keine Verbindung zu Google)
    ├── images/logo.png             # Vereinswappen
    └── js/nav.js                   # Handy-Menü (☰-Button)
```

---

## Lokal arbeiten (WSL)

```bash
sudo apt install hugo        # oder die "extended"-Version von github.com/gohugoio/hugo/releases
hugo version
hugo server                  # Vorschau auf http://localhost:1313 mit Live-Reload
```

---

## Vereinsdaten, Farben, Logo — `hugo.toml`

Alles Zentrale steht im Block `[params]`: Vereinsname, Gründungsjahr, Adresse, E-Mail, Portal-Link.

**Farben** (werden als CSS-Variablen ausgegeben, das CSS enthält keine festen Farbwerte):

| Parameter | Bedeutung | aktuell |
|---|---|---|
| `colorNavy` | Hauptfarbe (Header, Footer, Überschriften) | Blau |
| `colorGold` | Akzentfarbe (Buttons, Badges, Linien) | Gelb |
| `colorRoyal` | Sekundärfarbe | Gelb |
| `colorPaper` | heller Seitenhintergrund | |
| `colorCharcoal` | Fließtext | |

Die Namen stammen aus dem ersten Entwurf. „Navy“ ist jetzt das Vereinsblau, „Gold“ das Vereinsgelb.

**Logo:** Datei nach `static/images/logo.png` legen (PNG, transparenter Hintergrund). Anderer Name: `logo = "…"` in `hugo.toml`.

**Portal-Link:** `portalUrl` und `portalLabel` steuern den Button „Spielplan & Ergebnisse ansehen“ auf der Startseite.
Ist `portalUrl` leer, erscheint stattdessen „Spielplan folgt in Kürze“.

**Wartungs-Popup:** Mit `wartung = true` legt sich ein Hinweis („Bald ist es soweit …“) über die ganze Startseite
und sperrt das Scrollen. Für den echten Livegang `wartung = false` setzen.

---

## Mannschaften pflegen

Jede Mannschaft ist ein Ordner unter `content/mannschaften/`. Neue Mannschaft = Ordner kopieren und anpassen.

```toml
+++
title = "Herren"
date = 2026-08-01T12:00:00Z
draft = false
weight = 1                                   # optional: Reihenfolge in der Übersicht (kleinste zuerst)
liga = "Bezirksoberliga Ost Männer"
trainingszeiten = "Dienstag & Freitag, 19:00 - 21:00 Uhr"
trainer = "Name Trainer"
+++

Freitext zur Mannschaft (Markdown).

{{< spielplan >}}
```

- **Teamfoto:** Datei `team.jpg` (oder `team.png`) in denselben Ordner legen. Die Übersicht schneidet sie automatisch
  auf ein einheitliches Format zu. Ohne Foto erscheint „Teamfoto folgt“.
- **Reihenfolge:** Ohne `weight` sortiert Hugo nach Titel. Mit `weight = 1, 2, 3 …` bestimmst du sie selbst.
- **Leere Felder** (`trainer`, `liga`, `trainingszeiten`) werden in der Übersicht einfach weggelassen.
- `draft = true` blendet eine Mannschaft aus, ohne sie zu löschen.

### Das Karten-Raster

Die Übersicht `/mannschaften/` nutzt **ein** Raster um alle Karten:

```html
<div class="teams-grid">          <!-- Raster: so viele Spalten, wie in die Breite passen -->
  <article class="team-card">…</article>   <!-- eine Karte = ein Rasterfeld -->
</div>
```

`.teams-grid` (in `style.css`) legt fest, dass jede Spalte mindestens 280 px breit ist und der Rest gleichmäßig verteilt wird.
Das ergibt am Desktop 3, am Tablet 2 und am Handy 1 Spalte, ohne Media-Query. Das Raster muss **einmal um alle Karten** stehen.
Steht es pro Karte, stapeln sich die Mannschaften untereinander.

---

## Spielpläne (CSV + Shortcode)

Der Shortcode `{{< spielplan >}}` liest eine CSV-Datei aus `assets/spielplaene/` und zeigt sie als Tabelle.

CSV-Format (Kopfzeile wird übersprungen, Spalten: Datum, Heim, Gast, Uhrzeit):

```csv
Datum,Heim,Gast,Uhrzeit
12.09.2026 (Sa),PSV,Altentreptow II,19:00 Uhr
27.09.2026 (So),Torgelow,PSV,16:00 Uhr
```

**Wichtig, aktueller Stand:** Der Shortcode leitet den Dateinamen aus dem Namen der Markdown-Datei ab. Bei den Mannschaften heißt
sie immer `index.md`. Deshalb lädt er **immer `assets/spielplaene/index.csv`**, egal in welcher Mannschaft er steht. `maenner.csv`
wird nicht gelesen. Soll jede Mannschaft ihren eigenen Plan haben, muss im Shortcode `.Page.File.BaseFileName` durch
`.Page.File.ContentBaseName` ersetzt werden. Der Name der CSV entspricht dann dem Ordnernamen, z. B. `1-herren.csv`.

---

## Technik im Hintergrund

- **Schriften:** Big Shoulders Display, Inter und JetBrains Mono liegen in `static/fonts/` (Lizenz: SIL Open Font License,
  Lizenztexte liegen bei). Die Seite lädt nichts von Google, ein Hinweis auf Google Fonts in der Datenschutzerklärung ist nicht nötig.
- **Handy-Menü:** `static/js/nav.js` öffnet und schließt die Navigation unter 820 px Breite. Escape und Klick auf einen Menüpunkt schließen sie.
- **Responsive:** Breakpoints bei 820 px (Navigation) und 700 px (Vereinsgeschichte). Das Raster der Mannschaften passt sich selbst an.

---

## Build und Upload (manitu)

```bash
hugo                          # erzeugt den Ordner public/
```

Den **Inhalt** von `public/` (nicht den Ordner selbst) per FTP in das Verzeichnis der Domain bzw. Subdomain bei manitu hochladen.
`public/` und `resources/` werden von Hugo erzeugt und gehören nicht ins Git-Repository.

---

## Vor dem Livegang prüfen

- [ ] `baseURL` in `hugo.toml` auf die echte Adresse setzen (aktuell `https://github.io`)
- [ ] `wartung = false` setzen
- [ ] **Debug-Ausgabe im Spielplan entfernen:** In `layouts/shortcodes/spielplan.html` stehen
      `<p>{{$csvPfad}}</p>` und `<p>{{$teamName}}</p>`, die Besucher sehen („spielplaene/index.csv“, „index“)
- [ ] Spielplan-Tabelle gestalten: In `style.css` gibt es noch keine Regeln für `.spielplan-table`
- [ ] `foundedYear` prüfen: Aktuell steht dort 2012, das Wappen zeigt 1991 und der Text sagt „über drei Jahrzehnte“
- [ ] Platzhaltertexte in den Mannschaften ersetzen („Hier kannst du einen netten Text …“, Trainingszeiten „…“)
- [ ] Teamfoto der F-Jugend ergänzen
- [ ] Impressum: Statt „§ 5 TMG“ gilt seit Mai 2024 „§ 5 DDG“ — vom Vorstand prüfen lassen
- [ ] Datenschutz: Hinweis ergänzen, dass keine Cookies und keine Tracking-Dienste verwendet werden
- [ ] Favicon in `static/` ablegen
