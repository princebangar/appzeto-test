import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await api.post('/auth/login', form);
            login(data.user, data.token);
            if (data.user.role === 'admin') navigate('/admin/vendors');
            else if (data.user.role === 'vendor') navigate('/vendor/products');
            else navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <FiLogIn className="text-blue-600 text-2xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
                    <p className="text-slate-500 text-sm mt-1">Sign in to your account</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full border border-slate-200 pl-10 pr-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border border-slate-200 pl-10 pr-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 mt-2"
                    >
                        <FiLogIn />
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-slate-500">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 font-medium hover:underline">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
