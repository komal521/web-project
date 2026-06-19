import { useState, useEffect } from "react";
import profileImg from "../assets/ananaya.jpg";
import accountIcon from "../assets/account.png";
import gmailIcon from "../assets/gmail.png";
import phoneIcon from "../assets/telephone (1).png";
import searchIcon from "../assets/search.png";
import checkIcon from "../assets/check-mark.png";
import verifiedIcon from "../assets/verified.png";
import lockIcon from "../assets/lock.png";
import starIcon from "../assets/star.png";
import globalIcon from "../assets/global.png";
import clockIcon from "../assets/clock.png";
import databaseIcon from "../assets/database.png";
import notificationIcon from "../assets/notification.png";
import laptopIcon from "../assets/laptop.png";
import phoneCallIcon from "../assets/smartphone-call (1).png";
import downIcon from "../assets/down.png";
const ToggleSwitch = ({ checked, onChange }) => (
  <button type="button" onClick={() => onChange(!checked)}
    aria-pressed={checked}
    className={`relative h-5 w-9 rounded-full p-0.5 transition-colors ${
      checked ? "bg-[#d9a63d]" : "bg-gray-300"  }`}>
    <span
      className={`block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
        checked ? "translate-x-4" : "translate-x-0"
      }`}  />
  </button>
);
const IconBox = ({ icon, darkMode }) => (
  <div
    className={`h-8 w-8 shrink-0 rounded-lg flex items-center justify-center ${
      darkMode ? "bg-[#111827]" : "bg-gray-100"
    }`} >
    <img src={icon} alt="" className="h-4 w-4 object-contain" />
  </div>
);
const Settings = ({ darkMode }) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [notifications, setNotifications] = useState([
    true,
    true,
    true,
    true,
    false,
    false,
  ]);
  const [settings, setSettings] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    language: "English (US)",
    timezone: "PST (UTC -8)",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          setSettings(prev => ({ ...prev, ...data.settings }));
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings })
      });
      const data = await res.json();
      if (data.success) {
        alert("Settings saved successfully");
      } else {
        alert("Failed to save settings");
      }
    } catch (err) {
      console.log(err);
      alert("Error saving settings");
    }
  };
  const handleSettingsChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateNotification = (index, value) => {
    setNotifications((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? value : item))
    );
  };
  const pageClass = darkMode ? "bg-[#111827] text-white" : "bg-[#f4f6f8] text-[#111827]";
  const cardClass = darkMode
    ? "bg-[#1f2937] border border-gray-700"
    : "bg-white border border-gray-200";
  const fieldClass = darkMode
    ? "bg-[#111827] border border-gray-700"
    : "bg-[#f8fafc] border border-gray-200";
  const mutedText = darkMode ? "text-gray-400" : "text-gray-500";
  return (
    <div className={`min-h-screen p-4 sm:p-6 lg:p-8 ${pageClass}`}>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-normal">Account Settings</h1>
          <p className={`mt-1 text-xs sm:text-sm ${mutedText}`}>
            Manage your personal information, security preferences, and system behavior.
          </p>
        </div>
        <div className={`flex h-10 w-full items-center gap-3 rounded-xl px-4 lg:w-[360px] ${fieldClass}`}>
          <img src={searchIcon} alt="" className="h-4 w-4 opacity-60" />
          <input
            type="text"
            placeholder="Search settings..."
            className="w-full bg-transparent text-sm outline-none"  />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          <section className={`rounded-xl p-5 shadow-sm ${cardClass}`}>
            <div className="mb-5 flex items-start gap-3">
              <img src={accountIcon} alt="" className="mt-0.5 h-5 w-5" />
              <div>
                <h2 className="text-base font-semibold">Profile Information</h2>
                <p className={`text-xs ${mutedText}`}>
                  Personal details and contact information visible across the organization.
                </p>
              </div>
            </div>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <img  src={profileImg}  alt=""
                className="h-20 w-20 rounded-full border-4 border-[#d9a63d] object-cover" />
              <div className="min-w-0">
                <h3 className="text-base font-bold">Julian Pierce</h3>
                <p className={`mt-1 text-xs ${mutedText}`}>
                  Change your profile picture and customize your public identity.
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <button className="rounded-lg bg-[#6f4e37] px-4 py-2 text-xs font-semibold text-black">
                    Upload New
                  </button>
                  <button className="rounded-lg px-4 py-2 text-xs font-semibold text-red-500">
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold">Full Name</label>
                <div className={`flex h-10 items-center rounded-lg px-3 ${fieldClass}`}>
                  <input className="w-full bg-transparent text-sm outline-none" placeholder="Julian Pierce" value={settings.fullName || ""} onChange={e => handleSettingsChange("fullName", e.target.value)} />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold">Email Address</label>
                <div className={`flex h-10 items-center gap-2 rounded-lg px-3 ${fieldClass}`}>
                  <img src={gmailIcon} alt="" className="h-4 w-4" />
                  <input className="w-full bg-transparent text-sm outline-none" placeholder="jpierce@nexus.ai" value={settings.email || ""} onChange={e => handleSettingsChange("email", e.target.value)} />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold">Phone Number</label>
                <div className={`flex h-10 items-center gap-2 rounded-lg px-3 ${fieldClass}`}>
                  <img src={phoneIcon} alt="" className="h-4 w-4" />
                  <input className="w-full bg-transparent text-sm outline-none" placeholder="+1 (555) 123-4567" value={settings.phone || ""} onChange={e => handleSettingsChange("phone", e.target.value)} />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold">Role / Position</label>
                <div className={`flex h-10 items-center rounded-lg px-3 ${fieldClass}`}>
                  <input className="w-full bg-transparent text-sm outline-none" placeholder="Senior System Administrator" value={settings.role || ""} onChange={e => handleSettingsChange("role", e.target.value)} />
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button className="h-9 rounded-lg px-5 text-xs font-semibold">Cancel</button>
              <button onClick={handleSave} className="h-9 rounded-lg bg-[#6f4e37] px-5 text-xs font-semibold text-black">
                Save Profile
              </button>
            </div>
          </section>
          <section className={`rounded-xl p-5 shadow-sm ${cardClass}`}>
            <div className="mb-5 flex items-start gap-3">
              <img src={verifiedIcon} alt="" className="mt-0.5 h-5 w-5" />
              <div>
                <h2 className="text-base font-semibold">Security & Authentication</h2>
                <p className={`text-xs ${mutedText}`}>Protect your account with modern security standards.</p>
              </div>
            </div>
            <div className={`flex flex-col gap-3 border-b py-4 sm:flex-row sm:items-center sm:justify-between ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
              <div className="flex items-center gap-3">
                <IconBox icon={lockIcon} darkMode={darkMode} />
                <div>
                  <h3 className="text-sm font-semibold">Two-Factor Authentication (2FA)</h3>
                  <p className={`text-xs ${mutedText}`}>Add an extra layer of security to your login process.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 self-start sm:self-center">
                <span className="text-xs font-semibold">{twoFactorEnabled ? "Enabled" : "Disabled"}</span>
                <ToggleSwitch checked={twoFactorEnabled} onChange={setTwoFactorEnabled} />
              </div>
            </div>

            <div className={`flex flex-col gap-3 border-b py-4 sm:flex-row sm:items-center sm:justify-between ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
              <div className="flex items-center gap-3">
                <IconBox icon={verifiedIcon} darkMode={darkMode} />
                <div>
                  <h3 className="text-sm font-semibold">Password Management</h3>
                  <p className={`text-xs ${mutedText}`}>Last changed 3 months ago. We recommend updating every 6 months.</p>
                </div>
              </div>
              <button className={`h-8 rounded-lg px-4 text-xs font-semibold ${fieldClass}`}>Update Password</button>
            </div>
            <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <IconBox icon={starIcon} darkMode={darkMode} />
                <div>
                  <h3 className="text-sm font-semibold">Hardware Security Key</h3>
                  <p className={`text-xs ${mutedText}`}>Use physical keys like YubiKey for maximum security.</p>
                </div>
              </div>
              <button className="h-8 rounded-lg border border-gray-300 px-4 text-xs font-semibold">
                Enterprise Only
              </button>
            </div>
          </section>
           <section className={`rounded-xl p-5 shadow-sm ${cardClass}`}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-semibold">Active Devices</h2>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-700">
                3 Active
              </span>
            </div>
            {[
              { icon: laptopIcon, title: 'MacBook Pro 16"', info: "SAN FRANCISCO, USA - CHROME", current: true },
              { icon: phoneCallIcon, title: "iPhone 15 Pro", info: "SAN FRANCISCO, USA - APP" },
              { icon: laptopIcon, title: 'iMac 24"', info: "LONDON, UK - SAFARI" },
            ].map((device) => (
              <div key={device.title} className={`mb-3 flex items-center justify-between gap-3 rounded-xl p-3 ${fieldClass}`}>
                <div className="flex min-w-0 items-center gap-3">
                  <IconBox icon={device.icon} darkMode={darkMode} />
                  <div className="min-w-0">
                    <h3 className="truncate text-xs font-bold">{device.title}</h3>
                    <p className={`text-[10px] ${mutedText}`}>{device.info}</p>
                  </div>
                </div>
                {device.current && (
                  <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-semibold text-green-700">
                    Current
                  </span>
                )}
              </div>
            ))}
            <div className="pt-2">
              <button className={`flex h-9 w-full items-center justify-between rounded-lg px-3 text-xs font-semibold text-black ${
                darkMode ? "bg-[#111827]" : "bg-[#fff7df]"
              }`}>
                View Full History
                <img src={downIcon} alt="" className="h-3 w-3 opacity-80" />
              </button>
              <button className="mt-4 block w-full text-center text-xs font-semibold text-red-500">
                Sign Out All Other Devices
              </button>
            </div>
          </section>
        </div>
        <aside className="space-y-5">
          <section className={`rounded-xl p-5 shadow-sm ${cardClass}`}>
            <h2 className="mb-5 text-base font-semibold">System Status</h2>
            <div className="space-y-4">
              {[
                { icon: globalIcon, label: "Language", value: settings.language || "English (US)" },
                { icon: clockIcon, label: "Time Zone", value: settings.timezone || "PST (UTC -8)" },
                { icon: databaseIcon, label: "Data Center", value: "US-WEST-2" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <img src={item.icon} alt="" className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  <span className={mutedText}>{item.value}</span>
                </div>
              ))}
            </div>
            <button className={`mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold ${fieldClass}`}>
              <img src={databaseIcon} alt="" className="h-4 w-4" />
              Backup Now
            </button>
          </section>
          <section className={`rounded-xl p-5 shadow-sm ${cardClass}`}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-semibold">Active Devices</h2>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-700">
                3 Active
              </span>
            </div>
            {[
              { icon: laptopIcon, title: 'MacBook Pro 16"', info: "SAN FRANCISCO, USA - CHROME", current: true },
              { icon: phoneCallIcon, title: "iPhone 15 Pro", info: "SAN FRANCISCO, USA - APP" },
              { icon: laptopIcon, title: 'iMac 24"', info: "LONDON, UK - SAFARI" },
            ].map((device) => (
              <div key={device.title} className={`mb-3 flex items-center justify-between gap-3 rounded-xl p-3 ${fieldClass}`}>
                <div className="flex min-w-0 items-center gap-3">
                  <IconBox icon={device.icon} darkMode={darkMode} />
                  <div className="min-w-0">
                    <h3 className="truncate text-xs font-bold">{device.title}</h3>
                    <p className={`text-[10px] ${mutedText}`}>{device.info}</p>
                  </div>
                </div>
                {device.current && (
                  <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-semibold text-green-700">
                    Current
                  </span>
                )}
              </div>
            ))}
            <div className="pt-2">
              <button className={`flex h-9 w-full items-center justify-between rounded-lg px-3 text-xs font-semibold text-[#d9a63d] ${
                darkMode ? "bg-[#111827]" : "bg-[#fff7df]"
              }`}>
                View Full History
                <img src={downIcon} alt="" className="h-3 w-3 opacity-80" />
              </button>
              <button className="mt-4 block w-full text-center text-xs font-semibold text-red-500">
                Sign Out All Other Devices
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Settings;
