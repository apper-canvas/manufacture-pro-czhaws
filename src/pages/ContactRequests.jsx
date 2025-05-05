import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { contactService } from '../services/ContactService';

function ContactRequests() {
  const [contactRequests, setContactRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  
  const fetchContactRequests = async (page = 1, status = 'all') => {
    try {
      setLoading(true);
      const params = {
        pagingInfo: { 
          limit: pageSize, 
          offset: (page - 1) * pageSize 
        }
      };
      
      // Add status filter if not 'all'
      if (status !== 'all') {
        params.where = [
          { field: "status", operator: "equals", value: status }
        ];
      }
      
      const response = await contactService.getContactRequests(params);
      
      if (response && response.data) {
        setContactRequests(response.data);
        
        // Calculate total pages based on total records
        const totalRecords = response.total || response.data.length;
        setTotalPages(Math.ceil(totalRecords / pageSize));
      } else {
        setContactRequests([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching contact requests:", error);
      toast.error("Failed to load contact requests");
      setContactRequests([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchContactRequests(currentPage, statusFilter);
  }, [currentPage, statusFilter, pageSize]);
  
  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await contactService.updateContactRequest(requestId, { status: newStatus });
      
      // Update the local state
      setContactRequests(prevRequests => 
        prevRequests.map(req => 
          req.Id === requestId ? { ...req, status: newStatus } : req
        )
      );
      
      toast.success(`Request status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating contact request:", error);
      toast.error("Failed to update request status");
    }
  };
  
  const handleDelete = async (requestId) => {
    if (window.confirm("Are you sure you want to delete this contact request?")) {
      try {
        await contactService.deleteContactRequest(requestId);
        
        // Remove from local state
        setContactRequests(prevRequests => 
          prevRequests.filter(req => req.Id !== requestId)
        );
        
        toast.success("Contact request deleted successfully");
      } catch (error) {
        console.error("Error deleting contact request:", error);
        toast.error("Failed to delete contact request");
      }
    }
  };
  
  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const renderStatusBadge = (status) => {
    let badgeClass = '';
    
    switch (status) {
      case 'new':
        badgeClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
        break;
      case 'in-progress':
        badgeClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
        break;
      case 'completed':
        badgeClass = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
        break;
      case 'cancelled':
        badgeClass = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
        break;
      default:
        badgeClass = 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${badgeClass}`}>
        {status === 'in-progress' ? 'In Progress' :
         status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Contact Requests</h1>
          <p className="text-surface-600 dark:text-surface-400">
            Manage and respond to customer inquiries and quote requests.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <select 
            value={statusFilter}
            onChange={handleFilterChange}
            className="rounded-lg border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-800"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : contactRequests.length > 0 ? (
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
              <thead className="bg-surface-50 dark:bg-surface-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Request Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                {contactRequests.map((request) => (
                  <tr key={request.Id} className="hover:bg-surface-50 dark:hover:bg-surface-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{request.Name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {request.company}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{request.email}</div>
                      {request.phone && (
                        <div className="text-sm text-surface-500 dark:text-surface-400">{request.phone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        request.request_type === 'quote' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                        request.request_type === 'info' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                      }`}>
                        {request.request_type === 'quote' ? 'Quote' : 
                         request.request_type === 'info' ? 'Information' : 'Support'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={request.status}
                        onChange={(e) => handleStatusChange(request.Id, e.target.value)}
                        className="text-sm rounded border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-800"
                      >
                        <option value="new">New</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(request.CreatedOn).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => handleDelete(request.Id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 flex items-center justify-between border-t border-surface-200 dark:border-surface-700">
              <div>
                <p className="text-sm text-surface-700 dark:text-surface-400">
                  Showing page {currentPage} of {totalPages}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currentPage === 1
                      ? 'bg-surface-100 text-surface-400 dark:bg-surface-800 dark:text-surface-600 cursor-not-allowed'
                      : 'bg-surface-200 text-surface-700 hover:bg-surface-300 dark:bg-surface-700 dark:text-surface-300 dark:hover:bg-surface-600'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currentPage === totalPages
                      ? 'bg-surface-100 text-surface-400 dark:bg-surface-800 dark:text-surface-600 cursor-not-allowed'
                      : 'bg-surface-200 text-surface-700 hover:bg-surface-300 dark:bg-surface-700 dark:text-surface-300 dark:hover:bg-surface-600'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-md p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-surface-400 dark:text-surface-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="9" x2="15" y2="15"></line>
            <line x1="15" y1="9" x2="9" y2="15"></line>
          </svg>
          <h3 className="text-xl font-bold mb-2">No Requests Found</h3>
          <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto">
            {statusFilter !== 'all' 
              ? `No contact requests with status "${statusFilter}" were found.` 
              : "There are no contact requests in the system yet."}
          </p>
          {statusFilter !== 'all' && (
            <button
              onClick={() => setStatusFilter('all')}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
            >
              Show All Requests
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ContactRequests;