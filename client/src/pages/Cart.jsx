import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiTrash2, FiArrowRight, FiPackage } from 'react-icons/fi';

function Cart() {
    const { cart, removeFromCart, total } = useCart();

    if (cart.length === 0) return (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
            <FiShoppingCart className="text-6xl text-slate-300 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-slate-700 mb-2">Your cart is empty</h1>
            <p className="text-slate-400 text-sm mb-6">Add some products to get started.</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
                <FiPackage /> Browse Products
            </Link>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-6">
                <FiShoppingCart className="text-blue-600 text-xl" />
                <h1 className="text-2xl font-bold text-slate-800">Your Cart</h1>
                <span className="ml-auto text-sm text-slate-400">{cart.length} item(s)</span>
            </div>

            <div className="flex flex-col gap-3 mb-6">
                {cart.map((item) => (
                    <div key={item._id} className="bg-white rounded-xl shadow-sm flex items-center gap-4 p-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            {item.images?.[0] ? (
                                <img src={`/${item.images[0]}`} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                                <FiPackage className="text-slate-400" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-800 truncate">{item.name}</p>
                            <p className="text-xs text-slate-400">Qty: {item.quantity} × ₹{item.price}</p>
                        </div>
                        <p className="font-bold text-slate-800">₹{item.price * item.quantity}</p>
                        <button onClick={() => removeFromCart(item._id)} className="text-red-400 hover:text-red-600 transition p-1">
                            <FiTrash2 />
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-500">Total</p>
                    <p className="text-2xl font-bold text-slate-800">₹{total}</p>
                </div>
                <Link
                    to="/checkout"
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
                >
                    Checkout <FiArrowRight />
                </Link>
            </div>
        </div>
    );
}

export default Cart;
