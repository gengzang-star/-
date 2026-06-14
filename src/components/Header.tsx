import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, LogOut, User, Menu, X, Heart } from 'lucide-react';
import { loginWithGooglePopup, logoutUser, getCurrentlyLoggedUser, IS_MOCK_MODE, HeerangSessionUser } from '../firebase';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [currentUser, setCurrentUser] = useState<HeerangSessionUser | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginToast, setShowLoginToast] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {
    // Sync initial login state
    const user = getCurrentlyLoggedUser();
    setCurrentUser(user);

    // Dynamic sticky header check
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = async () => {
    try {
      const loggedUser = await loginWithGooglePopup();
      setCurrentUser(loggedUser);
      setLoginMessage(
        IS_MOCK_MODE
          ? '체험용 데모 계정(홍길동)으로 로그인되었습니다.'
          : `${loggedUser.displayName}님, 반갑습니다!`
      );
      setShowLoginToast(true);
      setTimeout(() => setShowLoginToast(false), 3500);
      setMobileMenuOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
    setLoginMessage('로그아웃되었습니다.');
    setShowLoginToast(true);
    setTimeout(() => setShowLoginToast(false), 2000);
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { id: 'home', label: '메인' },
    { id: 'story', label: '브랜드 스토리' },
    { id: 'products', label: '제품 소개' },
    { id: 'contents', label: '희랑 이야기' },
    { id: 'reviews', label: '고객 후기' },
    { id: 'support', label: '고객센터' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-warm-cream/95 backdrop-blur-md shadow-sm border-b border-warm-beige/30 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
          {/* Logo element */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="w-9 h-9 bg-olive-green rounded-full flex items-center justify-center transition-transform group-hover:rotate-12 duration-500">
              <span className="font-serif text-white font-bold text-lg select-none">喜</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-1">
                <span className="font-serif text-xl font-bold tracking-widest text-deep-brown group-hover:text-olive-green transition-colors">
                  희랑
                </span>
                <span className="font-serif text-[10px] text-brand-gold font-medium">HEERANG</span>
              </div>
              <span className="text-[9px] text-olive-light tracking-tighter leading-none">
                건강을 담아, 기쁨을 나누다
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="relative px-4 py-2 text-sm font-medium transition-colors text-deep-brown/80 hover:text-olive-green cursor-pointer"
                >
                  <span className={`${isActive ? 'text-olive-green font-semibold' : ''}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeBubbleNav"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-gold rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-3 bg-warm-beige/55 px-3 py-1.5 rounded-full border border-warm-beige/80">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName}
                    className="w-6 h-6 rounded-full border border-brand-gold/60"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-olive-green flex items-center justify-center text-white text-xs font-semibold">
                    {currentUser.displayName[0]}
                  </div>
                )}
                <span className="text-xs font-medium text-deep-brown">
                  {currentUser.displayName}님
                </span>
                <button
                  onClick={handleLogout}
                  className="text-deep-brown/65 hover:text-red-700 transition-colors cursor-pointer"
                  title="로그아웃"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center space-x-2 text-xs font-semibold text-white bg-olive-green hover:bg-olive-dark px-4 py-2 rounded-full shadow-sm transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
              >
                <LogIn size={14} />
                <span>로그인</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburguer */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-deep-brown hover:text-olive-green transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 w-full bg-warm-cream/98 backdrop-blur-lg border-b border-warm-beige shadow-lg pt-20 pb-6 px-6 z-40 lg:hidden"
          >
            <div className="flex flex-col space-y-3">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full py-3.5 px-4 text-left text-base rounded-xl transition-all cursor-pointer ${
                      isActive
                        ? 'bg-olive-green text-white font-medium'
                        : 'text-deep-brown hover:bg-warm-beige/30'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              <hr className="border-t border-warm-beige/50 my-2" />

              <div className="pt-2">
                {currentUser ? (
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-3 bg-warm-beige/30 p-3 rounded-xl border border-warm-beige/50">
                      {currentUser.photoURL ? (
                        <img
                          src={currentUser.photoURL}
                          alt={currentUser.displayName}
                          className="w-10 h-10 rounded-full border border-brand-gold/60"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-olive-green flex items-center justify-center text-white text-base font-semibold">
                          {currentUser.displayName[0]}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-deep-brown">
                          {currentUser.displayName}님
                        </span>
                        <span className="text-xs text-deep-brown/65">{currentUser.email}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full py-3 px-4 rounded-xl flex items-center justify-center space-x-2 bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      <LogOut size={16} />
                      <span>로그아웃</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="w-full py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 bg-olive-green hover:bg-olive-dark text-white font-semibold transition-all cursor-pointer"
                  >
                    <LogIn size={16} />
                    <span>구글 계정으로 로그인</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Login/Status Toast */}
      <AnimatePresence>
        {showLoginToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 bg-deep-brown text-white py-3.5 px-6 rounded-2xl shadow-xl z-50 flex items-center space-x-3 border border-brand-gold/25"
          >
            <div className="w-7 h-7 bg-brand-gold rounded-full flex items-center justify-center">
              <Heart size={14} className="text-white fill-white" />
            </div>
            <p className="text-sm font-medium">{loginMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
