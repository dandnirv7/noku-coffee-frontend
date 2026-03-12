"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  DollarSign,
  Megaphone,
  Users,
  MessageSquare,
  RotateCcw,
  Calendar,
  Star,
  Bug,
  HelpCircle,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  Search,
  ChevronLeft,
  Download,
  Plus,
  Wallet,
  History,
  CreditCard,
  Clock,
  ShoppingCart,
  Filter,
  ChevronUp,
  Menu,
  Bell,
} from "lucide-react";

interface EarningData {
  allTime: number;
  availableWithdrawal: number;
  paymentClearing: number;
  weeklyGrowth: string;
  growthPercent: number;
}

interface Product {
  id: string;
  image: string;
  name: string;
  brand: string;
  category: string;
  variation: string;
  unitPrice: number;
  totalSales: number;
  totalEarning: number;
  status: "in-stock" | "low-stock";
}

interface ProductGroup {
  sku: string;
  lastUpdated: string;
  products: Product[];
}

const earningData: EarningData = {
  allTime: 42345,
  availableWithdrawal: 23345,
  paymentClearing: 5345,
  weeklyGrowth: "2.5k+",
  growthPercent: 10,
};

const productGroups: ProductGroup[] = [
  {
    sku: "26558522",
    lastUpdated: "26 Jan, 2023",
    products: [
      {
        id: "1",
        image: "https://placehold.co/60x60/3B82F6/FFFFFF?text=NAJ",
        name: "Nike Air Jordan Reflex",
        brand: "Nike",
        category: "Style & Fashion",
        variation: "3 Style",
        unitPrice: 26.35,
        totalSales: 240,
        totalEarning: 2345,
        status: "in-stock",
      },
    ],
  },
  {
    sku: "26558523",
    lastUpdated: "26 Jan, 2023",
    products: [
      {
        id: "2",
        image: "https://placehold.co/60x60/F59E0B/FFFFFF?text=BTL",
        name: "Bluetooth Table Lamp",
        brand: "Nike",
        category: "Style & Fashion",
        variation: "3 Style",
        unitPrice: 26.35,
        totalSales: 240,
        totalEarning: 2345,
        status: "in-stock",
      },
    ],
  },
  {
    sku: "26558524",
    lastUpdated: "26 Jan, 2023",
    products: [
      {
        id: "3",
        image: "https://placehold.co/60x60/10B981/FFFFFF?text=NR2",
        name: "Nike Reflex 2 Special Edition",
        brand: "Nike",
        category: "Style & Fashion",
        variation: "3 Style",
        unitPrice: 26.35,
        totalSales: 240,
        totalEarning: 2345,
        status: "low-stock",
      },
    ],
  },
  {
    sku: "26558525",
    lastUpdated: "26 Jan, 2023",
    products: [
      {
        id: "4",
        image: "https://placehold.co/60x60/8B5CF6/FFFFFF?text=WT",
        name: "Wireless Premium Headset",
        brand: "Sony",
        category: "Electronics",
        variation: "2 Colors",
        unitPrice: 89.99,
        totalSales: 156,
        totalEarning: 14039,
        status: "in-stock",
      },
    ],
  },
];

const Sparkline: React.FC<{ color: string; data?: number[] }> = ({
  color,
  data = [30, 45, 35, 50, 40, 60, 55, 70, 65, 80],
}) => {
  const width = 80;
  const height = 32;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  });

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hasSubmenu?: boolean;
  badge?: number;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  active,
  hasSubmenu,
  badge,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
      active
        ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`}
  >
    <div className="flex items-center gap-3">
      <span className={active ? "text-blue-600" : "text-gray-500"}>{icon}</span>
      <span>{label}</span>
    </div>
    {badge && (
      <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
    {hasSubmenu && <ChevronDown className="w-4 h-4 text-gray-400" />}
  </button>
);

interface MetricCardProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  growth: string;
  growthPercent: number;
  chartColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  growth,
  growthPercent,
  chartColor,
}) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}
        >
          <span className={iconColor}>{icon}</span>
        </div>
        <span className="text-sm text-gray-500 font-medium">{label}</span>
      </div>
      <Sparkline color={chartColor} />
    </div>
    <div className="flex items-end justify-between">
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{growth} this week</p>
      </div>
      <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
        <ChevronUp className="w-4 h-4" />
        <span>{growthPercent}%</span>
      </div>
    </div>
  </div>
);

const StatusBadge: React.FC<{ status: "in-stock" | "low-stock" }> = ({
  status,
}) => {
  if (status === "in-stock") {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
        In Stock
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
      Low Stock
    </span>
  );
};

const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [ecommerceOpen, setEcommerceOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-60 bg-white border-r border-gray-200 z-50 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Dokani</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-gray-100 rounded-lg"
            aria-label="Close sidebar"
          >
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <nav className="py-4 overflow-y-auto h-[calc(100vh-65px)]">
          <NavItem
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Dashboard"
          />

          <div className="mt-2">
            <button
              onClick={() => setEcommerceOpen(!ecommerceOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-gray-500" />
                <span>Ecommerce</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${ecommerceOpen ? "rotate-180" : ""}`}
              />
            </button>
            {ecommerceOpen && (
              <div className="ml-4 border-l border-gray-200">
                <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                  <span>All Order</span>
                  <span className="bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                    2
                  </span>
                </button>
                <button className="w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 text-left">
                  All Product
                </button>
                <button className="w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 text-left">
                  Categories
                </button>
              </div>
            )}
          </div>

          <NavItem
            icon={<DollarSign className="w-5 h-5" />}
            label="Earning"
            active
          />
          <NavItem icon={<Megaphone className="w-5 h-5" />} label="Promotion" />
          <NavItem icon={<Users className="w-5 h-5" />} label="Customer" />
          <NavItem
            icon={<MessageSquare className="w-5 h-5" />}
            label="Message Center"
          />

          <div className="mt-6">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Product & Event
            </p>
            <NavItem
              icon={<RotateCcw className="w-5 h-5" />}
              label="Return Request"
              badge={2}
            />
            <NavItem icon={<Calendar className="w-5 h-5" />} label="Calendar" />
            <NavItem
              icon={<Star className="w-5 h-5" />}
              label="Product Review"
            />
            <NavItem icon={<Bug className="w-5 h-5" />} label="Bug Report" />
          </div>

          <div className="mt-6">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Account
            </p>
            <NavItem
              icon={<HelpCircle className="w-5 h-5" />}
              label="Help & Support"
            />
            <NavItem
              icon={<BarChart3 className="w-5 h-5" />}
              label="Analytics"
            />
            <NavItem icon={<Settings className="w-5 h-5" />} label="Settings" />
            <NavItem icon={<LogOut className="w-5 h-5" />} label="Logout" />
          </div>
        </nav>
      </aside>
    </>
  );
};

const Header: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => (
  <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search data"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>23 Mar, 23</span>
        </div>

        <button
          className="p-2 hover:bg-gray-100 rounded-full relative"
          aria-label="Messages"
        >
          <MessageSquare className="w-5 h-5 text-gray-600" />
        </button>

        <button
          className="p-2 hover:bg-gray-100 rounded-full relative"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
          <img
            src="https://placehold.co/36x36/374151/FFFFFF?text=JH"
            alt="Jay Hargudson"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-900">Jay Hargudson</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </div>
  </header>
);

const EarningDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"earning" | "withdraw">("earning");
  const [selectedGroups, setSelectedGroups] = useState<Set<string>>(new Set());
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set(),
  );

  const handleGroupSelect = (sku: string, products: Product[]) => {
    const newSelected = new Set(selectedGroups);
    const newProductSelected = new Set(selectedProducts);

    if (newSelected.has(sku)) {
      newSelected.delete(sku);
      products.forEach((p) => newProductSelected.delete(p.id));
    } else {
      newSelected.add(sku);
      products.forEach((p) => newProductSelected.add(p.id));
    }

    setSelectedGroups(newSelected);
    setSelectedProducts(newProductSelected);
  };

  const handleProductSelect = (
    id: string,
    sku: string,
    allProducts: Product[],
  ) => {
    const newSelected = new Set(selectedProducts);

    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }

    setSelectedProducts(newSelected);

    const groupProducts = allProducts.map((p) => p.id);
    const allSelected = groupProducts.every((pid) => newSelected.has(pid));
    const newGroupSelected = new Set(selectedGroups);

    if (allSelected) {
      newGroupSelected.add(sku);
    } else {
      newGroupSelected.delete(sku);
    }
    setSelectedGroups(newGroupSelected);
  };

  const formatCurrency = (value: number) => `€${value.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-60">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Earning</h1>
              <p className="text-sm text-gray-500 mt-1">
                Get a overview of your current earning. You can easily withdraw
                balance.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                Export List
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                Withdraw Balance
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <MetricCard
              icon={<DollarSign className="w-5 h-5" />}
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
              label="All Time Earnings"
              value={formatCurrency(earningData.allTime)}
              growth={earningData.weeklyGrowth}
              growthPercent={earningData.growthPercent}
              chartColor="#2563EB"
            />
            <MetricCard
              icon={<CreditCard className="w-5 h-5" />}
              iconBg="bg-orange-100"
              iconColor="text-orange-600"
              label="Available for Withdrawal"
              value={formatCurrency(earningData.availableWithdrawal)}
              growth="450+"
              growthPercent={10}
              chartColor="#F97316"
            />
            <MetricCard
              icon={<Clock className="w-5 h-5" />}
              iconBg="bg-green-100"
              iconColor="text-green-600"
              label="Payment Clearing"
              value={formatCurrency(earningData.paymentClearing)}
              growth={earningData.weeklyGrowth}
              growthPercent={earningData.growthPercent}
              chartColor="#10B981"
            />
          </div>

          <div className="border-b border-gray-200 mb-6">
            <nav className="flex gap-6">
              <button
                onClick={() => setActiveTab("earning")}
                className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "earning"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <History className="w-4 h-4" />
                Earning History
              </button>
              <button
                onClick={() => setActiveTab("withdraw")}
                className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "withdraw"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Wallet className="w-4 h-4" />
                Withdraw History
              </button>
            </nav>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID, name, status"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50">
                Sort By: All History
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        aria-label="Select all"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Variation
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Unit Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Total Sales
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Total Earning
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productGroups.map((group, groupIndex) => (
                    <React.Fragment key={group.sku}>
                      <tr className="border-b border-dashed border-gray-200 bg-gray-50/50">
                        <td className="px-4 py-2">
                          <input
                            type="checkbox"
                            checked={selectedGroups.has(group.sku)}
                            onChange={() =>
                              handleGroupSelect(group.sku, group.products)
                            }
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            aria-label={`Select group ${group.sku}`}
                          />
                        </td>
                        <td colSpan={5} className="px-4 py-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-900">
                              SKU {group.sku}
                            </span>
                            <span className="text-xs text-gray-500">
                              Last Updated {group.lastUpdated}
                            </span>
                          </div>
                        </td>
                        <td></td>
                      </tr>
                      {group.products.map((product) => (
                        <tr
                          key={product.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-4 pl-8">
                            <input
                              type="checkbox"
                              checked={selectedProducts.has(product.id)}
                              onChange={() =>
                                handleProductSelect(
                                  product.id,
                                  group.sku,
                                  group.products,
                                )
                              }
                              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              aria-label={`Select ${product.name}`}
                            />
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div>
                                <p className="text-sm font-semibold text-gray-900">
                                  {product.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Brand: {product.brand}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Category: {product.category}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-sm text-gray-700">
                              {product.variation}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-sm text-gray-700">
                              {formatCurrency(product.unitPrice)}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-1 text-sm text-gray-700">
                              <ShoppingCart className="w-4 h-4 text-gray-400" />
                              {product.totalSales}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-1 text-sm font-semibold text-blue-600">
                              <DollarSign className="w-4 h-4" />
                              {formatCurrency(product.totalEarning)}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <StatusBadge status={product.status} />
                          </td>
                        </tr>
                      ))}
                      {groupIndex < productGroups.length - 1 && (
                        <tr className="border-b border-gray-200">
                          <td colSpan={7} className="py-1"></td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EarningDashboard;
