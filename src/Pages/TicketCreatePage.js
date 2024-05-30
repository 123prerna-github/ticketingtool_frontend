import React, { useState } from 'react';
import TicketForm from '../Components/Tickets/TicketForm';

const TicketCreatePage = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
        { id: 3, name: 'User 3' },
    ]);

    const handleCreateTicket = (newTicket) => {
        setTickets([...tickets, newTicket]);
    };

    return (
        <div>
            <h1>Create Ticket</h1>
            <TicketForm onCreateTicket={handleCreateTicket} users={users} />
            {/* <h2>Created Tickets</h2> */}
            <ul>
                {tickets.map((ticket, index) => (
                    <li key={index}>
                        Ticket Name: {ticket.name}, Description: {ticket.description}, Priority: {ticket.priority}, Assign To: {ticket.assignTo}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TicketCreatePage;
