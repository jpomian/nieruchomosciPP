'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Image from 'next/image';
import Logo from '../assets/logo-transparent.png';
import Head from 'next/head'

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/panel'); // Redirect to your protected page
      } else {
        setError('Błędne hasło.');
      }
    } catch {
      setError('Wystąpił błąd #444. Napisz wiadomość do administratora.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Panel Pod Parasolem - Zaloguj sie</title>
        <meta property="og:title" content="Zaloguj sie" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white p-8 rounded shadow-md w-96">
        <div className="flex items-center justify-center mb-6">
          <Image src={Logo} alt='Nieruchomości Pod Parasolem' width={70} height={70} className="mr-4" />
          <div className="text-gray-700 text-xl font-bold">
            Panel Administratora
          </div>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Wprowadź hasło:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500"
          >
            Zaloguj się (24H)
          </button>
          <Link href='/' className='flex items-center justify-center py-2 px-4 rounded-lg border hover:bg-gray-100 mt-4 text-sm'>
            Powrót do strony głównej
          </Link>
        </form>
      </div>
    </div>
  );
}