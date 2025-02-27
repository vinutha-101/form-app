import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Table from "./Table";
import Form from "./Form";
import Edit from "./Edit"; 

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/form" element={<Form />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
