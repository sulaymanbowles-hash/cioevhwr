import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { 
  Lock, 
  FileText, 
  Package, 
  Clock, 
  LogOut, 
  Search, 
  Download, 
  Box, 
  Truck, 
  CheckCircle, 
  AlertCircle 
} from "lucide-react";
import { useClientStore, type Order, type Document } from "../stores/clientStore";
import { cn } from "../utils/cn";

export const ClientPortal = () => {
  const { isAuthenticated, user, login, demoLogin, logout, orders, documents } = useClientStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'documents'>('dashboard');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[60vh]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <TechLabel className="mb-4">Secure Access</TechLabel>
              <h1 className="text-5xl font-bold tracking-tight mb-6">
                Client Portal
              </h1>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                Access your order history, download certifications (8130-3, CofC), and track shipments in real-time.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <FileText className="w-8 h-8 mb-4 text-blue-600" />
                  <h3 className="font-bold mb-2">Document Retrieval</h3>
                  <p className="text-sm text-gray-500">Instant access to all quality documentation and certifications.</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Package className="w-8 h-8 mb-4 text-green-600" />
                  <h3 className="font-bold mb-2">Order Tracking</h3>
                  <p className="text-sm text-gray-500">Real-time status updates on all your active shipments.</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Clock className="w-8 h-8 mb-4 text-orange-600" />
                  <h3 className="font-bold mb-2">Order History</h3>
                  <p className="text-sm text-gray-500">View past orders and quickly reorder common items.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200 max-w-md mx-auto w-full"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-black rounded-lg">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Login</h2>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
                
                <button type="submit" className="w-full bg-black text-white py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors">
                  Sign In
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={demoLogin}
                  className="w-full bg-gray-100 text-gray-800 py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors border border-gray-200"
                >
                  Try Demo Account
                </button>

                <div className="text-center mt-4">
                  <a href="#" className="text-sm text-gray-500 hover:text-black underline">Forgot password?</a>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">
                  Don't have an account? <a href="/contact" className="text-black font-bold hover:underline">Request Access</a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Portal Header */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-30">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold">Client Portal</h1>
              <nav className="hidden md:flex gap-1">
                <TabButton 
                  active={activeTab === 'dashboard'} 
                  onClick={() => setActiveTab('dashboard')}
                  icon={<Box className="w-4 h-4" />}
                >
                  Dashboard
                </TabButton>
                <TabButton 
                  active={activeTab === 'orders'} 
                  onClick={() => setActiveTab('orders')}
                  icon={<Package className="w-4 h-4" />}
                >
                  Orders
                </TabButton>
                <TabButton 
                  active={activeTab === 'documents'} 
                  onClick={() => setActiveTab('documents')}
                  icon={<FileText className="w-4 h-4" />}
                >
                  Documents
                </TabButton>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                  {user?.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-sm">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.company}</p>
                </div>
              </div>
              <button 
                onClick={logout}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <DashboardView key="dashboard" orders={orders} documents={documents} />
          )}
          {activeTab === 'orders' && (
            <OrdersView key="orders" orders={orders} />
          )}
          {activeTab === 'documents' && (
            <DocumentsView key="documents" documents={documents} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, children, icon }: { active: boolean; onClick: () => void; children: React.ReactNode; icon: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
      active 
        ? "bg-black text-white shadow-md" 
        : "text-gray-600 hover:bg-gray-100"
    )}
  >
    {icon}
    {children}
  </button>
);

const DashboardView = ({ orders, documents }: { orders: Order[]; documents: Document[] }) => {
  const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
  const recentOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Active Orders</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{activeOrders.length}</p>
          <p className="text-sm text-gray-500 mt-1">In processing or transit</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Total Orders</h3>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{orders.length}</p>
          <p className="text-sm text-gray-500 mt-1">Lifetime orders</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Documents</h3>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{documents.length}</p>
          <p className="text-sm text-gray-500 mt-1">Available for download</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-lg">Recent Orders</h3>
            <button className="text-sm text-blue-600 hover:underline font-medium">View All</button>
          </div>
          <div className="divide-y divide-gray-100">
            {recentOrders.map(order => (
              <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <Box className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                <div className="pl-16">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <span className="font-medium">{order.items.length} items</span>
                    <span>•</span>
                    <span>Total: ${order.total.toFixed(2)}</span>
                  </div>
                  {order.trackingNumber && (
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <Truck className="w-4 h-4" />
                      <a href="#" className="hover:underline">Track: {order.trackingNumber}</a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all text-left">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                  <Download className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm">Download Latest Invoice</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all text-left">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-md">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm">Request CofC</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all text-left">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-md">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm">Report an Issue</span>
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg p-6 text-white">
            <h3 className="font-bold text-lg mb-2">Need Help?</h3>
            <p className="text-gray-300 text-sm mb-4">Our support team is available 24/7 for urgent inquiries.</p>
            <button className="w-full py-2 bg-white text-black rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const OrdersView = ({ orders }: { orders: Order[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold">Order History</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black w-full sm:w-64"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {order.items.length} items
                  <div className="text-xs text-gray-400 mt-1 truncate max-w-[200px]">
                    {order.items.map(i => i.name).join(', ')}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-xs uppercase tracking-wide">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

const DocumentsView = ({ documents }: { documents: Document[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold">Documents</h2>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black">
            <option value="all">All Types</option>
            <option value="cofc">CofC</option>
            <option value="8130">8130-3</option>
            <option value="invoice">Invoice</option>
          </select>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {documents.map((doc) => (
          <div key={doc.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={cn(
                "p-3 rounded-lg",
                doc.type === 'CofC' ? "bg-blue-50 text-blue-600" :
                doc.type === '8130-3' ? "bg-purple-50 text-purple-600" :
                "bg-gray-100 text-gray-600"
              )}>
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{doc.name}</h4>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                  <span>{doc.type}</span>
                  <span>•</span>
                  <span>{new Date(doc.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Ref: {doc.orderId}</span>
                </div>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-black transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const StatusBadge = ({ status }: { status: Order['status'] }) => {
  const styles = {
    Processing: "bg-blue-50 text-blue-700 border-blue-100",
    Shipped: "bg-purple-50 text-purple-700 border-purple-100",
    Delivered: "bg-green-50 text-green-700 border-green-100",
    Cancelled: "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-xs font-medium border",
      styles[status]
    )}>
      {status}
    </span>
  );
};
