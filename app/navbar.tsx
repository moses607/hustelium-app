'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-indigo-800 text-white p-4 flex gap-6 justify-center shadow-md">
      <Link href="/" className="hover:underline">Accueil</Link>
      <Link href="/coach" className="hover:underline">Coach</Link>
      <Link href="/tutoriels" className="hover:underline">Tutoriels</Link>
      <Link href="/communauté" className="hover:underline">Communauté</Link>
    </nav>
  );
}
