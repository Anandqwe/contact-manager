import React from 'react';
import './ContactList.css';

const ContactList = ({ contacts, loading, onDelete }) => {
  if (loading) {
    return <div className="contact-list-loading">Loading contacts...</div>;
  }

  if (contacts.length === 0) {
    return <div className="contact-list-empty">No contacts yet. Submit one above!</div>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="contact-list-container">
      <h2>Contact Submissions</h2>
      <div className="table-wrapper">
        <table className="contact-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td data-label="Name">{contact.name}</td>
                <td data-label="Email">{contact.email}</td>
                <td data-label="Phone">{contact.phone}</td>
                <td data-label="Message">{contact.message || '-'}</td>
                <td data-label="Date">{formatDate(contact.createdAt)}</td>
                <td data-label="Actions">
                  <button 
                    className="delete-btn"
                    onClick={() => onDelete(contact._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;
