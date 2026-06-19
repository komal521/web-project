
import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";

const App = () => {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {

    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#111827";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#f8f5ef";
    }

  }, [darkMode]);

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[#f8f5ef]">

      <Sidebar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

    </div>
  );
};

export default App;