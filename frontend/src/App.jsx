import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "/api/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    
    department: "",
  });

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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create employee");
      }

      const newEmployee = await response.json();

      setEmployees([...employees, newEmployee]);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      });
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Employee Management System</h1>
        <p>Manage employees through our Spring Boot API</p>
      </header>

      <main>
        <section>
          <h2>Add Employee</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              required
            />

            <button type="submit">Add Employee</button>
          </form>
        </section>

        <section>
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
        </section>
      </main>
    </div>
  );
}

export default App;
