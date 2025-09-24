
// API Configuration
const API_URL = 'http://localhost:8080/api/v1/';

// API Functions
export const insertContact = async (contact) => {
  try {
    const response = await fetch(API_URL + 'create-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    if (!response.ok) {
      throw new Error("Failed to Insert Contacts");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error Inserting Contacts:", error.message);
    return { error: 'Unable to insert contacts. Please try again later.' };
  }
};

export const getContacts = async () => {
  try {
    const response = await fetch(API_URL + 'get-All', {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    return { error: 'Unable to fetch contacts. Please try again later.' };
  }
};

export const updateContact = async (data) => {
  try {
    const response = await fetch(API_URL + `update-contact/${data.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to Update Contact");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error Updating Contacts:", error.message);
    return { error: 'Unable to Update contacts. Please try again later.' };
  }
};

export const deleteContact = async (id) => {
  try {
    const response = await fetch(API_URL + `delete/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to Delete Contact");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error Deleting Contact:", error.message);
    return { error: 'Unable to delete contact. Please try again later.' };
  }
};