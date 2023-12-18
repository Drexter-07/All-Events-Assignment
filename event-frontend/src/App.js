import "./App.css";
import Header from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AddEvent from "./Components/AddEvent";

import Protected from "./Components/Protected";
import EventList from "./Components/EventList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <Routes>
          {/* <Route path="/" element={<Register />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<Protected Cmp={AddEvent} />} />

          <Route path="/" element={<Protected Cmp={EventList} />} />
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
