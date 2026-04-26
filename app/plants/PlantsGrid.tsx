'use client';

import { useState } from 'react';
import type { Plant } from './page';

const difficultyColor: Record<Plant['difficulty'], string> = {
  Easy: '#6FAE8E',
  Medium: '#CFC7B4',
  Hard: '#EDE7D9',
};

function PlantCard({ plant }: { plant: Plant }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="flex flex-col rounded-md overflow-hidden transition-colors"
      style={{
        backgroundColor: '#0F2A20',
        border: '1px solid rgba(111, 122, 110, 0.4)',
      }}
    >
      {imgError ? (
        <div
          className="w-full h-44 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #155724, #6FAE8E)' }}
        >
          <span className="text-4xl font-bold text-white">{plant.name[0]}</span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={plant.image}
          alt={plant.name}
          width={320}
          height={180}
          className="w-full h-44 object-cover"
          onError={() => setImgError(true)}
        />
      )}
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <span className="font-semibold" style={{ color: '#EDE7D9' }}>
            {plant.name}
          </span>
          <span
            className="shrink-0 rounded px-1.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: 'rgba(111, 122, 110, 0.2)',
              color: difficultyColor[plant.difficulty],
            }}
          >
            {plant.difficulty}
          </span>
        </div>
        <span className="text-sm italic" style={{ color: '#CFC7B4' }}>
          {plant.scientificName}
        </span>
        <div className="mt-1 flex flex-wrap gap-2 text-xs" style={{ color: '#6FAE8E' }}>
          <span>{plant.type}</span>
          <span>·</span>
          <span>{plant.lightRequirement} light</span>
          <span>·</span>
          <span>{plant.co2Required ? 'CO₂ required' : 'No CO₂'}</span>
        </div>
      </div>
    </div>
  );
}

export function PlantsGrid({ plants }: { plants: Plant[] }) {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? plants.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.scientificName.toLowerCase().includes(query.toLowerCase()),
      )
    : plants;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <input
          type="search"
          placeholder="Search plants..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md px-4 py-2 text-sm outline-none transition-colors"
          style={{
            backgroundColor: '#0F2A20',
            border: '1px solid rgba(111, 122, 110, 0.4)',
            color: '#EDE7D9',
          }}
        />
      </div>

      <p className="text-sm" style={{ color: '#CFC7B4' }}>
        {filtered.length} of {plants.length} species
      </p>

      {filtered.length === 0 ? (
        <p style={{ color: '#CFC7B4' }}>No plants match &ldquo;{query}&rdquo;.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      )}
    </div>
  );
}
