# Ghidul Jurnalistului pentru Coeziunea Sociala

Un ghid colaborativ pentru jurnalistii din Moldova, construit impreuna de comunitate.

🌐 **Demo:** [URL va fi adaugat dupa deploy]

## Despre

Acest ghid ofera instrumente practice pentru jurnalistii care doresc sa raporteze despre subiecte sensibile intr-un mod care intareste coeziunea sociala, fara a compromite rigoarea editoriala.

**Caracteristici:**
- 📝 Editare vizuala direct in browser (via TinaCMS)
- 🤝 Sistem de propuneri si guvernanta colaborativa
- 🔄 Toate modificarile creeaza Pull Requests pentru revizuire
- 📱 Design responsive pentru mobil si desktop

## Deployment Rapid (15-20 minute)

### Pasul 1: Creeaza cont GitHub
Daca nu ai deja, mergi la [github.com](https://github.com) si creeaza un cont gratuit.

### Pasul 2: Creeaza repository-ul
1. Click pe butonul verde "+" in coltul din dreapta sus
2. Alege "New repository"
3. Nume: `ghid-jurnalist-coeziune-sociala`
4. Visibilitate: **Public** (necesar pentru TinaCMS gratuit)
5. Click "Create repository"

### Pasul 3: Incarca fisierele
Metoda simpla (drag & drop):
1. Pe pagina noului repository, click "uploading an existing file"
2. Trage tot continutul acestui folder in browser
3. Click "Commit changes"

### Pasul 4: Conecteaza Vercel
1. Mergi la [vercel.com](https://vercel.com) si fa login cu GitHub
2. Click "Add New Project"
3. Importa repository-ul `ghid-jurnalist-coeziune-sociala`
4. Framework Preset: Next.js (ar trebui detectat automat)
5. Click "Deploy"
6. Asteapta 2-3 minute pana se finalizeaza

### Pasul 5: Configureaza TinaCMS
1. Mergi la [tina.io](https://tina.io) si creeaza cont (gratuit)
2. Click "Create a new project"
3. Conecteaza-l la repository-ul tau GitHub
4. Copiaza `Client ID` si `Token` generate
5. In Vercel, mergi la Settings → Environment Variables
6. Adauga:
   - `NEXT_PUBLIC_TINA_CLIENT_ID` = [Client ID de la Tina]
   - `TINA_TOKEN` = [Token de la Tina]
   - `NEXT_PUBLIC_GITHUB_REPO` = `username-ul-tau/ghid-jurnalist-coeziune-sociala`
7. Redeploy proiectul (Deployments → click pe cele 3 puncte → Redeploy)

### Pasul 6: Testeaza
1. Viziteaza URL-ul tau Vercel (ex: `ghid-jurnalist-xyz.vercel.app`)
2. Click pe "Editeaza" pentru a accesa editorul vizual
3. Fa o modificare de test si salveaza
4. Verifica ca s-a creat un Pull Request pe GitHub

## Structura Proiectului

```
├── app/                    # Paginile Next.js
│   ├── page.tsx           # Homepage
│   ├── ghid/[slug]/       # Paginile ghidului
│   ├── propuneri/         # Pagina cu propuneri
│   └── guvernanta/        # Pagina de guvernanta
├── components/            # Componente React reutilizabile
├── content/               # Continutul in Markdown
│   ├── ghid/             # Sectiunile ghidului
│   └── guvernanta/       # Documentele de guvernanta
├── tina/                  # Configuratia TinaCMS
└── public/               # Fisiere statice
```

## Dezvoltare Locala

```bash
# Instaleaza dependentele
npm install

# Porneste serverul de dezvoltare
npm run dev

# Deschide http://localhost:3000
```

## Guvernanta

Acest ghid foloseste un model de guvernanta bazat pe consens:
- Oricine poate propune modificari
- Propunerile stau deschise 14 zile pentru feedback
- Daca nu exista obiectii substantiale, sunt integrate
- Stewarzii faciliteaza procesul, nu decid continutul

Citeste [Cum Decidem Impreuna](/guvernanta) pentru detalii complete.

## Contributii

Contributiile sunt binevenite! Poti:
- Edita direct prin interfata web (click "Editeaza")
- Deschide un Issue pentru intrebari sau sugestii
- Trimite un Pull Request cu imbunatatiri

## Licenta

Continutul este disponibil sub [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

## Contact

Proiect initiat in cadrul Clubului de Presa "Coeziunea sociala in practica" | UNFPA Moldova | Decembrie 2025
