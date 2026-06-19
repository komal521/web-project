import { useState, useEffect } from "react";
import bookingIcon from "../assets/booking.png";
import clockIcon from "../assets/clock.png";
import infoIcon from "../assets/information.png";
import checkIcon from "../assets/check-mark.png";
import dotsIcon from "../assets/dots.png";
import downIcon from "../assets/down.png";
import emailIcon from "../assets/email.png";
import messageIcon from "../assets/message.png";
import dateIcon from "../assets/date.png";
import faqIcon from "../assets/faq.png";
import menu1Icon from "../assets/menu1.png";
import rightUp from "../assets/right-up.png";
import a1 from "../assets/a1.jpeg";
import a4 from "../assets/a4.jpeg";
import b1 from "../assets/b1.jpeg";
import b2 from "../assets/b2.jpeg";
import b4 from "../assets/b4.jpeg";
import showIcon from "../assets/show.png";
import pencilIcon from "../assets/pencil (1).png";
import binIcon from "../assets/bin (1).png";
import axios from "axios";
const profileImages = [a1, a4, b1, b2, b4];
const Support = ({ darkMode }) => {
  const [data, setData] = useState({
    totalTickets: 0,
    openTickets: 0,
    pendingIssues: 0,
    resolvedToday: 0,
    totalTicketsGrowth: "0%",
    openTicketsGrowth: "0%",
    pendingIssuesGrowth: "0%",
    resolvedTodayGrowth: "0%",
  });
  const [tickets, setTickets] = useState([]);
  const [viewTicket, setViewTicket] = useState(null);
  const [editTicket, setEditTicket] = useState(null);
  const fetchSupportData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/support/cards");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching support data:", error);
    }
  };
  const fetchTickets = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/support/tickets");
      const result = await response.json();
      setTickets(result);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };
  useEffect(() => {
    fetchSupportData();
    fetchTickets();
  }, []);
  const handleDeleteTicket = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/enquiries/${id}`);
      fetchTickets();
      fetchSupportData();
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };
  const handleEditTicketSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/enquiries/${editTicket.id}`, editTicket);
      setEditTicket(null);
      fetchTickets();
      fetchSupportData();
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };
  const cards = [
    {
      title: "TOTAL TICKETS",
      value: data.totalTickets.toLocaleString(),
      growth: data.totalTicketsGrowth,
      icon: bookingIcon,
    },
    {
      title: "OPEN TICKETS",
      value: data.openTickets.toLocaleString(),
      growth: data.openTicketsGrowth,
      icon: clockIcon,
    },
    {
      title: "PENDING ISSUES",
      value: data.pendingIssues.toLocaleString(),
      growth: data.pendingIssuesGrowth,
      icon: infoIcon,
    },
    {
      title: "RESOLVED TODAY",
      value: data.resolvedToday.toLocaleString(),
      growth: data.resolvedTodayGrowth,
      icon: checkIcon,
    },
  ];

  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-50 text-red-500 border border-red-100";
      case "medium":
        return "bg-gray-50 text-gray-700 border border-gray-200";
      case "low":
        return "bg-gray-50 text-gray-500 border border-gray-200";
      default:
        return "bg-gray-50 text-gray-500 border border-gray-200";
    }
  };

  const internalSupportItems = [
    { title: "Priority Email Support", desc: "vip-desk@luxeadmin.com", icon: emailIcon },
    { title: "Live Internal Chat", desc: "Est. wait: 2 mins", icon: messageIcon },
    { title: "Schedule Consultation", desc: "With Senior Architect", icon: dateIcon },
    { title: "Working Hours", desc: "Mon-Fri, 9AM-8PM EST", icon: faqIcon },
  ];

  const faqs = [
    { question: "How do I reset an admin password?", answer: "Navigate to Settings > Security and click on 'Reset Password'. You will receive a secure link via your registered admin email.", expanded: true },
    { question: "What is the average response time?", answer: "", expanded: false },
    { question: "Can I export ticket logs to CSV?", answer: "", expanded: false },
    { question: "How are priority levels assigned?", answer: "", expanded: false },
  ];

  return (
    <div className={`p-4 sm:p-6 lg:p-8 min-h-screen ${darkMode ? "bg-gray-900" : "bg-[#fcfbf9]"}`}>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>Support</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 mb-8">
        {cards.map((card, index) => (
          <div key={index}
            className="relative overflow-hidden rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer border border-white/20">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#f3d3b5,#b78457,#6f4e37)]"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="flex items-start justify-between relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/90 flex items-center justify-center shadow-lg">
                <img src={card.icon} alt="" className="w-7 h-7" />
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/80 text-white shadow-md">
                {card.growth}
              </span>
            </div>
            <div className="mt-8 relative z-10">
              <p className="text-xs tracking-[2px] text-white/80 font-semibold uppercase">{card.title}</p>
              <h2 className="text-3xl font-bold text-white mt-4 leading-none">{card.value}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className={`rounded-3xl p-6 shadow-sm border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>Recent Support Tickets</h2>
                <p className="text-sm text-gray-500 mt-1">Monitor and respond to active customer inquiries.</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button className={`px-4 py-2 rounded-xl text-sm font-semibold border ${darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                  Filter
                </button>
                <button className="flex items-center gap-3 bg-[linear-gradient(135deg,#f3d3b5,#b78457,#6f4e37)] text-white px-5 py-2.5 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300">
                  <span className="font-semibold text-sm">Export CSV</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-3 px-2 text-[10px] font-bold text-gray-500 tracking-wider uppercase">ID</th>
                    <th className="py-3 px-2 text-[10px] font-bold text-gray-500 tracking-wider uppercase">USER</th>
                    <th className="py-3 px-2 text-[10px] font-bold text-gray-500 tracking-wider uppercase">SUBJECT</th>
                    <th className="py-3 px-2 text-[10px] font-bold text-gray-500 tracking-wider uppercase">PRIORITY</th>
                    <th className="py-3 px-2 text-[10px] font-bold text-gray-500 tracking-wider uppercase">STATUS</th>
                    <th className="py-3 px-2 text-[10px] font-bold text-gray-500 tracking-wider uppercase text-right pr-4">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.length > 0 ? (
                    tickets.map((ticket, index) => (
                      <tr key={ticket.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-2 text-xs font-bold text-gray-800">
                          #TK-4{ticket.id.toString().padStart(3, "0")}
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-3">
                            <img src={profileImages[index % profileImages.length]} alt="" className="w-8 h-8 rounded-full object-cover shadow-sm" />
                            <span className="text-sm font-semibold text-gray-800">{ticket.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-sm text-gray-600 truncate max-w-[200px]">{ticket.subject || "General Inquiry"}</td>
                        <td className="py-4 px-2">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${getPriorityStyle(ticket.priority || "Medium")}`}>
                            {ticket.priority || "Medium"}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-sm font-semibold text-gray-800">{ticket.status}</td>
                        <td className="py-4 px-2 text-right">
                          <div className="flex items-center justify-end gap-2 pr-2">
                            <button
                              onClick={() => setViewTicket(ticket)}
                              className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                              title="View">
                              <img src={showIcon} alt="View" className="w-4 h-4 object-contain" />
                            </button>
                            <button
                              onClick={() => setEditTicket(ticket)}
                              className="p-1.5 hover:bg-amber-50 text-amber-600 rounded-lg transition-colors"
                              title="Edit" >
                              <img src={pencilIcon} alt="Edit" className="w-4 h-4 object-contain" />
                            </button>
                            <button onClick={() => handleDeleteTicket(ticket.id)}
                              className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                              title="Delete" >
                              <img src={binIcon} alt="Delete" className="w-4 h-4 object-contain" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-sm text-gray-500">No recent tickets found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-center">
              <button className="text-sm font-bold text-[#8b4d16] hover:text-[#a67c52] transition-colors">
                View All {data.totalTickets.toLocaleString()} Tickets
              </button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div>
            <div className="flex justify-between items-end mb-4">
              <h2 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>Global FAQs</h2>
              <span className="text-xs text-gray-500 font-semibold cursor-pointer hover:text-gray-700">Update Center</span>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-gray-800">{faq.question}</h3>
                    <img src={downIcon} alt="expand" className={`w-3 h-3 object-contain transition-transform ${faq.expanded ? "rotate-180" : ""}`} />
                  </div>
                  {faq.expanded && <p className="mt-3 text-xs text-gray-500 leading-relaxed">{faq.answer}</p>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>Internal Support</h2>
            <div className="space-y-3">
              {internalSupportItems.map((item, idx) => (
                <div key={idx} className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#d9a63d]">
                      <img src={item.icon} alt={item.title} className="w-5 h-5 object-contain" style={{ filter: "invert(63%) sepia(51%) saturate(542%) hue-rotate(345deg) brightness(90%) contrast(92%)" }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <span className="text-gray-300 font-bold text-lg">›</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-6 text-center shadow-md relative overflow-hidden" style={{ background: "#6f4e37" }}>
            <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <img src={menu1Icon} alt="platinum" className="w-6 h-6 object-contain" style={{ filter: "invert(58%) sepia(56%) saturate(624%) hue-rotate(345deg) brightness(98%) contrast(93%)" }} />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">Platinum Tier Support</h3>
            <p className="text-xs text-white opacity-80 leading-relaxed px-2">
              Your account is currently under our white-glove internal management service.
            </p>
          </div>
        </div>
      </div>
      {viewTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-3xl p-6 bg-white shadow-2xl relative text-gray-800">
            <button onClick={() => setViewTicket(null)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-bold text-xl">
              x
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Ticket Details</h2>
            <div className="space-y-4 text-sm">
              <p><strong>Ticket ID:</strong> #TK-4{viewTicket.id.toString().padStart(3, "0")}</p>
              <p><strong>User:</strong> {viewTicket.name}</p>
              <p><strong>Email Address:</strong> {viewTicket.email || "N/A"}</p>
              <p><strong>Phone:</strong> {viewTicket.phone || "N/A"}</p>
              <p><strong>Subject:</strong> {viewTicket.subject || "N/A"}</p>
              <p><strong>Message:</strong> {viewTicket.message || "N/A"}</p>
              <p>
                <strong>Priority:</strong>{" "}
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${getPriorityStyle(viewTicket.priority)}`}>
                  {viewTicket.priority}
                </span>
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                  {viewTicket.status}
                </span>
              </p>
              <p><strong>Date Submitted:</strong> {viewTicket.created_at ? new Date(viewTicket.created_at).toLocaleString() : "N/A"}</p>
            </div>
            <div className="mt-8 text-right">
              <button onClick={() => setViewTicket(null)} className="px-6 py-2 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {editTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <form onSubmit={handleEditTicketSubmit} className="w-full max-w-md rounded-3xl p-6 bg-white shadow-2xl relative text-gray-800">
            <button type="button" onClick={() => setEditTicket(null)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-bold text-xl">
              x
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Update Ticket Status</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={editTicket.subject}
                  onChange={(e) => setEditTicket({ ...editTicket, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#a67c52]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Message</label>
                <textarea  required  value={editTicket.message}
                  onChange={(e) => setEditTicket({ ...editTicket, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#a67c52] h-24" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Priority</label>
                  <select value={editTicket.priority}
                    onChange={(e) => setEditTicket({ ...editTicket, priority: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#a67c52] bg-white"  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Status</label>
                  <select
                    value={editTicket.status}
                    onChange={(e) => setEditTicket({ ...editTicket, status: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#a67c52] bg-white">
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button type="button" onClick={() => setEditTicket(null)} className="px-6 py-2 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300">
                Cancel
              </button>
              <button type="submit" className="px-6 py-2 rounded-xl bg-[#a67c52] text-white font-semibold hover:opacity-90">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Support;
