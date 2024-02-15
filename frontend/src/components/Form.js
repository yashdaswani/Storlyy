import React, { useState } from "react";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, TextField } from "@mui/material";
import "./Form.css"; // Import CSS file
import { useNavigate } from "react-router-dom";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    dob: new Date(),
    email: "",
    phoneNumber: "",
  });
  const [ageError, setAgeError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
    setAgeError(""); // Reset age error on date change
  };

  const calculateAge = (dob) => {
    // Parse the dob string to a Date object
    const dobDate = new Date(dob);

    // Check if dobDate is a valid date
    if (isNaN(dobDate.getTime())) {
      return "Invalid Date";
    }

    const diff = Date.now() - dobDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const age = calculateAge(formData.dob);
    if (age < 18) {
      setAgeError("You must be at least 18 years old");
      return;
    }
    try {
      const response = await axios.post(
        "https://shortlyy.onrender.com/api/submit-form",
        formData
      );
      console.log(response.data.message);
      alert("Form submitted successfully");
      navigate("/submitted-forms");
    } catch (error) {
      console.error(error.response.data.message);
      alert("Failed to submit form");
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center", margin: "3rem" }}>Form</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs} className="date">
            <DatePicker label="Date of Birth" onChange={handleDateChange} />
          </LocalizationProvider>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            pattern="[0-9]{10}"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          {ageError && <span style={{ color: "red" }}>{ageError}</span>}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default Form;
