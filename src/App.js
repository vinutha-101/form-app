import React, { useState } from "react";
import Form from "./Form"; // Import the Form component
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

function App() {
  const [reload, setReload] = useState(false);

  // Function to refresh the page after form submission
  const handleFormSubmit = () => {
    setReload(!reload); // Triggers a re-render
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">React Form with JSON Server</h1>
      <Form onSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;
