# 🏛️ Analiza Odnosa i Sastav Gradskog Vijeća Rijeke (2026)

Interaktivni mrežni graf za analizu političkih odnosa, koalicija, suradnji i raspodjele vijećnika u **Gradskom vijeću Rijeke**.

---

## 📊 Pregled Sastava i Moći (Stranke)

Politički akteri i njihova relativna snaga (ponderirana prema utjecaju i broju vijećnika):

| Oznaka | Politička Stranka / Grupa | Relativni Utjecaj (Težina) | Broj Vijećnika u Mreži | Opis |
| :--- | :--- | :---: | :---: | :--- |
| **SDP** | Socijaldemokratska partija | 25 | 3 | Glavna vladajuća struja |
| **HDZ** | Hrvatska demokratska zajednica | 20 | 4 | Najveća oporbena stranka |
| **Možemo!** | Možemo! - Politička platforma | 15 | 3 | Koalicijski partner / suradnja |
| **PGS** | Primorsko goranski savez | 15 | 2 | Regionalni partner u koaliciji |
| **Nezavisni** | Nezavisni / Nestranački vijećnici | 15 | 6 | Ključni jezičac na vagi |
| **Most** | Most nezavisnih lista | 12 | 1 | Desna oporba |
| **AM** | Akcija mladih | 12 | 2 | Progresivna oporba i suradnja |
| **Centar** | Centar | 10 | 2 | Liberalna opcija |
| **Alternativa**| Alternativa 101 | 10 | 2 | Građanska platforma |
| **UK** | Unija Kvarnera | 10 | 2 | Regionalni nezavisni blok |
| **HSU** | Hrvatska stranka umirovljenika | 10 | 2 | Socijalni partneri |
| **Fokus** | Fokus | 8 | 1 | Liberalni vijećnik |
| **IDS** | Istarski demokratski sabor | 8 | 1 | Regionalna potpora |
| **RI** | Lista za Rijeku | 8 | 1 | Gradska opcija |

---

## 👥 Registar i Pripadnost Vijećnika (31 Vijećnik)

Popis svih vijećnika aktivnih u sustavu i njihove službene stranačke pripadnosti ili klubovi:

### 🔴 SDP (3 vijećnika u mreži)
*   **Irena Bolf** (vijećnica)
*   **Ivana Prica Matijaš** (vijećnica)
*   **Luka Čanković** (vijećnik)

### 🔵 HDZ (4 vijećnika u mreži)
*   **Josip Ostrogović** (vijećnik)
*   **Katarina Matak Radoš** (vijećnica)
*   **Marko Smojver** (vijećnik)
*   **Miljenko Kovačević** (vijećnik)

### 🟢 Možemo! (3 vijećnika u mreži)
*   **Hana Paleka** (vijećnica)
*   **Nebojša Zelič** (vijećnik)
*   **Renato Stanković** (vijećnik)

### 🟡 PGS (2 vijećnika u mreži)
*   **Ana Trošelj** (vijećnica)
*   **Tea Mičić Badurina** (vijećnica)

### 🟣 Akcija mladih - AM (2 vijećnika u mreži)
*   **Robert Kurelić** (vijećnik)
*   **Anet Trope Ćavar** (vijećnica)

### ⚪ Nezavisni / Nestranački (6 vijećnika u mreži)
*   **Tanja Savić** (vijećnica)
*   **Jelena Biondić** (vijećnica)
*   **Enea Dessardo** (vijećnik)
*   **Leonardo Matković** (vijećnik)
*   **Stefan Mataja Mafrici** (vijećnik)
*   **Marinko Koljanin** (vijećnik)

### 🍊 Ostale Stranke i Nezavisni Klubovi (11 vijećnika)
*   **Igor Vlajnić** (vijećnih - *Centar*)
*   **Marin Račić** (vijećnik - *Centar*)
*   **Maša Magzan** (vijećnica - *Alternativa 101*)
*   **Sanjin Matijević** (vijećnik - *Alternativa 101*)
*   **Marino Mataija** (vijećnik - *Unija Kvarnera*)
*   **Robert Salečić** (vijećnik - *Unija Kvarnera*)
*   **Damir Mikuličić** (vijećnik - *HSU*)
*   **Višnja Jelenčić** (vijećnica - *HSU*)
*   **Andro Amančić** (vijećnik - *Fokus*)
*   **Petra Mandić** (vijećnica - *Most*)
*   **Predrag Miletić** (vijećnik - *Lista za Rijeku*)
*   **Srđan Srdoč** (vijećnik - *IDS*)

---

## 🤝 Analiza i Snaga Političkih Veza (Korelacije)

Aplikacija vizualno indicira snagu odnosa među entitetima koristeći debljinu i opacity linija (veza):

1.  **Čvrsta Koalicija (Snaga: 4, Debela tamnoplava isprekidana linija)**
    *   **SDP ↔ PGS** (Vladajuća programska koalicija)
    *   **SDP ↔ HSU** (Tradicionalna koalicijska suradnja)
2.  **Suradnja i Povezanost (Snaga: 3, Srednje debela plava isprekidana linija)**
    *   **SDP ↔ IDS** (Bliski politički spektar)
    *   **PGS ↔ HSU** (Sinergija unutar vladajućeg bloka)
    *   **Možemo! ↔ SDP** (Programska podrška / suradnja na projektima)
    *   **AM (Akcija mladih) ↔ UK (Unija Kvarnera)** (Zajednički regionalni blok)
    *   **AM (Akcija mladih) ↔ Alternativa** (Progresivni oporbeni blok)
    *   **Nezavisni ↔ AM** (Povezanost oko lokalnih inicijativa)
    *   **Centar ↔ Alternativa** (Srodne liberalne/reformske ideje)
    *   **HDZ ↔ Most** (Usklađeno djelovanje desne i konzervativne oporbe)
3.  **Članstvo vijećnika (Snaga: 2, Tanka svijetlo-siva linija)**
    *   Izravne spone vijećnika prema njihovim matičnim strankama ili klubovima.

---

## 🎨 Vizualni Identitet i Interakcije u Aplikaciji

*   **Subtilna Pozadinska Slika (`/public/council_bg.png`)**: Visokokvalitetni apstraktni dizajn mrežnih čvorova s blagim plavim i sivim tonovima, savršeno stopljen s elementima sučelja.
*   **Klik i Lebdenje (Hover) s Efektima**: 
    *   *Hover*: Postavljanjem pokazivača na čvor prigušuju se svi nepovezani čvorovi i linije, ističući neposrednu mrežu utjecaja tog političkog aktera.
    *   *Klik*: Pokreće finu animaciju privremenog pulsiranja veličine čvora i otvara detaljnu karticu profile s popisom svih individualnih interakcija i pripadajućih suradnji.
