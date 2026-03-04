export const projects = [
  {
    id: 1,
    name: "Résidence Jardin de Cocody",
    location: "Cocody, Riviera Golf, Abidjan",
    city: "Abidjan",
    commune: "Cocody",
    operator: {
      name: "KOUADIO IMMOBILIER SARL",
      rating: 4.5,
      reviews: 28,
      verified: true
    },
    totalLots: 120,
    availableLots: 35,
    soldLots: 73,
    reservedLots: 12,
    priceMin: 8500000,
    priceMax: 15000000,
    surfaceMin: 250,
    surfaceMax: 600,
    progress: 60,
    status: "En cours",
    certified: true,
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800",
    images: [
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"
    ],
    features: ["Eau courante", "Électricité", "Voirie pavée", "Éclairage public"],
    description: "Projet résidentiel haut standing situé dans le quartier prisé de Riviera Golf. Terrain viabilisé avec toutes commodités. Infrastructure complète avec accès facile et proximité des services essentiels.",
    deliveryDate: "2026-12-31",
    investment: "2.5 Milliards FCFA",
    documents: [
      { name: "Arrêté d'Approbation", verified: true, date: "2024-01-15" },
      { name: "Titre Foncier", verified: true, date: "2024-01-10" },
      { name: "Permis de Lotir", verified: true, date: "2024-01-20" },
      { name: "Rapport de Bornage", verified: true, date: "2024-01-25" }
    ]
  },
  {
    id: 2,
    name: "Les Villas de Bingerville",
    location: "Bingerville, Zone Résidentielle",
    city: "Bingerville",
    commune: "Centre",
    operator: {
      name: "AFRICA LAND SARL",
      rating: 4.2,
      reviews: 15,
      verified: true
    },
    totalLots: 85,
    availableLots: 12,
    soldLots: 65,
    reservedLots: 8,
    priceMin: 6000000,
    priceMax: 12000000,
    surfaceMin: 300,
    surfaceMax: 500,
    progress: 85,
    status: "En finition",
    certified: true,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800"
    ],
    features: ["Eau courante", "Électricité", "Sécurité 24/7", "Espaces verts"],
    description: "Lotissement résidentiel dans un cadre verdoyant à Bingerville. Idéal pour construction de villas familiales. Projet presque terminé.",
    deliveryDate: "2026-06-30",
    investment: "1.8 Milliards FCFA",
    documents: [
      { name: "Arrêté d'Approbation", verified: true, date: "2023-03-15" },
      { name: "Titre Foncier", verified: true, date: "2023-03-10" },
      { name: "Permis de Lotir", verified: true, date: "2023-03-20" }
    ]
  },
  {
    id: 3,
    name: "Lotissement Plateau Dokui",
    location: "Plateau Dokui, Bouaké",
    city: "Bouaké",
    commune: "Plateau Dokui",
    operator: {
      name: "BINATE PROMOTION",
      rating: 3.8,
      reviews: 8,
      verified: true
    },
    totalLots: 200,
    availableLots: 150,
    soldLots: 40,
    reservedLots: 10,
    priceMin: 4000000,
    priceMax: 8000000,
    surfaceMin: 200,
    surfaceMax: 400,
    progress: 30,
    status: "En cours",
    certified: true,
    image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800",
    images: [
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800"
    ],
    features: ["Eau courante", "Électricité prévue", "Grande superficie"],
    description: "Grand projet de lotissement à Bouaké, deuxième ville de Côte d'Ivoire. Prix accessibles pour tous budgets.",
    deliveryDate: "2027-03-31",
    investment: "1.2 Milliards FCFA",
    documents: [
      { name: "Arrêté d'Approbation", verified: true, date: "2025-11-20" }
    ]
  },
  {
    id: 4,
    name: "Résidence des Lagunes",
    location: "Grand-Bassam, Zone Touristique",
    city: "Grand-Bassam",
    commune: "Moossou",
    operator: {
      name: "KOUADIO IMMOBILIER SARL",
      rating: 4.5,
      reviews: 28,
      verified: true
    },
    totalLots: 60,
    availableLots: 25,
    soldLots: 30,
    reservedLots: 5,
    priceMin: 10000000,
    priceMax: 20000000,
    surfaceMin: 400,
    surfaceMax: 800,
    progress: 45,
    status: "En cours",
    certified: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
    ],
    features: ["Eau courante", "Électricité", "Vue mer", "Sécurité privée"],
    description: "Projet premium en bord de mer à Grand-Bassam. Terrains de grande superficie avec vue imprenable.",
    deliveryDate: "2027-12-31",
    investment: "3.5 Milliards FCFA",
    documents: [
      { name: "Arrêté d'Approbation", verified: true, date: "2024-06-10" },
      { name: "Titre Foncier", verified: true, date: "2024-06-05" }
    ]
  },
  {
    id: 5,
    name: "Cité Moderne Yamoussoukro",
    location: "Yamoussoukro, Quartier Habitat",
    city: "Yamoussoukro",
    commune: "Habitat",
    operator: {
      name: "CI DEVELOPPEMENT",
      rating: 4.0,
      reviews: 12,
      verified: true
    },
    totalLots: 150,
    availableLots: 80,
    soldLots: 60,
    reservedLots: 10,
    priceMin: 5000000,
    priceMax: 10000000,
    surfaceMin: 250,
    surfaceMax: 500,
    progress: 50,
    status: "En cours",
    certified: true,
    image: "https://images.unsplash.com/photo-1626178793926-22b28830aa30?w=800",
    images: [
      "https://images.unsplash.com/photo-1626178793926-22b28830aa30?w=800"
    ],
    features: ["Eau courante", "Électricité", "Voirie", "Proximité centre-ville"],
    description: "Lotissement moderne dans la capitale politique. Infrastructures de qualité et proximité de tous les services.",
    deliveryDate: "2026-09-30",
    investment: "1.5 Milliards FCFA",
    documents: [
      { name: "Arrêté d'Approbation", verified: true, date: "2024-02-28" },
      { name: "Titre Foncier", verified: true, date: "2024-02-25" }
    ]
  }
];

export const cities = [
  "Abidjan", 
  "Bouaké", 
  "San Pedro", 
  "Yamoussoukro", 
  "Daloa", 
  "Bingerville", 
  "Grand-Bassam",
  "Korhogo",
  "Man"
];
