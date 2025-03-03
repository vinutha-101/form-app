import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState(null); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    console.log("Fetching entry with ID:", id); 

    fetch(`http://localhost:3001/entries/${id}`)
      .then((response) => {
        console.log("Response status:", response.status); 
        if (!response.ok) {
          throw new Error("Entry not found.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data); 
        setFormData(data);
      })
      .catch((error) => {
        console.error("Error fetching entry:", error);
        setError(error.message);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Submitting update for ID:", id); 
  
      const response = await fetch(`http://localhost:3001/entries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      console.log("Response Status:", response.status); 
  
      if (!response.ok) throw new Error("Failed to update entry.");
  
      alert("Entry updated successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Error updating entry:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  if (error) {
    return (
      <div className="text-center mt-5">
        <h3 className="text-danger">{error}</h3>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  if (!formData) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5 p-4 bg-light shadow rounded">
      <h2 className="text-center mb-4">Edit Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Age</label>
            <input type="number" className="form-control" name="age" value={formData.age} onChange={handleChange} required />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Class</label>
            <select className="form-select" name="select" value={formData.select} onChange={handleChange} required>
              <option value="">Select your class</option>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
              <option value="BCom">BCom</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">City</label>
            <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Hobbies</label>
            <input type="text" className="form-control" name="hobbies" value={formData.hobbies} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Gender</label>
            <div className="d-flex">
              <div className="form-check me-3">
                <input className="form-check-input" type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} required />
                <label className="form-check-label">Male</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} />
                <label className="form-check-label">Female</label>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>Cancel</button>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
