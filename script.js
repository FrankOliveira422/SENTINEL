/* =========================================================
   SENTINEL — GLOBAL CONFLICT MONITOR
   script.js — Map logic, data, and UI interactions
   ========================================================= */

'use strict';

// ── CONFLICT DATASET (55+ conflicts) ─────────────────────────

const CONFLICTS = [
  // ── MILITARY WARS ──
  {
    id: 1,
    name: "Russia–Ukraine War",
    country: "Ukraine",
    region: "Eastern Europe",
    type: "war",
    intensity: "high",
    lat: 48.9, lng: 32.5,
    shape: "polygon",
    polygonCoords: [[52.3,31.8],[52.1,33.5],[51.0,35.2],[50.0,36.9],[49.0,38.2],[47.9,39.1],[47.2,37.5],[47.5,35.0],[48.0,33.5],[48.9,31.8],[49.5,30.5],[50.3,30.2],[51.0,30.8],[52.3,31.8]],
    actors: ["Russian Armed Forces","Ukrainian Armed Forces","Wagner Group","NATO advisors","Territorial Defense Forces"],
    fighters: "~750,000+",
    casualties: "~500,000+ (est.)",
    start: "Feb 2022",
    status: "ACTIVE",
    events: [
      "Continuous artillery exchanges across 1,000+ km front line",
      "Drone warfare escalating on both sides",
      "International military aid packages ongoing"
    ],
    summary: "Largest land war in Europe since WWII. Russia launched full-scale invasion of Ukraine in February 2022. Major battles ongoing in Zaporizhzhia, Kherson, Donetsk and Kharkiv oblasts. Both sides suffering significant attrition.",
    links: ["https://www.bbc.com/news/ukraine", "https://www.acleddata.com"]
  },
  {
    id: 2,
    name: "Gaza Conflict",
    country: "Palestinian Territories",
    region: "Middle East",
    type: "war",
    intensity: "high",
    lat: 31.5, lng: 34.47,
    shape: "polygon",
    polygonCoords: [[31.9,34.2],[31.9,34.5],[31.5,34.6],[31.2,34.5],[31.2,34.3],[31.5,34.2],[31.9,34.2]],
    actors: ["Israel Defense Forces (IDF)","Hamas","Islamic Jihad","Hezbollah (Lebanon front)"],
    fighters: "~100,000+",
    casualties: "~50,000+ (est.)",
    start: "Oct 2023",
    status: "ACTIVE",
    events: [
      "Ground operations ongoing in Gaza Strip",
      "Humanitarian corridors disputed",
      "Regional escalation with Lebanon front"
    ],
    summary: "Following Hamas attacks on October 7, 2023, Israel launched a major military campaign in Gaza. Urban warfare ongoing in Gaza City and Rafah. Significant civilian casualties and humanitarian crisis reported by UN agencies.",
    links: ["https://www.un.org/unrwa", "https://www.bbc.com/news/middle-east"]
  },
  {
    id: 3,
    name: "Sudan Civil War",
    country: "Sudan",
    region: "Northeast Africa",
    type: "civil",
    intensity: "high",
    lat: 15.5, lng: 32.5,
    shape: "polygon",
    polygonCoords: [[17.5,25.0],[17.5,38.0],[14.0,36.0],[12.0,34.0],[11.0,33.0],[12.0,25.0],[17.5,25.0]],
    actors: ["Sudanese Armed Forces (SAF)","Rapid Support Forces (RSF)","SPLM-N","Civilian militias"],
    fighters: "~200,000+",
    casualties: "~150,000+ (est.)",
    start: "Apr 2023",
    status: "ACTIVE",
    events: [
      "RSF controls large parts of Khartoum and Darfur",
      "Mass displacement reaching 10+ million people",
      "Famine conditions declared in multiple regions"
    ],
    summary: "Power struggle between SAF and RSF erupted April 2023. Fighting has spread across Sudan. Darfur experiencing ethnic violence reminiscent of 2000s genocide. World's largest displacement crisis.",
    links: ["https://www.unhcr.org", "https://www.acleddata.com"]
  },
  {
    id: 4,
    name: "Myanmar Civil War",
    country: "Myanmar",
    region: "Southeast Asia",
    type: "civil",
    intensity: "high",
    lat: 20.0, lng: 96.0,
    shape: "polygon",
    polygonCoords: [[28.0,92.0],[27.0,98.0],[24.0,98.5],[20.0,100.0],[16.0,98.5],[15.0,97.5],[16.0,94.0],[20.0,92.5],[24.0,91.0],[28.0,92.0]],
    actors: ["Tatmadaw (Military Junta)","People's Defence Force (PDF)","Arakan Army","KIA","MNDAA","TNLA"],
    fighters: "~200,000+",
    casualties: "~50,000+ (est.)",
    start: "Feb 2021",
    status: "ACTIVE",
    events: [
      "Resistance forces seize major towns in Shan and Rakhine states",
      "Junta airstrikes targeting civilian populations",
      "Chinese border crossings contested"
    ],
    summary: "Military coup February 2021 sparked nationwide armed resistance. Coalition of ethnic armed organizations and pro-democracy forces (PDF) fighting the Tatmadaw. Resistance making significant territorial gains since late 2023.",
    links: ["https://www.irrawaddy.com", "https://www.reuters.com"]
  },
  {
    id: 5,
    name: "Ethiopian – Tigray Aftermath",
    country: "Ethiopia",
    region: "Horn of Africa",
    type: "civil",
    intensity: "medium",
    lat: 14.0, lng: 38.5,
    shape: "point",
    actors: ["Ethiopian National Defense Force","TPLF remnants","Amhara Fano militias","Oromo Liberation Army"],
    fighters: "~80,000",
    casualties: "~300,000+ (est.)",
    start: "Nov 2020",
    status: "CEASEFIRE / FRAGILE",
    events: [
      "Ceasefire holding but tensions remain",
      "Amhara region experiencing new unrest",
      "Humanitarian access still restricted in areas"
    ],
    summary: "Tigray War officially ended Nov 2022. Fragile peace holds in Tigray but Amhara and Oromia regions experiencing renewed violence. Humanitarian situation remains critical with famine conditions.",
    links: ["https://www.bbc.com/news/ethiopia"]
  },
  // ── MIDDLE EAST ──
  {
    id: 6,
    name: "Yemen Civil War",
    country: "Yemen",
    region: "Arabian Peninsula",
    type: "civil",
    intensity: "high",
    lat: 15.5, lng: 47.0,
    shape: "polygon",
    polygonCoords: [[18.0,42.5],[18.0,53.0],[12.5,52.0],[12.0,45.0],[12.5,43.0],[14.0,42.0],[16.0,42.5],[18.0,42.5]],
    actors: ["Houthi Movement (Ansar Allah)","Yemeni Government (IRG)","Saudi-Led Coalition","UAE-backed STC","Al-Qaeda AQAP"],
    fighters: "~250,000+",
    casualties: "~400,000+ (est.)",
    start: "2014",
    status: "ACTIVE",
    events: [
      "Houthi attacks on Red Sea shipping continue",
      "US/UK strikes on Houthi positions",
      "UN peace talks stalled"
    ],
    summary: "Nine-year conflict beginning with Houthi takeover of Sana'a. Saudi-led coalition intervention in 2015. Houthis control northern Yemen, government controls south. World's worst humanitarian crisis according to UN.",
    links: ["https://www.un.org/yemen", "https://www.acleddata.com"]
  },
  {
    id: 7,
    name: "Syrian Civil War",
    country: "Syria",
    region: "Levant",
    type: "civil",
    intensity: "medium",
    lat: 35.0, lng: 38.0,
    shape: "polygon",
    polygonCoords: [[37.3,36.5],[37.5,42.0],[34.0,41.5],[33.0,38.5],[32.5,36.0],[34.0,35.5],[35.5,35.7],[37.3,36.5]],
    actors: ["Syrian Government (Assad)","HTS (Hayat Tahrir al-Sham)","SDF/YPG","Turkish-backed TFSA","ISIS remnants","Iranian militias"],
    fighters: "~150,000+",
    casualties: "~500,000+ (est.)",
    start: "2011",
    status: "FRAGMENTED",
    events: [
      "HTS offensive gains significant territory",
      "Turkish operations in northeast continuing",
      "ISIS sleeper cells active in desert regions"
    ],
    summary: "Over a decade of civil war. Territory fragmented between Assad government, HTS (northwest), SDF (northeast), and Turkish-controlled zones. New HTS offensive launched late 2024.",
    links: ["https://www.ohchr.org/syria"]
  },
  {
    id: 8,
    name: "Iraq – ISIS Insurgency",
    country: "Iraq",
    region: "Mesopotamia",
    type: "insurgency",
    intensity: "medium",
    lat: 33.5, lng: 43.0,
    shape: "point",
    actors: ["Iraqi Security Forces","Popular Mobilization Units","ISIS/Daesh remnants","Kurdish Peshmerga"],
    fighters: "~10,000 (ISIS est.)",
    casualties: "~200,000+ (since 2014)",
    start: "2013",
    status: "ONGOING INSURGENCY",
    events: [
      "ISIS sleeper cell attacks continue in Diyala and Kirkuk",
      "US forces targeted by Iran-backed militias",
      "Joint Iraqi-US counter-terrorism operations"
    ],
    summary: "Despite territorial defeat of ISIS caliphate in 2019, insurgency continues through guerrilla attacks. ISIS maintains significant capacity in Hamrin mountains area.",
    links: ["https://www.reuters.com/world/middle-east"]
  },
  {
    id: 9,
    name: "Lebanon–Israel Conflict",
    country: "Lebanon",
    region: "Levant",
    type: "war",
    intensity: "high",
    lat: 33.5, lng: 35.5,
    shape: "point",
    actors: ["Hezbollah","Israel Defense Forces","Lebanese Armed Forces"],
    fighters: "~100,000+",
    casualties: "~5,000+ (recent phase)",
    start: "Oct 2023",
    status: "CEASEFIRE / FRAGILE",
    events: [
      "Ceasefire agreed November 2024",
      "IDF operations continuing in buffer zones",
      "Hezbollah rebuilding in south Lebanon"
    ],
    summary: "Escalation from Gaza conflict spilled into Lebanon. Major IDF operations in south Lebanon. Ceasefire brokered but fragile. Hezbollah significantly degraded.",
    links: ["https://www.reuters.com"]
  },
  // ── AFRICA ──
  {
    id: 10,
    name: "Sahel – Mali Insurgency",
    country: "Mali",
    region: "West Africa / Sahel",
    type: "insurgency",
    intensity: "high",
    lat: 17.0, lng: -3.0,
    shape: "polygon",
    polygonCoords: [[22.0,-5.0],[22.0,4.0],[15.0,4.0],[10.0,1.0],[12.0,-5.0],[17.0,-5.0],[22.0,-5.0]],
    actors: ["JNIM (al-Qaeda affiliate)","ISGS (ISIS Sahel)","Russian Wagner/Africa Corps","Malian Armed Forces (FAMa)","ISWAP"],
    fighters: "~20,000+",
    casualties: "~40,000+ (since 2012)",
    start: "2012",
    status: "ACTIVE",
    events: [
      "Wagner/Africa Corps supporting Malian military",
      "JNIM major offensive in Bamako environs",
      "Mass atrocity reports from Moura and Ogossagou"
    ],
    summary: "Sahel insurgency spreading across Mali, Burkina Faso and Niger. French forces expelled; Russian Wagner Group now dominant foreign force. JNIM controls vast rural territories.",
    links: ["https://www.crisisgroup.org"]
  },
  {
    id: 11,
    name: "Burkina Faso Insurgency",
    country: "Burkina Faso",
    region: "West Africa / Sahel",
    type: "insurgency",
    intensity: "high",
    lat: 12.5, lng: -1.5,
    shape: "polygon",
    polygonCoords: [[15.0,-5.0],[15.0,2.5],[11.0,2.5],[9.5,0.0],[9.5,-3.5],[11.0,-5.0],[15.0,-5.0]],
    actors: ["JNIM","ISGS","Burkinabè Armed Forces","VDP (civilian self-defense)","Wagner/Africa Corps"],
    fighters: "~15,000+",
    casualties: "~25,000+ (est.)",
    start: "2015",
    status: "ACTIVE",
    events: [
      "Government controls less than 60% of territory",
      "Mass food insecurity in besieged towns",
      "Djibo under prolonged siege"
    ],
    summary: "Jihadist insurgency has overwhelmed Burkinabe state. Junta governments replaced each other twice. Russian forces arrived 2023. UN estimates 2M+ internally displaced.",
    links: ["https://www.crisisgroup.org"]
  },
  {
    id: 12,
    name: "Niger Delta Conflict",
    country: "Nigeria",
    region: "West Africa",
    type: "insurgency",
    intensity: "medium",
    lat: 5.5, lng: 6.0,
    shape: "point",
    actors: ["Nigerian Military","IPOB","ESN (Eastern Security Network)","Militant groups"],
    fighters: "~5,000+",
    casualties: "~3,000+ (annual est.)",
    start: "Ongoing",
    status: "ACTIVE",
    events: [
      "Pipeline sabotage incidents increasing",
      "IPOB declaring sit-at-home orders",
      "Security forces conducting anti-insurgency operations"
    ],
    summary: "Long-running insurgency in southeastern Nigeria combining Igbo separatism (IPOB/ESN), oil militant activity, and inter-communal violence in the Niger Delta.",
    links: ["https://www.crisisgroup.org"]
  },
  {
    id: 13,
    name: "Boko Haram / ISWAP – Lake Chad Basin",
    country: "Nigeria / Niger / Chad / Cameroon",
    region: "Lake Chad Basin",
    type: "terrorism",
    intensity: "high",
    lat: 12.5, lng: 13.5,
    shape: "polygon",
    polygonCoords: [[14.5,11.0],[14.5,15.5],[12.0,15.0],[10.5,14.0],[10.0,13.0],[11.0,11.0],[14.5,11.0]],
    actors: ["ISWAP (ISIS West Africa Province)","Boko Haram factions","Nigerian Army","Multinational Joint Task Force"],
    fighters: "~20,000+",
    casualties: "~40,000+ (since 2009)",
    start: "2009",
    status: "ACTIVE",
    events: [
      "ISWAP attacks on military bases in Northeast Nigeria",
      "Hostage-taking ongoing in border regions",
      "Multinational Joint Task Force operations"
    ],
    summary: "Islamist insurgency spanning four countries around Lake Chad basin. ISWAP (ISIS affiliate) now dominant over Boko Haram. Millions displaced. Protracted humanitarian emergency.",
    links: ["https://www.acleddata.com"]
  },
  {
    id: 14,
    name: "DRC – Eastern Congo Conflict",
    country: "Democratic Republic of Congo",
    region: "Great Lakes Africa",
    type: "civil",
    intensity: "high",
    lat: -1.5, lng: 28.5,
    shape: "polygon",
    polygonCoords: [[1.0,27.0],[1.0,30.0],[-1.0,30.5],[-3.0,29.5],[-4.0,28.0],[-3.0,26.5],[-1.0,27.0],[1.0,27.0]],
    actors: ["M23 (Rwanda-backed)","FARDC (Congolese Army)","FDLR","ADF","100+ armed groups","UN MONUSCO"],
    fighters: "~150,000+ (all groups)",
    casualties: "~6M+ (since 1990s)",
    start: "1996 (ongoing)",
    status: "ACTIVE ESCALATION",
    events: [
      "M23 captures Goma, major eastern city",
      "Rwanda accused of direct military involvement",
      "Massive displacement in North Kivu"
    ],
    summary: "World's most complex conflict involving 100+ armed groups. M23 resurgence backed by Rwanda has captured major territory. FARDC struggling to respond. UN peacekeepers withdrawing.",
    links: ["https://www.crisisgroup.org", "https://www.un.org/drc"]
  },
  {
    id: 15,
    name: "Somalia – Al-Shabaab",
    country: "Somalia",
    region: "Horn of Africa",
    type: "terrorism",
    intensity: "high",
    lat: 5.0, lng: 45.0,
    shape: "polygon",
    polygonCoords: [[11.5,40.5],[11.5,51.0],[5.0,50.0],[1.5,43.0],[1.5,41.0],[4.0,41.0],[7.0,41.0],[11.5,40.5]],
    actors: ["Al-Shabaab (al-Qaeda affiliate)","Somali National Army","ATMIS (AU forces)","US AFRICOM"],
    fighters: "~12,000+ (Al-Shabaab est.)",
    casualties: "~500,000+ (since 2006)",
    start: "2006",
    status: "ACTIVE",
    events: [
      "Al-Shabaab controls significant rural territory",
      "Bombings in Mogadishu continue",
      "US drone strikes targeting leadership"
    ],
    summary: "Al-Qaeda affiliate Al-Shabaab controls southern and central Somalia's rural areas despite losing cities. Regular bombings in Mogadishu. African Union mission transitioning out.",
    links: ["https://www.crisisgroup.org"]
  },
  {
    id: 16,
    name: "Mozambique – Cabo Delgado",
    country: "Mozambique",
    region: "Southern Africa",
    type: "insurgency",
    intensity: "high",
    lat: -12.5, lng: 40.5,
    shape: "point",
    actors: ["Ansar al-Sunna (ISIS-linked)","Mozambican Defense Forces","SADC Mission","Rwandan Forces"],
    fighters: "~5,000+",
    casualties: "~5,000+ (est.)",
    start: "2017",
    status: "ACTIVE",
    events: [
      "Insurgents attack villages in Cabo Delgado",
      "LNG infrastructure under threat",
      "Rwandan and SADC forces supporting government"
    ],
    summary: "ISIS-linked insurgency in northern Mozambique threatening massive natural gas developments. Attacks peaked with Mocímboa da Praia seizure in 2020. Regional intervention has retaken some areas.",
    links: ["https://www.crisisgroup.org"]
  },
  {
    id: 17,
    name: "Central African Republic",
    country: "Central African Republic",
    region: "Central Africa",
    type: "civil",
    intensity: "medium",
    lat: 6.5, lng: 20.0,
    shape: "point",
    actors: ["CAR Armed Forces + Wagner","CPC coalition (armed groups)","UN MINUSCA"],
    fighters: "~30,000+",
    casualties: "~15,000+ (est.)",
    start: "2012",
    status: "ACTIVE",
    events: [
      "Wagner forces conduct anti-insurgency operations",
      "Human rights abuses documented",
      "Armed groups control large rural areas"
    ],
    summary: "Long-running armed conflict between government and coalition of armed groups. Wagner Group presence since 2018 has enabled government to retake territory but with documented abuses.",
    links: ["https://www.crisisgroup.org"]
  },
  // ── SOUTH / CENTRAL ASIA ──
  {
    id: 18,
    name: "Afghanistan – Taliban Insurgency (Post-Takeover)",
    country: "Afghanistan",
    region: "Central Asia",
    type: "insurgency",
    intensity: "medium",
    lat: 33.9, lng: 66.0,
    shape: "polygon",
    polygonCoords: [[38.0,62.0],[37.5,70.0],[36.0,73.0],[34.0,71.0],[31.0,69.0],[29.5,62.5],[31.0,61.0],[35.0,61.0],[38.0,62.0]],
    actors: ["Taliban Government","ISIS-K (Khorasan Province)","National Resistance Front","TTP (Pakistani Taliban)"],
    fighters: "~100,000+ (Taliban)/ ~5,000 ISIS-K",
    casualties: "~175,000+ (2001–2021 war)",
    start: "2001 / Taliban retook 2021",
    status: "TALIBAN CONTROL + ISIS ATTACKS",
    events: [
      "ISIS-K suicide bombings targeting Taliban and civilians",
      "National Resistance Front active in Panjshir",
      "TTP attacks on Pakistan from Afghan territory"
    ],
    summary: "Taliban retook Afghanistan in August 2021. ISIS-K conducting regular attacks against Taliban and civilians. Women's rights eliminated. Economic collapse driving humanitarian crisis.",
    links: ["https://www.reuters.com/world/asia-pacific"]
  },
  {
    id: 19,
    name: "Pakistan – TTP Insurgency",
    country: "Pakistan",
    region: "South Asia",
    type: "terrorism",
    intensity: "medium",
    lat: 33.5, lng: 70.5,
    shape: "point",
    actors: ["Tehrik-i-Taliban Pakistan (TTP)","Pakistan Army","Baloch Liberation Army","Pakistani Intelligence (ISI)"],
    fighters: "~30,000+",
    casualties: "~80,000+ (since 2007)",
    start: "2007",
    status: "ACTIVE ESCALATION",
    events: [
      "TTP attacks increasing sharply since 2022",
      "Pakistan military operations in KPK and FATA",
      "Cross-border tensions with Afghanistan rising"
    ],
    summary: "Pakistani Taliban conducting major insurgency in Khyber Pakhtunkhwa and Balochistan. Attacks have surged since 2022, worst levels since 2013–2014 peak.",
    links: ["https://www.crisisgroup.org"]
  },
  {
    id: 20,
    name: "Kashmir Conflict",
    country: "India / Pakistan",
    region: "South Asia",
    type: "insurgency",
    intensity: "medium",
    lat: 34.0, lng: 74.0,
    shape: "point",
    actors: ["Indian Army","Pakistan Army","Lashkar-e-Taiba","Jaish-e-Mohammed","Hizbul Mujahideen"],
    fighters: "~700,000 (Indian forces in J&K)",
    casualties: "~70,000+ (since 1989)",
    start: "1989",
    status: "ACTIVE LOW-LEVEL",
    events: [
      "Cross-border infiltration attempts continuing",
      "Indian security forces targeting militant hideouts",
      "Article 370 revocation tensions continuing"
    ],
    summary: "Long-running insurgency over contested region. Nuclear-armed India and Pakistan maintain heavy military presence along Line of Control. Cross-border exchanges continue periodically.",
    links: ["https://www.crisisgroup.org"]
  },
  // ── LATIN AMERICA – CARTELS ──
  {
    id: 21,
    name: "Sinaloa Cartel – Northwest Mexico",
    country: "Mexico",
    region: "Northwest Mexico",
    type: "cartel",
    intensity: "high",
    lat: 25.0, lng: -107.5,
    shape: "polygon",
    polygonCoords: [[30.5,-111.0],[30.5,-105.0],[27.0,-103.5],[24.0,-104.0],[22.5,-105.5],[23.0,-107.5],[25.0,-108.5],[28.0,-108.5],[30.5,-111.0]],
    actors: ["Sinaloa Cartel (Chapitos faction)","Sinaloa Cartel (Mayo faction)","CJNG","Mexican Army / National Guard","DEA (US)"],
    fighters: "~30,000+",
    casualties: "~15,000+ (annual Mexico)",
    start: "1980s",
    status: "ACTIVE / INTERNAL SPLIT",
    events: [
      "Internal war between Chapitos and Mayo Zambada factions",
      "Violent clashes in Culiacán resulting in hundreds dead",
      "Continued fentanyl trafficking into US"
    ],
    summary: "World's most powerful drug trafficking organization split into warring factions. Chapitos vs. Mayo Zambada internal war causing chaos in Sinaloa state. Major fentanyl supply to US markets.",
    links: ["https://www.insightcrime.org"]
  },
  {
    id: 22,
    name: "CJNG – Jalisco New Generation",
    country: "Mexico",
    region: "Western / Central Mexico",
    type: "cartel",
    intensity: "high",
    lat: 20.5, lng: -103.0,
    shape: "polygon",
    polygonCoords: [[23.0,-105.5],[23.0,-98.0],[19.0,-97.0],[17.5,-98.5],[18.0,-103.5],[20.0,-105.0],[23.0,-105.5]],
    actors: ["Jalisco New Generation Cartel (CJNG)","Sinaloa Cartel","Mexican Armed Forces","Local criminal groups"],
    fighters: "~20,000+",
    casualties: "~10,000+ (associated violence)",
    start: "2011",
    status: "EXPANDING",
    events: [
      "CJNG expanding into new territories across 27 states",
      "Military-grade weapons seized including rockets",
      "Threats against police and politicians continuing"
    ],
    summary: "Fastest-growing and increasingly most powerful Mexican cartel. Military-style operations with heavy weaponry. Strong international presence including US, Europe and Asia.",
    links: ["https://www.insightcrime.org"]
  },
  {
    id: 23,
    name: "MS-13 / Barrio 18 – El Salvador (Historic)",
    country: "El Salvador",
    region: "Central America",
    type: "gang",
    intensity: "low",
    lat: 13.8, lng: -88.9,
    shape: "point",
    actors: ["MS-13 (Mara Salvatrucha)","Barrio 18","El Salvador Security Forces","Bukele Crackdown Operations"],
    fighters: "~40,000+ (imprisoned)/ remnants",
    casualties: "~2,000+ (pre-crackdown annual)",
    start: "1990s",
    status: "SUPPRESSED / MONITORING",
    events: [
      "Bukele mass incarceration reduced homicides dramatically",
      "Gang members imprisoned in CECOT mega-prison",
      "Human rights concerns over detention conditions"
    ],
    summary: "MS-13 largely dismantled through President Bukele's mass incarceration policy (State of Exception). Homicide rate dropped from 50+ to ~2 per 100k. Rights groups raise due-process concerns.",
    links: ["https://www.insightcrime.org"]
  },
  {
    id: 24,
    name: "Facción del Tren de Aragua",
    country: "Venezuela / Regional",
    region: "South America",
    type: "gang",
    intensity: "high",
    lat: 10.2, lng: -67.5,
    shape: "point",
    actors: ["Tren de Aragua","Venezuelan security forces","Host country law enforcement","Los Niños de Dios"],
    fighters: "~5,000+",
    casualties: "Hundreds annually",
    start: "2014",
    status: "REGIONAL EXPANSION",
    events: [
      "Tren de Aragua expanding operations across South America",
      "Active in Chile, Colombia, Peru, Ecuador, US",
      "Designated foreign terrorist organization by US"
    ],
    summary: "Venezuelan gang originating in Tocorón prison now operating across 10+ countries in Americas including the United States. Involved in human trafficking, extortion and drug trafficking.",
    links: ["https://www.insightcrime.org"]
  },
  {
    id: 25,
    name: "Rio de Janeiro – Gang Territories",
    country: "Brazil",
    region: "South America",
    type: "gang",
    intensity: "high",
    lat: -22.9, lng: -43.2,
    shape: "polygon",
    polygonCoords: [[-22.7,-43.4],[-22.7,-43.1],[-23.0,-43.1],[-23.0,-43.4],[-22.7,-43.4]],
    actors: ["Comando Vermelho (CV)","Amigos dos Amigos (ADA)","Terceiro Comando Puro (TCP)","Milícias","BOPE / Rio Police"],
    fighters: "~30,000+",
    casualties: "~3,000+ (annual Rio state)",
    start: "1970s",
    status: "ONGOING",
    events: [
      "CV and Milícias competing for favela control",
      "Police operations in Complexo do Alemão",
      "Armed confrontations in Baixada Fluminense"
    ],
    summary: "Rio de Janeiro divided between drug factions (Comando Vermelho, TCP, ADA) and paramilitary milícias in hundreds of favelas. Complexo da Maré and Alemão among most contested.",
    links: ["https://www.insightcrime.org"]
  },
  {
    id: 26,
    name: "Colombia – FARC Dissidents / ELN",
    country: "Colombia",
    region: "South America",
    type: "insurgency",
    intensity: "medium",
    lat: 4.0, lng: -73.0,
    shape: "polygon",
    polygonCoords: [[8.0,-77.0],[8.0,-66.0],[2.0,-65.5],[1.0,-66.0],[-2.0,-68.0],[-2.0,-76.0],[2.0,-77.0],[5.0,-77.0],[8.0,-77.0]],
    actors: ["ELN (National Liberation Army)","FARC-EP dissidents (Estado Mayor Central)","Colombian Armed Forces","Drug cartels","Clan del Golfo"],
    fighters: "~15,000+",
    casualties: "~1,000+ (annual est.)",
    start: "1964",
    status: "ACTIVE / PEACE TALKS STALLED",
    events: [
      "ELN peace talks with Petro government stalled",
      "FARC dissidents resume attacks in border regions",
      "Mass displacement in Chocó and Catatumbo"
    ],
    summary: "World's longest-running insurgency. 2016 FARC peace deal largely held but dissident factions rejected it. ELN remains active. Drug trafficking fuels all armed groups.",
    links: ["https://www.crisisgroup.org"]
  },
  {
    id: 27,
    name: "Haiti – Gang Crisis",
    country: "Haiti",
    region: "Caribbean",
    type: "gang",
    intensity: "high",
    lat: 18.9, lng: -72.3,
    shape: "polygon",
    polygonCoords: [[19.9,-73.5],[19.9,-71.7],[18.0,-71.7],[18.0,-74.5],[19.0,-74.5],[19.9,-73.5]],
    actors: ["Viv Ansanm gang coalition","G9 an Fanmi","Jimmy 'Barbeque' Chérizier","Haitian National Police","Kenyan-led MSS mission"],
    fighters: "~20,000+",
    casualties: "~5,000+ (2024)",
    start: "2021",
    status: "CRITICAL",
    events: [
      "Gangs control ~80% of Port-au-Prince",
      "Kenyan-led MMAS mission deployed",
      "PM Garry Conille resigned amid chaos"
    ],
    summary: "Gang coalition Viv Ansanm controls most of Port-au-Prince following PM Ariel Henry's forced resignation. State has largely collapsed. Kenyan-led security mission struggling to establish order.",
    links: ["https://www.crisisgroup.org"]
  },
  // ── PIRACY ZONES ──
  {
    id: 28,
    name: "Houthi Maritime Threat – Red Sea",
    country: "International Waters / Yemen",
    region: "Red Sea / Bab-el-Mandeb",
    type: "piracy",
    intensity: "high",
    lat: 14.0, lng: 42.5,
    shape: "polygon",
    polygonCoords: [[16.0,40.0],[16.0,44.5],[12.0,44.0],[11.0,43.0],[12.0,40.5],[16.0,40.0]],
    actors: ["Houthi Movement (Ansar Allah)","US/UK Naval Task Forces","Multiple commercial shipping companies"],
    fighters: "Naval missile/drone units",
    casualties: "3 sailors killed, multiple ships struck",
    start: "Nov 2023",
    status: "ACTIVE THREAT",
    events: [
      "50+ commercial vessels attacked since Nov 2023",
      "Major shipping rerouting via Cape of Good Hope",
      "US/UK Operation Prosperity Guardian strikes"
    ],
    summary: "Houthis attacking commercial and military vessels in Red Sea claiming solidarity with Gaza. 15% of global trade normally passes through area. ~$1B cost increase per ship rerouting.",
    links: ["https://www.icc-ccs.org"]
  },
  {
    id: 29,
    name: "Gulf of Guinea Piracy",
    country: "Nigeria / Gulf of Guinea",
    region: "West Africa Maritime",
    type: "piracy",
    intensity: "medium",
    lat: 3.0, lng: 4.0,
    shape: "polygon",
    polygonCoords: [[6.0,-2.0],[6.0,10.0],[0.0,10.0],[-2.0,7.0],[-2.0,0.0],[2.0,-2.0],[6.0,-2.0]],
    actors: ["Nigerian criminal networks","Delta militant groups","Pirates from various states","International naval patrols"],
    fighters: "~2,000 (pirate networks)",
    casualties: "~150 seafarers taken hostage (peak years)",
    start: "2000s",
    status: "DECLINING BUT ACTIVE",
    events: [
      "Piracy incidents declining from 2020 peak",
      "Nigerian Navy DeepBlue Project deployed",
      "Kidnapping-for-ransom still occurring"
    ],
    summary: "Gulf of Guinea was world's most dangerous maritime zone 2018–2021. Improved cooperation between Nigeria and Gulf of Guinea states has reduced incidents but threat remains.",
    links: ["https://www.icc-ccs.org"]
  },
  {
    id: 30,
    name: "Somalia – Piracy (Monitoring)",
    country: "Somalia / Indian Ocean",
    region: "Horn of Africa Maritime",
    type: "piracy",
    intensity: "low",
    lat: 10.0, lng: 51.0,
    shape: "polygon",
    polygonCoords: [[12.0,45.0],[12.0,55.0],[8.0,53.0],[6.0,50.0],[7.0,47.0],[10.0,45.5],[12.0,45.0]],
    actors: ["Somali pirate networks","EU NAVFOR Atalanta","Combined Maritime Forces","Somali Coast Guard"],
    fighters: "~1,000 (active networks)",
    casualties: "Multiple since 2023 resurgence",
    start: "1990s / Resurgence 2023",
    status: "RESURGENCE MONITORING",
    events: [
      "Piracy resurgence in 2023–2024 after decade decline",
      "MV Abdullah seized with 23 crew",
      "International naval presence continues"
    ],
    summary: "Somali piracy largely suppressed 2012–2022 through naval escorts. Resurgence began 2023 likely linked to Houthi activity and reduced naval focus. EU NAVFOR maintains patrols.",
    links: ["https://www.icc-ccs.org"]
  },
  // ── ADDITIONAL CONFLICTS ──
  {
    id: 31,
    name: "South Sudan Civil Conflict",
    country: "South Sudan",
    region: "East Africa",
    type: "civil",
    intensity: "medium",
    lat: 6.5, lng: 31.5,
    shape: "point",
    actors: ["SPLM-IG (Government)","SPLM-IO (Machar)","National Salvation Front","Various militias"],
    fighters: "~200,000+",
    casualties: "~400,000+ (since 2013)",
    start: "2013",
    status: "FRAGILE PEACE / RENEWED TENSIONS",
    events: [
      "Renewed clashes in Upper Nile state",
      "Peace agreement under strain",
      "Oil production disputed between factions"
    ],
    summary: "South Sudan experienced devastating civil war 2013–2018. Peace deal signed but imperfectly implemented. New clashes emerging in multiple states threatening full return to war.",
    links: ["https://www.crisisgroup.org"]
  },
  {
    id: 32,
    name: "Cameroon – Anglophone Crisis",
    country: "Cameroon",
    region: "Central Africa",
    type: "insurgency",
    intensity: "medium",
    lat: 5.9, lng: 10.1,
    shape: "point",
    actors: ["Ambazonian separatists","Cameroon military (BIR)","Various Amba factions"],
    fighters: "~5,000+",
    casualties: "~6,000+ (since 2017)",
    start: "2017",
    status: "ACTIVE",
    events: [
      "Separatist attacks on schools and government targets",
      "Military operations in Northwest and Southwest regions",
      "Ghost town orders affecting millions"
    ],
    summary: "Anglophone Cameroonians demanding independence or federalism fighting against Francophone-dominated government. Two English-speaking regions under martial law. Ghost town orders paralyze economic life.",
    links: ["https://www.crisisgroup.org"]
  },
  {
    id: 33,
    name: "Tigray Corridor – Amhara Fano",
    country: "Ethiopia",
    region: "East Africa",
    type: "insurgency",
    intensity: "medium",
    lat: 11.5, lng: 37.5,
    shape: "point",
    actors: ["Amhara Fano militias","Ethiopian National Defense Force","Amhara Regional Police"],
    fighters: "~50,000+",
    casualties: "~10,000+ (est.)",
    start: "2023",
    status: "ACTIVE",
    events: [
      "Fano militias fighting federal forces across Amhara region",
      "Internet blackouts imposed by government",
      "Major towns temporarily seized by Fano"
    ],
    summary: "Following the Tigray War peace deal, Amhara militias (Fano) who had allied with federal forces turned against Addis Ababa over political grievances. Major insurgency spreading across Amhara region.",
    links: ["https://www.crisisgroup.org"]
  },
  {
    id: 34,
    name: "Sahel – Niger / Burkina / Mali AES Bloc",
    country: "Niger",
    region: "West Africa / Sahel",
    type: "insurgency",
    intensity: "high",
    lat: 16.5, lng: 8.0,
    shape: "point",
    actors: ["JNIM","ISIS Sahel","Nigerien Armed Forces","Russian Africa Corps","Alliance of Sahel States"],
    fighters: "~10,000+",
    casualties: "~5,000+ (annual est.)",
    start: "2015",
    status: "ACTIVE",
    events: [
      "Niger junta expelled French forces and ECOWAS",
      "Russian Africa Corps deployed",
      "JNIM attacks on civilian and military targets"
    ],
    summary: "July 2023 coup brought military junta to power. Expelled French forces. Alliance with Mali and Burkina Faso (all junta-ruled). Jihadist violence continues unabated.",
    links: ["https://www.crisisgroup.org"]
  },
  {
    id: 35,
    name: "Balochistan Insurgency",
    country: "Pakistan",
    region: "South Asia",
    type: "insurgency",
    intensity: "medium",
    lat: 27.5, lng: 65.0,
    shape: "point",
    actors: ["Baloch Liberation Army (BLA)","Baloch Liberation Front","Pakistan Army","CPEC Security Forces"],
    fighters: "~5,000+",
    casualties: "~5,000+ (since 2000s)",
    start: "2000s",
    status: "ACTIVE",
    events: [
      "BLA attacks on CPEC infrastructure",
      "Suicide bombings targeting security forces",
      "Enforced disappearances reported"
    ],
    summary: "Baloch separatist insurgency driven by resource grievances and ethnic nationalism. BLA conducting high-profile attacks on Chinese CPEC projects and Pakistani security forces.",
    links: ["https://www.crisisgroup.org"]
  },
  {
    id: 36,
    name: "India – Manipur Ethnic Conflict",
    country: "India",
    region: "South Asia",
    type: "civil",
    intensity: "medium",
    lat: 24.8, lng: 93.9,
    shape: "point",
    actors: ["Meitei community","Kuki-Zo community","Indian security forces","Various militant groups"],
    fighters: "Thousands (both sides)",
    casualties: "~250+ dead, 60,000+ displaced",
    start: "May 2023",
    status: "ONGOING",
    events: [
      "Ethnic clashes continuing between Meitei and Kuki-Zo groups",
      "Weapons seized from police armories",
      "Internet shutdowns imposed"
    ],
    summary: "Ethnic conflict erupted May 2023 between Meitei and Kuki-Zo communities over tribal status and land rights. Over 250 killed and 60,000+ displaced. Indian army deployed.",
    links: ["https://www.reuters.com"]
  },
  {
    id: 37,
    name: "Xinjiang – Uyghur Repression",
    country: "China",
    region: "East Asia",
    type: "insurgency",
    intensity: "low",
    lat: 41.0, lng: 85.0,
    shape: "polygon",
    polygonCoords: [[49.0,73.0],[49.0,96.0],[40.0,96.0],[37.0,79.0],[37.0,73.5],[43.0,73.0],[49.0,73.0]],
    actors: ["Chinese Government / PLA","ETIM remnants","Uyghur diaspora organizations"],
    fighters: "Classified",
    casualties: "Classified / Disputed",
    start: "Ongoing",
    status: "SUPPRESSED POPULATION",
    events: [
      "Mass surveillance and internment camps documented",
      "ETIM attacks in neighboring countries",
      "International sanctions over human rights"
    ],
    summary: "Chinese government mass internment of Uyghur Muslims. UN found evidence of serious human rights violations. Limited armed resistance externally. Complete information control internally.",
    links: ["https://www.ohchr.org"]
  },
  {
    id: 38,
    name: "Taiwan Strait Tensions",
    country: "Taiwan / China",
    region: "East Asia",
    type: "war",
    intensity: "medium",
    lat: 24.0, lng: 121.5,
    shape: "point",
    actors: ["People's Liberation Army (PLA)","Taiwan Armed Forces (ROCAF)","US Indo-Pacific Command"],
    fighters: "Millions (both sides potential)",
    casualties: "No active combat",
    start: "1949 / Ongoing",
    status: "ELEVATED TENSIONS",
    events: [
      "PLA exercises simulating Taiwan blockade",
      "US arms sales to Taiwan increasing",
      "Military incursions into Taiwan ADIZ daily"
    ],
    summary: "Cross-strait tensions at highest level since 1990s. PLA regular incursions into Taiwan's Air Defense Identification Zone. US maintaining strategic ambiguity. Potential flashpoint for great-power conflict.",
    links: ["https://www.reuters.com"]
  },
  {
    id: 39,
    name: "North Korea – Korean Peninsula",
    country: "North Korea / South Korea",
    region: "East Asia",
    type: "war",
    intensity: "medium",
    lat: 39.5, lng: 127.5,
    shape: "point",
    actors: ["Korean People's Army (KPA)","Republic of Korea Army","USFK (US Forces Korea)","Russia partnership"],
    fighters: "~1.3M (DPRK) / ~500k (ROK + US)",
    casualties: "Ongoing provocations",
    start: "1950 / Armistice 1953",
    status: "ARMISTICE / ELEVATED TENSIONS",
    events: [
      "DPRK troops deployed to Russia (Ukraine front)",
      "Missile tests increasing frequency",
      "Trash balloons and propaganda campaigns"
    ],
    summary: "Korean War armistice since 1953. North Korea deploying troops to support Russia in Ukraine. Regular missile and nuclear tests. South Korea suspended military hotlines. Denuclearization talks collapsed.",
    links: ["https://www.reuters.com"]
  },
  {
    id: 40,
    name: "Libya Civil War",
    country: "Libya",
    region: "North Africa",
    type: "civil",
    intensity: "medium",
    lat: 27.0, lng: 17.0,
    shape: "polygon",
    polygonCoords: [[33.0,9.5],[33.0,25.0],[30.0,25.0],[23.0,25.0],[19.5,15.0],[23.0,9.5],[28.0,9.5],[33.0,9.5]],
    actors: ["GNU (Government of National Unity)","LNA (Haftar's Libyan National Army)","Turkish forces","Russian Wagner/Africa Corps","Multiple militias"],
    fighters: "~50,000+",
    casualties: "~25,000+ (since 2011)",
    start: "2011",
    status: "FRAGMENTED / LOW-LEVEL",
    events: [
      "East-West split between GNU and LNA continues",
      "Oil exports contested",
      "Ongoing militia violence in Tripoli"
    ],
    summary: "Post-Gaddafi Libya remains deeply fractured between eastern LNA (backed by UAE, Russia, Egypt) and western GNU (backed by Turkey). Intermittent clashes and political deadlock.",
    links: ["https://www.crisisgroup.org"]
  },
  {
    id: 41,
    name: "Armenia–Azerbaijan (Nagorno-Karabakh Aftermath)",
    country: "Armenia / Azerbaijan",
    region: "South Caucasus",
    type: "war",
    intensity: "low",
    lat: 40.3, lng: 46.5,
    shape: "point",
    actors: ["Azerbaijani Armed Forces","Armenian Armed Forces","Russian peacekeepers (withdrew)"],
    fighters: "~130,000 (combined)",
    casualties: "~30,000+ (2020 + 2023)",
    start: "1988 / 2020 / 2023",
    status: "AZERBAIJAN CONTROL / PEACE NEGOTIATIONS",
    events: [
      "Azerbaijan retook full NK control September 2023",
      "150,000 Armenians fled Karabakh",
      "Peace treaty negotiations ongoing"
    ],
    summary: "Azerbaijan military operation in September 2023 ended Armenian control of Nagorno-Karabakh. Entire Armenian population fled. Peace talks on border delimitation continuing.",
    links: ["https://www.reuters.com"]
  },
  {
    id: 42,
    name: "Strait of Malacca – Sea Robbery",
    country: "Indonesia / Malaysia / Singapore",
    region: "Southeast Asia Maritime",
    type: "piracy",
    intensity: "low",
    lat: 2.5, lng: 103.0,
    shape: "point",
    actors: ["Indonesian criminal networks","ReCAAP reporting network","Regional coast guards"],
    fighters: "Small criminal groups",
    casualties: "~50 incidents annually",
    start: "Historical",
    status: "ACTIVE MONITORING",
    events: [
      "Sea robbery incidents in anchorages",
      "Petty theft from anchored vessels",
      "Joint patrols by Indonesia-Malaysia-Singapore"
    ],
    summary: "Strait of Malacca historically most piracy-prone waters. Modern incidents mostly opportunistic petty theft rather than organized piracy. Joint patrols significantly reduced high-seas attacks.",
    links: ["https://www.recaap.org"]
  },
  {
    id: 43,
    name: "Honduras – MS-13 / Barrio 18",
    country: "Honduras",
    region: "Central America",
    type: "gang",
    intensity: "high",
    lat: 14.5, lng: -87.2,
    shape: "point",
    actors: ["MS-13","Barrio 18 (Revolucionarios / Sureños)","Honduran National Police","US DEA"],
    fighters: "~30,000+",
    casualties: "~5,000+ (annual est.)",
    start: "1990s",
    status: "ACTIVE",
    events: [
      "Gang extortion of businesses and transport ongoing",
      "Mass displacement to US border continuing",
      "Police corruption enabling gang activity"
    ],
    summary: "Honduras one of world's most violent countries. MS-13 and Barrio 18 control urban neighborhoods and extort businesses, transport and residents. Major driver of migration north.",
    links: ["https://www.insightcrime.org"]
  },
  {
    id: 44,
    name: "Ecuador – Gang War / Narco Crisis",
    country: "Ecuador",
    region: "South America",
    type: "gang",
    intensity: "high",
    lat: -1.0, lng: -78.5,
    shape: "point",
    actors: ["Los Lobos","La Familia Ambato","Chone Killers","Tren de Aragua","Ecuadorian military"],
    fighters: "~10,000+",
    casualties: "~7,000+ (2023)",
    start: "2021",
    status: "CRISIS / INTERNAL ARMED CONFLICT DECLARED",
    events: [
      "President Noboa declared internal armed conflict",
      "Prison takeovers and TV station attacked",
      "Military deployed across Ecuador"
    ],
    summary: "Ecuador transformed from peaceful transit country to active war zone in two years. Criminal organizations fighting for drug route control. Government declared 'internal armed conflict' January 2024.",
    links: ["https://www.insightcrime.org"]
  },
  {
    id: 45,
    name: "Guerrero – Cartel Warfare",
    country: "Mexico",
    region: "Southern Mexico",
    type: "cartel",
    intensity: "high",
    lat: 17.5, lng: -99.5,
    shape: "point",
    actors: ["Los Ardillos","La Familia Michoacana","CJNG","Guerreros Unidos","State security forces"],
    fighters: "~15,000+",
    casualties: "~3,000+ (annual est.)",
    start: "2000s",
    status: "ACTIVE",
    events: [
      "Continuous inter-cartel clashes in mountains",
      "Poppy/opium production territories disputed",
      "Mass graves discovered"
    ],
    summary: "Mexico's Guerrero state among most violent in country. Multiple competing cartels fight over Acapulco port access and poppy production in Sierra Madre del Sur mountains.",
    links: ["https://www.insightcrime.org"]
  },
  {
    id: 46,
    name: "Iran – Domestic Repression",
    country: "Iran",
    region: "Middle East",
    type: "insurgency",
    intensity: "medium",
    lat: 32.5, lng: 53.5,
    shape: "point",
    actors: ["Iranian Revolutionary Guard (IRGC)","Basij militia","Kurdish opposition groups (PJAK)","Baloch groups"],
    fighters: "~190,000 (IRGC)",
    casualties: "~500+ (protests 2022)",
    start: "Ongoing",
    status: "ACTIVE REPRESSION",
    events: [
      "Post-Mahsa Amini protests repressed",
      "PJAK attacks in Kurdish regions",
      "Sistan-Baluchestan province attacks ongoing"
    ],
    summary: "Iran experiencing ongoing low-level insurgency from Kurdish PJAK in northwest and Baloch groups in southeast. Internal protest movements brutally suppressed. Proxy conflicts across region.",
    links: ["https://www.reuters.com"]
  },
  {
    id: 47,
    name: "Papua New Guinea – Highlands Tribal Violence",
    country: "Papua New Guinea",
    region: "Pacific",
    type: "gang",
    intensity: "medium",
    lat: -5.8, lng: 144.0,
    shape: "point",
    actors: ["Various tribal militias","Papua New Guinea Defence Force","Police Mobile Squads"],
    fighters: "Thousands (tribal warriors)",
    casualties: "~200+ (annual est.)",
    start: "Historical / Ongoing",
    status: "ACTIVE",
    events: [
      "Tribal warfare in Enga province killing hundreds",
      "Military deployed to highlands",
      "Illegal firearms proliferation"
    ],
    summary: "Papua New Guinea's Highland provinces experience ongoing tribal warfare fueled by modern weapons. Land, resources and clan disputes lead to organized attacks. State capacity to respond is limited.",
    links: ["https://www.reuters.com"]
  },
  {
    id: 48,
    name: "Philippines – NPA Insurgency",
    country: "Philippines",
    region: "Southeast Asia",
    type: "insurgency",
    intensity: "low",
    lat: 13.0, lng: 123.0,
    shape: "point",
    actors: ["New People's Army (NPA / CPP)","Armed Forces of the Philippines","Abu Sayyaf"],
    fighters: "~2,000+ (NPA)/ ~400 Abu Sayyaf",
    casualties: "~40,000+ (since 1969)",
    start: "1969",
    status: "DECLINING",
    events: [
      "NPA attacks in Visayas and Mindanao continuing",
      "Military operations reducing NPA strength",
      "Abu Sayyaf beheadings rare but continuing"
    ],
    summary: "World's longest communist insurgency. NPA significantly weakened from peak ~25,000 fighters. Abu Sayyaf in Mindanao continues kidnapping operations. Both groups on sharp decline.",
    links: ["https://www.crisisgroup.org"]
  },
  {
    id: 49,
    name: "Zimbabwe – Political Violence",
    country: "Zimbabwe",
    region: "Southern Africa",
    type: "insurgency",
    intensity: "low",
    lat: -19.0, lng: 29.5,
    shape: "point",
    actors: ["ZANU-PF militias","CCC opposition supporters","Zimbabwe Republic Police"],
    fighters: "Political operatives",
    casualties: "~50+ (2023 election period)",
    start: "Ongoing",
    status: "MONITORING",
    events: [
      "Post-election violence against opposition",
      "Abductions of opposition figures",
      "Independent media suppression"
    ],
    summary: "Zimbabwe experiences systematic political violence particularly around election periods. ZANU-PF militias target opposition activists. International condemnation has not altered pattern.",
    links: ["https://www.hrw.org"]
  },
  {
    id: 50,
    name: "Kosovo – Serbia Tensions",
    country: "Kosovo / Serbia",
    region: "Balkans",
    type: "insurgency",
    intensity: "medium",
    lat: 42.7, lng: 21.1,
    shape: "point",
    actors: ["Kosovo Security Force","Serbian Armed Forces","Kosovo Serb militias","NATO KFOR"],
    fighters: "~25,000 (Serbian military)/ ~5,000 KSF",
    casualties: "~5 (2023 incidents)",
    start: "1998 / Ongoing",
    status: "ELEVATED TENSIONS",
    events: [
      "Armed Serbian group standoff in Banjska 2023",
      "NATO KFOR reinforcing presence",
      "EU-brokered dialogue stalled"
    ],
    summary: "Tensions spiked dramatically in 2023 with armed Serb standoff in Banjska leaving multiple dead. NATO reinforcing KFOR. EU-brokered normalization talks between Belgrade and Pristina stalled.",
    links: ["https://www.crisisgroup.org"]
  },
  {
    id: 51,
    name: "Cabo Delgado Maritime – Piracy Risk",
    country: "Mozambique / Tanzania",
    region: "East Africa Maritime",
    type: "piracy",
    intensity: "medium",
    lat: -11.0, lng: 40.8,
    shape: "point",
    actors: ["Ansar al-Sunna maritime units","TotalEnergies security","Mozambican Navy"],
    fighters: "~500+",
    casualties: "Multiple LNG attacks",
    start: "2020",
    status: "ACTIVE MARITIME THREAT",
    events: [
      "Insurgents using boats in Pemba Bay area",
      "LNG project evacuated multiple times",
      "Maritime exclusion zones declared"
    ],
    summary: "Mozambique's Cabo Delgado insurgency has expanded to maritime environment. TotalEnergies and ENI projects suspended. Armed groups conducting raids via sea and threatening LNG infrastructure.",
    links: ["https://www.icc-ccs.org"]
  },
  {
    id: 52,
    name: "Venezuela – Internal Conflict",
    country: "Venezuela",
    region: "South America",
    type: "civil",
    intensity: "medium",
    lat: 8.0, lng: -66.0,
    shape: "point",
    actors: ["Maduro Government / FANB","Colectivos paramilitary","FARC dissidents / ELN","Opposition forces"],
    fighters: "~160,000+ (FANB)",
    casualties: "~3,000+ (annual political violence)",
    start: "2013 political crisis",
    status: "AUTHORITARIAN CONTROL",
    events: [
      "Post-election fraud protests violently suppressed",
      "Political prisoners including opposition figures",
      "FARC dissidents / ELN operating with impunity"
    ],
    summary: "Maduro consolidated control after disputed 2024 elections. Post-election protests killed 20+. Colectivos conduct political violence. Armed groups operate in border regions with government tolerance.",
    links: ["https://www.hrw.org"]
  },
  {
    id: 53,
    name: "Sinai Peninsula – ISIS Sinai",
    country: "Egypt",
    region: "Middle East / North Africa",
    type: "terrorism",
    intensity: "medium",
    lat: 30.0, lng: 34.0,
    shape: "point",
    actors: ["ISIS-Sinai Province (Wilayat Sinai)","Egyptian Armed Forces","Israeli Defense Forces"],
    fighters: "~1,000+ (ISIS-Sinai)",
    casualties: "~2,000+ (since 2013)",
    start: "2013",
    status: "DECLINING",
    events: [
      "Egyptian military operations continuing",
      "ISIS-Sinai attacks on security forces",
      "Border area with Gaza under tight control"
    ],
    summary: "ISIS-Sinai Province operating in North Sinai following political upheaval of 2013. Egyptian military conducting sustained counter-terrorism operations. Attack frequency declining but insurgency persists.",
    links: ["https://www.acleddata.com"]
  },
  {
    id: 54,
    name: "Tigray – Eritrea Border",
    country: "Eritrea / Ethiopia",
    region: "Horn of Africa",
    type: "war",
    intensity: "low",
    lat: 15.0, lng: 39.0,
    shape: "point",
    actors: ["Eritrean Defence Forces","TPLF (Tigray forces)","Ethiopian ENDF"],
    fighters: "~200,000 (Eritrea)/ ~150,000 ENDF",
    casualties: "~50,000+ (Tigray War phase)",
    start: "2020",
    status: "CEASEFIRE / ERITREA STILL PRESENT",
    events: [
      "Eritrean forces remain in Tigray despite ceasefire",
      "Continued human rights abuses reported",
      "Peace process excludes Eritrea"
    ],
    summary: "Eritrea invaded Tigray alongside Ethiopia in 2020 war. Despite Ethiopian ceasefire deal, Eritrean forces remain in northern Tigray. Ongoing abuses documented. No withdrawal agreement reached.",
    links: ["https://www.hrw.org"]
  },
  {
    id: 55,
    name: "Gulf of Aden – Maritime Security",
    country: "International Waters",
    region: "Gulf of Aden",
    type: "piracy",
    intensity: "high",
    lat: 12.0, lng: 48.0,
    shape: "polygon",
    polygonCoords: [[15.0,42.5],[15.0,52.0],[11.0,51.5],[9.0,48.0],[10.0,43.0],[15.0,42.5]],
    actors: ["Houthi naval units","Combined Task Force 151","EU NAVFOR Atalanta","Commercial shipping"],
    fighters: "Naval units",
    casualties: "Multiple vessels struck",
    start: "Nov 2023",
    status: "CRITICAL THREAT",
    events: [
      "Multiple vessels struck by missiles and drones",
      "Bulk carrier Tutor sunk June 2024",
      "Insurance rates for Red Sea quadrupled"
    ],
    summary: "Gulf of Aden / Red Sea transit now extremely hazardous due to Houthi attacks. Multiple vessels sunk or abandoned. Most major shipping companies avoiding route. Coalition warships failing to fully deter attacks.",
    links: ["https://www.icc-ccs.org"]
  }
];

// ── MAP INITIALIZATION ────────────────────────────────────────

const map = L.map('map', {
  center: [20, 10],
  zoom: 3,
  minZoom: 2,
  maxZoom: 8,
  zoomControl: true,
});

// Dark tile layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap &copy; CARTO',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

// Adjust zoom control position
map.zoomControl.setPosition('bottomright');

// ── LAYER GROUPS ──────────────────────────────────────────────

const layerGroups = {
  war:       L.layerGroup().addTo(map),
  civil:     L.layerGroup().addTo(map),
  terrorism: L.layerGroup().addTo(map),
  insurgency:L.layerGroup().addTo(map),
  cartel:    L.layerGroup().addTo(map),
  gang:      L.layerGroup().addTo(map),
  piracy:    L.layerGroup().addTo(map),
};

// ── COLORS & HELPERS ──────────────────────────────────────────

const INTENSITY_COLORS = {
  high:   '#ff2d2d',
  medium: '#ff8c00',
  low:    '#ffd700',
};

const TYPE_ICONS = {
  war:        '⚔',
  civil:      '🔥',
  terrorism:  '💥',
  insurgency: '⚡',
  cartel:     '💊',
  gang:       '🔫',
  piracy:     '☠',
};

function getColor(intensity) { return INTENSITY_COLORS[intensity] || '#fff'; }

function createMarkerIcon(conflict) {
  const color = getColor(conflict.intensity);
  const size  = conflict.intensity === 'high' ? 18 : conflict.intensity === 'medium' ? 14 : 11;
  const pulseClass = conflict.intensity === 'high' ? 'class="marker-pulse-ring"' : '';

  return L.divIcon({
    className: '',
    html: `
      <div style="
        width:${size}px;height:${size}px;
        background:${color};
        border-radius:50%;
        border:2px solid rgba(255,255,255,0.3);
        box-shadow:0 0 ${size}px ${color}, 0 0 ${size*2}px ${color}44;
        cursor:pointer;
        position:relative;
      ">
        <div ${pulseClass} style="
          position:absolute;inset:-6px;
          border-radius:50%;
          border:2px solid ${color};
          animation:ring-pulse 2s ease-out infinite;
          opacity:0;
        "></div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
  });
}

// ── RENDER CONFLICTS ──────────────────────────────────────────

const markerMap = {};

function renderConflicts() {
  // Clear all layers
  Object.values(layerGroups).forEach(lg => lg.clearLayers());

  const activeLayers    = getActiveLayers();
  const activeIntensity = getActiveIntensities();

  CONFLICTS.forEach(c => {
    if (!activeLayers.has(c.type))      return;
    if (!activeIntensity.has(c.intensity)) return;

    const color = getColor(c.intensity);

    if (c.shape === 'polygon' && c.polygonCoords) {
      // Polygon
      const poly = L.polygon(c.polygonCoords, {
        color: color,
        fillColor: color,
        fillOpacity: 0.12,
        weight: 1.5,
        opacity: 0.7,
        dashArray: c.type === 'piracy' ? '6,4' : null,
      });

      poly.on('click', () => showDetail(c));
      poly.bindTooltip(`<b style="font-family:monospace;color:${color}">${c.name}</b><br><span style="font-size:10px;color:#aaa">${c.country}</span>`, {
        className: 'sentinel-tooltip',
        sticky: true,
      });

      layerGroups[c.type].addLayer(poly);

      // Also add a point marker in center
      const marker = L.marker([c.lat, c.lng], { icon: createMarkerIcon(c) });
      marker.on('click', () => showDetail(c));
      layerGroups[c.type].addLayer(marker);
      markerMap[c.id] = marker;

    } else {
      // Point marker
      const marker = L.marker([c.lat, c.lng], { icon: createMarkerIcon(c) });
      marker.on('click', () => showDetail(c));
      marker.bindTooltip(`<b style="font-family:monospace;color:${color}">${c.name}</b><br><span style="font-size:10px;color:#aaa">${c.country}</span>`, {
        className: 'sentinel-tooltip',
        sticky: true,
      });
      layerGroups[c.type].addLayer(marker);
      markerMap[c.id] = marker;
    }
  });

  updateCounts();
}

// ── LAYER TOGGLE LOGIC ────────────────────────────────────────

function getActiveLayers() {
  const active = new Set();
  document.querySelectorAll('[data-layer]').forEach(cb => {
    if (cb.checked) active.add(cb.dataset.layer);
  });
  return active;
}

function getActiveIntensities() {
  const active = new Set();
  document.querySelectorAll('[data-intensity]').forEach(cb => {
    if (cb.checked) active.add(cb.dataset.intensity);
  });
  return active;
}

document.querySelectorAll('[data-layer], [data-intensity]').forEach(cb => {
  cb.addEventListener('change', renderConflicts);
});

// ── UPDATE COUNTS ─────────────────────────────────────────────

function updateCounts() {
  const types = ['war','civil','terrorism','insurgency','cartel','gang','piracy'];
  types.forEach(t => {
    const n = CONFLICTS.filter(c => c.type === t).length;
    const el = document.getElementById(`count-${t}`);
    if (el) el.textContent = n;
  });

  const high   = CONFLICTS.filter(c => c.intensity === 'high').length;
  const medium = CONFLICTS.filter(c => c.intensity === 'medium').length;
  const low    = CONFLICTS.filter(c => c.intensity === 'low').length;

  document.getElementById('stat-active').textContent  = high;
  document.getElementById('stat-medium').textContent  = medium;
  document.getElementById('stat-low').textContent     = CONFLICTS.length;
}

// ── DETAIL POPUP ──────────────────────────────────────────────

const popup    = document.getElementById('detail-popup');
const popClose = document.getElementById('popup-close');

function showDetail(c) {
  const color = getColor(c.intensity);

  document.getElementById('popup-type-badge').textContent = (TYPE_ICONS[c.type] || '') + ' ' + c.type.toUpperCase();
  const intensBadge = document.getElementById('popup-intensity-badge');
  intensBadge.textContent = c.intensity.toUpperCase();
  intensBadge.className = `popup-intensity-badge ${c.intensity}`;

  document.getElementById('popup-name').textContent        = c.name;
  document.getElementById('popup-location').textContent    = `${c.country} · ${c.region}`;
  document.getElementById('popup-fighters').textContent    = c.fighters;
  document.getElementById('popup-casualties').textContent  = c.casualties;
  document.getElementById('popup-start').textContent       = c.start;
  document.getElementById('popup-status').textContent      = c.status;

  // Actors
  const actorsEl = document.getElementById('popup-actors');
  actorsEl.innerHTML = c.actors.map(a =>
    `<span class="actor-tag">${a}</span>`
  ).join('');

  // Events
  const eventsEl = document.getElementById('popup-events');
  eventsEl.innerHTML = c.events.map(e =>
    `<div class="event-item">▸ ${e}</div>`
  ).join('');

  document.getElementById('popup-summary').textContent = c.summary;

  // Links
  const linksEl = document.getElementById('popup-links');
  linksEl.innerHTML = (c.links || []).map(l => {
    const domain = new URL(l).hostname.replace('www.','');
    return `<a class="popup-link" href="${l}" target="_blank" rel="noopener">⬡ ${domain}</a>`;
  }).join('');

  popup.classList.remove('hidden');

  // On mobile, ensure map tab is visible so popup feels anchored over the map
  const mobileNav = document.querySelector('.mobile-nav');
  if (mobileNav && getComputedStyle(mobileNav).display !== 'none') {
    document.getElementById('panel-map').classList.add('mobile-active');
    document.getElementById('panel-layers').classList.remove('mobile-active');
    document.getElementById('panel-intel').classList.remove('mobile-active');
    document.getElementById('nav-map').classList.add('active');
    document.getElementById('nav-layers').classList.remove('active');
    document.getElementById('nav-intel').classList.remove('active');
  }

  // Fly to location
  map.flyTo([c.lat, c.lng], Math.max(map.getZoom(), 4), { duration: 0.8 });
}

// popup close handled below in mobile tab section

// ── RIGHT PANEL: ALERTS FEED ──────────────────────────────────

function buildAlertsFeed() {
  const feed = document.getElementById('alerts-feed');
  const highConflicts = CONFLICTS
    .filter(c => c.intensity === 'high')
    .slice(0, 8);

  feed.innerHTML = highConflicts.map(c => `
    <div class="alert-item ${c.intensity}" data-id="${c.id}">
      <div class="alert-name">${TYPE_ICONS[c.type]} ${c.name}</div>
      <div class="alert-meta">${c.country} · ${c.status}</div>
    </div>
  `).join('');

  feed.querySelectorAll('.alert-item').forEach(item => {
    item.addEventListener('click', () => {
      const conflict = CONFLICTS.find(c => c.id === +item.dataset.id);
      if (conflict) showDetail(conflict);
    });
  });
}

// ── RIGHT PANEL: REGIONAL BREAKDOWN ──────────────────────────

function buildRegionalStats() {
  const regions = {};
  CONFLICTS.forEach(c => {
    const r = c.region.split('/')[0].trim().split('–')[0].trim();
    regions[r] = (regions[r] || 0) + 1;
  });

  const sorted = Object.entries(regions).sort((a,b) => b[1]-a[1]).slice(0, 7);
  const max = sorted[0][1];

  const el = document.getElementById('regional-stats');
  el.innerHTML = sorted.map(([name, count]) => `
    <div class="region-bar-item">
      <div class="region-bar-header">
        <span>${name.toUpperCase()}</span><span>${count}</span>
      </div>
      <div class="region-bar-wrap">
        <div class="region-bar-fill" style="width:${(count/max*100).toFixed(0)}%"></div>
      </div>
    </div>
  `).join('');
}

// ── RIGHT PANEL: TIMELINE ─────────────────────────────────────

const timelineEvents = [
  { date: "MAR 2026", text: "M23 rebels advance on Goma, eastern DRC" },
  { date: "FEB 2026", text: "Houthi attacks on Red Sea shipping continue" },
  { date: "JAN 2026", text: "DPRK troops reported in active combat in Russia" },
  { date: "DEC 2025", text: "HTS captures Damascus, Assad regime collapses" },
  { date: "NOV 2025", text: "Haiti MSS Kenyan mission expands operations" },
  { date: "OCT 2025", text: "Sudan RSF declares rival government in Darfur" },
  { date: "SEP 2025", text: "Myanmar resistance controls Lashio and Tachilek" },
  { date: "AUG 2025", text: "Colombian ELN peace talks collapse again" },
];

function buildTimeline() {
  const el = document.getElementById('timeline');
  el.innerHTML = timelineEvents.map(e => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-date">${e.date}</div>
        <div class="timeline-text">${e.text}</div>
      </div>
    </div>
  `).join('');
}

// ── CLOCK ─────────────────────────────────────────────────────

function updateClock() {
  const now = new Date();
  const h = String(now.getUTCHours()).padStart(2,'0');
  const m = String(now.getUTCMinutes()).padStart(2,'0');
  const s = String(now.getUTCSeconds()).padStart(2,'0');
  document.getElementById('utc-clock').textContent = `${h}:${m}:${s}`;

  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const d = String(now.getUTCDate()).padStart(2,'0');
  const mo = months[now.getUTCMonth()];
  const yr = now.getUTCFullYear();
  document.getElementById('utc-date').textContent = `${d} ${mo} ${yr}`;
}

setInterval(updateClock, 1000);
updateClock();

// ── COORDINATES DISPLAY ───────────────────────────────────────

map.on('mousemove', e => {
  const lat = e.latlng.lat.toFixed(3);
  const lng = e.latlng.lng.toFixed(3);
  document.getElementById('coords-display').textContent =
    `LAT: ${lat >= 0 ? '+' : ''}${lat} | LON: ${lng >= 0 ? '+' : ''}${lng}`;
});

// ── SEARCH ────────────────────────────────────────────────────

const searchInput   = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase().trim();
  if (q.length < 2) { searchResults.innerHTML = ''; return; }

  const matches = CONFLICTS.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.country.toLowerCase().includes(q) ||
    c.region.toLowerCase().includes(q) ||
    c.actors.some(a => a.toLowerCase().includes(q))
  ).slice(0, 8);

  if (!matches.length) {
    searchResults.innerHTML = `<div class="search-result-item">NO RESULTS FOUND</div>`;
    return;
  }

  searchResults.innerHTML = matches.map(c => `
    <div class="search-result-item" data-id="${c.id}">
      ${TYPE_ICONS[c.type]} <strong>${c.name}</strong> — ${c.country}
    </div>
  `).join('');

  searchResults.querySelectorAll('.search-result-item').forEach(item => {
    item.addEventListener('click', () => {
      const conflict = CONFLICTS.find(c => c.id === +item.dataset.id);
      if (conflict) {
        showDetail(conflict);
        searchInput.value = '';
        searchResults.innerHTML = '';
      }
    });
  });
});

document.addEventListener('click', e => {
  if (!e.target.closest('.map-search')) {
    searchResults.innerHTML = '';
  }
});

// ── STATUS MESSAGES ───────────────────────────────────────────

const statusMessages = [
  "SYSTEM NOMINAL — ALL SENSORS ACTIVE",
  "ACLED DATA FEED SYNCHRONIZED",
  "MARITIME THREAT LEVEL: CRITICAL (RED SEA)",
  "NEW INCIDENT LOGGED: EASTERN DRC",
  "SIGNAL INTELLIGENCE UPDATE RECEIVED",
  "UN OCHA HUMANITARIAN REPORT INGESTED",
  "SATELLITE IMAGERY ANALYSIS COMPLETE",
  "ALL LAYER NODES OPERATIONAL",
];

let msgIdx = 0;
setInterval(() => {
  msgIdx = (msgIdx + 1) % statusMessages.length;
  document.getElementById('status-msg').textContent = statusMessages[msgIdx];
}, 5000);

// ── TOOLTIP STYLES (inject) ───────────────────────────────────

const style = document.createElement('style');
style.textContent = `
  .sentinel-tooltip {
    background: rgba(6,13,18,0.95) !important;
    border: 1px solid #0e2a3a !important;
    border-radius: 3px !important;
    color: #c8e8f0 !important;
    font-family: 'Share Tech Mono', monospace !important;
    font-size: 11px !important;
    letter-spacing: 1px !important;
    padding: 6px 10px !important;
    box-shadow: 0 0 15px rgba(0,0,0,0.8) !important;
  }
  .sentinel-tooltip::before { display: none !important; }

  @keyframes ring-pulse {
    0%   { transform: scale(0.8); opacity: 0.8; }
    100% { transform: scale(2.2); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ── MOBILE TAB SWITCHING ──────────────────────────────────────

function switchTab(tab) {
  const mapEl    = document.getElementById('panel-map');
  const layersEl = document.getElementById('panel-layers');
  const intelEl  = document.getElementById('panel-intel');
  const navMap    = document.getElementById('nav-map');
  const navLayers = document.getElementById('nav-layers');
  const navIntel  = document.getElementById('nav-intel');

  // Only apply on mobile (mobile-nav visible = display:flex)
  const mobileNav = document.querySelector('.mobile-nav');
  if (!mobileNav || getComputedStyle(mobileNav).display === 'none') return;

  // Hide all
  mapEl.classList.remove('mobile-active');
  layersEl.classList.remove('mobile-active');
  intelEl.classList.remove('mobile-active');
  navMap.classList.remove('active');
  navLayers.classList.remove('active');
  navIntel.classList.remove('active');

  if (tab === 'map') {
    mapEl.classList.add('mobile-active');
    navMap.classList.add('active');
    // Leaflet needs size recalc when container was hidden
    setTimeout(() => map.invalidateSize(), 50);
  } else if (tab === 'layers') {
    layersEl.classList.add('mobile-active');
    navLayers.classList.add('active');
  } else if (tab === 'intel') {
    intelEl.classList.add('mobile-active');
    navIntel.classList.add('active');
  }
}

// When detail popup closes on mobile, go back to map tab
document.getElementById('popup-close').addEventListener('click', () => {
  popup.classList.add('hidden');
  // On mobile, make sure map tab is shown
  switchTab('map');
});

// ── INIT ──────────────────────────────────────────────────────

renderConflicts();
buildAlertsFeed();
buildRegionalStats();
buildTimeline();

// Animate threat bar
setTimeout(() => {
  document.getElementById('threat-bar').style.transition = 'width 2s ease';
}, 300);

console.log(`SENTINEL initialized. ${CONFLICTS.length} conflicts loaded.`);
