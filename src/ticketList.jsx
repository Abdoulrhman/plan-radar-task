import React, { useState, useRef, useEffect } from "react";
import TicketForm from "./ticketForm";
import TicketItem from "./ticketItem";

// Mock data for tickets
const mockTickets = Array.from({ length: 10000 }, (_, index) => ({
  id: index + 1,
  title: `Ticket ${index + 1}`,
}));

const TicketList = () => {
  const [tickets, setTickets] = useState(mockTickets);
  const [editingTicket, setEditingTicket] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);
  const [containerHeight, setContainerHeight] = useState(700);
  const [rowHeight, setRowHeight] = useState(70);
  const containerRef = useRef(null);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const scrollTop = container.scrollTop;
      const startIndex = Math.floor(scrollTop / rowHeight);
      const endIndex = Math.min(
        startIndex + Math.ceil(containerHeight / rowHeight),
        tickets.length
      );
      setStartIndex(startIndex);
      setEndIndex(endIndex);
    }
  };

  const handleCreateTicket = (title) => {
    const newTicket = {
      id: tickets.length + 1,
      title: title,
    };
    setTickets([...tickets, newTicket]);
  };

  const handleEditTicket = (ticketId, title) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, title } : ticket
      )
    );
    setEditingTicket(null);
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, overflowY: "auto" }}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: rowHeight * tickets.length,
          paddingTop: rowHeight * startIndex,
          paddingBottom: rowHeight * (tickets.length - endIndex),
        }}
      >
        {tickets.slice(startIndex, endIndex).map((ticket) => (
          <div key={ticket.id} style={{ height: rowHeight, display: "flex" }}>
            {/* Render ticket data */}
            {editingTicket === ticket.id ? (
              <TicketForm
                ticket={ticket}
                onSubmit={(title) => handleEditTicket(ticket.id, title)}
                onCancel={() => setEditingTicket(null)}
              />
            ) : (
              <TicketItem
                ticket={ticket}
                onEdit={() => setEditingTicket(ticket.id)}
              />
            )}
          </div>
        ))}
      </div>

      <TicketForm onSubmit={handleCreateTicket} />
    </div>
  );
};

export default TicketList;
