import React, { useState, useEffect } from 'react';
import Categories from '../Components/Sidebar/Categories';
import Filter from '../Components/Sidebar/FilterTickets';
import Ticket from '../Components/Tickets/Ticket';
import Filtered from '../Components/Tickets/Filtered';
import { Navigate, useNavigate } from 'react-router-dom';
import user_icon from '../Pages/user.png';

const TicketingPage = ({ filteredTickets, onFilter }) => {
  const [tickets, setTickets] = useState([]);
  const [userName, setUserName] = useState({}); // State to store the user's name
  const [filters, setFilters] = useState({
    assignedTo: '',
    dateRange: '',
    priority: '',
  }); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!filteredTickets || filteredTickets.length === 0) {
      fetchAllTickets();
    }
    fetchUserName(); // Fetch the user's name when the component mounts
  }, [filteredTickets]);

  const fetchAllTickets = async () => {
    try {
      const response = await fetch("http://localhost:3000/viewalltickets");
      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }
      const data = await response.json();
      setTickets(data.data); // Assuming the data contains an array of tickets
    } catch (error) {
      console.error("Error fetching tickets:", error);
      // Handle error
    }
  };

  const fetchUserName = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const response = await fetch("http://localhost:3000/view1", {
        method: 'GET',
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server responded with an error:", errorData);
        throw new Error(`Failed to fetch user name: ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      setUserName(data.data); // Assuming data contains user information
    } catch (error) {
      console.error("Error fetching user name:", error);
      // Handle error
    }
  };

  const handleSelectCategory = (category) => {
    console.log('Selected category:', category);
  };

  const handleAddNewLabel = () => {
    console.log('Add new label clicked');
  };

  const handleCreateTicket = (newTicket) => {
    // Handle new ticket creation logic
  };

  const handleFilter = (filterCriteria) => {
    onFilter(filterCriteria);
  };

  const handleLogout = () => {
    // Redirect to the login page
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="ticketing-page">
      <header className="user-header">
        <div className="user-box">
          <img className='image' src={user_icon} alt="User" />
          <h5> {`${userName.firstName} ${userName.lastName}`}</h5>
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>
      <div className="main-content">
        <div className="sidebar">
          <div className="left-bar">
            <Categories
              onSelectCategory={handleSelectCategory}
              onAddNewLabel={handleAddNewLabel}
              onCreateTicket={handleCreateTicket}
            />
            <Filter onFilter={handleFilter} />
          </div>
        </div>
        <div className="content">
          {filteredTickets && filteredTickets.length > 0 ? (
            <Filtered tickets={filteredTickets} />
          ) : (
            <Ticket tickets={tickets} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketingPage;
