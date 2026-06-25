import { useState, useEffect } from "react";
import bookingIcon from "../assets/booking.png";
import clockIcon from "../assets/clock.png";
import infoIcon from "../assets/information.png";
import checkIcon from "../assets/check-mark.png";
import downIcon from "../assets/down.png";
import emailIcon from "../assets/email.png";
import messageIcon from "../assets/message.png";
import dateIcon from "../assets/date.png";
import showIcon from "../assets/show.png";
import pencilIcon from "../assets/pencil (1).png";
import binIcon from "../assets/bin (1).png";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import a1 from "../assets/a1.jpeg";
import a4 from "../assets/a4.jpeg";
import b1 from "../assets/b1.jpeg";
import b2 from "../assets/b2.jpeg";
import b4 from "../assets/b4.jpeg";
import closeIcon from "../assets/close.png";
const profileImages = [a1, a4, b1, b2, b4];
const Support = ({ darkMode, setActive, setEditData }) => {
  const [data, setData] = useState({
    totalTickets: 0,
    openTickets: 0,
    pendingIssues: 0,
    resolvedToday: 0,
    totalTicketsGrowth: "0%",
    openTicketsGrowth: "0%",
    pendingIssuesGrowth: "0%",
    resolvedTodayGrowth: "0%", });
  const [tickets, setTickets] = useState([]);
  const [viewTicket, setViewTicket] = useState(null);
  const fetchSupportData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/support/cards");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching support data:", error);
    } };
  const fetchTickets = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/support/tickets");
      const result = await response.json();
      setTickets(result);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } };
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

  const exportPDF = () => {
    if (tickets.length === 0) {
      alert("No tickets available to export");
      return;
    }
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Support Tickets History", 14, 18);
    doc.setFontSize(10);
    doc.text(`Exported: ${new Date().toLocaleString()}  |  Total: ${tickets.length} tickets`, 14, 26);
    const tableColumn = ["Ticket ID", "User", "Email", "Subject", "Priority", "Status", "Date"];
    const tableRows = tickets.map((t) => [
      `#TK-4${t.id.toString().padStart(3, "0")}`,
      t.name || "N/A",
      t.email || "N/A",
      t.subject || "General Inquiry",
      t.priority || "Medium",
      t.status || "Open",
      t.created_at ? new Date(t.created_at).toLocaleDateString() : "N/A",
    ]);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 32,
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [111, 78, 55], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [252, 251, 248] },
    });
    
    const fileName = `Support_Tickets_${new Date().toLocaleDateString().replace(/\//g, "-")}.pdf`;
    const pdfBlob = doc.output('blob');
    const formData = new FormData();
    formData.append("report", pdfBlob, fileName);
    fetch("http://localhost:5000/api/reports/save", { method: "POST", body: formData }).catch(console.log);

    if (window.showSaveFilePicker) {
      window.showSaveFilePicker({
        suggestedName: fileName,
        types: [{ description: 'PDF Document', accept: { 'application/pdf': ['.pdf'] } }],
      }).then(handle => handle.createWritable())
        .then(writable => { writable.write(pdfBlob); writable.close(); })
        .catch(err => { if (err.name !== 'AbortError') doc.save(fileName); });
    } else {
      doc.save(fileName);
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
        <div className="lg:col-span-12 space-y-6">
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
                <button onClick={exportPDF} className="flex items-center gap-3 bg-[linear-gradient(135deg,#f3d3b5,#b78457,#6f4e37)] text-white px-5 py-2.5 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300">
                  <span className="font-semibold text-sm">Export PDF</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-3 px-2 text-xs font-bold text-gray-500 tracking-wider uppercase">USER</th>
                    <th className="py-3 px-2 text-xs font-bold text-gray-500 tracking-wider uppercase">EMAIL</th>
                    <th className="py-3 px-2 text-xs font-bold text-gray-500 tracking-wider uppercase">DATE</th>
                    <th className="py-3 px-2 text-xs font-bold text-gray-500 tracking-wider uppercase">SUBJECT</th>
                    <th className="py-3 px-2 text-xs font-bold text-gray-500 tracking-wider uppercase">PRIORITY</th>
                    <th className="py-3 px-2 text-xs font-bold text-gray-500 tracking-wider uppercase">STATUS</th>
                    <th className="py-3 px-2 text-xs font-bold text-gray-500 tracking-wider uppercase text-right pr-4">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.length > 0 ? (
                    tickets.map((ticket, index) => (
                      <tr key={ticket.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-3">
                            <img src={profileImages[index % profileImages.length]} alt="" className="w-8 h-8 rounded-full object-cover shadow-sm" />
                            <span className="text-sm font-semibold text-gray-800">{ticket.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-sm text-gray-600 truncate max-w-[150px]">{ticket.email || "N/A"}</td>
                        <td className="py-4 px-2 text-sm text-gray-600 whitespace-nowrap">{ticket.created_at ? new Date(ticket.created_at).toLocaleDateString() : "N/A"}</td>
                        <td className="py-4 px-2 text-sm text-gray-600 truncate max-w-[150px]">{ticket.subject || "General Inquiry"}</td>
                        <td className="py-4 px-2">
                          <span className={`px-2 py-1 rounded-md text-xs font-bold ${getPriorityStyle(ticket.priority || "Medium")}`}>
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
                              onClick={() => {
                                setEditData(ticket);
                                setActive("Edit Support");
                              }}
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
      </div>

      {viewTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-3xl p-6 bg-white shadow-2xl relative text-gray-800 animate-fadeIn">
          <button onClick={() => setViewTicket(null)} className="absolute top-4 right-4">
  <img  src={closeIcon}  alt="Close"
    className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
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
                <span className={`px-2 py-1 rounded-md text-xs font-bold ${getPriorityStyle(viewTicket.priority)}`}>
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
    </div>
  );
};

export default Support;
