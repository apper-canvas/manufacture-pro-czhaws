import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import { contactService } from '../services/ContactService';

const MainFeature = () => {
  // Get icons
  const MailIcon = getIcon('Mail');
  const PhoneIcon = getIcon('Phone');
  const UserIcon = getIcon('User');
  const BuildingIcon = getIcon('Building');
  const MessageSquareIcon = getIcon('MessageSquare');
  const SendIcon = getIcon('Send');
  const CheckCircleIcon = getIcon('CheckCircle');
  const ClipboardListIcon = getIcon('ClipboardList');
  const InfoIcon = getIcon('Info');
  const BoxesIcon = getIcon('Package');
  const CalendarIcon = getIcon('Calendar');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    requestType: 'quote',
    productInterest: [],
    message: '',
    deadline: ''
  });

  // UI state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Product interest options
  const productOptions = [
    { id: 'cnc-components', label: 'CNC Components' },
    { id: 'sheet-metal', label: 'Sheet Metal Fabrication' },
    { id: 'assemblies', label: 'Mechanical Assemblies' },
    { id: 'injection-molding', label: 'Injection Molding' },
    { id: 'electronics', label: 'Electronic Components' },
    { id: 'custom', label: 'Custom Manufacturing' }
  ];

  // Request type options
  const requestTypeOptions = [
    { id: 'quote', label: 'Request a Quote', icon: ClipboardListIcon },
    { id: 'info', label: 'Product Information', icon: InfoIcon },
    { id: 'support', label: 'Technical Support', icon: MessageSquareIcon }
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData({
        ...formData,
        productInterest: [...formData.productInterest, value]
      });
    } else {
      setFormData({
        ...formData,
        productInterest: formData.productInterest.filter(item => item !== value)
      });
    }
  };

  // Handle request type selection
  const handleRequestTypeChange = (type) => {
    setFormData({
      ...formData,
      requestType: type
    });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    // Validate step 1
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      
      if (!formData.company.trim()) {
        newErrors.company = 'Company name is required';
      }
      
      if (formData.phone && !/^[0-9+\-() ]{10,15}$/.test(formData.phone)) {
        newErrors.phone = 'Invalid phone number';
      }
    }
    
    // Validate step 2
    if (currentStep === 2) {
      if (formData.productInterest.length === 0) {
        newErrors.productInterest = 'Please select at least one product interest';
      }
      
      if (!formData.message.trim()) {
        newErrors.message = 'Please provide details about your request';
      } else if (formData.message.trim().length < 10) {
        newErrors.message = 'Message is too short. Please provide more details.';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNextStep = () => {
    if (validateForm()) {
      setCurrentStep(2);
      // Scroll to top of form
      document.getElementById('contact-form-container').scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit contact request to Apper backend
      await contactService.createContactRequest(formData);
      
      // Success
      setSubmitted(true);
      toast.success('Your request has been submitted successfully!');
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          requestType: 'quote',
          productInterest: [],
          message: '',
          deadline: ''
        });
        setSubmitted(false);
        setCurrentStep(1);
      }, 5000);
    } catch (error) {
      console.error("Error submitting contact request:", error);
      toast.error('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-form-container" className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Info panel */}
          <div className="md:col-span-2 bg-primary p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
            <p className="mb-8 text-white/80">
              Fill out the form and our team will get back to you within 24 hours.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/80">Phone</p>
                  <p className="font-medium">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MailIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/80">Email</p>
                  <p className="font-medium">info@manufacturepro.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <BuildingIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/80">Address</p>
                  <p className="font-medium">123 Manufacturing Way, Industrial Park, CA 90210</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h4 className="text-lg font-semibold mb-4">Request Types</h4>
              <div className="space-y-3">
                {requestTypeOptions.map(option => {
                  const IconComponent = option.icon;
                  return (
                    <div key={option.id} className="flex items-center gap-2">
                      <IconComponent className="w-5 h-5" />
                      <span>{option.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Form panel */}
          <div className="md:col-span-3 p-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircleIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Request Submitted!</h3>
                  <p className="text-surface-600 dark:text-surface-400 mb-6">
                    Thank you for contacting us. We'll get back to you shortly.
                  </p>
                  <div className="animate-pulse">
                    <CalendarIcon className="w-6 h-6 mx-auto text-primary" />
                    <p className="text-sm text-primary mt-2">Expected response time: 24 hours</p>
                  </div>
                </motion.div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">
                      {currentStep === 1 ? 'Contact Details' : 'Request Information'}
                    </h3>
                    <div className="flex gap-2">
                      <div className={`w-3 h-3 rounded-full ${currentStep === 1 ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'}`}></div>
                      <div className={`w-3 h-3 rounded-full ${currentStep === 2 ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'}`}></div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                      {currentStep === 1 ? (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                        >
                          <div className="mb-6">
                            <label htmlFor="requestType" className="block text-sm font-medium mb-2">Request Type</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {requestTypeOptions.map(option => {
                                const IconComponent = option.icon;
                                return (
                                  <div
                                    key={option.id}
                                    onClick={() => handleRequestTypeChange(option.id)}
                                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                                      formData.requestType === option.id 
                                        ? 'border-primary bg-primary/5 dark:bg-primary/20' 
                                        : 'border-surface-300 dark:border-surface-600 hover:border-primary'
                                    }`}
                                  >
                                    <div className="flex flex-col items-center text-center gap-2">
                                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        formData.requestType === option.id 
                                          ? 'bg-primary/20 text-primary' 
                                          : 'bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                                      }`}>
                                        <IconComponent className="w-5 h-5" />
                                      </div>
                                      <span className="text-sm font-medium">{option.label}</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name *</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon className="w-5 h-5 text-surface-500" />
                              </div>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`pl-10 w-full ${errors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                                placeholder="John Doe"
                              />
                            </div>
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address *</label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <MailIcon className="w-5 h-5 text-surface-500" />
                                </div>
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  className={`pl-10 w-full ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                                  placeholder="john@company.com"
                                />
                              </div>
                              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            
                            <div>
                              <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <PhoneIcon className="w-5 h-5 text-surface-500" />
                                </div>
                                <input
                                  type="tel"
                                  id="phone"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  className={`pl-10 w-full ${errors.phone ? 'border-red-500 dark:border-red-500' : ''}`}
                                  placeholder="(555) 123-4567"
                                />
                              </div>
                              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <label htmlFor="company" className="block text-sm font-medium mb-2">Company Name *</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <BuildingIcon className="w-5 h-5 text-surface-500" />
                              </div>
                              <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className={`pl-10 w-full ${errors.company ? 'border-red-500 dark:border-red-500' : ''}`}
                                placeholder="Your Company"
                              />
                            </div>
                            {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                          </div>
                          
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={handleNextStep}
                              className="btn btn-primary px-6 py-2"
                            >
                              Next Step
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                        >
                          <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Product Interests *</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {productOptions.map(product => (
                                <div key={product.id} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={product.id}
                                    name="productInterest"
                                    value={product.id}
                                    checked={formData.productInterest.includes(product.id)}
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 text-primary focus:ring-primary"
                                  />
                                  <label htmlFor={product.id} className="ml-2 text-sm">
                                    {product.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                            {errors.productInterest && (
                              <p className="text-red-500 text-sm mt-1">{errors.productInterest}</p>
                            )}
                          </div>
                          
                          <div className="mb-6">
                            <label htmlFor="deadline" className="block text-sm font-medium mb-2">Project Deadline</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <CalendarIcon className="w-5 h-5 text-surface-500" />
                              </div>
                              <input
                                type="date"
                                id="deadline"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                                className="pl-10 w-full"
                              />
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <label htmlFor="message" className="block text-sm font-medium mb-2">Message *</label>
                            <div className="relative">
                              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                                <MessageSquareIcon className="w-5 h-5 text-surface-500" />
                              </div>
                              <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                className={`pl-10 w-full ${errors.message ? 'border-red-500 dark:border-red-500' : ''}`}
                                placeholder="Please provide details about your project or request..."
                              ></textarea>
                            </div>
                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                          </div>
                          
                          <div className="flex justify-between">
                            <button
                              type="button"
                              onClick={handlePrevStep}
                              className="btn border border-surface-300 dark:border-surface-600 hover:bg-surface-200 dark:hover:bg-surface-700 px-6 py-2"
                            >
                              Back
                            </button>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="btn btn-primary px-6 py-2 flex items-center gap-2"
                            >
                              {isSubmitting ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Submitting...
                                </>
                              ) : (
                                <>
                                  Submit Request
                                  <SendIcon className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFeature;