import React, { useState } from 'react';
import './TodoList.css';
import deleteicon from '../pictures/delete.png';
import editicon from '../pictures/edit.png';

const TodoList = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [gender, setGender] = useState('male');
  const [submittedRecords, setSubmittedRecords] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleSave = (index, updatedRecord) => {
    const updatedRecords = submittedRecords.map((record, i) =>
      i === index ? updatedRecord : record
    );
    setSubmittedRecords(updatedRecords);
    setEditIndex(-1);
  };

  const handleDelete = (index) => {
    const updatedRecords = submittedRecords.filter((record, i) => i !== index);
    setSubmittedRecords(updatedRecords);
  };

  const validateName = (value) => {
    if (!value.match(/^[a-zA-Z\s]*$/)) {
      setNameError('Name should only contain letters and spaces.');
    } else if (value.trim() === '') {
      setNameError('Name is required.');
    } else {
      setNameError('');
    }
  };

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.match(emailPattern)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const validatePhone = (value) => {
    const phonePattern = /^[0-9]{11}$/;
    if (!value.match(phonePattern)) {
      setPhoneError('Please enter a valid 11-digit phone number.');
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateName(name);
    validateEmail(email);
    validatePhone(phone);

    if (nameError || emailError || phoneError || !gender) {
    alert("Missing Values");
    }

    if (editIndex !== -1) {
      const updatedRecords = submittedRecords.map((record, index) =>
        index === editIndex ? { name, email, phone, gender } : record
      );
      setSubmittedRecords(updatedRecords);
      setEditIndex(-1);
    } else {
      const newRecord = { name, email:email.toLowerCase(), phone, gender };
      setSubmittedRecords([...submittedRecords, newRecord]);
      setName('');
      setEmail('');
      setPhone('');
      setGender('male'); 
    }
  };

  return (
    <div className="todo-list-container">
      <h1>To-do List</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className="input-field"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateName(e.target.value);
            }}
            required
          />
          {nameError && <p className="error-message">{nameError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="input-field"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            required
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            className="input-field"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              validatePhone(e.target.value);
            }}
            required
          />
          {phoneError && <p className="error-message">{phoneError}</p>}
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={(e) => setGender(e.target.value)}
            />{' '}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={(e) => setGender(e.target.value)}
            />{' '}
            Female
          </label>
        </div>
        <button type="submit" className="submit-button">
          {editIndex !== -1 ? 'Update' : 'Submit'}
        </button>
      </form>
      <div className="submitted-records">
        <h3>Submitted Records:</h3>
        {submittedRecords.map((record, index) => (
          <div key={index} className="record">
            <h4>Record {index + 1}:</h4>
            {editIndex === index ? (
              <div>
                <p>
                  Name: <input type="text" defaultValue={record.name} id={`name-${index}`} ref={(input) => input && input.focus()} />
                </p>
                <p>
                  Email: <input type="email" id={`email-${index}`} defaultValue={record.email} />
                </p>
                <p>
                  Phone Number: <input type="tel" id={`phone-${index}`} defaultValue={record.phone} />
                </p>
                <p>
                  Gender: {gender}
                </p>
                <button onClick={() => handleSave(index, {
                  name: document.querySelector(`#name-${index}`).value,
                  email: document.querySelector(`#email-${index}`).value,
                  phone: document.querySelector(`#phone-${index}`).value,
                  gender,
                })}>Save</button>
              </div>
            ) : (
              <div>
                <p>Name: {record.name}</p>
                <p>Email: {record.email}</p>
                <p>Phone Number: {record.phone}</p>
                <p>Gender: {record.gender}</p>
                <img
                  src={editicon}
                  alt="Edit"
                  onClick={() => handleEdit(index)}
                  className="edit-icon"
                />
                <img
                  src={deleteicon}
                  alt="Delete"
                  onClick={() => handleDelete(index)}
                  className="delete-icon"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
