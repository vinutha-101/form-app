import React, { useState } from "react";

const Form = ({ onSubmit }) => {

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    select: "",
    city: "",
    hobbies: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.age || !formData.select || !formData.city || !formData.hobbies || !formData.gender) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save entry.");
      }

      alert("Entry saved successfully!");

      window.location.href = "/";
    } catch (error) {
      console.error("Error saving entry:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-5 p-4 bg-light shadow rounded">
      <h2 className="text-center mb-4">Application Form</h2>
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
          <button type="button" className="btn btn-secondary" onClick={() => window.location.href = "/"}>Cancel</button>
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
