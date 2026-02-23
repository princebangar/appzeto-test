import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FiShoppingCart, FiEye, FiPackage } from 'react-icons/fi';

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { addToCart } = useCart();
    const { user } = useAuth();

    useEffect(() => {
        api.get('/products')
            .then(({ data }) => setProducts(data))
            .catch(() => setError('Failed to load products'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-8">
                <FiPackage className="text-blue-600 text-2xl" />
                <h1 className="text-2xl font-bold text-slate-800">All Products</h1>
                <span className="ml-auto bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {products.length} items
                </span>
            </div>

            {products.length === 0 && (
                <div className="text-center py-20 text-slate-400">
                    <FiPackage className="text-5xl mx-auto mb-4" />
                    <p>No products available yet.</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p) => (
                    <div key={p._id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
                        {p.images?.[0] ? (
                            <img src={`/${p.images[0]}`} alt={p.name} className="w-full h-44 object-cover" />
                        ) : (
                            <div className="w-full h-44 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                <FiPackage className="text-4xl text-slate-300" />
                            </div>
                        )}
                        <div className="p-4 flex flex-col flex-1">
                            <h2 className="font-semibold text-slate-800 mb-1 truncate">{p.name}</h2>
                            <p className="text-slate-500 text-xs mb-3 line-clamp-2">{p.description}</p>
                            <div className="flex items-center justify-between mb-3 mt-auto">
                                <span className="text-lg font-bold text-blue-600">₹{p.price}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                                    {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    to={`/products/${p._id}`}
                                    className="flex items-center justify-center gap-1 flex-1 border border-slate-200 text-slate-600 py-2 rounded-lg text-sm hover:bg-slate-50 transition"
                                >
                                    <FiEye /> View
                                </Link>
                                {user?.role === 'buyer' && (
                                    <button
                                        onClick={() => addToCart(p)}
                                        disabled={p.stock === 0}
                                        className="flex items-center justify-center gap-1 flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition disabled:opacity-40"
                                    >
                                        <FiShoppingCart /> Add
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
