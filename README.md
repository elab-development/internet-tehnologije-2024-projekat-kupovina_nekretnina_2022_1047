## O Propertia

**Propertia** je savremena full-stack platforma za luksuzne nekretnine razvijena korišćenjem React-a na frontendu i Laravel-a na backend-u. Naš cilj je da redefinišemo način na koji kupci, agenti i administratori pristupaju i upravljaju nekretninama — od pretraživanja najmodernijih vila i penthausa, preko praćenja sopstvenih kupovina, do analize ukupnih podataka o transakcijama u realnom vremenu.

![Logo](./images/logo.png)

### Frontend arhitektura

Frontend čini **React** SPA (single-page application) u kome za navigaciju koristimo **React Router**, za HTTP zahteve **Axios**, a za interaktivne grafikone **Recharts**. UI smo podelili na modularne komponente: `Navbar`, `Home`, `OurAgents`, `Properties`, `MyPurchases` i dr. Svaka komponenta ima jasno definisanu odgovornost, a stanje aplikacije održavamo standardnim React hook-ovima (`useState`, `useEffect`). Token za autentifikaciju i uloga korisnika (`buyer` ili `admin`) čuvaju se u `sessionStorage`, što omogućava očuvanje sesije i nakon osvežavanja stranice.

Stil aplikacije prati trend „glassmorphism-a“: poluprozirni paneli sa zamućenim pozadinama, debela tipografija i pune, efektne pozadine gradskih pejzaža. Korisnički interfejs je dodatno unapređen breadcrumb navigacijom, dugmetom „Back to Top“ i prilagodljivim menijem koji prikazuje posebne linkove za admin-a (npr. `/admin-dashboard`, `/admin-properties`) samo kada je uloga `admin`.

### Backend i API

Na serverskoj strani, koristimo **Laravel** sa **Sanctum** paketom za API token autentifikaciju. Kontroleri kao što su `NekretninaController` i `KupovinaController` izlažu RESTful rute (`index`, `show`, `store`, `update`, `destroy`), uz striktne provere pristupa (policy) na osnovu uloge korisnika. Kupci (`buyer`) mogu da vide i menjaju samo svoje kupovine, dok administratori (`admin`) imaju dodatnu rutu `/api/kupovine/metrics` za preuzimanje agregiranih statistika o svim transakcijama.

Podaci se čuvaju u MySQL bazi, a Eloquent modeli definišu entitete `User`, `Agent`, `Nekretnina` i `Kupovina`. Validacija zahteva se obavlja u kontrolerima, a JSON resursi (`KupovinaResource`, `NekretninaResource`) formiraju konzistentan odgovor za frontend.

### Ključne funkcionalnosti

- **Role-Based Access Control**  
  - *Gost* (neulogovan) može da pretražuje nekretnine, gleda profile agenata i pregleda mape sa lokacijama.  
  - *Kupac* (`buyer`) se registruje i prijavljuje, podnosi zahteve za kupovinu nekretnine, menja ili otkazuje sopstvene kupovine i prati njihov status u sekciji “My Purchases”.  
  - *Administrator* (`admin`) pristupa Admin Dashboard-u gde vidi ukupan broj kupovina, sumu potrošenih sredstava i preglede po statusima (Pending, Completed, Canceled, Rejected) i načinu plaćanja (Card, Cash, Credit). Takođe može da upravlja katalozima nekretnina putem interfejsa “Admin Properties”.

- **Interaktivne vizualizacije**  
  Sa **Recharts** bibliotekomm prikazujemo bar i pie grafikone na osnovu podataka iz Laravel-ove rute `/kupovine/metrics`. Boje i tooltip-ovi su prilagođeni kako bi administratori brže i lakše sagledali trende u kupovinama.

- **Responsivni i atraktivni UI**  
  Sve stranice su optimizovane za mobilne uređaje, tablete i desktop. Efekti zamućene pozadine, glatki scroll i ambijentalne fotografije skyline-a čine korisničko iskustvo modernim i angažujućim.

---
Instalacija i pokretanje
---------------------------

1. Klonirajte repozitorijum:
```bash
    git clone https://github.com/elab-development/internet-tehnologije-2024-projekat-kupovina_nekretnina_2022_1047.git
```
2. Pokrenite backend:
```bash
   cd nekretnine-be
   composer install
   php artisan migrate:fresh --seed
   php artisan serve
```
    
3. Pokrenite frontend:
```bash
   cd nekretnine-fe
   npm install
   npm start
```
    
4.  Frontend pokrenut na: [http://localhost:3000](http://localhost:3000) Backend API pokrenut na: [http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)