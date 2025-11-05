# 🚀 Netlify Setup - Schritt für Schritt

## Schritt 1: Netlify Account erstellen
1. Gehen Sie zu **netlify.com**
2. Klicken Sie **"Sign up"**
3. Wählen Sie **"GitHub"** als Login-Methode
4. Autorisieren Sie Netlify Zugriff auf Ihr GitHub Account

## Schritt 2: Repository verbinden
1. Im Netlify Dashboard: Klicken Sie **"Add new site"**
2. Wählen Sie **"Import an existing project"**
3. Klicken Sie **"Deploy with GitHub"**
4. Wählen Sie Ihr Repository: **`centralfightclub/centralfightclub-website`**
5. **Build settings:**
   - **Build command:** (leer lassen)
   - **Publish directory:** `.` (Punkt)
6. Klicken Sie **"Deploy site"**

## Schritt 3: Git Gateway aktivieren (WICHTIG!)
1. Im Netlify Dashboard: Klicken Sie auf Ihren Site-Namen
2. Gehen Sie zu **"Site settings"** (oben rechts)
3. Klicken Sie auf **"Identity"** (links im Menü)
4. Klicken Sie auf **"Enable Identity"** (Button oben)
5. Scrollen Sie nach unten zu **"Services"**
6. Unter **"Git Gateway"** klicken Sie **"Enable Git Gateway"**
7. Warten Sie 10-20 Sekunden bis es aktiviert ist

## Schritt 4: Admin testen
1. Gehen Sie zu: `https://IHR-SITE-NAME.netlify.app/admin/`
   - (Ihr Site-Name steht im Netlify Dashboard)
2. Sie sollten ein Login-Fenster sehen
3. Klicken Sie **"Login with GitHub"**
4. Autorisieren Sie den Zugriff
5. Sie sollten jetzt das Decap CMS sehen!

## Schritt 5: Admin-Link auf Website hinzufügen (Optional)
Sie können einen Link zum Admin auf Ihrer Website hinzufügen:
- Link: `https://IHR-SITE-NAME.netlify.app/admin/`
- Oder: `/admin/` (relativer Link)

## ✅ Fertig!

Ihr Admin ist jetzt online und funktioniert mit GitHub!

## Troubleshooting

**Problem: "Git Gateway" Button ist nicht sichtbar?**
- Warten Sie 1-2 Minuten nach "Enable Identity"
- Seite neu laden
- Falls immer noch nicht: Site neu deployen

**Problem: Login funktioniert nicht?**
- Stellen Sie sicher, dass Git Gateway aktiviert ist
- Prüfen Sie, ob Sie GitHub-Zugriff erlaubt haben

**Problem: CMS zeigt keine Daten?**
- Prüfen Sie, ob die `admin/config.yml` im Repository ist
- Stellen Sie sicher, dass der Branch "main" ist

