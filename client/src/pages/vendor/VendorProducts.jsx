import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FiPlus, FiEdit2, FiTrash2, FiPackage, FiGrid } from 'react-icons/fi';

function VendorProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchProducts = () => {
        api.get('/vendor/products')
            .then(({ data }) => setProducts(data))
            .catch(() => setError('Failed to load products'))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this product?')) return;
        await api.delete(`/vendor/products/${id}`);
        fetchProducts();
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-6">
                <FiGrid className="text-blue-600 text-xl" />
                <h1 className="text-2xl font-bold text-slate-800">My Products</h1>
                <span className="ml-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">{products.length} total</span>
                <Link
                    to="/vendor/products/add"
                    className="ml-auto flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition text-sm font-medium"
                >
                    <FiPlus /> Add Product
                </Link>
            </div>

            {error && <div className="bg-red-50 text-red-600 border border-red-200 px-4 py-3 rounded-xl text-sm mb-4">{error}</div>}

            {products.length === 0 ? (
                <div className="text-center py-20 text-slate-400 bg-white rounded-2xl">
                    <FiPackage className="text-5xl mx-auto mb-4 text-slate-300" />
                    <p className="mb-4">No products yet.</p>
                    <Link to="/vendor/products/add" className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
                        <FiPlus /> Add your first product
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-5 py-4 text-left text-slate-500 font-medium">Product</th>
                                <th className="px-5 py-4 text-left text-slate-500 font-medium">Price</th>
                                <th className="px-5 py-4 text-left text-slate-500 font-medium">Stock</th>
                                <th className="px-5 py-4 text-left text-slate-500 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p._id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                {p.images?.[0] ? (
                                                    <img src={`/${p.images[0]}`} alt={p.name} className="w-full h-full object-cover rounded-lg" />
                                                ) : (
                                                    <FiPackage className="text-slate-300" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-800">{p.name}</p>
                                                <p className="text-xs text-slate-400 truncate max-w-xs">{p.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 font-semibold text-blue-600">₹{p.price}</td>
                                    <td className="px-5 py-4">
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                                            {p.stock} units
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                to={`/vendor/products/edit/${p._id}`}
                                                className="flex items-center gap-1 text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg text-xs transition"
                                            >
                                                <FiEdit2 /> Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(p._id)}
                                                className="flex items-center gap-1 text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg text-xs transition"
                                            >
                                                <FiTrash2 /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default VendorProducts;
