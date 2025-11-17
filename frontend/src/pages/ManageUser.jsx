import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
      }
    });
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
      }
    });

    loadUsers();
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader title="Manage Users" />

        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn-danger" onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </main>
    </div>
  );
}
