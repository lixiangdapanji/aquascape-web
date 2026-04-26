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
  image: string;
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Taxiphyllum_barbieri_2.jpg/320px-Taxiphyllum_barbieri_2.jpg',
  },
  {
    id: 'java-fern',
    name: 'Java Fern',
    scientificName: 'Microsorum pteropus',
    difficulty: 'Easy',
    type: 'Fern',
    lightRequirement: 'Low',
    co2Required: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Microsorum_pteropus2.jpg/320px-Microsorum_pteropus2.jpg',
  },
  {
    id: 'anubias-barteri',
    name: 'Anubias',
    scientificName: 'Anubias barteri',
    difficulty: 'Easy',
    type: 'Rosette',
    lightRequirement: 'Low',
    co2Required: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Anubias_barteri.jpg/320px-Anubias_barteri.jpg',
  },
  {
    id: 'amazon-sword',
    name: 'Amazon Sword',
    scientificName: 'Echinodorus grisebachii',
    difficulty: 'Easy',
    type: 'Rosette',
    lightRequirement: 'Medium',
    co2Required: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Echinodorus_grisebachii_-_Flickr_-_Mick_Talbot.jpg/320px-Echinodorus_grisebachii_-_Flickr_-_Mick_Talbot.jpg',
  },
  {
    id: 'rotala-rotundifolia',
    name: 'Rotala',
    scientificName: 'Rotala rotundifolia',
    difficulty: 'Medium',
    type: 'Stem',
    lightRequirement: 'Medium',
    co2Required: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Rotala_rotundifolia.jpg/320px-Rotala_rotundifolia.jpg',
  },
  {
    id: 'ludwigia-repens',
    name: 'Ludwigia',
    scientificName: 'Ludwigia repens',
    difficulty: 'Easy',
    type: 'Stem',
    lightRequirement: 'Medium',
    co2Required: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ludwigia_repens_2.jpg/320px-Ludwigia_repens_2.jpg',
  },
  {
    id: 'dwarf-hairgrass',
    name: 'Dwarf Hairgrass',
    scientificName: 'Eleocharis parvula',
    difficulty: 'Medium',
    type: 'Rosette',
    lightRequirement: 'High',
    co2Required: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Eleocharis_acicularis_rf.jpg/320px-Eleocharis_acicularis_rf.jpg',
  },
  {
    id: 'monte-carlo',
    name: 'Monte Carlo',
    scientificName: 'Micranthemum tweediei',
    difficulty: 'Medium',
    type: 'Stem',
    lightRequirement: 'High',
    co2Required: true,
    image: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23155724'/%3E%3Cstop offset='1' stop-color='%236FAE8E'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='320' height='180' fill='url(%23g)'/%3E%3Ctext x='160' y='105' font-family='sans-serif' font-size='72' font-weight='bold' fill='white' text-anchor='middle'%3EM%3C/text%3E%3C/svg%3E`,
  },
  {
    id: 'hc-cuba',
    name: 'HC Cuba',
    scientificName: 'Hemianthus callitrichoides',
    difficulty: 'Hard',
    type: 'Stem',
    lightRequirement: 'High',
    co2Required: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Hemianthus_callitrichoides.jpg/320px-Hemianthus_callitrichoides.jpg',
  },
  {
    id: 'glossostigma',
    name: 'Glossostigma',
    scientificName: 'Glossostigma elatinoides',
    difficulty: 'Hard',
    type: 'Stem',
    lightRequirement: 'High',
    co2Required: true,
    image: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23155724'/%3E%3Cstop offset='1' stop-color='%236FAE8E'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='320' height='180' fill='url(%23g)'/%3E%3Ctext x='160' y='105' font-family='sans-serif' font-size='72' font-weight='bold' fill='white' text-anchor='middle'%3EG%3C/text%3E%3C/svg%3E`,
  },
  {
    id: 'cryptocoryne-wendtii',
    name: 'Cryptocoryne Wendtii',
    scientificName: 'Cryptocoryne wendtii',
    difficulty: 'Easy',
    type: 'Rosette',
    lightRequirement: 'Low',
    co2Required: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Cryptocoryne_wendtii.jpg/320px-Cryptocoryne_wendtii.jpg',
  },
  {
    id: 'vallisneria',
    name: 'Vallisneria',
    scientificName: 'Vallisneria spiralis',
    difficulty: 'Easy',
    type: 'Rosette',
    lightRequirement: 'Medium',
    co2Required: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Vallisneria_spiralis_2.jpg/320px-Vallisneria_spiralis_2.jpg',
  },
  {
    id: 'hornwort',
    name: 'Hornwort',
    scientificName: 'Ceratophyllum demersum',
    difficulty: 'Easy',
    type: 'Stem',
    lightRequirement: 'Low',
    co2Required: false,
    image: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23155724'/%3E%3Cstop offset='1' stop-color='%236FAE8E'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='320' height='180' fill='url(%23g)'/%3E%3Ctext x='160' y='105' font-family='sans-serif' font-size='72' font-weight='bold' fill='white' text-anchor='middle'%3EH%3C/text%3E%3C/svg%3E`,
  },
  {
    id: 'water-wisteria',
    name: 'Water Wisteria',
    scientificName: 'Hygrophila difformis',
    difficulty: 'Easy',
    type: 'Stem',
    lightRequirement: 'Medium',
    co2Required: false,
    image: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23155724'/%3E%3Cstop offset='1' stop-color='%236FAE8E'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='320' height='180' fill='url(%23g)'/%3E%3Ctext x='160' y='105' font-family='sans-serif' font-size='72' font-weight='bold' fill='white' text-anchor='middle'%3EW%3C/text%3E%3C/svg%3E`,
  },
  {
    id: 'aponogeton-ulvaceus',
    name: 'Aponogeton',
    scientificName: 'Aponogeton ulvaceus',
    difficulty: 'Medium',
    type: 'Bulb',
    lightRequirement: 'Medium',
    co2Required: false,
    image: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23155724'/%3E%3Cstop offset='1' stop-color='%236FAE8E'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='320' height='180' fill='url(%23g)'/%3E%3Ctext x='160' y='105' font-family='sans-serif' font-size='72' font-weight='bold' fill='white' text-anchor='middle'%3EA%3C/text%3E%3C/svg%3E`,
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
