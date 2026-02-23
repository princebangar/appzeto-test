import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import { FiEdit2, FiSave, FiDollarSign, FiPackage, FiFileText } from 'react-icons/fi';

function EditProduct() {
    const { id } = useParams();
    const [form, setForm] = useState({ name: '', description: '', price: '', stock: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/vendor/products').then(({ data }) => {
            const product = data.find((p) => p._id === id);
            if (product) setForm({ name: product.name, description: product.description, price: product.price, stock: product.stock });
        }).finally(() => setLoading(false));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        try {
            await api.put(`/vendor/products/${id}`, form);
            navigate('/vendor/products');
        } catch (err) {
            setError(err.response?.data?.message || 'Update failed');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-6">
                <FiEdit2 className="text-blue-600 text-xl" />
                <h1 className="text-2xl font-bold text-slate-800">Edit Product</h1>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-6">{error}</div>}

            <div className="bg-white rounded-2xl shadow-sm p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                        <div className="relative">
                            <FiPackage className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input className="w-full border border-slate-200 pl-10 pr-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Product name" value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <div className="relative">
                            <FiFileText className="absolute left-3 top-3 text-slate-400" />
                            <textarea className="w-full border border-slate-200 pl-10 pr-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                rows={3} value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })} required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
                            <div className="relative">
                                <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input className="w-full border border-slate-200 pl-10 pr-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="number" min="0" value={form.price}
                                    onChange={(e) => setForm({ ...form, price: e.target.value })} required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Stock Units</label>
                            <div className="relative">
                                <FiPackage className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input className="w-full border border-slate-200 pl-10 pr-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="number" min="0" value={form.stock}
                                    onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
                            </div>
                        </div>
                    </div>
                    <button type="submit" disabled={saving}
                        className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50">
                        <FiSave /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProduct;
