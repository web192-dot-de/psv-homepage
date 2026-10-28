+++
title = "{{ replace .File.ContentBaseName "-" " " | title }}"
date = {{ .Date }}
draft = true
# kategorie: "News" oder "Spielbericht"
kategorie = "News"
# nur Spielbericht (optional):
# mannschaft = "Herren"
# ergebnis = "PSV 28 : 24 Gegner"
kurztext = ""
+++

Text des Beitrags (Markdown).
Ein Titelbild legst du als `cover.jpg` in denselben Ordner (optional).
