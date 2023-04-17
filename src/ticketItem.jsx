import React from "react";

const TicketItem = ({ ticket, onEdit }) => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 10px",
      }}
    >
      <p>{ticket.title}</p>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
};

export default TicketItem;
