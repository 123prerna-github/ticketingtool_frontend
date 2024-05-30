import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Categories = ({ onSelectCategory, onCreateTicket }) => {
  const [categories, setCategories] = useState([]);
  const [newLabel, setNewLabel] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
     // try {
        const response = await fetch("http://localhost:3000/viewlabel");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setCategories(data.labels);
    };
    
    fetchCategories();
  }, []);

  const handleAddNewLabel = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    setNewLabel(e.target.value);
  };

  const handleConfirmLabel = () => {
    if (newLabel.trim() !== '') {
      fetch("http://localhost:3000/createlabel", {
        method: "POST",
        body: JSON.stringify({ name: newLabel }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategories(prevCategories => [...prevCategories, { name: newLabel }]);
          setNewLabel('');
          setShowInput(false);
        }
      })
      .catch((error) => {
        console.error('Error creating label:', error);
        alert('Error in creating a label: ' + error.message);
      });
    }
  };

  return (
    <div className="categories-sidebar">
      <h2>Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} onClick={() => onSelectCategory(category.name)}>
            {category.name}
          </li>
        ))}
      </ul>
      <div>
        {/* <link to="#" onClick={handleAddNewLabel} className="add-label-link">ADD A NEW LABEL</link> */}
        <div className='new-label'>
        <button onClick={handleAddNewLabel}>Add Label</button>
</div>
        {showInput && (
          <div className='new-label'>
            <input
              type="text"
              value={newLabel}
              onChange={handleInputChange}
              placeholder="Enter new label"
            />
            <button onClick={handleConfirmLabel}>Confirm</button>
          </div>
        )}
        <p onClick={onCreateTicket}><Link to="/create-ticket" style={{ color: 'black' }}>CREATE A TICKET HERE</Link></p>
      </div>
    </div>
  );
};

export default Categories;
