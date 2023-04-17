import { useState } from "react";

import TicketList from "./ticketList";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <TicketList />
    </div>
  );
}

export default App;
