import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/contacts');
      setContacts(response.data.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleContactAdded = () => {
    fetchContacts();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`http://localhost:5000/api/contacts/${id}`);
        setContacts(contacts.filter(contact => contact._id !== id));
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Failed to delete contact. Please try again.');
      }
    }
  };

  return (
    <div className="App">
      <ContactForm onContactAdded={handleContactAdded} />
      <ContactList contacts={contacts} loading={loading} onDelete={handleDelete} />
    </div>
  );
}

export default App;
