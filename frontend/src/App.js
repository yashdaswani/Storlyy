import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SubmittedForms from "./components/SubmittedForms";
import Form from "./components/Form";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Form />} />
        <Route exact path="/submitted-forms" element={<SubmittedForms />} />
      </Routes>
    </Router>
  );
}

export default App;
