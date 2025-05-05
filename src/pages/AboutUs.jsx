import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import TimelineItem from '../components/TimelineItem';
import TeamMember from '../components/TeamMember';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState({});

  // Company history timeline data
  const timelineEvents = [
    {
      year: "2005",
      title: "Company Founded",
      description: "ManufacturePro was established with a focus on precision machining services for local industries."
    },
    {
      year: "2010",
      title: "Expansion to New Facility",
      description: "Moved to a larger 25,000 sq. ft. facility to accommodate growing demand for our services."
    },
    {
      year: "2014",
      title: "ISO 9001 Certification",
      description: "Achieved ISO 9001 certification, demonstrating our commitment to quality management systems."
    },
    {
      year: "2016",
      title: "Advanced Manufacturing Technologies",
      description: "Invested in 5-axis CNC machines and automated quality inspection systems."
    },
    {
      year: "2019",
      title: "Medical Device Manufacturing",
      description: "Expanded capabilities to include specialized manufacturing for the medical device industry."
    },
    {
      year: "2023",
      title: "International Expansion",
      description: "Began serving international clients and established a global supply chain network."
    }
  ];

  // Management team data
  const teamMembers = [
    {
      name: "Michael Chen",
      position: "Chief Executive Officer",
      bio: "With over 25 years in manufacturing, Michael has led ManufacturePro from a small shop to an industry leader. He holds an MBA from Stanford and a BS in Mechanical Engineering.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Sarah Johnson",
      position: "Chief Operations Officer",
      bio: "Sarah oversees all manufacturing operations and has implemented lean manufacturing principles that increased efficiency by 35%. She previously worked at Boeing and GE.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "David Rodriguez",
      position: "Director of Engineering",
      bio: "David leads our engineering team and has filed 12 patents for manufacturing processes. He specializes in design for manufacturability and advanced materials.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Jennifer Lee",
      position: "Quality Assurance Manager",
      bio: "Jennifer ensures our products meet the highest quality standards. She has implemented statistical process control methods that reduced defects by 75%.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    }
  ];

  // Company stats
  const companyStats = [
    {
      figure: "18+",
      label: "Years in Business"
    },
    {
      figure: "250+",
      label: "Team Members"
    },
    {
      figure: "1000+",
      label: "Projects Completed"
    },
    {
      figure: "40+",
      label: "Countries Served"
    }
  ];

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
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary/60">
          <img 
            src="https://images.unsplash.com/photo-1563205515-7a7273e38c9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Manufacturing machinery" 
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
              About <span className="text-secondary">Us</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/90"
            >
              Learn about our journey, mission, and the team that makes ManufacturePro an industry leader in precision manufacturing.
            </motion.p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-50 dark:from-surface-900 to-transparent"></div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <span className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.figure}</span>
                <span className="text-surface-600 dark:text-surface-400">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company History Section */}
      <section id="history" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our <span className="text-primary">History</span></h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
              From humble beginnings to industry leadership, discover the journey that shaped ManufacturePro into the company it is today.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line for timeline */}
            <div className="absolute left-[25px] md:left-1/2 top-0 bottom-0 w-1 bg-primary/20 ml-[-2px]"></div>
            
            <div className="flex flex-col gap-12">
              {timelineEvents.map((event, index) => (
                <TimelineItem 
                  key={index}
                  year={event.year}
                  title={event.title}
                  description={event.description}
                  isEven={index % 2 === 0}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section id="mission-vision" className="py-20 bg-surface-100 dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-surface-700 p-8 rounded-xl shadow-card"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-surface-600 dark:text-surface-300 mb-6">
                To deliver precision-engineered manufacturing solutions that exceed our customers' expectations through innovation, quality, and exceptional service. We aim to be the trusted partner for businesses seeking reliable manufacturing services.
              </p>
              <p className="text-surface-600 dark:text-surface-300">
                We are committed to continuous improvement in our processes, investing in our team members' development, and implementing sustainable manufacturing practices that benefit our community and environment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-surface-700 p-8 rounded-xl shadow-card"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-surface-600 dark:text-surface-300 mb-6">
                To be the global leader in precision manufacturing, recognized for our technical excellence, innovation, and commitment to quality. We envision a future where our manufacturing capabilities empower advances in industries that improve people's lives.
              </p>
              <p className="text-surface-600 dark:text-surface-300">
                By 2030, we aim to be carbon-neutral in our operations, to have expanded our global presence to serve clients on every continent, and to be recognized as one of the best places to work in the manufacturing industry.
              </p>
            </motion.div>
          </div>

          <div className="mt-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4">Our Core Values</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div className="bg-white dark:bg-surface-700 p-6 rounded-xl shadow-card">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Integrity</h4>
                  <p className="text-surface-600 dark:text-surface-400">
                    We uphold the highest standards of integrity in all our interactions.
                  </p>
                </div>

                <div className="bg-white dark:bg-surface-700 p-6 rounded-xl shadow-card">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="16 12 12 8 8 12"></polyline>
                      <line x1="12" y1="16" x2="12" y2="8"></line>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Excellence</h4>
                  <p className="text-surface-600 dark:text-surface-400">
                    We strive for excellence in everything we do.
                  </p>
                </div>

                <div className="bg-white dark:bg-surface-700 p-6 rounded-xl shadow-card">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <circle cx="18" cy="18" r="3"></circle>
                      <circle cx="6" cy="6" r="3"></circle>
                      <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
                      <line x1="6" y1="9" x2="6" y2="21"></line>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Innovation</h4>
                  <p className="text-surface-600 dark:text-surface-400">
                    We embrace innovation and creative solutions.
                  </p>
                </div>

                <div className="bg-white dark:bg-surface-700 p-6 rounded-xl shadow-card">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
                      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Collaboration</h4>
                  <p className="text-surface-600 dark:text-surface-400">
                    We believe in the power of teamwork and partnerships.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Management Team Section */}
      <section id="team" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our <span className="text-primary">Leadership Team</span></h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
              Meet the experienced professionals who drive our vision and ensure we deliver excellence in everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                position={member.position}
                bio={member.bio}
                image={member.image}
                delay={index * 0.1}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => toast.info("Join our team page is coming soon!")}
              className="btn btn-outline px-6 py-3"
            >
              Join Our Team
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Let's discuss how our manufacturing expertise can help bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#contact" className="btn bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg">
              Contact Us
            </a>
            <a href="#capabilities" className="btn bg-white/20 hover:bg-white/30 text-white px-8 py-3 text-lg">
              Explore Capabilities
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;