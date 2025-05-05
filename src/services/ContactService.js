class ContactService {
  constructor() {
    this.tableName = 'contact_request1';
  }

  // Initialize ApperClient
  getClient() {
    const { ApperClient } = window.ApperSDK;
    return new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }

  // Create a new contact request
  async createContactRequest(formData) {
    try {
      const apperClient = this.getClient();
      
      // Map form data to match table fields
      const record = {
        Name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        request_type: formData.requestType,
        product_interest: formData.productInterest.join(','), // Convert array to comma-separated string
        message: formData.message,
        deadline: formData.deadline,
        status: 'new' // Default status for new requests
      };
      
      const params = {
        records: [record]
      };
      
      const response = await apperClient.createRecord(this.tableName, params);
      
      if (response && response.success && response.results && response.results.length > 0) {
        return response.results[0].data;
      } else {
        throw new Error('Failed to create contact request');
      }
    } catch (error) {
      console.error("Error creating contact request:", error);
      throw error;
    }
  }

  // Get contact requests with optional filtering and pagination
  async getContactRequests(params = {}) {
    try {
      const apperClient = this.getClient();
      
      // Default fields to fetch
      const fields = [
        'Id', 'Name', 'email', 'company', 'phone', 'request_type',
        'product_interest', 'message', 'deadline', 'status', 'CreatedOn'
      ];
      
      // Merge with any provided params
      const requestParams = {
        fields,
        orderBy: [{ field: "CreatedOn", direction: "desc" }],
        ...params
      };
      
      const response = await apperClient.fetchRecords(this.tableName, requestParams);
      return response;
    } catch (error) {
      console.error("Error fetching contact requests:", error);
      throw error;
    }
  }

  // Get a single contact request by ID
  async getContactRequestById(requestId) {
    try {
      const apperClient = this.getClient();
      
      const fields = [
        'Id', 'Name', 'email', 'company', 'phone', 'request_type',
        'product_interest', 'message', 'deadline', 'status', 'CreatedOn'
      ];
      
      const params = { fields };
      
      const response = await apperClient.getRecordById(this.tableName, requestId, params);
      return response.data;
    } catch (error) {
      console.error(`Error fetching contact request with ID ${requestId}:`, error);
      throw error;
    }
  }

  // Update a contact request
  async updateContactRequest(requestId, updateData) {
    try {
      const apperClient = this.getClient();
      
      const params = {
        records: [{
          Id: requestId,
          ...updateData
        }]
      };
      
      const response = await apperClient.updateRecord(this.tableName, params);
      
      if (response && response.success && response.results && response.results.length > 0) {
        return response.results[0].data;
      } else {
        throw new Error('Failed to update contact request');
      }
    } catch (error) {
      console.error(`Error updating contact request with ID ${requestId}:`, error);
      throw error;
    }
  }

  // Delete a contact request
  async deleteContactRequest(requestId) {
    try {
      const apperClient = this.getClient();
      
      const params = {
        RecordIds: [requestId]
      };
      
      const response = await apperClient.deleteRecord(this.tableName, params);
      
      if (response && response.success) {
        return true;
      } else {
        throw new Error('Failed to delete contact request');
      }
    } catch (error) {
      console.error(`Error deleting contact request with ID ${requestId}:`, error);
      throw error;
    }
  }
}

export const contactService = new ContactService();