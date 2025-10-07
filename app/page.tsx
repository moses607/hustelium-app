'use client';
'use client';

import { useState } from 'react';

const languages = ['en', 'zh', 'hi', 'es', 'ar', 'bn', 'pt', 'ru', 'tl', 'ceb'];

const translations = {
  en: {
    title: '🌍 Hustelium',
    description: 'Connect to a global community of side hustlers, mentors, coaches, and DAO opportunities.',
    placeholder: 'Ask your Hustelium coach a question...',
    button: 'Send',
  },
  fr: {
    title: '🌍 Hustelium',
    description: 'Connecte-toi à une communauté mondiale de side hustlers, mentors, coachs et opportunités DAO.',
    placeholder: 'Pose une question à ton coach Hustelium...',
    button: 'Envoyer',
  },
  es: {
    title: '🌍 Hustelium',
    description: 'Conéctate con una comunidad global de emprendedores, mentores y oportunidades DAO.',
    placeholder: 'Haz una pregunta a tu coach Hustelium...',
    button: 'Enviar',
  },
  // Tu peux ajouter les autres langues ici plus tard
};

import { useState } from 'react';

export default function Home() {
  const [language, setLanguage] = useState('en');
  const [message, setMessage] = useState('');

  const languages = ['en', 'fr', 'es', 'pt', 'de', 'zh', 'ar', 'ru', 'hi', 'sw'];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-indigo-900 to-purple-700 text-white">
      <h1 className="text-4xl font-bold mb-6">🌍 Hustelium</h1>
      <p className="mb-4 text-center max-w-xl">
        Connecte-toi à une communauté mondiale de side hustlers, mentors, coachs et opportunités DAO.
      </p>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="p-2 rounded text-black mb-4"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Pose une question à ton coach Hustelium..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full max-w-md p-4 rounded text-black"
      />

      <button
        onClick={() => alert(`Message envoyé en ${language}: ${message}`)}
        className="mt-4 px-6 py-2 bg-white text-indigo-900 font-bold rounded"
      >
        Envoyer
      </button>
    </main>
  );
const languages = ['en', 'zh', 'hi', 'es', 'ar', 'bn', 'pt', 'ru', 'tl', 'ceb'];
const translations = {
  en: {
    title: '🌍 Hustelium',
    description: 'Connect to a global community of side hustlers, mentors, coaches, and DAO opportunities.',
    placeholder: 'Ask your Hustelium coach a question...',
    button: 'Send',
  },
  fr: {
    title: '🌍 Hustelium',
    description: 'Connecte-toi à une communauté mondiale de side hustlers, mentors, coachs et opportunités DAO.',
    placeholder: 'Pose une question à ton coach Hustelium...',
    button: 'Envoyer',
  },
  es: {
    title: '🌍 Hustelium',
    description: 'Conéctate con una comunidad global de emprendedores, mentores y oportunidades DAO.',
    placeholder: 'Haz una pregunta a tu coach Hustelium...',
    button: 'Enviar',
  },
const translations = {
  en: {
    title: '🌍 Hustelium',
    description: 'Connect to a global community of side hustlers, mentors, coaches, and DAO opportunities.',
    placeholder: 'Ask your Hustelium coach a question...',
    button: 'Send',
  },
  fr: {
    title: '🌍 Hustelium',
    description: 'Connecte-toi à une communauté mondiale de side hustlers, mentors, coachs et opportunités DAO.',
    placeholder: 'Pose une question à ton coach Hustelium...',
    button: 'Envoyer',
  },
  es: {
    title: '🌍 Hustelium',
    description: 'Conéctate con una comunidad global de emprendedores, mentores y oportunidades DAO.',
    placeholder: 'Haz una pregunta a tu coach Hustelium...',
    button: 'Enviar',
  },
const t = translations[language] || translations['en'];
}
