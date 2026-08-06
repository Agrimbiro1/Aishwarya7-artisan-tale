export const couple = {
  bride: "Aanya",
  groom: "Vihaan",
  date: "Saturday, the fourteenth of February",
  year: "Two Thousand Twenty Seven",
  city: "Udaipur, Rajasthan",
  quote:
    "In every lifetime, in every language, the heart keeps returning to the same name.",
};

export const invitation = {
  brideParents: "Mr. Rajeev & Mrs. Sudha Malhotra",
  groomParents: "Mr. Anand & Mrs. Meera Rathore",
  venue: "Jagat Niwas Haveli, Lake Pichola",
  time: "Phere at 8:40 in the evening",
  blessing:
    "With the blessings of our elders and the warmth of your presence, we begin a new chapter.",
};

export type WeddingEvent = {
  name: string;
  script: string;
  date: string;
  time: string;
  place: string;
  note: string;
  tint: string;
  ink: string;
  motif: "marigold" | "leaf" | "sitar" | "mandap" | "coupe";
};

export const events: WeddingEvent[] = [
  {
    name: "Haldi",
    script: "Turmeric & Sunlight",
    date: "12 February",
    time: "10:00 in the morning",
    place: "Haveli Courtyard",
    note: "Turmeric ground at home, marigolds strung by hand, and far too much laughter. Wear something you do not mind staining yellow.",
    tint: "oklch(0.905 0.075 92 / 0.5)",
    ink: "oklch(0.58 0.09 78)",
    motif: "marigold",
  },
  {
    name: "Mehendi",
    script: "Leaf & Line",
    date: "12 February",
    time: "4:00 in the afternoon",
    place: "The Garden Terrace",
    note: "Cool green shade, dholak in the corner, and henna drawn in patterns that take hours and last for weeks.",
    tint: "oklch(0.885 0.045 145 / 0.5)",
    ink: "oklch(0.5 0.06 148)",
    motif: "leaf",
  },
  {
    name: "Sangeet",
    script: "Song & Lamplight",
    date: "13 February",
    time: "7:30 in the evening",
    place: "Durbar Hall",
    note: "Sitar, tabla, and every cousin with a rehearsed dance. Lanterns on the water until the music runs out.",
    tint: "oklch(0.78 0.06 250 / 0.34)",
    ink: "oklch(0.44 0.08 255)",
    motif: "sitar",
  },
  {
    name: "Vivaah",
    script: "The Wedding",
    date: "14 February",
    time: "8:40 in the evening",
    place: "Lakeside Mandap",
    note: "Ivory and gold, a fire lit at dusk, seven steps taken slowly. The moment everything else was leading to.",
    tint: "oklch(0.93 0.03 86 / 0.6)",
    ink: "oklch(0.55 0.08 74)",
    motif: "mandap",
  },
  {
    name: "Reception",
    script: "Champagne & Farewell",
    date: "15 February",
    time: "8:00 in the evening",
    place: "The Water Pavilion",
    note: "A quieter evening. Long tables, soft light, and the chance to sit with everyone we love before they go home.",
    tint: "oklch(0.92 0.025 68 / 0.5)",
    ink: "oklch(0.55 0.05 60)",
    motif: "coupe",
  },
];

export const family = [
  { name: "Rajeev & Sudha Malhotra", relation: "Parents of the Bride", note: "They planted the garden this whole wedding is standing in." },
  { name: "Anand & Meera Rathore", relation: "Parents of the Groom", note: "Keepers of the recipes, the stories and the good silver." },
  { name: "Dadi Kamla Devi", relation: "Grandmother", note: "Eighty-nine, and still the first one on the dance floor." },
  { name: "Ishaan Malhotra", relation: "Brother of the Bride", note: "Officially in charge of the baraat. Unofficially, of everything." },
  { name: "Riya Rathore", relation: "Sister of the Groom", note: "Chose every flower in this invitation, twice." },
  { name: "Kabir & Naina", relation: "The Little Ones", note: "Ring bearers, petal throwers, professional escape artists." },
];

export const travel = [
  { label: "Accommodation", body: "Rooms held under the Malhotra–Rathore name at Jagat Niwas Haveli and Amet Palace. Mention the wedding when you call." },
  { label: "By Air", body: "Maharana Pratap Airport (UDR), 22 km. Cars will meet every guest at arrivals from the 10th onward." },
  { label: "By Rail", body: "Udaipur City Junction, 5 km. The Mewar Express arrives at dawn — a lovely way to come in." },
  { label: "Getting Around", body: "A shuttle loops between the havelis and every venue, twenty past each hour. Boats for the lakeside mandap." },
  { label: "Dress Code", body: "Haldi in yellows. Mehendi in greens. Sangeet in jewel tones. Wedding in ivory and gold. Reception, whatever makes you feel wonderful." },
  { label: "Weather", body: "February in Mewar: 26°C by day, 11°C after sundown. Carry a shawl for the lake evenings." },
  { label: "Nearby", body: "City Palace, Bagore ki Haveli aarti at dusk, Shilpgram for handmade paper and block prints." },
  { label: "In Case of Anything", body: "Concierge desk at Jagat Niwas, open through the night. Ask for Devendra." },
];

export const contacts = [
  { label: "Call", value: "+91 98290 44120", href: "tel:+919829044120" },
  { label: "WhatsApp", value: "+91 98290 44120", href: "https://wa.me/919829044120" },
  { label: "Write", value: "aanyaandvihaan@gmail.com", href: "mailto:aanyaandvihaan@gmail.com" },
  { label: "Planner", value: "Studio Marigold — Tara", href: "tel:+919810022331" },
];
