import Link from 'next/link';
import { PlantsGrid } from './PlantsGrid';

export const metadata = {
  title: 'Plants — Aquascape Studio',
};

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'Stem' | 'Rosette' | 'Moss' | 'Fern' | 'Bulb' | 'Floating';
  lightRequirement: 'Low' | 'Medium' | 'High';
  co2Required: boolean;
}

const PLANTS: Plant[] = [
  {
    id: 'java-moss',
    name: 'Java Moss',
    scientificName: 'Taxiphyllum barbieri',
    difficulty: 'Easy',
    type: 'Moss',
    lightRequirement: 'Low',
    co2Required: false,
  },
  {
    id: 'java-fern',
    name: 'Java Fern',
    scientificName: 'Microsorum pteropus',
    difficulty: 'Easy',
    type: 'Fern',
    lightRequirement: 'Low',
    co2Required: false,
  },
  {
    id: 'anubias-barteri',
    name: 'Anubias',
    scientificName: 'Anubias barteri',
    difficulty: 'Easy',
    type: 'Rosette',
    lightRequirement: 'Low',
    co2Required: false,
  },
  {
    id: 'amazon-sword',
    name: 'Amazon Sword',
    scientificName: 'Echinodorus grisebachii',
    difficulty: 'Easy',
    type: 'Rosette',
    lightRequirement: 'Medium',
    co2Required: false,
  },
  {
    id: 'rotala-rotundifolia',
    name: 'Rotala',
    scientificName: 'Rotala rotundifolia',
    difficulty: 'Medium',
    type: 'Stem',
    lightRequirement: 'Medium',
    co2Required: false,
  },
  {
    id: 'ludwigia-repens',
    name: 'Ludwigia',
    scientificName: 'Ludwigia repens',
    difficulty: 'Easy',
    type: 'Stem',
    lightRequirement: 'Medium',
    co2Required: false,
  },
  {
    id: 'dwarf-hairgrass',
    name: 'Dwarf Hairgrass',
    scientificName: 'Eleocharis parvula',
    difficulty: 'Medium',
    type: 'Rosette',
    lightRequirement: 'High',
    co2Required: true,
  },
  {
    id: 'monte-carlo',
    name: 'Monte Carlo',
    scientificName: 'Micranthemum tweediei',
    difficulty: 'Medium',
    type: 'Stem',
    lightRequirement: 'High',
    co2Required: true,
  },
  {
    id: 'hc-cuba',
    name: 'HC Cuba',
    scientificName: 'Hemianthus callitrichoides',
    difficulty: 'Hard',
    type: 'Stem',
    lightRequirement: 'High',
    co2Required: true,
  },
  {
    id: 'glossostigma',
    name: 'Glossostigma',
    scientificName: 'Glossostigma elatinoides',
    difficulty: 'Hard',
    type: 'Stem',
    lightRequirement: 'High',
    co2Required: true,
  },
  {
    id: 'cryptocoryne-wendtii',
    name: 'Cryptocoryne Wendtii',
    scientificName: 'Cryptocoryne wendtii',
    difficulty: 'Easy',
    type: 'Rosette',
    lightRequirement: 'Low',
    co2Required: false,
  },
  {
    id: 'vallisneria',
    name: 'Vallisneria',
    scientificName: 'Vallisneria spiralis',
    difficulty: 'Easy',
    type: 'Rosette',
    lightRequirement: 'Medium',
    co2Required: false,
  },
  {
    id: 'hornwort',
    name: 'Hornwort',
    scientificName: 'Ceratophyllum demersum',
    difficulty: 'Easy',
    type: 'Stem',
    lightRequirement: 'Low',
    co2Required: false,
  },
  {
    id: 'water-wisteria',
    name: 'Water Wisteria',
    scientificName: 'Hygrophila difformis',
    difficulty: 'Easy',
    type: 'Stem',
    lightRequirement: 'Medium',
    co2Required: false,
  },
  {
    id: 'aponogeton-ulvaceus',
    name: 'Aponogeton',
    scientificName: 'Aponogeton ulvaceus',
    difficulty: 'Medium',
    type: 'Bulb',
    lightRequirement: 'Medium',
    co2Required: false,
  },
];

export default function PlantsPage() {
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
