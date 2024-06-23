import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Link, useNavigate } from 'react-router-dom';

const Categories = ({ onSelectCategory, onCreateTicket }) => {
  const [categories, setCategories] = useState([]);
  const [newLabel, setNewLabel] = useState('');
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate()

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
      <h2
        style={{
          fontSize: "20px",
          textAlign: "left",
          padding: "10px 10px 0px 10px",
        }}
      >
        Categories
      </h2>
      <hr></hr>
      <ul style={{ textAlign: "left" }}>
        {categories.map((category, index) => (
          <li key={index} onClick={() => onSelectCategory(category.name)}>
            {category.name}
          </li>
        ))}
      </ul>
      <div>
        <div className="new-label">
          <button onClick={handleAddNewLabel} className='btn1'>Add New Label</button>
        </div>
        {showInput && (
          <div className="new-label">
            <input
            style={{margin :"0px 0px 10px 0px"}}
              type="text"
              value={newLabel}
              onChange={handleInputChange}
              placeholder="Enter new label"
            />
            <button onClick={handleConfirmLabel}>Confirm</button>
          </div>
        )}
        <hr style={{marginTop:"20px"}}></hr>
        <div className="new-label">
          <button onClick={()=>{navigate('/create-ticket')}} className='btn1' style={{border:"2px dotted black"}}>
            Create a Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
