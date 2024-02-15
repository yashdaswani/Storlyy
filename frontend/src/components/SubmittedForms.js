import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SubmittedForms.css"; // Import the CSS file

const SubmittedForms = () => {
  const [submittedForms, setSubmittedForms] = useState([]);

  useEffect(() => {
    fetchSubmittedForms();
  }, []);

  const fetchSubmittedForms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/submitted-forms"
      );
      setSubmittedForms(response.data);
    } catch (error) {
      console.error("Error fetching submitted forms:", error);
    }
  };

  return (
    <div className="table-container">
      <h2>All Submitted Forms</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {submittedForms.map((form, index) => (
            <tr key={index}>
              <td>{form.name}</td>
              <td>{form.dob}</td>
              <td>{form.email}</td>
              <td>{form.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmittedForms;
