import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { contactService } from '../services/ContactService';

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentRequests, setRecentRequests] = useState([]);
  const user = useSelector((state) => state.user.user);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch contact requests for statistics
        const response = await contactService.getContactRequests({
          pagingInfo: { limit: 100 }
        });
        
        if (response && response.data) {
          const requests = response.data;
          
          // Calculate stats
          const newCount = requests.filter(req => req.status === 'new').length;
          const inProgressCount = requests.filter(req => req.status === 'in-progress').length;
          const completedCount = requests.filter(req => req.status === 'completed').length;
          const cancelledCount = requests.filter(req => req.status === 'cancelled').length;
          
          setStats({
            total: requests.length,
            new: newCount,
            inProgress: inProgressCount,
            completed: completedCount,
            cancelled: cancelledCount
          });
          
          // Get 5 most recent requests
          const sortedRequests = [...requests].sort((a, b) => 
            new Date(b.CreatedOn) - new Date(a.CreatedOn)
          );
          setRecentRequests(sortedRequests.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.firstName || 'User'}</h1>
        <p className="text-surface-600 dark:text-surface-400">
          Here's an overview of your contact requests and activities.
        </p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-surface-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-surface-500 dark:text-surface-400">Total Requests</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.total}</h3>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2"></path>
                    <path d="M19 15V8a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v7"></path>
                    <path d="M3 15h18"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-surface-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-surface-500 dark:text-surface-400">New Requests</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.new}</h3>
                </div>
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-surface-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-surface-500 dark:text-surface-400">In Progress</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.inProgress}</h3>
                </div>
                <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-surface-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-surface-500 dark:text-surface-400">Completed</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.completed}</h3>
                </div>
                <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Requests */}
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Recent Contact Requests</h3>
              <Link to="/contact-requests" className="text-primary hover:text-primary-dark text-sm font-medium">
                View All
              </Link>
            </div>
            
            {recentRequests.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Company</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Request Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                    {recentRequests.map((request) => (
                      <tr key={request.Id} className="hover:bg-surface-50 dark:hover:bg-surface-700/50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="font-medium">{request.Name}</div>
                          <div className="text-sm text-surface-500 dark:text-surface-400">{request.email}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {request.company}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            request.request_type === 'quote' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                            request.request_type === 'info' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                            'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                          }`}>
                            {request.request_type === 'quote' ? 'Quote' : 
                             request.request_type === 'info' ? 'Information' : 'Support'}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            request.status === 'new' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                            request.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                            request.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          }`}>
                            {request.status === 'new' ? 'New' : 
                             request.status === 'in-progress' ? 'In Progress' :
                             request.status === 'completed' ? 'Completed' : 'Cancelled'}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          {new Date(request.CreatedOn).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-surface-500 dark:text-surface-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-surface-400 dark:text-surface-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
                <p>No contact requests found.</p>
                <p className="mt-2 text-sm">When customers submit contact requests, they'll appear here.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;