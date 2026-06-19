import { useEffect, useMemo, useState } from "react";
import addIcon from "../assets/add.png";
import searchIcon from "../assets/search.png";
import userIcon from "../assets/user.png";
import a1 from "../assets/a1.jpeg";
import pencilIcon from "../assets/pencil (1).png";
import binIcon from "../assets/bin.png";
import showIcon from "../assets/show.png";
import CreateUserForm from "./CreateUserForm";
const Users = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewUser, setViewUser] = useState(null);
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers(users.filter((u) => u.id !== id));
      } else {
        alert("Failed to delete user");
      }
    } catch (err) {
      console.log(err);
      alert("Error deleting user");
    }
  };
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("http://localhost:5000/api/users");

      if (!response.ok) {
        throw new Error("Users API failed");
      }
      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error(err);
      setError("Users load nahi ho paaye. Backend start karo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const userStats = useMemo(() => {
    const total = users.length;
    const active = users.filter((user) => user.status === "Active").length;
    const pending = users.filter((user) => user.status === "Pending").length;
    const blocked = users.filter((user) => user.status === "Blocked").length;

    return { total, active, pending, blocked };
  }, [users]);

  const progress = (value) => {
    if (!userStats.total) {
      return "0%";
    }
    return `${Math.round((value / userStats.total) * 100)}%`;
  };

  const cards = [
    {
      title: "Total Users",
      value: userStats.total.toString().padStart(2, "0"),
      progress: "100%",
    },
    {
      title: "Active Users",
      value: userStats.active.toString().padStart(2, "0"),
      progress: progress(userStats.active),
    },
    {
      title: "Pending Users",
      value: userStats.pending.toString().padStart(2, "0"),
      progress: progress(userStats.pending),
    },
    {
      title: "Blocked Users",
      value: userStats.blocked.toString().padStart(2, "0"),
      progress: progress(userStats.blocked),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f5ef] p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#5c4033]">User Management</h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">Manage all users and organization members</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
          <div className="bg-white border border-[#ececec] rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm w-full sm:w-[320px]">
            <img src={searchIcon} alt="" className="w-4 h-4 opacity-70" />
            <input type="text" placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent outline-none w-full text-sm" />
          </div>
          <button onClick={() => { setEditingUser(null); setShowForm(true); }}
            className="flex items-center gap-3 bg-[#6f4e37] text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300">
            <img src={addIcon} alt="" className="w-4 h-4 brightness-0 invert" />
            <span className="font-semibold text-sm">Insert User</span>
          </button>
        </div>
      </div>
      {!showForm && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-10 mb-8">
          {cards.map((card, index) => (
            <div key={index} className="relative overflow-hidden rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer border border-white/20">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#f3d3b5,#b78457,#6f4e37)]"></div>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className="text-xs tracking-[2px] text-white/80 font-semibold uppercase">{card.title}</p>
                  <h2 className="text-3xl font-bold text-white mt-4 leading-none">{card.value}</h2>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/90 flex items-center justify-center shadow-lg">
                  <img src={userIcon} alt="" className="w-7 h-7" />
                </div>
              </div>
              <div className="mt-6 relative z-10">
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: card.progress }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showForm && (
        <div className="mb-8">
          <CreateUserForm setShowForm={setShowForm} onUserCreated={loadUsers} editUser={editingUser} />
        </div>
      )}
      {!showForm && (
        <div className="bg-white rounded-[30px] border border-[#ececec] shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b border-[#f2f2f2]">
            <div>
              <h2 className="text-2xl font-bold text-[#5c4033]">User Records</h2>
              <p className="text-sm text-gray-500 mt-1">Complete list of registered users</p>
            </div>
            <button className="bg-[#8b5e3c] hover:bg-[#73492b] text-white px-5 py-3 rounded-2xl font-semibold text-sm transition-all">
              Export Data
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-[#f4ebe4]">
                <tr>
                  <th className="text-left p-5 text-[#5c4033] font-semibold">ID</th>
                  <th className="text-left p-5 text-[#5c4033] font-semibold">User Name</th>
                  <th className="text-left p-5 text-[#5c4033] font-semibold">Email Address</th>
                  <th className="text-left p-5 text-[#5c4033] font-semibold">Phone Number</th>
                  <th className="text-left p-5 text-[#5c4033] font-semibold">Gender</th>
                  <th className="text-left p-5 text-[#5c4033] font-semibold">Date of Birth</th>
                  <th className="text-left p-5 text-[#5c4033] font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500">Users load ho rahe hain...</td>
                  </tr>
                )}
                {!loading && error && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-red-600">{error}</td>
                  </tr>
                )}
                {!loading && !error && users.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500">Abhi koi user nahi hai.</td>
                  </tr>
                )}
                {users.filter(u => u.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || u.email?.toLowerCase().includes(searchQuery.toLowerCase())).map((user) => (
                  <tr key={user.id} className="border-b border-[#f4f4f4] hover:bg-[#fcfaf6] transition-all duration-300">
                    <td className="p-5 text-gray-700 font-medium">#{user.id}</td>
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.profileImage ? `http://localhost:5000/uploads/${user.profileImage}` : a1}
                          alt={user.fullName}
                          className="w-8 h-8 rounded-full object-cover border-2 border-[#d6b08c]"
                        />
                        <div>
                          <h3 className="font-semibold text-[#5c4033]">{user.fullName}</h3>
                          <p className="text-xs text-gray-500">Organization Member</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-gray-600">{user.email}</td>
                    <td className="p-5 text-gray-600">{user.phone}</td>
                    <td className="p-5 text-gray-600">{user.gender}</td>
                    <td className="p-5 text-gray-600">{user.dob}</td>
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setViewUser(user)}
                          className="w-9 h-9 rounded-xl bg-blue-50 hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-sm"
                          title="View" >
                          <img src={showIcon} alt="View" className="w-4.5 h-4.5" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingUser(user);
                            setShowForm(true);
                          }}
                          className="w-9 h-9 rounded-xl bg-[#f4ebe4] hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-sm"
                          title="Edit"  >
                          <img src={pencilIcon} alt="Edit" className="w-4.5 h-4.5" />
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="w-9 h-9 rounded-xl bg-red-50 hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-sm"
                          title="Delete"  >
                          <img src={binIcon} alt="Delete" className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {viewUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-3xl p-6 bg-white shadow-2xl relative">
            <button onClick={() => setViewUser(null)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-bold text-xl">
              x
            </button>
            <h2 className="text-2xl font-bold mb-6 text-[#5c4033]">User Profile details</h2>
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex justify-center mb-4">
                <img
                  src={viewUser.profileImage ? `http://localhost:5000/uploads/${viewUser.profileImage}` : a1}
                  alt=""
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#d6b08c]"
                />
              </div>
              <p><strong>Full Name:</strong> {viewUser.fullName}</p>
              <p><strong>Username:</strong> {viewUser.username || "N/A"}</p>
              <p><strong>Email Address:</strong> {viewUser.email}</p>
              <p><strong>Phone Number:</strong> {viewUser.phone || "N/A"}</p>
              <p><strong>Gender:</strong> {viewUser.gender || "N/A"}</p>
              <p><strong>Date of Birth:</strong> {viewUser.dob || "N/A"}</p>
              <p><strong>Department:</strong> {viewUser.department || "General"}</p>
              <p><strong>Role:</strong> {viewUser.role || "User"}</p>
              <p><strong>Address:</strong> {viewUser.address || "N/A"}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  {viewUser.status || "Active"}
                </span>
              </p>
            </div>
            <div className="mt-8 text-right">
              <button onClick={() => setViewUser(null)} className="px-6 py-2 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
