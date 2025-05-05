import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

const Home = () => {
  // Get icons
  const ShieldIcon = getIcon('Shield');
  const ClockIcon = getIcon('Clock');
  const BarChart2Icon = getIcon('BarChart2');
  const UserCheckIcon = getIcon('UserCheck');
  const CheckCircleIcon = getIcon('CheckCircle');
  const ZapIcon = getIcon('Zap');
  const TruckIcon = getIcon('Truck');
  const ToolIcon = getIcon('Tool');
  const AwardIcon = getIcon('Award');
  const CpuIcon = getIcon('Cpu');
  const DatabaseIcon = getIcon('Database');
  const PackageIcon = getIcon('Package');

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState({});

  // Product data
  const products = [
    {
      id: 'prod1',
      name: 'Precision CNC Components',
      description: 'High-tolerance machined parts for aerospace and defense applications.',
      category: 'aerospace',
      image: 'https://images.unsplash.com/photo-1581092921461-39b9d08a221b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'prod2',
      name: 'Industrial Control Systems',
      description: 'Automated control systems for manufacturing processes.',
      category: 'automation',
      image: 'https://images.unsplash.com/photo-1581093577421-f561a654a353?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'prod3',
      name: 'Medical Device Components',
      description: 'Precision parts for medical equipment and implantable devices.',
      category: 'medical',
      image: 'https://images.unsplash.com/photo-1516549655656-ec13cdd1de24?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'prod4',
      name: 'Automotive Sensor Assemblies',
      description: 'High-performance sensor assemblies for automotive applications.',
      category: 'automotive',
      image: 'https://images.unsplash.com/photo-1559570278-eb8d71d06403?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'prod5',
      name: 'Custom Metal Fabrication',
      description: 'Custom fabricated metal components for industrial applications.',
      category: 'industrial',
      image: 'https://images.unsplash.com/photo-1523540383849-4ae4125acd6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'prod6',
      name: 'Electronic Enclosures',
      description: 'Protective enclosures for sensitive electronic equipment.',
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Manufacturing capabilities
  const capabilities = [
    {
      icon: <CpuIcon className="w-10 h-10 text-primary" />,
      title: 'CNC Machining',
      description: '5-axis precision machining with tolerances of ±0.001"'
    },
    {
      icon: <AwardIcon className="w-10 h-10 text-primary" />,
      title: 'Precision Grinding',
      description: 'Surface, cylindrical, and centerless grinding capabilities'
    },
    {
      icon: <ToolIcon className="w-10 h-10 text-primary" />,
      title: 'Sheet Metal Fabrication',
      description: 'Cutting, forming, and welding of various metals'
    },
    {
      icon: <DatabaseIcon className="w-10 h-10 text-primary" />,
      title: 'Injection Molding',
      description: 'Thermoplastic and thermoset molding for diverse applications'
    },
    {
      icon: <PackageIcon className="w-10 h-10 text-primary" />,
      title: 'Assembly Services',
      description: 'Full product assembly and testing capabilities'
    },
    {
      icon: <TruckIcon className="w-10 h-10 text-primary" />,
      title: 'Just-in-Time Delivery',
      description: 'Efficient inventory management and timely shipping'
    }
  ];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    return () => {
      document.querySelectorAll('section[id]').forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary/60">
          <img 
            src="https://images.unsplash.com/photo-1581093806997-8e8e47376a2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Manufacturing facility" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        
        <div className="container mx-auto h-full px-4 md:px-8 flex items-center relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Precision Manufacturing <span className="text-secondary">Solutions</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 mb-8"
            >
              We deliver high-quality manufacturing solutions with precision engineering, innovative production capabilities, and exceptional quality standards.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="#contact" className="btn btn-secondary px-8 py-3 text-lg">
                Request a Quote
              </a>
              <a href="#capabilities" className="btn bg-white/20 hover:bg-white/30 text-white px-8 py-3 text-lg">
                Explore Capabilities
              </a>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-50 dark:from-surface-900 to-transparent"></div>
      </section>

      {/* Key benefits section */}
      <section className="py-16 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ShieldIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-surface-600 dark:text-surface-400">ISO 9001 certified processes ensuring consistent quality.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <ClockIcon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">On-Time Delivery</h3>
              <p className="text-surface-600 dark:text-surface-400">99.7% on-time delivery record throughout our operation.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <UserCheckIcon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
              <p className="text-surface-600 dark:text-surface-400">Dedicated support team ensuring your complete satisfaction.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <BarChart2Icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Continuous Improvement</h3>
              <p className="text-surface-600 dark:text-surface-400">Ongoing investments in technology and training.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our <span className="text-primary">Products</span></h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
              Explore our range of high-quality manufactured products designed for various industries and applications.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600'
              }`}
              onClick={() => setSelectedCategory('all')}
            >
              All Products
            </button>
            <button 
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === 'aerospace' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600'
              }`}
              onClick={() => setSelectedCategory('aerospace')}
            >
              Aerospace
            </button>
            <button 
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === 'automation' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600'
              }`}
              onClick={() => setSelectedCategory('automation')}
            >
              Automation
            </button>
            <button 
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === 'medical' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600'
              }`}
              onClick={() => setSelectedCategory('medical')}
            >
              Medical
            </button>
            <button 
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === 'automotive' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600'
              }`}
              onClick={() => setSelectedCategory('automotive')}
            >
              Automotive
            </button>
            <button 
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === 'industrial' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600'
              }`}
              onClick={() => setSelectedCategory('industrial')}
            >
              Industrial
            </button>
            <button 
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === 'electronics' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600'
              }`}
              onClick={() => setSelectedCategory('electronics')}
            >
              Electronics
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <span className="inline-block px-3 py-1 bg-primary text-white text-xs rounded-full mb-2 capitalize">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-surface-600 dark:text-surface-400 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => toast.info(`Product specifications for ${product.name} are available upon request.`)}
                      className="text-primary hover:text-primary-dark font-medium flex items-center gap-1"
                    >
                      View Specifications
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-20 bg-surface-100 dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Manufacturing <span className="text-primary">Capabilities</span></h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
              Our state-of-the-art facility is equipped with advanced technology to meet your manufacturing needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-surface-700 p-6 rounded-xl shadow-neu-light dark:shadow-neu-dark"
              >
                <div className="mb-4">
                  {capability.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{capability.title}</h3>
                <p className="text-surface-600 dark:text-surface-400">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards Section */}
      <section id="quality" className="py-20">
        <div className="container mx-auto px-4">
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                alt="Quality control process"
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Quality <span className="text-primary">Standards</span></h2>
              <p className="text-surface-600 dark:text-surface-400 mb-6">
                At ManufacturePro, quality isn't just a goal – it's our standard operating procedure. 
                Our comprehensive quality management system ensures that every product we manufacture meets or exceeds our customers' expectations.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                    <CheckCircleIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">ISO 9001:2015 Certified</h3>
                    <p className="text-surface-600 dark:text-surface-400">
                      Our quality management system meets international standards for consistency and continuous improvement.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                    <CheckCircleIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Advanced Inspection Equipment</h3>
                    <p className="text-surface-600 dark:text-surface-400">
                      State-of-the-art CMM and vision systems for precise dimensional verification.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                    <CheckCircleIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Comprehensive Testing</h3>
                    <p className="text-surface-600 dark:text-surface-400">
                      Functional and environmental testing to ensure performance in real-world conditions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                    <CheckCircleIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Full Traceability</h3>
                    <p className="text-surface-600 dark:text-surface-400">
                      Complete material and process traceability for every component manufactured.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose <span className="text-secondary">Us</span></h2>
            <p className="text-white/80 max-w-3xl mx-auto">
              Our commitment to excellence sets us apart from the competition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <ZapIcon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Turnaround</h3>
              <p className="text-white/80">
                Efficient production processes and dedicated resources allow us to deliver your order on time, every time.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <BarChart2Icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
              <p className="text-white/80">
                Our efficient operations and strategic sourcing enable us to offer high-quality manufacturing at competitive prices.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <UserCheckIcon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Consultation</h3>
              <p className="text-white/80">
                Our engineering team collaborates with you to optimize designs for manufacturability and cost-effectiveness.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Feature section with the quote request form */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in <span className="text-primary">Touch</span></h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
              Request a quote for your manufacturing needs or contact us with any questions.
            </p>
          </div>

          <MainFeature />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-surface-100 dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client <span className="text-primary">Testimonials</span></h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-surface-700 p-6 rounded-xl shadow-card relative">
              <div className="absolute -top-5 -left-2 text-6xl text-primary opacity-20">"</div>
              <div className="relative z-10">
                <p className="text-surface-600 dark:text-surface-300 mb-4 italic">
                  "ManufacturePro consistently delivers high-quality components on time. Their engineering team provided valuable design suggestions that reduced our costs by 15%."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                    <span className="text-primary font-bold">JD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Aerospace Innovations Inc.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-surface-700 p-6 rounded-xl shadow-card relative">
              <div className="absolute -top-5 -left-2 text-6xl text-primary opacity-20">"</div>
              <div className="relative z-10">
                <p className="text-surface-600 dark:text-surface-300 mb-4 italic">
                  "Their attention to detail and quality control processes are exceptional. We've been working with ManufacturePro for over 5 years and have never had a quality issue."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                    <span className="text-primary font-bold">JS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Jane Smith</h4>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Medical Devices Corp.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-surface-700 p-6 rounded-xl shadow-card relative">
              <div className="absolute -top-5 -left-2 text-6xl text-primary opacity-20">"</div>
              <div className="relative z-10">
                <p className="text-surface-600 dark:text-surface-300 mb-4 italic">
                  "ManufacturePro's ability to quickly scale production helped us meet unexpected market demand. Their flexibility and responsiveness make them a valuable partner."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                    <span className="text-primary font-bold">RB</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Robert Brown</h4>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Automotive Systems Ltd.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;