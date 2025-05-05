import { useState, useEffect, createContext } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { setUser, clearUser } from './store/userSlice';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ContactRequests from './pages/ContactRequests';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

// Create auth context
export const AuthContext = createContext(null);

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Get authentication status
  const userState = useSelector((state) => state.user);
  const isAuthenticated = userState?.isAuthenticated || false;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Initialize ApperUI once when the app loads
  useEffect(() => {
    const { ApperClient, ApperUI } = window.ApperSDK;
    const client = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Initialize but don't show login yet
    ApperUI.setup(client, {
      target: '#authentication',
      clientId: import.meta.env.VITE_APPER_PROJECT_ID,
      view: 'both',
      onSuccess: function(user) {
        // Store user data in Redux store
        let currentPath = window.location.pathname + window.location.search;
        if (user && user.isAuthenticated) {
          dispatch(setUser(user));
          if (currentPath.includes('login') || currentPath.includes('signup')) {
            navigate('/dashboard');
          }
        } else if (!currentPath.includes('login')) {
          navigate('/login');
        }
      },
      onError: function(error) {
        console.error("Authentication failed:", error);
        toast.error("Authentication failed. Please try again.");
      }
    });
    
    setIsInitialized(true);
  }, [dispatch, navigate]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    toast.info(
      darkMode ? "Light mode activated" : "Dark mode activated", 
      { icon: darkMode ? "🌞" : "🌙" }
    );
  };

  // Authentication methods to share via context
  const authMethods = {
    isInitialized,
    logout: async () => {
      try {
        const { ApperUI } = window.ApperSDK;
        await ApperUI.logout();
        dispatch(clearUser());
        navigate('/login');
        toast.success("Logged out successfully");
      } catch (error) {
        console.error("Logout failed:", error);
        toast.error("Logout failed. Please try again.");
      }
    }
  };

  return (
    <AuthContext.Provider value={authMethods}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col"
      >
        <header className="sticky top-0 z-50 bg-blur border-b border-surface-200 dark:border-surface-700">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">M</div>
              <span className="text-xl font-bold hidden sm:block">ManufacturePro</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition">Home</Link>
              <Link to="/about" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition">About Us</Link>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition">Dashboard</Link>
                  <Link to="/contact-requests" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition">Contact Requests</Link>
                  <button 
                    onClick={authMethods.logout}
                    className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/#products" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition">Products</Link>
                  <Link to="/#capabilities" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition">Capabilities</Link>
                  <Link to="/#quality" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition">Quality</Link>
                  <Link to="/#contact" className="btn btn-primary">Contact Us</Link>
                </>
              )}
            </nav>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-surface-200 dark:bg-surface-700"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                )}
              </button>
              
              <button className="md:hidden flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            
            {/* Auth routes - accessible only when NOT authenticated */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            
            {/* Protected routes - require authentication */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contact-requests" element={<ContactRequests />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="bg-surface-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">ManufacturePro</h3>
                <p className="text-surface-300 mb-4">Delivering high-quality manufacturing solutions with precision, reliability, and customer satisfaction.</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-surface-300 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-surface-300 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="#" className="text-surface-300 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-surface-300 hover:text-white">Home</Link></li>
                  <li><Link to="/about" className="text-surface-300 hover:text-white">About Us</Link></li>
                  <li><Link to="/#products" className="text-surface-300 hover:text-white">Products</Link></li>
                  <li><Link to="/#capabilities" className="text-surface-300 hover:text-white">Capabilities</Link></li>
                  <li><Link to="/#quality" className="text-surface-300 hover:text-white">Quality Standards</Link></li>
                  <li><Link to="/#contact" className="text-surface-300 hover:text-white">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                <ul className="space-y-2 text-surface-300">
                  <li className="flex items-start space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>123 Manufacturing Way, Industrial Park, CA 90210</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>(555) 123-4567</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>info@manufacturepro.com</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-surface-700 mt-8 pt-8 text-center text-surface-400">
              <p>&copy; {new Date().getFullYear()} ManufacturePro. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </motion.div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="rounded-lg shadow-lg"
      />
    </AuthContext.Provider>
  );
}

export default App;