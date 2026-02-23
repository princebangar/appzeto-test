import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { FiCheckCircle, FiPackage, FiAlertCircle } from 'react-icons/fi';

function Checkout() {
    const { cart, total, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleOrder = async () => {
        setLoading(true);
        setError('');
        try {
            const items = cart.map((i) => ({ productId: i._id, quantity: i.quantity }));
            await api.post('/orders', { items });
            clearCart();
            navigate('/orders');
        } catch (err) {
            setError(err.response?.data?.message || 'Order failed');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) return <p className="p-6 text-slate-500">Your cart is empty.</p>;

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <FiCheckCircle className="text-green-500" /> Checkout
            </h1>

            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
                <h2 className="font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wide">Order Summary</h2>
                <div className="flex flex-col gap-3">
                    {cart.map((item) => (
                        <div key={item._id} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                            <div className="flex items-center gap-3">
                                <FiPackage className="text-slate-300" />
                                <div>
                                    <p className="text-sm font-medium text-slate-700">{item.name}</p>
                                    <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <p className="font-semibold text-slate-800">₹{item.price * item.quantity}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 flex items-center justify-between">
                <p className="text-slate-500 text-sm">Total Amount</p>
                <p className="text-2xl font-bold text-blue-600">₹{total}</p>
            </div>

            {error && (
                <div className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-4 py-3 rounded-xl text-sm mb-4">
                    <FiAlertCircle /> {error}
                </div>
            )}

            <button
                onClick={handleOrder}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50 text-lg"
            >
                <FiCheckCircle />
                {loading ? 'Placing Order...' : 'Place Order'}
            </button>
        </div>
    );
}

export default Checkout;
