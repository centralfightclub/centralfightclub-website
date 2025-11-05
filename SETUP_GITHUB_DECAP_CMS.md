# 🚀 Decap CMS Setup - Schritt für Schritt

## Schritt 1: GitHub Repository erstellen

1. Gehen Sie zu **github.com** und loggen Sie sich ein
2. Klicken Sie auf **"New repository"** (grüner Button)
3. Repository Name: `centralfightclub-website` (oder beliebig)
4. **WICHTIG**: Wählen Sie **"Public"** (für kostenloses Git Gateway)
5. Klicken Sie **"Create repository"**

## Schritt 2: Code zu GitHub hochladen

### Option A: GitHub Desktop (Einfachste Methode)
1. Laden Sie GitHub Desktop herunter: https://desktop.github.com/
2. Installieren Sie es
3. Öffnen Sie GitHub Desktop
4. Klicken Sie **"File" → "Add Local Repository"**
5. Wählen Sie Ihren Website-Ordner aus
6. Klicken Sie **"Publish repository"**
7. Wählen Sie das Repository aus, das Sie erstellt haben

### Option B: Git Command Line
```bash
cd "Ihr Website Ordner"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/IHR_USERNAME/centralfightclub-website.git
git push -u origin main
```

## Schritt 3: Decap CMS HTML Seite erstellen

Ich erstelle jetzt eine `admin.html` Datei, die Decap CMS lädt.

## Schritt 4: Netlify Setup (für Git Gateway)

1. Gehen Sie zu **netlify.com**
2. Klicken Sie **"Sign up"** (kostenlos)
3. Wählen Sie **"GitHub"** als Login-Methode
4. Autorisieren Sie Netlify Zugriff auf GitHub
5. Klicken Sie **"Add new site" → "Import an existing project"**
6. Wählen Sie Ihr GitHub Repository
7. Klicken Sie **"Deploy site"**

## Schritt 5: Git Gateway aktivieren

1. In Netlify Dashboard: **Site settings** → **Identity**
2. Klicken Sie **"Enable Identity"**
3. Scrollen Sie zu **"Git Gateway"**
4. Klicken Sie **"Enable Git Gateway"**
5. Warten Sie ein paar Sekunden

## Schritt 6: Admin Zugriff testen

1. Gehen Sie zu: `https://IHR-SITE.netlify.app/admin/`
2. Klicken Sie **"Login with GitHub"**
3. Sie sollten jetzt das CMS sehen!

## ✅ Fertig!

Ihr Admin ist jetzt online und funktioniert mit GitHub!

