import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiPackage, FiLogOut, FiGrid, FiUsers, FiBarChart2, FiLogIn, FiUserPlus } from 'react-icons/fi';

function Navbar() {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
            <Link to="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <FiGrid className="text-blue-400" />
                <span>Market<span className="text-blue-400">Place</span></span>
            </Link>

            <div className="flex gap-2 items-center">
                {!user && (
                    <>
                        <Link to="/login" className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm hover:bg-slate-700 transition">
                            <FiLogIn /> Login
                        </Link>
                        <Link to="/register" className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition">
                            <FiUserPlus /> Register
                        </Link>
                    </>
                )}
                {user?.role === 'buyer' && (
                    <>
                        <Link to="/cart" className="relative flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-slate-700 text-sm transition">
                            <FiShoppingCart className="text-blue-400" />
                            Cart
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                        <Link to="/orders" className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-slate-700 text-sm transition">
                            <FiPackage className="text-blue-400" /> My Orders
                        </Link>
                    </>
                )}
                {user?.role === 'vendor' && (
                    <Link to="/vendor/products" className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-slate-700 text-sm transition">
                        <FiGrid className="text-blue-400" /> Dashboard
                    </Link>
                )}
                {user?.role === 'admin' && (
                    <>
                        <Link to="/admin/vendors" className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-slate-700 text-sm transition">
                            <FiUsers className="text-blue-400" /> Vendors
                        </Link>
                        <Link to="/admin/stats" className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-slate-700 text-sm transition">
                            <FiBarChart2 className="text-blue-400" /> Stats
                        </Link>
                    </>
                )}
                {user && (
                    <button onClick={handleLogout} className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition ml-2">
                        <FiLogOut /> Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
