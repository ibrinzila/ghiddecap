# Ghid de Deploy Pas cu Pas

## Tot ce ai nevoie pentru a publica ghidul colaborativ

**Timp estimat:** 20-30 minute
**Cost:** 0 lei (toate serviciile au plan gratuit)
**Cunostinte necesare:** Navigare web de baza

---

## Ce vei avea la final

✅ Un site public unde oricine poate citi ghidul
✅ Editare vizuala direct in browser (fara cod)
✅ Modificarile creeaza automat propuneri de revizuire
✅ Pagina cu propunerile comunitatii
✅ Totul gratuit si pe termen lung

---

## PASUL 1: Creeaza cont GitHub (5 minute)

GitHub este locul unde "locuieste" ghidul tau. Gandeste-te la el ca la un Google Drive pentru cod si documente.

### Instructiuni:

1. Deschide [github.com](https://github.com)
2. Click **"Sign up"** (colt dreapta sus)
3. Completeaza:
   - Email-ul tau
   - O parola sigura
   - Un username (ex: `ion-brinzila` sau `ghid-moldova`)
4. Rezolva puzzle-ul de verificare
5. Confirma email-ul (verifica si Spam)

**Ai terminat cand:** Esti logat si vezi dashboard-ul GitHub

---

## PASUL 2: Creeaza un repository nou (2 minute)

Repository = un "folder" pe GitHub unde sta proiectul tau.

### Instructiuni:

1. Click pe **"+"** (colt dreapta sus, langa poza de profil)
2. Alege **"New repository"**
3. Completeaza:
   - **Repository name:** `ghid-jurnalist-coeziune-sociala`
   - **Description:** `Ghid colaborativ pentru jurnalisti - Coeziune Sociala`
   - **Visibilitate:** Selecteaza **Public** ⚠️ (important pentru TinaCMS gratuit!)
   - **NU** bifa "Add a README file"
4. Click **"Create repository"**

**Ai terminat cand:** Vezi o pagina goala cu instructiuni de "Quick setup"

---

## PASUL 3: Incarca fisierele proiectului (5 minute)

### Instructiuni:

1. **Descarca** ZIP-ul cu proiectul complet (link mai jos)
2. **Extrage** ZIP-ul pe calculatorul tau
3. Pe pagina GitHub a repository-ului tau, gaseste textul "uploading an existing file" si click pe el
4. **Trage** TOATE fisierele si folderele din folderul extras in zona de upload
   - Asigura-te ca incluzi: `app/`, `components/`, `content/`, `tina/`, `public/`
   - Si fisierele: `package.json`, `next.config.js`, `tailwind.config.js`, etc.
5. Asteapta sa se incarce toate (poate dura 1-2 minute)
6. La "Commit changes", lasa mesajul default
7. Click **"Commit changes"**

**Ai terminat cand:** Vezi toate fisierele listate pe pagina repository-ului

---

## PASUL 4: Conecteaza Vercel pentru hosting (5 minute)

Vercel este serviciul care face site-ul tau vizibil pe internet.

### Instructiuni:

1. Deschide [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Alege **"Continue with GitHub"**
4. Autorizeaza Vercel sa acceseze GitHub-ul tau
5. Click **"Add New..."** → **"Project"**
6. Gaseste repository-ul `ghid-jurnalist-coeziune-sociala` si click **"Import"**
7. La configurare:
   - **Framework Preset:** ar trebui sa fie deja "Next.js"
   - **Root Directory:** lasa gol
   - Nu modifica nimic altceva
8. Click **"Deploy"**
9. **Asteapta 2-3 minute** pana vezi "Congratulations!"

**Ai terminat cand:** Ai un URL functional (ex: `ghid-jurnalist-abc.vercel.app`)

⚠️ **Site-ul va avea erori deocamdata** - e normal! Trebuie sa configuram TinaCMS.

---

## PASUL 5: Configureaza TinaCMS (10 minute)

TinaCMS este ce permite editarea vizuala direct pe site.

### Partea A: Creeaza cont Tina

1. Deschide [tina.io](https://tina.io)
2. Click **"Get Started"** sau **"Sign In"**
3. Alege **"Continue with GitHub"**
4. Autorizeaza accesul

### Partea B: Creeaza proiect Tina

1. In dashboard-ul Tina, click **"Create a Project"**
2. Alege **"Import Existing Repository"**
3. Selecteaza repository-ul `ghid-jurnalist-coeziune-sociala`
4. Click **"Create Project"**

### Partea C: Copiaza credentialele

Dupa ce proiectul e creat:
1. Mergi la **"Configuration"** sau **"Settings"** in Tina dashboard
2. Gaseste si copiaza:
   - **Client ID** (un sir lung de caractere)
   - **Token** (alt sir lung)

**Pastreaza-le deschise intr-un tab!**

### Partea D: Adauga credentialele in Vercel

1. Intoarce-te la [vercel.com](https://vercel.com)
2. Click pe proiectul tau `ghid-jurnalist-coeziune-sociala`
3. Mergi la **"Settings"** (tab sus)
4. In meniul din stanga, click **"Environment Variables"**
5. Adauga trei variabile (una cate una):

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | [lipeste Client ID de la Tina] |
| `TINA_TOKEN` | [lipeste Token de la Tina] |
| `NEXT_PUBLIC_GITHUB_REPO` | `USERNAME/ghid-jurnalist-coeziune-sociala` |

⚠️ La ultima variabila, inlocuieste `USERNAME` cu username-ul tau GitHub!

6. Dupa fiecare, click **"Save"**

### Partea E: Redeploy

1. Mergi la tab-ul **"Deployments"**
2. La cel mai recent deployment, click pe **cele 3 puncte** (...)
3. Alege **"Redeploy"**
4. Confirma
5. Asteapta 2-3 minute

---

## PASUL 6: Testeaza! (2 minute)

### Verifica site-ul:

1. Click pe URL-ul tau Vercel (ex: `ghid-jurnalist-abc.vercel.app`)
2. Ar trebui sa vezi homepage-ul ghidului
3. Navigheaza prin cateva pagini

### Verifica editarea:

1. Click pe **"Editeaza"** sau mergi la `[url-ul-tau]/admin`
2. Ar trebui sa vezi interfata TinaCMS
3. Fa o mica modificare de test
4. Salveaza

### Verifica propunerile:

1. Mergi pe GitHub la repository-ul tau
2. Click pe tab-ul **"Pull requests"**
3. Ar trebui sa vezi modificarea ta ca propunere noua!

---

## Gata! 🎉

Acum ai:
- ✅ Un site public cu ghidul
- ✅ Editare vizuala pentru oricine
- ✅ Sistem de propuneri prin GitHub Pull Requests
- ✅ Tot gratuit!

### Pasii urmatori:

1. **Partajeaza URL-ul** cu colegii jurnalisti
2. **Personalizeaza** - schimba domeniul, adauga logo, etc.
3. **Invita** primii contributori sa testeze editarea
4. **Stabileste** cine va fi steward (moderator de proces)

---

## Probleme Frecvente

### "Nu vad butonul de editare"
→ Verifica ca ai adaugat corect variabilele de mediu in Vercel si ai facut redeploy

### "Eroare la salvare"
→ Verifica ca Token-ul din Tina e corect copiat (fara spatii extra)

### "Site-ul nu se incarca"
→ Asteapta 5 minute si incearca din nou. Vercel poate avea un mic delay.

### "Modificarea nu apare pe site"
→ E normal! Modificarile devin Pull Requests care trebuie aprobate (merged) pe GitHub

---

## Ajutor

Daca te blochezi:
- Scrie in sectiunea Issues pe GitHub
- Contacteaza comunitatea Clubului de Presa

---

*Ghid creat pentru Clubul de Presa "Coeziunea Sociala in Practica" | UNFPA Moldova | Decembrie 2025*
