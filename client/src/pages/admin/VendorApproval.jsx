import { useEffect, useState } from 'react';
import api from '../../services/api';
import { FiUsers, FiCheckCircle, FiClock, FiMail } from 'react-icons/fi';

function VendorApproval() {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchVendors = () => {
        api.get('/admin/vendors')
            .then(({ data }) => setVendors(data))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchVendors(); }, []);

    const handleApprove = async (id) => {
        await api.patch(`/admin/vendors/${id}/approve`);
        fetchVendors();
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const pending = vendors.filter((v) => !v.isApproved);
    const approved = vendors.filter((v) => v.isApproved);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-6">
                <FiUsers className="text-blue-600 text-xl" />
                <h1 className="text-2xl font-bold text-slate-800">Vendor Approval</h1>
                {pending.length > 0 && (
                    <span className="ml-2 bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {pending.length} pending
                    </span>
                )}
            </div>

            {vendors.length === 0 && (
                <div className="text-center py-20 text-slate-400 bg-white rounded-2xl">
                    <FiUsers className="text-5xl mx-auto mb-4 text-slate-300" />
                    <p>No vendor registrations yet.</p>
                </div>
            )}

            {vendors.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-5 py-4 text-left text-slate-500 font-medium">Vendor</th>
                                <th className="px-5 py-4 text-left text-slate-500 font-medium">Email</th>
                                <th className="px-5 py-4 text-left text-slate-500 font-medium">Status</th>
                                <th className="px-5 py-4 text-left text-slate-500 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendors.map((v) => (
                                <tr key={v._id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                                {v.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-medium text-slate-800">{v.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <FiMail className="text-slate-300" /> {v.email}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        {v.isApproved ? (
                                            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                                                <FiCheckCircle /> Approved
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs font-medium px-3 py-1 rounded-full">
                                                <FiClock /> Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-5 py-4">
                                        {!v.isApproved && (
                                            <button
                                                onClick={() => handleApprove(v._id)}
                                                className="inline-flex items-center gap-1 bg-green-600 text-white text-xs px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium"
                                            >
                                                <FiCheckCircle /> Approve
                                            </button>
                                        )}
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

export default VendorApproval;
