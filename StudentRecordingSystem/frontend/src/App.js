import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";
import studentImage from "./assets/student.jpg"; 

const App = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const addStudent = async (name, course) => {
    try {
      await axios.post("http://127.0.0.1:5000/api/students", { name, course });
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", backgroundColor: "#f0f8ff", padding: "20px" }}>
      <img
        src={studentImage}
        alt="Student"
        style={{ width: "200px", borderRadius: "10px", marginBottom: "20px" }}
      />
      <h1 style={{ color: "#004080" }}>Student Recording System</h1>
      <StudentForm addStudent={addStudent} />
      <StudentList students={students} />
    </div>
  );
};

export default App;
