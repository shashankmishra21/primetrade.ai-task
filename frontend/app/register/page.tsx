'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authAPI.register(formData);
      alert('Registration successful! Please login.');
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-2 text-white flex items-center justify-center">Let's get started</h1>
        <p className='flex items-center justify-center'>Register yourself</p>
        {error && (
          <div className="bg-red-900/50 border border-red-800 text-red-400 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-300">Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 bg-black border border-gray-800 rounded text-white focus:outline-none focus:border-blue-600 transition"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Shashank Mishra"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-300">Email</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 bg-black border border-gray-800 rounded text-white focus:outline-none focus:border-blue-600 transition"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="user@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-300">Password</label>
            <p>password must be 6 characters long</p>
            <input
              type="password"
              required
              minLength={6}
              className="w-full px-3 py-2 bg-black border border-gray-800 rounded text-white focus:outline-none focus:border-blue-600 transition"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:text-blue-400 font-medium transition">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
