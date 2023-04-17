import React, { useState } from "react";

const TicketForm = ({ ticket, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(ticket ? ticket.title : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title);
    setTitle("");
  };

  const handleCancel = () => {
    onCancel();
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">{ticket ? "Update" : "Create"}</button>
      {ticket && (
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default TicketForm;
