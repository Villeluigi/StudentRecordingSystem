import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import './App.css';

const App = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get("http://localhost:5000/api/students");
    setStudents(response.data);
  };

  const addStudent = async (formData) => {
    await axios.post("http://localhost:5000/api/students", formData);
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    fetchStudents();
  };

  return (
    <div className="app-container">
  <div className="logo-box">
    <img src="/JW.gif" alt="Logo" style={{ width: "150px", marginBottom: "10px" }} />
    <h1>Student Recording System</h1>
  </div>

  <StudentForm addStudent={addStudent} />
  <StudentList students={students} deleteStudent={deleteStudent} />
</div>

  );
  
};

export default App;
