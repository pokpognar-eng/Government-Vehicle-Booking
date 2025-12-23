import React, { useState } from 'react';
import { 
  // Icons for Login
  ArrowLeft, 
  Eye, 
  EyeOff, 
  LogIn, 
  // Icons for Dashboard
  Bell, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Car, 
  Bike, 
  Truck, 
  Info, 
  Plus, 
  Home, 
  History, 
  Calendar, 
  // Shared Icons
  User,
  Moon,
  Sun,
  LogOut,
  // Icons for Create Request
  Map,
  MapPin,
  PlusCircle,
  Users,
  Minus,
  UserPlus,
  Navigation,
  // Icons for Request List
  Filter,
  FileText,
  Bus,
  Edit,
  AlertCircle,
  // Icons for Details
  Phone,
  MessageCircle,
  Maximize2,
  // Icons for Approver Dashboard
  Hourglass,
  TrendingUp,
  LayoutDashboard,
  Settings,
  Check,
  X,
  // New Icons for Approver Details
  Megaphone, // For Purpose/Campaign
  Paperclip, // For Attachment
  Eye as EyeIcon // Alias for visibility
} from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('user'); // 'user' or 'approver'
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'create', 'requests', 'details', 'approver-details'
  const [previousView, setPreviousView] = useState('dashboard');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = (e, role = 'user') => {
    if (e) e.preventDefault();
    setUserRole(role);
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('user');
    setCurrentView('dashboard');
  };

  const navigateTo = (view) => {
    setPreviousView(currentView);
    setCurrentView(view);
  };

  const goBack = () => {
    setCurrentView(previousView);
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} font-sans transition-colors duration-300`}>
      {/* Import Google Fonts: Sarabun (Thai Govt Standard) and Roboto (English) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Sarabun:wght@300;400;500;600;700&display=swap');
        
        :root {
          --font-main: 'Roboto', 'Sarabun', sans-serif;
        }

        body, .font-sans {
          font-family: var(--font-main) !important;
        }

        /* Ensure form elements inherit the font */
        input, button, textarea, select {
          font-family: inherit;
        }
      `}</style>

      {isLoggedIn ? (
        <>
          {/* USER FLOW */}
          {userRole === 'user' && (
            <>
              {currentView === 'dashboard' && (
                <DashboardView 
                  isDarkMode={isDarkMode} 
                  toggleDarkMode={toggleDarkMode} 
                  onLogout={handleLogout}
                  onNavigateToCreate={() => navigateTo('create')}
                  onNavigateToRequests={() => navigateTo('requests')}
                  onNavigateToDetails={() => navigateTo('details')}
                />
              )}
              {currentView === 'create' && (
                <CreateRequestView 
                  isDarkMode={isDarkMode} 
                  onBack={() => navigateTo('dashboard')}
                  onNavigateToRequests={() => navigateTo('requests')}
                />
              )}
              {currentView === 'requests' && (
                <RequestListView 
                  isDarkMode={isDarkMode}
                  onNavigateToDashboard={() => navigateTo('dashboard')}
                  onNavigateToCreate={() => navigateTo('create')}
                  onNavigateToDetails={() => navigateTo('details')}
                />
              )}
              {currentView === 'details' && (
                <RequestDetailsView 
                  isDarkMode={isDarkMode}
                  onBack={goBack}
                />
              )}
            </>
          )}

          {/* APPROVER FLOW */}
          {userRole === 'approver' && (
            <>
              {currentView === 'dashboard' && (
                <ApproverDashboardView 
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                  onLogout={handleLogout}
                  onNavigateToDetails={() => navigateTo('approver-details')} 
                />
              )}
              {currentView === 'approver-details' && (
                <ApproverRequestDetailsView 
                  isDarkMode={isDarkMode}
                  onBack={() => navigateTo('dashboard')}
                />
              )}
            </>
          )}
        </>
      ) : (
        <LoginView 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
          onLogin={(e) => handleLogin(e, 'user')} 
          onApproverLogin={() => handleLogin(null, 'approver')}
        />
      )}
    </div>
  );
}

// ==========================================
// LOGIN COMPONENT
// ==========================================
function LoginView({ isDarkMode, toggleDarkMode, onLogin, onApproverLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f6f6f8] dark:bg-[#0b0f19] p-0 sm:p-4">
      <div className="relative flex flex-col w-full max-w-md bg-white dark:bg-[#101622] sm:rounded-2xl shadow-2xl overflow-hidden min-h-screen sm:min-h-[800px] transition-colors duration-300">
        
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#135bec]/5 to-transparent pointer-events-none z-0" />

        {/* Top Navigation / Status Bar Area */}
        <div className="relative z-10 flex items-center justify-between px-4 py-4">
          <button className="text-[#111318] dark:text-white flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft size={24} />
          </button>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleDarkMode}
              className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDarkMode ? <Sun size={16} className="text-gray-400" /> : <Moon size={16} className="text-gray-400" />}
            </button>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
            <div className="font-bold text-xs text-gray-400 uppercase tracking-wider cursor-pointer hover:text-[#135bec] transition-colors">
              TH / EN
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className="relative z-10 flex flex-col items-center pt-4 pb-6 px-6 text-center">
          <div className="w-20 h-20 bg-[#135bec]/10 rounded-2xl flex items-center justify-center mb-6 text-[#135bec]">
            <Car size={40} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-[#111318] dark:text-white mb-2">
            ระบบจองรถราชการ
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            ยินดีต้อนรับกลับเข้าสู่ระบบ กรุณาลงชื่อเข้าใช้งาน<br className="hidden sm:block"/>
            เพื่อดำเนินการจองยานพาหนะ
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={onLogin} className="relative z-10 flex flex-col gap-5 px-8 w-full">
          
          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#111318] dark:text-gray-200">
              อีเมล หรือ ชื่อผู้ใช้งาน
            </label>
            <div className="relative group">
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 rounded-lg border border-[#dbdfe6] dark:border-gray-600 bg-white dark:bg-gray-800 text-[#111318] dark:text-white px-4 pl-11 focus:outline-none focus:border-[#135bec] focus:ring-1 focus:ring-[#135bec] placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all shadow-sm"
                placeholder="example@gov.go.th" 
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#135bec] transition-colors">
                <User size={20} />
              </div>
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#111318] dark:text-gray-200">
              รหัสผ่าน
            </label>
            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 rounded-lg border border-[#dbdfe6] dark:border-gray-600 bg-white dark:bg-gray-800 text-[#111318] dark:text-white px-4 pl-11 pr-11 focus:outline-none focus:border-[#135bec] focus:ring-1 focus:ring-[#135bec] placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all shadow-sm"
                placeholder="••••••••" 
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#135bec] transition-colors">
                <div className="rotate-0 transition-transform">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#135bec] transition-colors flex items-center justify-center"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <a href="#" className="text-sm font-medium text-[#135bec] hover:text-[#135bec]/80 transition-colors">
              ลืมรหัสผ่าน?
            </a>
          </div>

          {/* Main Action Button */}
          <button 
            type="submit"
            className="w-full h-12 bg-[#135bec] hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-lg shadow-lg shadow-[#135bec]/30 transition-all mt-2 flex items-center justify-center gap-2"
          >
            <span>เข้าสู่ระบบ</span>
            <LogIn size={20} />
          </button>

          {/* Demo: Login as Approver Button */}
          <button 
            type="button"
            onClick={onApproverLogin}
            className="w-full h-12 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <span>เข้าสู่ระบบ (สำหรับเจ้าหน้าที่)</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative z-10 flex py-6 items-center px-8">
          <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-medium uppercase tracking-wide">
            หรือเข้าใช้งานด้วย
          </span>
          <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
        </div>

        {/* Social Login */}
        <div className="relative z-10 flex flex-col gap-3 px-8 pb-6">
          <button className="w-full h-12 bg-white dark:bg-gray-800 border border-[#dbdfe6] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-[#111318] dark:text-white font-medium rounded-lg transition-all flex items-center justify-center gap-3 group active:scale-[0.99]">
            <MicrosoftLogo />
            <span className="text-sm">เข้าสู่ระบบด้วย Microsoft</span>
          </button>
          
          <button className="w-full h-12 bg-white dark:bg-gray-800 border border-[#dbdfe6] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-[#111318] dark:text-white font-medium rounded-lg transition-all flex items-center justify-center gap-3 group active:scale-[0.99]">
            <GoogleLogo />
            <span className="text-sm">เข้าสู่ระบบด้วย Google</span>
          </button>
        </div>

        {/* Footer / Register Link */}
        <div className="mt-auto relative z-10 px-6 py-6 text-center border-t border-transparent dark:border-gray-800/50">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            ยังไม่มีบัญชีผู้ใช้งาน? 
            <a href="#" className="text-[#135bec] font-bold hover:underline ml-1">
              ลงทะเบียนหน่วยงาน
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// DASHBOARD COMPONENT (USER)
// ==========================================
function DashboardView({ isDarkMode, toggleDarkMode, onLogout, onNavigateToCreate, onNavigateToRequests, onNavigateToDetails }) {
  return (
    <div className="bg-[#f6f6f8] dark:bg-[#101622] text-[#111318] dark:text-white w-full min-h-screen relative pb-24 overflow-x-hidden">
      
      {/* Top App Bar */}
      <div className="flex items-center px-4 py-3 justify-between sticky top-0 z-40 bg-[#f6f6f8]/95 dark:bg-[#101622]/95 backdrop-blur-sm transition-colors duration-300">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={onLogout} title="Click to Logout">
          <div className="relative">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full w-10 h-10 border-2 border-white dark:border-gray-700 shadow-sm group-hover:opacity-80 transition-opacity"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDUpnYC20lwlNWi6dsw6bMzoff1dWhdJKbkuWDQkhlWx1Fc2ydxg_c7W7mEaEJ40kXLhoNJjhl7lJj7CUcZcTwpc5brh7l2riKWUlTbR9hQ-Sq9T6hh_CZpSCbMHvhlAJMYxmbvMsQogPaSWzfaMnTrSRQ123uAzK68aOifkL0UtL8sAKkqy-75YcFOgppx_zfWw-C9hme5qC36Vp1VBNK-5nQuIOtzi8t1ioorFPN8cDFJ-x0m6i3DpHY8dX1IakcNTfsqW2e4Z1U")' }}
            >
              <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <LogOut size={14} className="text-white" />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#101622] rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">ยินดีต้อนรับ</span>
            <span className="text-sm font-bold leading-tight group-hover:text-red-500 transition-colors">คุณสมชาย</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleDarkMode}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#1e2430] shadow-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#1e2430] shadow-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-[#1e2430]"></span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-6 px-4 pt-2">
        
        {/* Stats Overview Cards */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold tracking-tight">ภาพรวมสถานะ</h2>
          <div className="grid grid-cols-2 gap-3">
            
            {/* Pending Card */}
            <div 
              onClick={onNavigateToRequests}
              className="flex flex-col justify-between p-4 rounded-xl bg-white dark:bg-[#1e2430] shadow-sm border-l-4 border-yellow-500 relative overflow-hidden group transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-[#252d3d]"
            >
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Clock size={40} className="text-yellow-500" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">รออนุมัติ</p>
                <p className="text-3xl font-bold text-[#111318] dark:text-white mt-1">
                  3 <span className="text-base font-normal text-gray-400">รายการ</span>
                </p>
              </div>
              <div className="mt-4 flex items-center text-yellow-600 dark:text-yellow-400 text-xs font-bold uppercase tracking-wider">
                ดำเนินการอยู่
              </div>
            </div>

            {/* Approved/Ready Card */}
            <div 
              onClick={onNavigateToDetails}
              className="flex flex-col justify-between p-4 rounded-xl bg-[#135bec] text-white shadow-md shadow-[#135bec]/20 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute -bottom-4 -right-4 opacity-20 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                <CheckCircle size={96} />
              </div>
              <div>
                <p className="text-blue-100 text-sm font-medium">พร้อมใช้งาน</p>
                <p className="text-3xl font-bold mt-1">
                  1 <span className="text-base font-normal text-blue-200">รายการ</span>
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between opacity-90 hover:opacity-100 transition-opacity">
                <span className="bg-white/20 px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">ดูรายละเอียด</span>
                <ArrowRight size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold tracking-tight text-[#111318] dark:text-white">กิจกรรมล่าสุด</h3>
            <a href="#" className="text-sm font-semibold text-[#135bec] hover:text-[#135bec]/80">ดูทั้งหมด</a>
          </div>
          
          <div className="flex flex-col gap-3">
            {/* List Item 1: Approved */}
            <div 
              onClick={onNavigateToDetails}
              className="flex items-center gap-4 bg-white dark:bg-[#1e2430] p-4 rounded-xl shadow-sm border border-transparent hover:border-[#135bec]/10 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-center shrink-0 w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[#135bec]">
                <Car size={24} />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="text-[#111318] dark:text-white text-base font-semibold leading-tight line-clamp-1">ขอใช้รถไปราชการต่างจังหวัด</p>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-1">12 ต.ค. 2566 • Toyota Altis (กข 1234)</p>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1">
                <span className="px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-[10px] font-bold uppercase tracking-wide">
                  อนุมัติแล้ว
                </span>
              </div>
            </div>

            {/* List Item 2: Pending */}
            <div className="flex items-center gap-4 bg-white dark:bg-[#1e2430] p-4 rounded-xl shadow-sm border border-transparent hover:border-[#135bec]/10 transition-all">
              <div className="flex items-center justify-center shrink-0 w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                <Bike size={24} />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="text-[#111318] dark:text-white text-base font-semibold leading-tight line-clamp-1">ขอใช้รถจักรยานยนต์ส่งเอกสาร</p>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-1">14 ต.ค. 2566 • Honda Wave (1กข 5678)</p>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1">
                <span className="px-2.5 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-[10px] font-bold uppercase tracking-wide">
                  รออนุมัติ
                </span>
              </div>
            </div>

            {/* List Item 3: Completed */}
            <div className="flex items-center gap-4 bg-white dark:bg-[#1e2430] p-4 rounded-xl shadow-sm border border-transparent hover:border-[#135bec]/10 transition-all opacity-80">
              <div className="flex items-center justify-center shrink-0 w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                <Truck size={24} />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="text-[#111318] dark:text-white text-base font-semibold leading-tight line-clamp-1">ขนย้ายครุภัณฑ์สำนักงาน</p>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-1">10 ต.ค. 2566 • Isuzu D-Max (ฮอ 9999)</p>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1">
                <span className="px-2.5 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] font-bold uppercase tracking-wide">
                  เสร็จสิ้น
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-2 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/30 flex items-start gap-3">
          <Info size={20} className="text-[#135bec] mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#135bec] dark:text-blue-300">ทราบหรือไม่?</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              ท่านสามารถจองรถล่วงหน้าได้สูงสุด 30 วัน เพื่อการวางแผนการเดินทางที่ดียิ่งขึ้น
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-24 right-4 z-40">
        <button 
          onClick={onNavigateToCreate}
          className="flex items-center gap-2 h-14 pl-4 pr-6 rounded-full bg-[#135bec] text-white shadow-lg shadow-[#135bec]/40 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200 group"
        >
          <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          <span className="text-base font-bold tracking-wide">จองรถใหม่</span>
        </button>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 w-full z-50 bg-white dark:bg-[#1e2430] border-t border-gray-200 dark:border-gray-800 pb-[env(safe-area-inset-bottom)] pt-2 px-2 transition-colors duration-300">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto pb-2">
          <button className="flex flex-col items-center justify-center w-full h-full gap-1 text-[#135bec]">
            <Home size={24} strokeWidth={2.5} />
            <span className="text-[10px] font-bold">หน้าหลัก</span>
          </button>
          
          <button 
            onClick={onNavigateToRequests}
            className="flex flex-col items-center justify-center w-full h-full gap-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <History size={24} />
            <span className="text-[10px] font-medium">ประวัติ</span>
          </button>
          
          <button className="flex flex-col items-center justify-center w-full h-full gap-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <Calendar size={24} />
            <span className="text-[10px] font-medium">ปฏิทิน</span>
          </button>
          
          <button className="flex flex-col items-center justify-center w-full h-full gap-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <User size={24} />
            <span className="text-[10px] font-medium">โปรไฟล์</span>
          </button>
        </div>
      </div>

      {/* Safe area spacer */}
      <div className="h-6 bg-white dark:bg-[#1e2430] w-full fixed bottom-0 z-40 pointer-events-none transition-colors duration-300"></div>

    </div>
  );
}

// ==========================================
// APPROVER DASHBOARD COMPONENT
// ==========================================
function ApproverDashboardView({ isDarkMode, toggleDarkMode, onLogout, onNavigateToDetails }) {
  return (
    <div className="bg-[#f6f6f8] dark:bg-[#101622] text-[#111318] dark:text-white w-full min-h-screen relative pb-24 overflow-x-hidden font-sans flex flex-col">
      
      {/* Top App Bar */}
      <header className="sticky top-0 z-20 flex items-center bg-white dark:bg-[#1a202c] p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
        <div className="flex items-center gap-3" onClick={onLogout} title="Click to Logout">
          <div className="relative cursor-pointer">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full w-10 h-10 border-2 border-white dark:border-gray-700 shadow-sm"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDIMxOzehcwRNTz0k7sAsHTF1Tqg7iAzsKhPvEJTkYgNQZT0gSzAPZL_lQu3kqV7NnkHzCS-S0AI5Y9FzEK71YPObD1Ze032zzieIFqMtlr-xmhHv3kefulgdoOMAClL10ku_GT0Zk7HmvdtGkURRIEcOCGNHG6Wsyb-g3EZwTgRNVpf5VYokOpsgbQUUIGH1wDsmMa6NUZQzEeexm7BNGIGoQU3KNYxlSuMVuPfPFqr7FadDqiadIHf-XtFEKehVLeukl6rS2v17A")' }}
            >
              <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <LogOut size={14} className="text-white" />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
          </div>
          <div>
            <h2 className="text-[#111318] dark:text-white text-base font-bold leading-tight">สวัสดี, คุณสมศักดิ์</h2>
            <p className="text-gray-500 dark:text-gray-400 text-xs">ผู้อนุมัติ (Approver)</p>
          </div>
        </div>
        <div className="flex w-12 items-center justify-end">
          <button 
            onClick={toggleDarkMode}
            className="relative flex cursor-pointer items-center justify-center rounded-full w-10 h-10 bg-transparent text-[#111318] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </header>

      {/* Stats Section */}
      <section className="px-4 py-6">
        <div className="flex flex-wrap gap-3">
          {/* Pending Card (Primary Highlight) */}
          <div className="flex min-w-[100px] flex-1 basis-[fit-content] flex-col gap-1 rounded-xl bg-[#135bec] shadow-lg shadow-[#135bec]/20 p-4 items-start relative overflow-hidden group">
            <div className="absolute right-[-10px] top-[-10px] opacity-10 rotate-12">
              <Hourglass size={80} className="text-white" />
            </div>
            <p className="text-white/80 text-sm font-medium">รออนุมัติ</p>
            <p className="text-white text-3xl font-bold leading-tight">12</p>
            <div className="mt-1 flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-sm">
              <span className="text-white text-xs">ดำเนินการด่วน</span>
            </div>
          </div>
          {/* Approved Card */}
          <div className="flex min-w-[100px] flex-1 basis-[fit-content] flex-col gap-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a202c] p-4 items-start shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">อนุมัติแล้ว</p>
            <p className="text-[#111318] dark:text-white text-3xl font-bold leading-tight">45</p>
            <div className="mt-1 flex items-center gap-1">
              <TrendingUp size={16} className="text-green-500" />
              <span className="text-green-600 dark:text-green-400 text-xs font-medium">+5 วันนี้</span>
            </div>
          </div>
          {/* Rejected Card */}
          <div className="flex min-w-[100px] flex-1 basis-[fit-content] flex-col gap-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a202c] p-4 items-start shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">ปฏิเสธ</p>
            <p className="text-[#111318] dark:text-white text-3xl font-bold leading-tight">3</p>
            <div className="mt-1 flex items-center gap-1">
              <span className="text-gray-500 dark:text-gray-400 text-xs">เดือนนี้</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Header */}
      <div className="flex items-center justify-between px-4 pt-2 pb-2">
        <h3 className="text-[#111318] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">คำขอล่าสุด</h3>
        <button className="text-[#135bec] text-sm font-medium hover:underline">ดูทั้งหมด</button>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-3 px-4 py-2 overflow-x-auto no-scrollbar mb-2">
        <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#111318] dark:bg-white pl-4 pr-4 transition-colors">
          <p className="text-white dark:text-black text-sm font-medium leading-normal">ทั้งหมด</p>
        </button>
        <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-[#1a202c] border border-gray-200 dark:border-gray-700 pl-4 pr-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
          <AlertCircle size={16} className="text-orange-500" />
          <p className="text-[#111318] dark:text-white text-sm font-medium leading-normal">ด่วนที่สุด</p>
        </button>
        <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-[#1a202c] border border-gray-200 dark:border-gray-700 pl-4 pr-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
          <p className="text-[#111318] dark:text-white text-sm font-medium leading-normal">รถตู้</p>
        </button>
        <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-[#1a202c] border border-gray-200 dark:border-gray-700 pl-4 pr-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
          <p className="text-[#111318] dark:text-white text-sm font-medium leading-normal">มอเตอร์ไซค์</p>
        </button>
      </div>

      {/* Request List */}
      <div className="flex flex-col gap-3 px-4 pb-4">
        
        {/* Item 1: Urgent */}
        <div className="flex flex-col bg-white dark:bg-[#1a202c] rounded-xl p-4 shadow-sm border border-l-4 border-l-orange-500 border-y-gray-200 border-r-gray-200 dark:border-y-gray-700 dark:border-r-gray-700 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-500/10 shrink-0 w-12 h-12 text-orange-600 dark:text-orange-400">
                <Bus size={24} />
              </div>
              <div>
                <p className="text-[#111318] dark:text-white text-base font-bold">ขอใช้รถตู้ (Van)</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">ไปราชการที่ ศาลากลางจังหวัด</p>
              </div>
            </div>
            <span className="inline-flex items-center rounded-md bg-orange-100 dark:bg-orange-900/30 px-2 py-1 text-xs font-medium text-orange-700 dark:text-orange-300 ring-1 ring-inset ring-orange-600/10">ด่วน</span>
          </div>
          <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Calendar size={18} />
              <span>12 ต.ค. 09:00 - 16:00</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <User size={18} />
              <span>นาย สมชาย (กองคลัง)</span>
            </div>
          </div>
          <div className="flex gap-2 mt-1">
            <button className="flex-1 rounded-lg bg-[#135bec] py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">อนุมัติ</button>
            <button 
              onClick={onNavigateToDetails}
              className="flex-1 rounded-lg bg-gray-100 dark:bg-gray-800 py-2 text-sm font-medium text-[#111318] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              ดูรายละเอียด
            </button>
          </div>
        </div>

        {/* Item 2: Normal */}
        <div className="flex flex-col bg-white dark:bg-[#1a202c] rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10 shrink-0 w-12 h-12 text-blue-600 dark:text-blue-400">
                <Car size={24} />
              </div>
              <div>
                <p className="text-[#111318] dark:text-white text-base font-bold">ขอใช้รถเก๋ง (Sedan)</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">ตรวจงานก่อสร้าง ถนนสาย 2</p>
              </div>
            </div>
            <span className="inline-flex items-center rounded-md bg-green-100 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300 ring-1 ring-inset ring-green-600/20">ปกติ</span>
          </div>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Calendar size={18} />
              <span>13 ต.ค. 08:30 - 12:00</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <User size={18} />
              <span>นางสาว มานี (กองช่าง)</span>
            </div>
          </div>
        </div>

        {/* Item 3: Normal */}
        <div className="flex flex-col bg-white dark:bg-[#1a202c] rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-500/10 shrink-0 w-12 h-12 text-purple-600 dark:text-purple-400">
                <Bike size={24} />
              </div>
              <div>
                <p className="text-[#111318] dark:text-white text-base font-bold">ขอใช้รถจักรยานยนต์</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">ส่งเอกสาร ด่วน</p>
              </div>
            </div>
            <span className="inline-flex items-center rounded-md bg-green-100 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300 ring-1 ring-inset ring-green-600/20">ปกติ</span>
          </div>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Calendar size={18} />
              <span>13 ต.ค. 13:00 - 14:00</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <User size={18} />
              <span>นาย ปิติ (งานธุรการ)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1a202c] border-t border-gray-200 dark:border-gray-800 pb-[env(safe-area-inset-bottom)] z-50">
        <div className="flex justify-around items-center h-16 pb-2">
          <button className="flex flex-col items-center gap-1 w-full text-[#135bec]">
            <LayoutDashboard size={24} className="fill-current" />
            <span className="text-[10px] font-medium">ภาพรวม</span>
          </button>
          <button className="flex flex-col items-center gap-1 w-full text-gray-400 dark:text-gray-500 hover:text-[#111318] dark:hover:text-white transition-colors">
            <History size={24} />
            <span className="text-[10px] font-medium">ประวัติ</span>
          </button>
          <button className="flex flex-col items-center gap-1 w-full text-gray-400 dark:text-gray-500 hover:text-[#111318] dark:hover:text-white transition-colors">
            <Calendar size={24} />
            <span className="text-[10px] font-medium">ปฏิทิน</span>
          </button>
          <button className="flex flex-col items-center gap-1 w-full text-gray-400 dark:text-gray-500 hover:text-[#111318] dark:hover:text-white transition-colors">
            <Settings size={24} />
            <span className="text-[10px] font-medium">ตั้งค่า</span>
          </button>
        </div>
      </nav>
      
      {/* Fix for iPhone Home Indicator */}
      <div className="h-4 w-full bg-white dark:bg-[#1a202c] fixed bottom-0 z-50"></div>
    </div>
  );
}

// ==========================================
// NEW: APPROVER REQUEST DETAILS COMPONENT
// ==========================================
function ApproverRequestDetailsView({ isDarkMode, onBack }) {
  return (
    <div className="bg-[#f6f6f8] dark:bg-[#101622] text-[#111318] dark:text-white w-full min-h-screen relative pb-24 overflow-x-hidden font-sans flex flex-col">
      
      {/* Top App Bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-white dark:bg-[#1a202c] p-4 shadow-sm transition-colors duration-300">
        <button 
          onClick={onBack}
          className="flex w-10 h-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft size={24} className="text-[#111318] dark:text-white" />
        </button>
        <h2 className="text-[#111318] dark:text-white text-lg font-bold leading-tight flex-1 text-center pr-10">
          รายละเอียดคำขอ
        </h2>
      </header>

      <main className="flex-1 p-4 flex flex-col gap-5">
        
        {/* Status Section */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">เลขที่คำขอ #Req-2023-884</span>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-orange-100 dark:bg-orange-900/40 pl-3 pr-4 py-1">
            <Hourglass size={18} className="text-orange-700 dark:text-orange-300" />
            <p className="text-orange-700 dark:text-orange-300 text-sm font-bold leading-normal">รอการอนุมัติ</p>
          </div>
        </div>

        {/* Requester Profile */}
        <section className="rounded-xl bg-white dark:bg-[#1a202c] p-4 shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-[#111318] dark:text-white text-base font-bold mb-4 flex items-center gap-2">
            <User size={20} className="text-[#135bec]" />
            ข้อมูลผู้ขอใช้รถ
          </h3>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex gap-4 items-center">
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full w-16 h-16 shrink-0 border-2 border-gray-100 dark:border-gray-700"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB27BokYCxpaxCi-VSNUFRYErp6AbfPEOhzEIPW8UBVPLInXSXpqWlk349Ow0DYfDy9Ov_SPjYWP3pURUzHdIdNub2xk0aau7d5ZkFuBO7kivQg7xV0Gh_9UUihtSn-B3nLAwWUa9gBXzIho33UZHM2kXVTXbp7ZDks4ckxZcG8COENQ__wlct4HCg7RD10QUy6QGhJvESWxLquNGMJEjkv6t7vDdKl0pWu6l8XPLCwtXV1gq4ddl52s0pkRnuZDhDbzyQ_KasUUgA")' }}
              ></div>
              <div className="flex flex-col justify-center">
                <p className="text-[#111318] dark:text-white text-lg font-bold leading-tight">นายสมชาย ใจดี</p>
                <p className="text-[#616f89] dark:text-gray-400 text-sm font-normal">เจ้าหน้าที่อาวุโส - กองโยธา</p>
                <a href="#" className="text-[#135bec] dark:text-blue-400 text-sm font-medium mt-1 flex items-center gap-1 hover:underline">
                  <Phone size={16} />
                  081-234-5678
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Trip Details */}
        <section className="rounded-xl bg-white dark:bg-[#1a202c] p-4 shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-[#111318] dark:text-white text-base font-bold mb-4 flex items-center gap-2">
            <Map size={20} className="text-[#135bec]" />
            รายละเอียดการเดินทาง
          </h3>
          <div className="space-y-4">
            {/* Date/Time */}
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">วันและเวลาเดินทาง</p>
                <p className="text-sm font-semibold text-[#111318] dark:text-gray-200">12 ต.ค. 2566 • 08:00 - 16:30 น.</p>
              </div>
            </div>
            {/* Destination */}
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">สถานที่</p>
                <p className="text-sm font-semibold text-[#111318] dark:text-gray-200">
                  กระทรวงมหาดไทย <span className="text-gray-400">➔</span> ศาลากลางจังหวัด
                </p>
              </div>
            </div>
            {/* Purpose */}
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <Megaphone size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">วัตถุประสงค์</p>
                <p className="text-sm font-semibold text-[#111318] dark:text-gray-200">
                  เข้าร่วมประชุมงบประมาณประจำปี และติดตามผลการดำเนินงานไตรมาสที่ 3
                </p>
              </div>
            </div>
            {/* Passengers */}
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <Users size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">ผู้ร่วมเดินทาง</p>
                <p className="text-sm font-semibold text-[#111318] dark:text-gray-200">4 ท่าน</p>
              </div>
            </div>
          </div>
        </section>

        {/* Vehicle & Attachments Grid */}
        <div className="grid grid-cols-1 gap-5">
          {/* Vehicle Info */}
          <section className="rounded-xl bg-white dark:bg-[#1a202c] p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[#111318] dark:text-white text-base font-bold mb-1">ประเภทรถที่ขอ</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">รถตู้ (Van) • Toyota Commuter</p>
              </div>
              <div className="h-10 w-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300">
                <Car size={24} />
              </div>
            </div>
          </section>

          {/* Attachments */}
          <section className="rounded-xl bg-white dark:bg-[#1a202c] p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-[#111318] dark:text-white text-base font-bold mb-3 flex items-center gap-2">
              <Paperclip size={20} className="text-[#135bec]" />
              เอกสารแนบ (1)
            </h3>
            <div className="flex items-center p-3 rounded-lg bg-[#f6f6f8] dark:bg-[#101622] border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="h-10 w-10 flex items-center justify-center bg-red-100 text-red-600 rounded mr-3">
                <FileText size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#111318] dark:text-white truncate">วาระการประชุม.pdf</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2.4 MB</p>
              </div>
              <EyeIcon size={20} className="text-gray-400" />
            </div>
          </section>
        </div>

        {/* Remarks Input */}
        <section className="rounded-xl bg-white dark:bg-[#1a202c] p-4 shadow-sm border border-gray-100 dark:border-gray-800">
          <label className="text-[#111318] dark:text-white text-base font-bold mb-2 block" htmlFor="remarks">
            เหตุผล / หมายเหตุ <span className="text-xs font-normal text-gray-500">(ใช้สำหรับกรณีปฏิเสธ หรือเพิ่มเติม)</span>
          </label>
          <textarea 
            className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:border-[#135bec] focus:ring-1 focus:ring-[#135bec] dark:text-white p-3" 
            id="remarks" 
            placeholder="ระบุเหตุผลประกอบการพิจารณา..." 
            rows="3"
          ></textarea>
        </section>
      </main>

      {/* Fixed Footer Actions */}
      <footer className="fixed bottom-0 left-0 right-0 w-full bg-white dark:bg-[#1a202c] border-t border-gray-200 dark:border-gray-800 p-4 pb-6 z-30">
        <div className="max-w-md mx-auto flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white text-red-600 hover:bg-red-50 active:bg-red-100 px-4 py-3 text-base font-bold transition-colors dark:bg-transparent dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20">
            <X size={20} />
            ปฏิเสธ
          </button>
          <button className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-[#135bec] text-white hover:bg-blue-700 active:bg-blue-800 px-4 py-3 text-base font-bold shadow-md shadow-blue-500/20 transition-colors">
            <Check size={20} />
            อนุมัติคำขอ
          </button>
        </div>
      </footer>
    </div>
  );
}

// ... [CreateRequestView, RequestListView, RequestDetailsView components remain unchanged as per previous logic] ...
function RequestDetailsView({ isDarkMode, onBack }) {
    // ... (This function code remains exactly as in the provided file content, no changes needed here) ...
    return (
    <div className="bg-[#f6f6f8] dark:bg-[#101622] text-[#111318] dark:text-white w-full min-h-screen relative pb-24 overflow-x-hidden font-sans flex flex-col">
      <div className="sticky top-0 z-20 flex items-center bg-white dark:bg-[#1a202c] p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
        <div onClick={onBack} className="text-[#111318] dark:text-white flex w-10 h-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
          <ArrowLeft size={24} />
        </div>
        <h2 className="text-[#111318] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">รายละเอียดคำขอ</h2>
      </div>
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 pb-0">
          <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#1a202c] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle size={18} className="text-green-600 dark:text-green-400 fill-current" />
                <span className="text-green-700 dark:text-green-400 text-sm font-bold">อนุมัติแล้ว</span>
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">REQ-2023-0891</span>
            </div>
            <div className="flex items-stretch justify-between gap-4">
              <div className="flex flex-col justify-center gap-1 flex-[2_2_0px]">
                <p className="text-[#111318] dark:text-white text-lg font-bold leading-tight">Toyota Camry</p>
                <p className="text-[#616f89] dark:text-gray-400 text-sm font-normal leading-normal">ทะเบียน: 1กก-9999</p>
                <div className="flex items-center gap-1 mt-1">
                  <Users size={16} className="text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400 text-xs">รองรับ 4 ที่นั่ง</span>
                </div>
              </div>
              <div className="w-28 bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-none border border-gray-100 dark:border-gray-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBfd_tDBF9SwKDD6ZSd4vfjzoaj6XO9VFR4HnRlEhiM4g8H__HTXNwbKkHteDlWsWkSZatNSlafaNPgJd3ruP73beHEPi5OVqnkH1KS_f9Z9Q__oP_wacMJZ-keaukZSD0qBmSF-j7sgfE9IXYwFKcMLVrj7FcSJpGdK4zk7Iz86A563glvzykV_MDMUaa-_ARTthskFqP5vxra6X800eEXEWQOkVqXC0FosUlOYvmBbDBUqkM1dpHPYrC3CDzcRtNdf8hYO71OrsA")' }}></div>
            </div>
            <div className="flex gap-3 pt-2">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg h-10 px-4 bg-[#135bec] hover:bg-blue-700 text-white transition-colors shadow-sm"><Phone size={18} /><span className="truncate text-sm font-medium">โทรหาคนขับ</span></button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg h-10 px-4 bg-[#135bec]/10 dark:bg-[#135bec]/20 hover:bg-[#135bec]/20 text-[#135bec] dark:text-blue-300 transition-colors"><Map size={18} /><span className="truncate text-sm font-medium">ดูเส้นทาง</span></button>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <h3 className="text-[#111318] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">ข้อมูลผู้ขับขี่</h3>
          <div className="mx-4 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-[#1a202c]">
            <div className="flex items-center gap-4 px-4 py-3 justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 border-2 border-white dark:border-gray-600 shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBX6c6NUyzVvm2aLSPn50GjHnVTRPSdXA6EmxEws7vKG0BlFFxB0mNaaFmbuIYvqusN25SglV-L4MlnD0zfx0UYT5XwqVwKkuxVCum2Y8y7Y8l4K90bPPfpo-a-n8rf3j3OToozCLjlZDvv54YczHl0OUFJ1iJadbaabS8VdgZwuH9l_DZ6JI9_ZymgaO6no1wYR1HnqHI27HZa8HgTWFac-IODmRKCoxUtXkK7XQN_tsDUbwolsqrjmlDRRAqh_fd-4CWxxdvgv58")' }}></div>
                <div className="flex flex-col justify-center">
                  <p className="text-[#111318] dark:text-white text-base font-bold leading-normal line-clamp-1">นายสมชาย ใจดี</p>
                  <div className="flex items-center gap-1"><CheckCircle size={14} className="text-green-500 fill-current" /><p className="text-[#616f89] dark:text-gray-400 text-sm font-normal leading-normal">พนักงานขับรถมืออาชีพ</p></div>
                </div>
              </div>
              <div className="shrink-0"><button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"><MessageCircle size={20} /></button></div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <h3 className="text-[#111318] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">รายละเอียดการเดินทาง</h3>
          <div className="mx-4 bg-white dark:bg-[#1a202c] rounded-xl p-4 shadow-sm flex flex-col gap-6">
            <div className="relative pl-2">
              <div className="absolute left-[15px] top-3 bottom-8 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              <div className="relative flex gap-4 mb-6"><div className="relative z-10 flex-none w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center border-2 border-white dark:border-gray-800"><div className="w-2.5 h-2.5 rounded-full bg-[#135bec]"></div></div><div className="flex flex-col pt-1"><span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-0.5">จุดรับ • 12 ต.ค. 08:30</span><span className="text-[#111318] dark:text-white font-medium">อาคารกระทรวง A</span></div></div>
              <div className="relative flex gap-4"><div className="relative z-10 flex-none w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center border-2 border-white dark:border-gray-800"><MapPin size={16} className="text-orange-600 dark:text-orange-400" /></div><div className="flex flex-col pt-1"><span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-0.5">จุดส่ง • 12 ต.ค. 16:30</span><span className="text-[#111318] dark:text-white font-medium">ศาลากลางจังหวัด (Provincial Hall)</span></div></div>
            </div>
            <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBjf306TRyaC63Y6h2NEUzN47KGm6Kp_Hh0rt0iEV4dExZ4p5rP4qxqW7LG0jADPwAcJfJD8B6fYub87X7-xITLiCIZh1AA_-WfuPCyyvhdXvvIQr4eUT_We1qpzVzoIIPbmeAd-4bjV0vmM_fudjt2zwI4q6LoVd1iQ-e9g6kvMJ5-E0S2pcMlO9ol_UvEoTtgk19z4ArY3wi3qVRV79D7y2ZxSPwS5dFK8GbVwX3pKLI6crbEWvBOe5Jhc1Vzz4Vc_ZWuzOUvXi4")' }}></div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors cursor-pointer"><span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1 text-[#111318] dark:text-white"><Maximize2 size={14} />ขยายแผนที่</span></div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 dark:border-gray-700 pt-4">
              <div><p className="text-xs text-gray-500 dark:text-gray-400 mb-1">จำนวนผู้โดยสาร</p><p className="text-sm font-medium text-[#111318] dark:text-white flex items-center gap-1"><User size={16} className="text-gray-400" />3 คน</p></div>
              <div><p className="text-xs text-gray-500 dark:text-gray-400 mb-1">ระยะเวลา</p><p className="text-sm font-medium text-[#111318] dark:text-white flex items-center gap-1"><Clock size={16} className="text-gray-400" />8 ชั่วโมง</p></div>
            </div>
          </div>
        </div>
        <div className="mt-2 mb-6">
          <h3 className="text-[#111318] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">วัตถุประสงค์</h3>
          <div className="mx-4 bg-white dark:bg-[#1a202c] rounded-xl p-4 shadow-sm"><p className="text-sm text-[#111318] dark:text-white leading-relaxed">เดินทางไปราชการเพื่อตรวจสอบพื้นที่โครงการพัฒนาแหล่งน้ำในเขตอำเภอเมือง และเข้าร่วมประชุมกับหน่วยงานท้องถิ่น ณ ศาลากลางจังหวัด</p></div>
        </div>
        <div className="h-6"></div>
      </main>
      <nav className="fixed bottom-0 z-50 w-full bg-white dark:bg-[#1a202c] border-t border-gray-100 dark:border-gray-800 pb-[env(safe-area-inset-bottom)] pt-2">
        <div className="flex justify-around items-center h-16 pb-2">
          <a className="flex flex-col items-center justify-center w-full text-gray-400 dark:text-gray-500 hover:text-[#135bec] transition-colors" href="#"><Home size={24} className="mb-1" /><span className="text-[10px] font-medium">หน้าหลัก</span></a>
          <a className="flex flex-col items-center justify-center w-full text-[#135bec] dark:text-blue-400 transition-colors" href="#"><FileText size={24} className="mb-1 fill-current" /><span className="text-[10px] font-medium">รายการคำขอ</span></a>
          <div className="relative flex flex-col items-center justify-center w-full text-gray-400 dark:text-gray-500 hover:text-[#135bec] transition-colors cursor-pointer"><div className="absolute top-0 right-7 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a202c]"></div><Bell size={24} className="mb-1" /><span className="text-[10px] font-medium">แจ้งเตือน</span></div>
          <a className="flex flex-col items-center justify-center w-full text-gray-400 dark:text-gray-500 hover:text-[#135bec] transition-colors" href="#"><User size={24} className="mb-1" /><span className="text-[10px] font-medium">โปรไฟล์</span></a>
        </div>
      </nav>
      <div className="h-4 w-full bg-white dark:bg-[#1a202c] fixed bottom-0 z-50"></div>
    </div>
  );
}

// ... [CreateRequestView, RequestListView components remain same as in User Dashboard flow] ...
// We need to redefine CreateRequestView and RequestListView as they are used in both flows or reused.
// Since they were defined in previous code block but not fully shown in the last snippet, I will include them here for completeness.

function CreateRequestView({ isDarkMode, onBack, onNavigateToRequests }) {
    const [vehicleType, setVehicleType] = useState('car');
    const [passengerCount, setPassengerCount] = useState(3);
  
    return (
      <div className="font-sans bg-[#f6f6f8] dark:bg-[#101622] text-[#111318] dark:text-white antialiased transition-colors duration-200">
        <div className="relative flex min-h-screen w-full flex-col pb-32">
          
          <div className="sticky top-0 z-20 flex items-center bg-white dark:bg-[#1a2233] px-4 py-3 shadow-sm transition-colors duration-200">
            <button 
              onClick={onBack}
              className="flex w-10 h-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white pr-10">
              สร้างคำขอ
            </h2>
          </div>
  
          {/* Progress Indicator */}
          <div className="bg-white dark:bg-[#1a2233] pb-4 pt-1 flex justify-center w-full">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-6 rounded-full bg-[#135bec]"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
            </div>
          </div>
  
          <div className="flex flex-col gap-6 px-4 py-6">
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 pl-1">ประเภทพาหนะ</label>
              <div className="flex h-12 w-full rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                <button 
                  onClick={() => setVehicleType('car')}
                  className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg transition-all duration-200 ${vehicleType === 'car' ? 'bg-white dark:bg-slate-700 shadow-sm text-[#135bec]' : 'text-slate-500 dark:text-slate-400'}`}
                >
                  <Car size={20} className="mr-2" />
                  <span className="text-sm font-medium">รถยนต์</span>
                </button>
                <button 
                  onClick={() => setVehicleType('moto')}
                  className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg transition-all duration-200 ${vehicleType === 'moto' ? 'bg-white dark:bg-slate-700 shadow-sm text-[#135bec]' : 'text-slate-500 dark:text-slate-400'}`}
                >
                  <Bike size={20} className="mr-2" />
                  <span className="text-sm font-medium">รถจักรยานยนต์</span>
                </button>
              </div>
            </div>
  
            <section className="rounded-xl bg-white dark:bg-[#1a2233] p-5 shadow-sm border border-[#dbdfe6]/50 dark:border-[#2d3748]">
              <h3 className="mb-4 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock size={20} className="text-[#135bec]" />
                รายละเอียดการเดินทาง
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">วันและเวลาเริ่มต้น</label>
                  <div className="relative">
                    <input className="w-full rounded-lg border border-[#dbdfe6] dark:border-[#2d3748] bg-transparent px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#135bec] focus:ring-1 focus:ring-[#135bec] placeholder:text-slate-400" type="datetime-local" defaultValue="2023-10-27T08:30"/>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">วันและเวลาสิ้นสุด</label>
                  <div className="relative">
                    <input className="w-full rounded-lg border border-[#dbdfe6] dark:border-[#2d3748] bg-transparent px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#135bec] focus:ring-1 focus:ring-[#135bec] placeholder:text-slate-400" type="datetime-local" defaultValue="2023-10-27T16:30"/>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">วัตถุประสงค์</label>
                  <textarea className="w-full resize-none rounded-lg border border-[#dbdfe6] dark:border-[#2d3748] bg-transparent px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#135bec] focus:ring-1 focus:ring-[#135bec] placeholder:text-slate-400" placeholder="ระบุรายละเอียดงานราชการหรือภารกิจ..." rows="3"></textarea>
                </div>
              </div>
            </section>
  
            <section className="rounded-xl bg-white dark:bg-[#1a2233] p-5 shadow-sm border border-[#dbdfe6]/50 dark:border-[#2d3748]">
              <h3 className="mb-4 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Map size={20} className="text-[#135bec]" />
                เส้นทาง
              </h3>
              <div className="relative flex flex-col gap-4 pl-2">
                <div className="absolute left-[19px] top-4 bottom-10 w-0.5 bg-slate-200 dark:bg-slate-700 -z-0"></div>
                
                <div className="relative z-10 flex items-start gap-3">
                  <div className="mt-3 flex w-4 h-4 shrink-0 items-center justify-center rounded-full border-2 border-[#135bec] bg-white dark:bg-slate-800"></div>
                  <div className="flex-1">
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">จุดเริ่มต้น</label>
                    <div className="relative">
                      <Navigation size={20} className="absolute left-3 top-2.5 text-slate-400" />
                      <input className="w-full rounded-lg border border-[#dbdfe6] dark:border-[#2d3748] bg-transparent pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#135bec] focus:ring-1 focus:ring-[#135bec] placeholder:text-slate-400" placeholder="ค้นหาจุดเริ่มต้น" type="text" defaultValue="ศาลากลางจังหวัด"/>
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 flex items-start gap-3">
                  <div className="mt-3 flex w-4 h-4 shrink-0 items-center justify-center rounded-full bg-[#135bec] border-2 border-white dark:border-slate-800 shadow-sm"></div>
                  <div className="flex-1">
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">จุดหมายปลายทาง</label>
                    <div className="relative">
                      <MapPin size={20} className="absolute left-3 top-2.5 text-slate-400" />
                      <input className="w-full rounded-lg border border-[#dbdfe6] dark:border-[#2d3748] bg-transparent pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#135bec] focus:ring-1 focus:ring-[#135bec] placeholder:text-slate-400" placeholder="ค้นหาปลายทาง" type="text"/>
                    </div>
                  </div>
                </div>
  
                <div className="ml-7 pt-2">
                  <button className="flex items-center gap-2 text-sm font-medium text-[#135bec] hover:text-[#0e45b8] transition-colors" type="button">
                    <PlusCircle size={20} />
                    เพิ่มจุดแวะ
                  </button>
                </div>
              </div>
  
              <div className="mt-6 h-32 w-full overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800 border border-[#dbdfe6] dark:border-[#2d3748] relative">
                <img alt="Map preview" className="h-full w-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYcYEFACECL5JADqbKk9wJbkmqb6RaccMNGb0EblR12wHUxvphasBa7cky2emMF6iJ61uPALDO9VsgQ3m-pSF8etMP91P5kGtXkJtuKJpH9oiOZtC2svHodxQ-p7mEui1OVXWmqbNN0xcytL0K0M2tytQp1JywZ24L7PazkfwBz5-BjW6OjZut0tdmjyiXTNKIOUgHcuWrG3sPaXv1o9cN9LplWBNYkybr40_3GSP26A6oPnSjjyuXV-_1OcfHSDDfeexPhdew6UQ"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                <div className="absolute bottom-2 right-2 rounded bg-white/90 dark:bg-slate-900/90 px-2 py-1 text-[10px] font-bold shadow-sm backdrop-blur-sm">
                  PREVIEW
                </div>
              </div>
            </section>
  
            <section className="rounded-xl bg-white dark:bg-[#1a2233] p-5 shadow-sm border border-[#dbdfe6]/50 dark:border-[#2d3748] mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Users size={20} className="text-[#135bec]" />
                  ผู้โดยสาร
                </h3>
                <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                  <button 
                    onClick={() => setPassengerCount(Math.max(1, passengerCount - 1))}
                    className="w-7 h-7 flex items-center justify-center rounded bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-sm hover:text-[#135bec] transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{passengerCount}</span>
                  <button 
                    onClick={() => setPassengerCount(passengerCount + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-sm hover:text-[#135bec] transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 rounded-lg border border-[#dbdfe6] dark:border-[#2d3748] p-2">
                  <div className="flex w-8 h-8 shrink-0 items-center justify-center rounded-full bg-[#135bec]/10 text-[#135bec]">
                    <User size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">สมชาย ใจดี (ผู้ขอ)</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">สำนักปลัด</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-[#dbdfe6] dark:border-[#2d3748] p-2 opacity-75">
                  <div className="flex w-8 h-8 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                    <UserPlus size={18} />
                  </div>
                  <input className="flex-1 bg-transparent border-none p-0 text-sm focus:ring-0 placeholder:text-slate-400 outline-none" placeholder="ระบุชื่อผู้โดยสารคนที่ 2" type="text"/>
                </div>
              </div>
            </section>
          </div>
  
          <div className="fixed bottom-[88px] left-0 right-0 z-20 px-4">
            <button className="w-full rounded-xl bg-[#135bec] py-4 text-center font-bold text-white shadow-lg shadow-[#135bec]/30 hover:bg-[#0e45b8] transition-all active:scale-[0.98]">
              ถัดไป
            </button>
          </div>
  
          <div className="fixed bottom-0 z-30 w-full border-t border-[#dbdfe6] dark:border-[#2d3748] bg-white dark:bg-[#1a2233] pb-6 pt-2 shadow-lg">
            <div className="grid grid-cols-4 gap-1">
              <button onClick={onBack} className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-[#135bec] transition-colors">
                <Home size={24} />
                <span className="text-[10px] font-medium">หน้าหลัก</span>
              </button>
              <button onClick={onNavigateToRequests} className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-[#135bec] transition-colors">
                <History size={24} />
                <span className="text-[10px] font-medium">ประวัติ</span>
              </button>
              <div className="relative flex flex-col items-center gap-1 p-2 text-[#135bec]">
                <div className="absolute -top-6 flex w-12 h-12 items-center justify-center rounded-full bg-[#135bec] text-white shadow-lg ring-4 ring-white dark:ring-[#1a2233]">
                  <Plus size={24} />
                </div>
                <span className="mt-6 text-[10px] font-bold">สร้างคำขอ</span>
              </div>
              <button className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-[#135bec] transition-colors">
                <User size={24} />
                <span className="text-[10px] font-medium">โปรไฟล์</span>
              </button>
            </div>
          </div>
  
          <div className="h-6 bg-white dark:bg-[#1a2233] w-full fixed bottom-0 z-40 pointer-events-none transition-colors duration-200"></div>
          
        </div>
      </div>
    );
  }

function RequestListView({ isDarkMode, onNavigateToDashboard, onNavigateToCreate, onNavigateToDetails }) {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <div className="bg-[#f6f6f8] dark:bg-[#101622] text-[#111318] dark:text-white w-full min-h-screen relative pb-24 overflow-x-hidden font-sans">
      
      {/* Top App Bar */}
      <div className="sticky top-0 z-20 bg-white dark:bg-[#1a202c] shadow-sm transition-colors duration-300">
        <div className="flex items-center p-4 justify-between">
          <h2 className="text-[#111318] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center pl-10">
            รายการคำขอ
          </h2>
          <div className="flex w-10 items-center justify-end">
            <button className="flex items-center justify-center rounded-full h-10 w-10 bg-transparent text-[#111318] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Filter size={24} />
            </button>
          </div>
        </div>

        {/* Segmented Control (Tabs) */}
        <div className="px-4 pb-3 pt-1">
          <div className="flex h-10 w-full items-center justify-center rounded-lg bg-[#f0f2f4] dark:bg-gray-800 p-1">
            <button 
              onClick={() => setActiveTab('active')}
              className={`flex h-full grow items-center justify-center overflow-hidden rounded-md transition-all text-sm font-semibold leading-normal ${activeTab === 'active' ? 'bg-white dark:bg-[#2d3748] shadow-sm text-[#135bec]' : 'text-[#616f89] dark:text-gray-400'}`}
            >
              <span className="truncate">ดำเนินการ (Active)</span>
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex h-full grow items-center justify-center overflow-hidden rounded-md transition-all text-sm font-semibold leading-normal ${activeTab === 'history' ? 'bg-white dark:bg-[#2d3748] shadow-sm text-[#135bec]' : 'text-[#616f89] dark:text-gray-400'}`}
            >
              <span className="truncate">ประวัติ (History)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content List */}
      <div className="p-4 flex flex-col gap-4">
        
        {/* Card 1: Pending (Car) */}
        <div className="flex flex-col rounded-xl bg-white dark:bg-[#1a202c] shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-800 overflow-hidden">
          {/* Header Status */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#135bec]/10 text-[#135bec]">
                <Car size={18} />
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">REQ-2310-001</span>
            </div>
            <span className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/30 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:text-amber-400">
              รออนุมัติ
            </span>
          </div>
          {/* Body */}
          <div className="p-4 flex gap-4">
            <div className="flex-1 flex flex-col gap-3">
              <div>
                <h3 className="text-[#111318] dark:text-white text-base font-bold leading-tight mb-1">กระทรวงมหาดไทย</h3>
                <div className="flex items-center gap-1.5 text-[#616f89] dark:text-gray-400 text-sm">
                  <MapPin size={16} />
                  <span>เขตพระนคร, กรุงเทพฯ</span>
                </div>
              </div>
              <div className="flex items-start gap-1.5 text-[#616f89] dark:text-gray-400 text-sm bg-[#f6f6f8] dark:bg-gray-700/30 p-2 rounded-lg">
                <Clock size={16} className="mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-medium text-[#111318] dark:text-gray-200">12 ต.ค. 2566</span>
                  <span className="text-xs">09:00 - 16:00 น.</span>
                </div>
              </div>
            </div>
            {/* Small Map Preview */}
            <div className="w-24 h-24 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0 relative">
              <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAKVkMeboEFDJeYkaZX8eu_eC9Uzn7HxPpDezjyT6nOQyPkFwDZLrFDZKuEEsNnRUZ4mspwfwbawkcOO8YkiauteL3o-1_XDKZBTZmm25nUnXpGq0DQylL_R1WO1znPz_ZIQBEJIZNNx4a8Yn7Bfe9W7o9pLm8tNnGyx9FQBOhnY50a_W1Lg6YgAnhxGlqMUYNqPkmPd3iFKVy4O_c5nhHkPUa3PpEsO8rsqAFw0SUVlR1Dx6cxmRobQMGXF5oRw5Rfma89jYdAskg")' }}
              ></div>
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>
          {/* Actions */}
          <div className="px-4 pb-4 pt-0 flex gap-3">
            <button className="flex-1 h-9 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent text-[#111318] dark:text-white text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              ยกเลิก
            </button>
            <button 
              onClick={onNavigateToDetails}
              className="flex-1 h-9 items-center justify-center rounded-lg bg-[#135bec] text-white text-sm font-medium hover:bg-[#135bec]/90 transition-colors gap-2 flex"
            >
              <Edit size={16} />
              แก้ไข
            </button>
          </div>
        </div>

        {/* Card 2: Approved (Van) */}
        <div 
          onClick={onNavigateToDetails}
          className="flex flex-col rounded-xl bg-white dark:bg-[#1a202c] shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-800 overflow-hidden cursor-pointer hover:bg-gray-50 dark:hover:bg-[#252d3d] transition-colors"
        >
          {/* Header Status */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#135bec]/10 text-[#135bec]">
                <Bus size={18} />
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">REQ-2310-005</span>
            </div>
            <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-bold text-green-700 dark:text-green-400">
              อนุมัติแล้ว
            </span>
          </div>
          {/* Body */}
          <div className="p-4 flex gap-4">
            <div className="flex-1 flex flex-col gap-3">
              <div>
                <h3 className="text-[#111318] dark:text-white text-base font-bold leading-tight mb-1">ศาลากลางจังหวัด</h3>
                <div className="flex items-center gap-1.5 text-[#616f89] dark:text-gray-400 text-sm">
                  <MapPin size={16} />
                  <span>นนทบุรี</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex items-center gap-2 text-[#111318] dark:text-gray-200">
                  <Calendar size={16} className="text-gray-500" />
                  <span className="font-medium">15 ต.ค. 2566</span>
                </div>
                <div className="flex items-center gap-2 text-[#616f89] dark:text-gray-400">
                  <Clock size={16} className="text-gray-500" />
                  <span>08:30 - 12:00 น.</span>
                </div>
                <div className="flex items-center gap-2 text-[#616f89] dark:text-gray-400 mt-1">
                  <User size={16} className="text-gray-500" />
                  <span>คนขับ: คุณสมชาย</span>
                </div>
              </div>
            </div>
            {/* Small Map Preview */}
            <div className="w-24 h-24 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0 relative">
              <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC2fSpfyKlBiKmJ9YRgoSIzt0rFon19Wf8wgalZXDD7Lfh_rD7gW7cLHdpK-tPMjsk2YEGgvDD1qOuEDaZae4roWNH2ytd7QkmR7fJjkDmChCBQp8ym9tccbNkZwAxU5rIPrLzHJ7HLVpoGYztLXk3_U9XgBd8VXlLutmVIqhQqymGxMq943K7BvM0I6jEZhhDAYTBzvMtEgldx5tGEG2c7KlImFOjjz-_iYBVoLCHwkpL7JIOTvUPAqB5Bii0xPSRAKUJr3tkz5hA")' }}
              ></div>
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>
          {/* Actions */}
          <div className="px-4 pb-4 pt-0">
            <button className="w-full h-9 flex items-center justify-center rounded-lg bg-[#f0f2f4] dark:bg-gray-700 text-[#111318] dark:text-white text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors gap-2">
              <FileText size={18} />
              ดูใบงาน
            </button>
          </div>
        </div>

        {/* Card 3: Rejected (Motorcycle) */}
        <div className="flex flex-col rounded-xl bg-white dark:bg-[#1a202c] shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-800 overflow-hidden opacity-90">
          {/* Header Status */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                <Bike size={18} />
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">REQ-2310-008</span>
            </div>
            <span className="inline-flex items-center rounded-full bg-red-100 dark:bg-red-900/30 px-2.5 py-0.5 text-xs font-bold text-red-700 dark:text-red-400">
              ไม่อนุมัติ
            </span>
          </div>
          {/* Body */}
          <div className="p-4 flex gap-4">
            <div className="flex-1 flex flex-col gap-3">
              <div>
                <h3 className="text-[#111318] dark:text-white text-base font-bold leading-tight mb-1">กรมการขนส่งทางบก</h3>
                <div className="flex items-center gap-1.5 text-[#616f89] dark:text-gray-400 text-sm">
                  <MapPin size={16} />
                  <span>จตุจักร, กรุงเทพฯ</span>
                </div>
              </div>
              <div className="flex items-start gap-1.5 text-[#616f89] dark:text-gray-400 text-sm bg-[#f6f6f8] dark:bg-gray-700/30 p-2 rounded-lg">
                <Clock size={16} className="mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-medium text-[#111318] dark:text-gray-200">20 ต.ค. 2566</span>
                  <span className="text-xs">10:00 - 14:00 น.</span>
                </div>
              </div>
            </div>
            {/* Small Map Preview */}
            <div className="w-24 h-24 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0 relative grayscale">
              <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAUVLRcMcfO6ucgXZDpYEH51noK8Qe3Dwk_uBYLli1t-Qe1JbZABFelRIpoUJpiy3FuQ-dqyCy-fxACsxp5RU_1idhu8eUvAljrKCbrknYxhs1eblq8NRkQs1w2mOVV2dGo1dDDoSKi2T2rY_blGElOu5YaTQW1N2hB-NE0UiIbNotGFBd7T80eSL21RsvAifXmpQL3GMF9eBZkhTDcYJtWhf-m1kGu-c1loxiwljUP59FT3UPqGbvIxBRM-2-aSenZLAQGVN66jI8")' }}
              ></div>
            </div>
          </div>
          {/* Actions */}
          <div className="px-4 pb-4 pt-0">
            <button className="w-full h-9 flex items-center justify-center rounded-lg border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-300 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors gap-2">
              <AlertCircle size={18} />
              ดูเหตุผล
            </button>
          </div>
        </div>
        
        <div className="h-20"></div> {/* Spacer for FAB and Nav */}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-4 z-30">
        <button 
          onClick={onNavigateToCreate}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#135bec] text-white shadow-lg hover:bg-[#135bec]/90 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#135bec]"
        >
          <Plus size={28} />
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1a202c] border-t border-gray-100 dark:border-gray-800 z-40 pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          <a 
            onClick={onNavigateToDashboard}
            className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-[#135bec] gap-1 group cursor-pointer"
          >
            <Home size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-medium">หน้าหลัก</span>
          </a>
          <a className="flex flex-col items-center justify-center w-full h-full text-[#135bec] gap-1 relative cursor-pointer">
            <span className="absolute -top-3 w-10 h-1 rounded-b-lg bg-[#135bec]/20 hidden"></span>
            <FileText size={24} className="font-variation-settings-fill" />
            <span className="text-[10px] font-bold">คำขอ</span>
          </a>
          <a className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-[#135bec] gap-1 group cursor-pointer">
            <Bell size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-medium">แจ้งเตือน</span>
          </a>
          <a className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-[#135bec] gap-1 group cursor-pointer">
            <User size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-medium">โปรไฟล์</span>
          </a>
        </div>
      </div>
      
      {/* Fix for iPhone Home Indicator */}
      <div className="h-4 w-full bg-white dark:bg-[#1a202c] fixed bottom-0 z-50"></div>
    </div>
  );
}

// Inline SVGs (Same as before)
const GoogleLogo = () => (
  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
);
const MicrosoftLogo = () => (
  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23"><path fill="#f3f3f3" d="M0 0h23v23H0z"/><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg>
);