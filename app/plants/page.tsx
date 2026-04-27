import Link from 'next/link';
import { generatePlantSvg, svgToDataUri, type GrowthForm } from '@/lib/plantSvg';
import { PlantsGrid } from './PlantsGrid';

export const metadata = {
  title: 'Plants — Aquascape Studio',
};

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'Stem' | 'Rosette' | 'Moss' | 'Fern' | 'Bulb' | 'Floating' | 'Carpeting';
  lightRequirement: 'Low' | 'Medium' | 'High';
  co2Required: boolean;
  image: string;
  imageIsPhoto: boolean;
}

interface PlantDef {
  id: string;
  name: string;
  scientificName: string;
  difficulty: Plant['difficulty'];
  type: Plant['type'];
  lightRequirement: Plant['lightRequirement'];
  co2Required: boolean;
  growthForm: GrowthForm;
  colorHex: string;
  inatQuery?: string; // override when iNaturalist uses a different name
}

const PLANT_DEFS: PlantDef[] = [
  { id: 'java-moss',            name: 'Java Moss',            scientificName: 'Taxiphyllum barbieri',       difficulty: 'Easy',   type: 'Moss',      lightRequirement: 'Low',    co2Required: false, growthForm: 'moss',      colorHex: '#5a8a3c' },
  { id: 'java-fern',            name: 'Java Fern',            scientificName: 'Microsorum pteropus',        difficulty: 'Easy',   type: 'Fern',      lightRequirement: 'Low',    co2Required: false, growthForm: 'epiphyte',  colorHex: '#3d6b3a' },
  { id: 'anubias-barteri',      name: 'Anubias',              scientificName: 'Anubias barteri',            difficulty: 'Easy',   type: 'Fern',      lightRequirement: 'Low',    co2Required: false, growthForm: 'epiphyte',  colorHex: '#2f5d34' },
  { id: 'amazon-sword',         name: 'Amazon Sword',         scientificName: 'Echinodorus grisebachii',    difficulty: 'Easy',   type: 'Rosette',   lightRequirement: 'Medium', co2Required: false, growthForm: 'rosette',   colorHex: '#4a8a3e' },
  { id: 'rotala-rotundifolia',  name: 'Rotala',               scientificName: 'Rotala rotundifolia',        difficulty: 'Medium', type: 'Stem',      lightRequirement: 'Medium', co2Required: false, growthForm: 'stem',      colorHex: '#d37a9a' },
  { id: 'ludwigia-repens',      name: 'Ludwigia',             scientificName: 'Ludwigia repens',            difficulty: 'Easy',   type: 'Stem',      lightRequirement: 'Medium', co2Required: false, growthForm: 'stem',      colorHex: '#c0514a' },
  { id: 'dwarf-hairgrass',      name: 'Dwarf Hairgrass',      scientificName: 'Eleocharis parvula',         difficulty: 'Medium', type: 'Rosette',   lightRequirement: 'High',   co2Required: true,  growthForm: 'carpeting', colorHex: '#5ea03b' },
  { id: 'monte-carlo',          name: 'Monte Carlo',          scientificName: 'Micranthemum tweediei',      difficulty: 'Medium', type: 'Carpeting', lightRequirement: 'High',   co2Required: true,  growthForm: 'carpeting', colorHex: '#8fc25a', inatQuery: 'Micranthemum umbrosum' },
  { id: 'hc-cuba',              name: 'HC Cuba',              scientificName: 'Hemianthus callitrichoides', difficulty: 'Hard',   type: 'Carpeting', lightRequirement: 'High',   co2Required: true,  growthForm: 'carpeting', colorHex: '#7ab840' },
  { id: 'glossostigma',         name: 'Glossostigma',         scientificName: 'Glossostigma elatinoides',   difficulty: 'Hard',   type: 'Carpeting', lightRequirement: 'High',   co2Required: true,  growthForm: 'carpeting', colorHex: '#7cc35a' },
  { id: 'cryptocoryne-wendtii', name: 'Cryptocoryne Wendtii', scientificName: 'Cryptocoryne wendtii',       difficulty: 'Easy',   type: 'Rosette',   lightRequirement: 'Low',    co2Required: false, growthForm: 'rosette',   colorHex: '#6b6b2e' },
  { id: 'vallisneria',          name: 'Vallisneria',          scientificName: 'Vallisneria spiralis',        difficulty: 'Easy',   type: 'Rosette',   lightRequirement: 'Medium', co2Required: false, growthForm: 'rosette',   colorHex: '#4e8c3a' },
  { id: 'hornwort',             name: 'Hornwort',             scientificName: 'Ceratophyllum demersum',     difficulty: 'Easy',   type: 'Stem',      lightRequirement: 'Low',    co2Required: false, growthForm: 'stem',      colorHex: '#78b84a' },
  { id: 'water-wisteria',       name: 'Water Wisteria',       scientificName: 'Hygrophila difformis',       difficulty: 'Easy',   type: 'Stem',      lightRequirement: 'Medium', co2Required: false, growthForm: 'stem',      colorHex: '#92b65a' },
  { id: 'aponogeton-ulvaceus',  name: 'Aponogeton',           scientificName: 'Aponogeton ulvaceus',        difficulty: 'Medium', type: 'Bulb',      lightRequirement: 'Medium', co2Required: false, growthForm: 'rosette',   colorHex: '#5a9e4a' },
];

async function fetchINatPhoto(scientificName: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(scientificName)}&per_page=1`,
      {
        next: { revalidate: 604800 }, // 7 days
        headers: { 'User-Agent': 'AquascapeStudio/1.0 (https://efferves.live)' },
      }
    );
    if (!res.ok) return null;
    const data = await res.json() as {
      results?: { default_photo?: { medium_url?: string } }[]
    };
    const url = data.results?.[0]?.default_photo?.medium_url;
    if (!url) return null;
    // Request large size for better card quality
    return url.replace('/medium.', '/large.');
  } catch {
    return null;
  }
}

export default async function PlantsPage() {
  const photos = await Promise.all(
    PLANT_DEFS.map((def) => fetchINatPhoto(def.inatQuery ?? def.scientificName))
  );

  const PLANTS: Plant[] = PLANT_DEFS.map((def, i) => ({
    id: def.id,
    name: def.name,
    scientificName: def.scientificName,
    difficulty: def.difficulty,
    type: def.type,
    lightRequirement: def.lightRequirement,
    co2Required: def.co2Required,
    image: photos[i] ?? svgToDataUri(generatePlantSvg(def.growthForm, def.colorHex)),
    imageIsPhoto: !!photos[i],
  }));

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">
      <header className="mb-8 flex items-baseline justify-between">
        <h1 className="text-3xl font-bold" style={{ color: '#EDE7D9' }}>
          Plants
        </h1>
        <Link href="/" style={{ color: '#CFC7B4', fontSize: '0.875rem' }}>
          Home
        </Link>
      </header>
      <PlantsGrid plants={PLANTS} />
    </main>
  );
}
