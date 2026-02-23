import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FiPlus, FiImage, FiDollarSign, FiPackage, FiFileText } from 'react-icons/fi';

function AddProduct() {
    const [form, setForm] = useState({ name: '', description: '', price: '', stock: '' });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const formData = new FormData();
            Object.entries(form).forEach(([k, v]) => formData.append(k, v));
            images.forEach((img) => formData.append('images', img));
            await api.post('/vendor/products', formData);
            navigate('/vendor/products');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-6">
                <FiPlus className="text-blue-600 text-xl" />
                <h1 className="text-2xl font-bold text-slate-800">Add Product</h1>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-6">{error}</div>}

            <div className="bg-white rounded-2xl shadow-sm p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                        <div className="relative">
                            <FiPackage className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input className="w-full border border-slate-200 pl-10 pr-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter product name" value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <div className="relative">
                            <FiFileText className="absolute left-3 top-3 text-slate-400" />
                            <textarea className="w-full border border-slate-200 pl-10 pr-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                rows={3} placeholder="Describe your product" value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })} required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
                            <div className="relative">
                                <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input className="w-full border border-slate-200 pl-10 pr-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="0.00" type="number" min="0" value={form.price}
                                    onChange={(e) => setForm({ ...form, price: e.target.value })} required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Stock Units</label>
                            <div className="relative">
                                <FiPackage className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input className="w-full border border-slate-200 pl-10 pr-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="0" type="number" min="0" value={form.stock}
                                    onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Product Images</label>
                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl py-8 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
                            <FiImage className="text-3xl text-slate-300 mb-2" />
                            <span className="text-sm text-slate-400">{images.length > 0 ? `${images.length} file(s) selected` : 'Click to upload images'}</span>
                            <input type="file" multiple accept="image/*" className="hidden"
                                onChange={(e) => setImages(Array.from(e.target.files))} />
                        </label>
                    </div>
                    <button type="submit" disabled={loading}
                        className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50">
                        <FiPlus /> {loading ? 'Adding...' : 'Add Product'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
