import React from 'react';
import './FormInput.css';

const FormTextArea = ({ 
  label, 
  id, 
  name, 
  value, 
  onChange, 
  placeholder, 
  error, 
  required = false,
  rows = 4 
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label} {required && <span className="required">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={error ? 'input-error' : ''}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default FormTextArea;
