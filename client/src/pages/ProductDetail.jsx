import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FiShoppingCart, FiPackage, FiUser, FiTag } from 'react-icons/fi';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();
    const { user } = useAuth();

    useEffect(() => {
        api.get(`/products/${id}`)
            .then(({ data }) => setProduct(data))
            .finally(() => setLoading(false));
    }, [id]);

    const handleAdd = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
    if (!product) return <p className="p-6 text-slate-500">Product not found.</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        {product.images?.[0] ? (
                            <img src={`/${product.images[0]}`} alt={product.name} className="w-full h-80 object-cover" />
                        ) : (
                            <div className="w-full h-80 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                <FiPackage className="text-6xl text-slate-300" />
                            </div>
                        )}
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col">
                        <h1 className="text-2xl font-bold text-slate-800 mb-3">{product.name}</h1>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">{product.description}</p>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3">
                                <FiTag className="text-blue-500" />
                                <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FiPackage className="text-slate-400" />
                                <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                    {product.stock > 0 ? `${product.stock} units in stock` : 'Out of stock'}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FiUser className="text-slate-400" />
                                <span className="text-sm text-slate-500">Sold by <span className="font-medium text-slate-700">{product.vendor?.name}</span></span>
                            </div>
                        </div>

                        {user?.role === 'buyer' && (
                            <button
                                onClick={handleAdd}
                                disabled={product.stock === 0}
                                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium transition mt-auto ${added
                                        ? 'bg-green-500 text-white'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                    } disabled:opacity-40`}
                            >
                                <FiShoppingCart />
                                {added ? 'Added to Cart!' : 'Add to Cart'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
