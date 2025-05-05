import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  // Get icons
  const AlertCircleIcon = getIcon('AlertCircle');
  const HomeIcon = getIcon('Home');

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center"
      >
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-surface-200 dark:bg-surface-700 rounded-full flex items-center justify-center">
            <AlertCircleIcon className="w-12 h-12 text-primary" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/" className="btn btn-primary inline-flex items-center gap-2 py-3 px-6">
          <HomeIcon className="w-5 h-5" />
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;