import { useState, useEffect } from "react";
import searchIcon from "../assets/search.png";
import downloadIcon from "../assets/download.png";
import addIcon from "../assets/add.png";
import filterIcon from "../assets/filter.png";
import rightUpIcon from "../assets/right-up.png";
import dateIcon from "../assets/date.png";
import boxIcon from "../assets/box.png";
import clockIcon from "../assets/clock.png";
import checkIcon from "../assets/check-mark.png";
import informationIcon from "../assets/information.png";
import pencilIcon from "../assets/pencil (1).png";
import binIcon from "../assets/bin (1).png";
import showIcon from "../assets/show.png";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import a1 from "../assets/a1.jpeg";
import a4 from "../assets/a4.jpeg";
import b1 from "../assets/b1.jpeg";
import b2 from "../assets/b2.jpeg";
import b4 from "../assets/b4.jpeg";
const profileImages = [a1, a4, b1, b2, b4];
const Enquiries = ({ darkMode, setActive, setEditData }) => {
  const defaultCards = [
    { title: "TOTAL ENQUIRIES", value: "00", growth: "+12.5%", icon: boxIcon, bg: "from-[#C8A25A] to-[#8B6A45]", iconBg: "bg-[#1b1b1b]", growthColor: "text-[#1d1d1d]" },
    { title: "PENDING", value: "00", growth: "-2.4%", icon: clockIcon, bg: "from-[#f8eee4] to-[#d58a43]", iconBg: "bg-white", growthColor: "text-red-500" },
    { title: "RESOLVED TODAY", value: "00", growth: "+5.2%", icon: checkIcon, bg: "from-[#f8eee4] to-[#d58a43]", iconBg: "bg-white", growthColor: "text-[#1d1d1d]" },
    { title: "HIGH PRIORITY", value: "00", growth: "+1.8%", icon: informationIcon, bg: "from-[#f8eee4] to-[#d58a43]", iconBg: "bg-white", growthColor: "text-[#1d1d1d]" },
  ];
  const [cards, setCards] = useState(defaultCards);
  const [dbEnquiries, setDbEnquiries] = useState([]);
  const [viewEnquiry, setViewEnquiry] = useState(null);
  const [editEnquiry, setEditEnquiry] = useState(null);
  const fetchEnquiries = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/enquiries");
      const data = await res.json();
      if (res.ok) setDbEnquiries(data.enquiries || []);
    } catch (err) {
      console.error("Error fetching enquiries:", err);
    }
  };
  const fetchCards = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/enquiry/cards");
      const data = await response.json();
      if (response.ok) {
        setCards([
          { title: "TOTAL ENQUIRIES", value: (data.totalEnquiries || 0).toString().padStart(2, "0"), growth: "+12.5%", icon: boxIcon, bg: "from-[#C8A25A] to-[#8B6A45]", iconBg: "bg-[#1b1b1b]", growthColor: "text-[#1d1d1d]" },
          { title: "PENDING", value: (data.pendingEnquiries || 0).toString().padStart(2, "0"), growth: "-2.4%", icon: clockIcon, bg: "from-[#f8eee4] to-[#d58a43]", iconBg: "bg-white", growthColor: "text-red-500" },
          { title: "RESOLVED TODAY", value: (data.resolvedToday || 0).toString().padStart(2, "0"), growth: "+5.2%", icon: checkIcon, bg: "from-[#f8eee4] to-[#d58a43]", iconBg: "bg-white", growthColor: "text-[#1d1d1d]" },
          { title: "HIGH PRIORITY", value: (data.highPriority || 0).toString().padStart(2, "0"), growth: "+1.8%", icon: informationIcon, bg: "from-[#f8eee4] to-[#d58a43]", iconBg: "bg-white", growthColor: "text-[#1d1d1d]" },
        ]);
      }
    } catch (error) {
      console.error("Error fetching enquiry cards:", error);
    }
  };
  useEffect(() => {
    fetchCards();
    fetchEnquiries();
  }, []);
  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/enquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchEnquiries();
        fetchCards();
      } else {
        alert("Failed to delete enquiry");
      }
    } catch (err) {
      console.error("Error deleting enquiry:", err);
      alert("Error deleting enquiry");
    }
  };
  const handleEditEnquirySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/enquiries/${editEnquiry.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editEnquiry),
      });
      if (res.ok) {
        setEditEnquiry(null);
        fetchEnquiries();
        fetchCards();
      } else {
        alert("Failed to update enquiry");
      }
    } catch (err) {
      console.error("Error updating enquiry:", err);
      alert("Error updating enquiry");
    }
  };

  const handleExportPDF = () => {
    if (enquiries.length === 0) {
      alert("No data available to download");
      return;
    }
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Enquiries Full History Report", 14, 18);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}  |  Total Enquiries: ${enquiries.length}`, 14, 26);
    const tableColumn = ["Name", "Email", "Phone", "Subject", "Priority", "Status", "Date"];
    const tableRows = [];
    enquiries.forEach(e => {
      tableRows.push([
        e.name,
        e.email,
        e.phone,
        e.subject,
        e.priority,
        e.status,
        e.date
      ]);
    });
    
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 32,
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [111, 78, 55], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [252, 251, 248] },
    });
    
    const fileName = `Enquiries_Full_History_${new Date().toLocaleDateString().replace(/\//g, "-")}.pdf`;
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

  const enquiries = dbEnquiries.map((e) => ({
    raw: e,
    id: e.id,
    name: e.full_name || e.name,
    email: e.email,
    phone: e.phone || "—",
    subject: e.subject || "General Enquiry",
    message: e.message || "",
    priority: e.priority || "Medium",
    status: e.status || "Pending",
    date: new Date(e.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
  }));
  const getPriorityStyle = (priority) => {
    if (priority === "High") return "bg-red-100 text-red-500";
    if (priority === "Medium") return "bg-yellow-100 text-yellow-600";
    return "bg-gray-100 text-gray-500";
  };
  const getStatusStyle = (status) => {
    if (status === "Pending") return "bg-gray-100 text-gray-600";
    if (status === "In Progress") return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-600";
  };
  const [activeBtn, setActiveBtn] = useState("filter");
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="p-4 md:p-7">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
        <div>
          <h1
            className={`text-3xl md:text-4xl font-bold ${
              darkMode ? "text-white" : "text-[#1a1a1a]"
            }`}>
            Customer Enquiries
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Manage and respond to all incoming client enquiries across
            platforms.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div
            className={`flex items-center gap-3 px-4 h-[52px]
            rounded-full border min-w-[260px]
            ${
              darkMode
                ? "bg-[#1e1e1e] border-[#2c2c2c]"
                : "bg-white border-[#ececec]"
            }`} >
            <img src={searchIcon} alt="" className="w-4 h-4" />
            <input type="text" placeholder="Search enquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`bg-transparent outline-none text-sm w-full ${
                darkMode ? "text-white" : "text-black"
              }`} />
          </div>
  <button onClick={() => setActiveBtn("filter")}
    className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
    <img src={filterIcon} alt="" className="w-4 h-4" />
    <span className="font-medium text-yellow-900 text-sm">Filter</span>
  </button>
  <button onClick={handleExportPDF}
    className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
    <img src={downloadIcon} alt="" className="w-4 h-4" />
    <span className="font-medium text-yellow-900 text-sm">Export</span>
  </button>
  <button onClick={() => setActiveBtn("add")}
    className="flex items-center gap-3 bg-[#6f4e37] text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300">
    <img src={addIcon} alt="" className="w-4 h-4 brightness-0 invert" />
    <span className="font-semibold text-sm">Add Enquiry</span>
  </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
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
      <div className="grid grid-cols-1 gap-6 mt-8">
        <div
          className={`rounded-3xl p-4 md:p-6 border overflow-hidden
        ${
          darkMode
            ? "bg-[#1e1e1e] border-[#2c2c2c]"
            : "bg-white border-[#ececec]"
        }`} >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div
              className={`flex items-center gap-3 px-4 h-[48px]
            rounded-full border w-full md:w-[320px]
            ${
              darkMode
                ? "bg-[#252525] border-[#333]"
                : "bg-[#fafafa] border-[#ececec]"
            }`} >
              <img src={searchIcon} alt="" className="w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm w-full" />
            </div>
            <div className="flex gap-3 flex-wrap">
              <button className="h-[48px] px-5 rounded-full border flex items-center gap-2">
                <img src={filterIcon} alt="" className="w-4 h-4" />
                Filters
              </button>
              <button className="h-[48px] px-5 rounded-full border flex items-center gap-2">
                <img src={dateIcon} alt="" className="w-4 h-4" />
                Last 30 Days
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b">
                  <th className="py-4">CUSTOMER</th>
                  <th>EMAIL</th>
                  <th>PHONE NUMBER</th>
                  <th>SUBJECT</th>
                  <th>PRIORITY</th>
                  <th>STATUS</th>
                  <th>DATE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-gray-400 text-sm">
                      No enquiries yet. Enquiries from the website contact form will appear here.
                    </td>
                  </tr>
                ) : (
                  enquiries.filter(e => e.name?.toLowerCase().includes(searchQuery.toLowerCase()) || e.email?.toLowerCase().includes(searchQuery.toLowerCase())).map((item, index) => (
                    <tr key={item.id || index} className="border-b last:border-none hover:bg-[#faf7f0] transition">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          {/* Avatar with initials */}
                          <div className="w-11 h-11 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm flex-shrink-0">
                            {item.name ? item.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0,2) : "?"}
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{item.name}</h4>
                          </div>
                        </div>
                      </td>
                      <td className="text-sm">{item.email}</td>
                      <td className="text-sm">{item.phone}</td>
                      <td className="text-sm max-w-[180px] truncate">{item.subject}</td>
                      <td>
                        <span className={`px-3 py-1 rounded-full text-xs ${getPriorityStyle(item.priority)}`}>
                          {item.priority}
                        </span>
                      </td>
                      <td>
                        <span className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="text-sm whitespace-nowrap">{item.date}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setViewEnquiry(item)}
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 hover:bg-blue-100 transition-all"
                            title="View"  >
                            <img src={showIcon} alt="View" className="w-4 h-4 opacity-80" />
                          </button>
                           <button  onClick={() => {
                              setEditData({
                                ...item.raw,
                                displayedImage: profileImages[index % profileImages.length]
                              });
                              setActive("Edit Enquiry");
                            }}
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-50 hover:bg-amber-100 transition-all"
                            title="Edit" >
                            <img src={pencilIcon} alt="Edit" className="w-4 h-4 opacity-80" />
                          </button>
                          <button
                            onClick={() => handleDeleteEnquiry(item.id)}
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-red-50 hover:bg-red-100 transition-all"
                            title="Delete"
                          >
                            <img src={binIcon} alt="Delete" className="w-4 h-4 opacity-80" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
            <p className="text-sm text-gray-500">
              Showing {enquiries.length} {enquiries.length === 1 ? "result" : "results"}
            </p>
            <div className="flex items-center gap-2">
              <button
    onClick={() => activePage > 1 && setActivePage(activePage - 1)}
    className={`px-4 py-2 border rounded-full text-sm transition-all duration-300
    ${
      darkMode
        ? "bg-[#1e1e1e] border-[#2c2c2c] text-white"
        : "bg-white border-[#ececec] text-[#222]" }`} >
    Previous
  </button>
  <button
    onClick={() => setActivePage(1)}
    className={`w-9 h-9 rounded-full border text-sm transition-all duration-300
    ${
      activePage === 1
        ? "bg-[#c8a25a] border-[#c8a25a] text-white"
        : darkMode
        ? "bg-[#1e1e1e] border-[#2c2c2c] text-white"
        : "bg-white border-[#ececec] text-[#222]"
    }`} >
    1
  </button>
  <button  onClick={() => setActivePage(2)}
    className={`w-9 h-9 rounded-full border text-sm transition-all duration-300
    ${
      activePage === 2
        ? "bg-[#c8a25a] border-[#c8a25a] text-white"
        : darkMode
        ? "bg-[#1e1e1e] border-[#2c2c2c] text-white"
        : "bg-white border-[#ececec] text-[#222]"
    }`}  >
    2
  </button>
  <button  onClick={() => setActivePage(3)}
    className={`w-9 h-9 rounded-full border text-sm transition-all duration-300
    ${
      activePage === 3
        ? "bg-[#c8a25a] border-[#c8a25a] text-white"
        : darkMode
        ? "bg-[#1e1e1e] border-[#2c2c2c] text-white"
        : "bg-white border-[#ececec] text-[#222]"
    }`} >
    3
  </button>
  <button
    onClick={() => activePage < 3 && setActivePage(activePage + 1)}
    className={`px-4 py-2 border rounded-full text-sm transition-all duration-300
    ${
      darkMode
        ? "bg-[#1e1e1e] border-[#2c2c2c] text-white"
        : "bg-white border-[#ececec] text-[#222]"
    }`}  >
    Next
  </button>
            </div>
          </div>
        </div>
      </div>
      {viewEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className={`w-full max-w-md rounded-3xl p-6 ${darkMode ? "bg-[#1e293b]" : "bg-white"} shadow-2xl relative`}>
            <button onClick={() => setViewEnquiry(null)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-bold text-xl">
              x
            </button>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-black"}`}>Enquiry Details</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-2xl">
                  {viewEnquiry.name ? viewEnquiry.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0,2) : "?"}
                </div>
              </div>
              <p><strong>Name:</strong> {viewEnquiry.name}</p>
              <p><strong>Email:</strong> {viewEnquiry.email}</p>
              <p><strong>Phone:</strong> {viewEnquiry.phone}</p>
              <p><strong>Subject:</strong> {viewEnquiry.subject}</p>
              <p><strong>Message:</strong> {viewEnquiry.message || "N/A"}</p>
              <p>
                <strong>Priority:</strong>{" "}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityStyle(viewEnquiry.priority)}`}>
                  {viewEnquiry.priority}
                </span>
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(viewEnquiry.status)}`}>
                  {viewEnquiry.status}
                </span>
              </p>
              <p><strong>Date:</strong> {viewEnquiry.date}</p>
            </div>
            <div className="mt-8 text-right">
              <button onClick={() => setViewEnquiry(null)} className="px-6 py-2 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Enquiries;