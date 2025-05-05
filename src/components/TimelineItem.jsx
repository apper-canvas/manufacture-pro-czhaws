import { motion } from 'framer-motion';

const TimelineItem = ({ year, title, description, isEven, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`flex md:flex-row ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      <div className="hidden md:block md:w-1/2"></div>
      
      <div className="flex items-center">
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-lg">
            {year}
          </div>
        </div>
        <div className={`ml-4 md:absolute md:mt-0 ${isEven ? 'md:right-[50%] md:mr-16 md:text-right' : 'md:left-[50%] md:ml-16'} max-w-lg`}>
          <div className="bg-white dark:bg-surface-700 p-6 rounded-xl shadow-card">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-surface-600 dark:text-surface-400">{description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;