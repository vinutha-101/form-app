import React, { useEffect, useState } from "react";

const Table = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/entries")
      .then((response) => response.json())
      .then((data) => setEntries(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const deleteEntry = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      fetch(`http://localhost:3001/entries/${id}`, { method: "DELETE" })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to delete entry.");
          return response.json();
        })
        .then(() => {
          alert("Entry deleted successfully!");
          setEntries(entries.filter((entry) => entry.id !== id)); 
        })
        .catch((error) => console.error("Error deleting entry:", error));
    }
  };

  return (
    <div className="container mt-5 p-4 bg-light shadow rounded">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Application List</h2>
        <a href="/form" className="btn btn-primary">+ Add New</a>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Class</th>
              <th>City</th>
              <th>Hobbies</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.name}</td>
                <td>{entry.age}</td>
                <td>{entry.select}</td>
                <td>{entry.city}</td>
                <td>{entry.hobbies}</td>
                <td>{entry.gender}</td>
                <td className="action-buttons">
                  <a href={`/edit/${entry.id}`} className="btn btn-sm btn-warning me-2">Edit</a>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteEntry(entry.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
