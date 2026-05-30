export type WorkCategory =
  | "All"
  | "Modeling"
  | "Creative Direction"
  | "Content Creation"
  | "Styling";

export const categories: WorkCategory[] = [
  "All",
  "Modeling",
  "Creative Direction",
  "Content Creation",
  "Styling"
];

export const externalLinks = {
  instagram: "https://www.instagram.com/gurshabedi/",
  behance: "https://www.behance.net/",
  contactEmail: "gurshabedi@gmail.com"
};

export const featuredClients = [
  "Client name pending approval",
  "Brand name pending approval",
  "Editorial partner pending approval"
];

export const workItems = [
  {
    title: "Chromatic Study",
    category: "Modeling",
    client: "Campaign client",
    year: "2025",
    role: "Modeling",
    description:
      "Bright editorial posing, layered styling, and movement-driven frames built for quick commercial scanning.",
    accent: "linear-gradient(135deg, #ff7b6b 0%, #ffbf3f 52%, #ffe8d7 100%)",
    link: externalLinks.instagram
  },
  {
    title: "Studio Heat",
    category: "Modeling",
    client: "Fashion editorial",
    year: "2024",
    role: "Modeling",
    description:
      "A sharper contrast set that signals confidence, polish, and range without losing the playful tone.",
    accent: "linear-gradient(135deg, #a31d64 0%, #f4607d 55%, #ffd0cc 100%)",
    link: externalLinks.instagram
  },
  {
    title: "Electric Narrative",
    category: "Creative Direction",
    client: "Creative campaign",
    year: "2025",
    role: "Creative Direction",
    description:
      "Editorial framing and maximal color choices shaped into a concise, client-friendly narrative arc.",
    accent: "linear-gradient(135deg, #f9b233 0%, #f4607d 45%, #863da8 100%)",
    link: externalLinks.behance
  },
  {
    title: "After Hours Set",
    category: "Creative Direction",
    client: "Beauty concept",
    year: "2024",
    role: "Creative Direction",
    description:
      "A direction-first concept balancing glamour, camp, and commercial clarity for brand-facing work.",
    accent: "linear-gradient(135deg, #1f0f1c 0%, #b93478 50%, #ffbf3f 100%)",
    link: externalLinks.behance
  },
  {
    title: "Playline Reel",
    category: "Content Creation",
    client: "Social campaign",
    year: "2025",
    role: "Content Creation",
    description:
      "Fast-turn visual storytelling made to feel elevated while still native to social platforms.",
    accent: "linear-gradient(135deg, #ff9053 0%, #ff5f6d 46%, #ffe2d9 100%)",
    link: externalLinks.instagram
  },
  {
    title: "Gloss Motion",
    category: "Content Creation",
    client: "Beauty partner",
    year: "2024",
    role: "Content Creation",
    description:
      "Color-saturated content designed to hold attention immediately and translate well across channels.",
    accent: "linear-gradient(135deg, #f78da7 0%, #f9d976 50%, #ffe8d7 100%)",
    link: externalLinks.instagram
  },
  {
    title: "Layer Theory",
    category: "Styling",
    client: "Fashion label",
    year: "2025",
    role: "Styling",
    description:
      "Wardrobe built around expressive silhouettes, high-energy color play, and editorial texture.",
    accent: "linear-gradient(135deg, #7f2142 0%, #dd4c89 46%, #f7bf45 100%)",
    link: externalLinks.behance
  },
  {
    title: "Candy Structure",
    category: "Styling",
    client: "Lookbook series",
    year: "2024",
    role: "Styling",
    description:
      "A more playful styling mix that still reads polished enough for prospective commercial clients.",
    accent: "linear-gradient(135deg, #ffbf3f 0%, #ff7b6b 50%, #ca457f 100%)",
    link: externalLinks.behance
  }
] as const;

export const invoiceDefaults = {
  businessName: "Gursha Bedi",
  businessEmail: "Add billing email",
  businessPhone: "Add phone number",
  businessAddress: "Add billing address",
  currency: "INR",
  paymentInstructions: "Add payment instructions after Gursha shares final details."
};
