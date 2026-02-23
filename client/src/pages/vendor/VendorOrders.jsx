import { useEffect, useState } from 'react';
import api from '../../services/api';
import { FiPackage, FiClock, FiCheckCircle } from 'react-icons/fi';

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
};

function VendorOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = () => {
        setLoading(true);
        api.get('/vendor/orders')
            .then(({ data }) => setOrders(data))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleApprove = async (orderId) => {
        try {
            await api.put(`/vendor/orders/${orderId}/approve`);
            alert('Order approved successfully');
            fetchOrders();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to approve order');
        }
    };

    if (loading && orders.length === 0) return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-6">
                <FiPackage className="text-blue-600 text-2xl" />
                <h1 className="text-2xl font-bold text-slate-800">Customer Orders</h1>
            </div>

            {orders.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100">
                    <FiPackage className="text-5xl mx-auto mb-4 text-slate-200" />
                    <p className="text-slate-400">No orders received yet.</p>
                </div>
            )}

            <div className="grid gap-6">
                {orders.map((order) => (
                    <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="bg-slate-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Order ID</p>
                                    <p className="text-sm font-mono font-semibold text-slate-700">#{order._id.slice(-8).toUpperCase()}</p>
                                </div>
                                <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Buyer</p>
                                    <p className="text-sm font-semibold text-slate-700">{order.buyer?.name || 'Unknown'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                                    {order.status.toUpperCase()}
                                </span>
                                {order.status === 'pending' && (
                                    <button
                                        onClick={() => handleApprove(order._id)}
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-1.5 rounded-full transition-colors shadow-sm"
                                    >
                                        <FiCheckCircle />
                                        Approve
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="px-6 py-4">
                            <div className="space-y-3">
                                {order.products.map((p, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
                                                <FiPackage className="text-slate-400 text-xs" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-700">{p.productId?.name || 'Product deleted'}</p>
                                                <p className="text-xs text-slate-400">₹{p.price} × {p.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-semibold text-slate-700">₹{p.price * p.quantity}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-50/50 px-6 py-3 border-t border-slate-100 flex justify-between items-center">
                            <span className="text-xs text-slate-400 italic">Received on {new Date(order.createdAt).toLocaleDateString()}</span>
                            <div className="text-right">
                                <span className="text-xs text-slate-400 block -mb-1">Total Amount</span>
                                <span className="text-lg font-bold text-blue-600">₹{order.totalAmount}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VendorOrders;
