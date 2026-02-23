import { useEffect, useState } from 'react';
import api from '../services/api';
import { FiPackage, FiClock } from 'react-icons/fi';

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    paid: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
};

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/orders/my')
            .then(({ data }) => setOrders(data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-6">
                <FiPackage className="text-blue-600 text-xl" />
                <h1 className="text-2xl font-bold text-slate-800">My Orders</h1>
            </div>

            {orders.length === 0 && (
                <div className="text-center py-20 text-slate-400">
                    <FiPackage className="text-5xl mx-auto mb-4" />
                    <p>No orders placed yet.</p>
                </div>
            )}

            <div className="flex flex-col gap-4">
                {orders.map((order) => (
                    <div key={order._id} className="bg-white rounded-2xl shadow-sm p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-xs text-slate-400 mb-1">Order ID</p>
                                <p className="text-sm font-mono font-medium text-slate-600">{order._id.slice(-10).toUpperCase()}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiClock className="text-slate-400 text-sm" />
                                <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                            </div>
                        </div>
                        <div className="border-t border-slate-100 pt-4 mb-4">
                            {order.products.map((p, i) => (
                                <div key={i} className="flex justify-between items-center py-1 text-sm">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <FiPackage className="text-slate-300" />
                                        <span>{p.productId?.name || 'Product'}</span>
                                        <span className="text-slate-400">× {p.quantity}</span>
                                    </div>
                                    <span className="font-medium text-slate-700">₹{p.price * p.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <p className="text-lg font-bold text-blue-600">Total: ₹{order.totalAmount}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyOrders;
