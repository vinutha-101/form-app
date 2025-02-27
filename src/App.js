import React, { useState } from "react";
import Form from "./Form"; 
import "bootstrap/dist/css/bootstrap.min.css"; 

function App() {
  const [reload, setReload] = useState(false);

  const handleFormSubmit = () => {
    setReload(!reload); 
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">React Form with JSON Server</h1>
      <Form onSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;
