import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8080/api/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Employee Management System</h1>
        <p>Manage employees through our Spring Boot API</p>
      </header>

      <main>
        <h2>Employees</h2>

        {loading ? (
          <p>Loading employees...</p>
        ) : employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <div className="employee-list">
            {employees.map((employee) => (
              <div className="employee-card" key={employee.id}>
                <h3>
                  {employee.firstName} {employee.lastName}
                </h3>

                <p>Email: {employee.email}</p>
                <p>Department: {employee.department}</p>
                <p>ID: {employee.id}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;