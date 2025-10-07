'use client';

import { useState } from 'react';

export default function DevisPage() {
  const [pays, setPays] = useState('');
  const [produit, setProduit] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    alert(`Demande envoyée pour ${produit} en ${pays} : ${description}`);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">📦 Demande de Devis</h1>
      <p>Remplis ce formulaire pour contacter un mandataire comme Sino Sourcing ou un fournisseur local.</p>

      <select
        value={pays}
        onChange={(e) => setPays(e.target.value)}
        className="w-full p-2 rounded border"
      >
        <option value="">Choisir un pays</option>
        <option value="Chine">Chine</option>
        <option value="Inde">Inde</option>
        <option value="Bangladesh">Bangladesh</option>
      </select>

      <input
        type="text"
        placeholder="Type de produit ou service"
        value={produit}
        onChange={(e) => setProduit(e.target.value)}
        className="w-full p-2 rounded border"
      />

      <textarea
        placeholder="Décris ton besoin en quelques lignes"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 rounded border h-32"
      />

      <button
        onClick={handleSubmit}
        className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-900"
      >
        Envoyer la demande
      </button>
    </div>
  );
}
