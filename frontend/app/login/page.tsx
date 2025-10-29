'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
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
      const response = await authAPI.login(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-2 text-white">Welcome Back, you were missed</h1>
        <p className='flex items-center justify-center'>Login here</p>
        {error && (
          <div className="bg-red-900/50 border border-red-800 text-red-400 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-300">Email</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 bg-black border border-gray-800 rounded text-white focus:outline-none focus:border-blue-600 transition"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="user@demo.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-300">Password</label>
            <input
              type="password"
              required
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-500 hover:text-blue-400 font-medium transition">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
