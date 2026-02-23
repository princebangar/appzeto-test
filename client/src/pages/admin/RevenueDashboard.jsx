import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FiBarChart2, FiShoppingBag, FiUsers, FiDollarSign, FiArrowRight } from 'react-icons/fi';

function RevenueDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/admin/stats')
            .then(({ data }) => setStats(data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const cards = [
        {
            label: 'Total Revenue',
            value: `₹${stats?.totalRevenue?.toLocaleString() || 0}`,
            icon: <FiDollarSign className="text-2xl" />,
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-600',
        },
        {
            label: 'Total Orders',
            value: stats?.totalOrders || 0,
            icon: <FiShoppingBag className="text-2xl" />,
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-600',
        },
        {
            label: 'Total Vendors',
            value: stats?.totalVendors || 0,
            icon: <FiUsers className="text-2xl" />,
            bg: 'bg-purple-50',
            border: 'border-purple-200',
            text: 'text-purple-600',
        },
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-8">
                <FiBarChart2 className="text-blue-600 text-xl" />
                <h1 className="text-2xl font-bold text-slate-800">Revenue Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {cards.map((card) => (
                    <div key={card.label} className={`${card.bg} border ${card.border} rounded-2xl p-6 flex items-center gap-4`}>
                        <div className={`${card.text} p-3 bg-white rounded-xl shadow-sm`}>
                            {card.icon}
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">{card.label}</p>
                            <p className={`text-2xl font-bold ${card.text}`}>{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="font-semibold text-slate-700 mb-4">Quick Actions</h2>
                <Link
                    to="/admin/vendors"
                    className="inline-flex items-center gap-2 bg-slate-800 text-white px-5 py-3 rounded-xl hover:bg-slate-700 transition text-sm font-medium"
                >
                    <FiUsers /> Manage Vendors <FiArrowRight />
                </Link>
            </div>
        </div>
    );
}

export default RevenueDashboard;
