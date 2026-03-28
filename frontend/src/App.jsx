import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import ApiServices from "./pages/ApiServices";
import Automation from "./pages/Automation";
import Analytics from "./pages/Analytics";

/* 🔁 Wrapper (REQUIRED for Router) */
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate(); // ✅ navigation hook

  const menuItems = [
    { name: "Home", subMenu: ["Dashboard", "Updates", "News"] },
    { name: "Products", subMenu: ["API Services", "Automation", "Analytics"] },
    { name: "About Me", subMenu: ["Profile", "Experience", "Contact"] },
    { name: "Chatbot", subMenu: ["AI Chat", "History", "Settings"] },
  ];

  const subRoutes = {
    "API Services": "/api-services",
    "Automation": "/automation",
    "Analytics": "/analytics",
  };

  const lightOrange = "#FFB347";
  const electricCyan = "#06F9EC";

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={styles.pageWrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;500;800&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; }
        body { background: #030712; color: white; overflow-x: hidden; }
        ul { list-style: none; }

        .dropdown-enter {
          animation: slideBlur 0.4s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          transform-origin: top center;
        }

        @keyframes slideBlur {
          from { opacity: 0; transform: translateX(-50%) translateY(10px) scale(0.95); filter: blur(5px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); filter: blur(0); }
        }

        .btn-hover:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
          box-shadow: 0 0 20px rgba(6, 249, 236, 0.4);
        }

        @media (max-width: 768px) {
          .nav-links-container {
            position: fixed;
            top: 0;
            right: ${mobileOpen ? "0" : "-100%"};
            width: 80%;
            height: 100vh;
            background: rgba(10, 20, 10, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
            z-index: 999;
          }
        }
      `}</style>

      {/* 🌌 DYNAMIC BACKGROUND */}
      <div style={{ ...styles.orb, ...styles.orbOrange }} />
      <div style={{ ...styles.orb, ...styles.orbCyan }} />

      {/* 🔷 NAVBAR */}
      <nav
        style={{
          ...styles.navbar,
          padding: scrolled ? "8px 20px" : "14px 25px",
          width: scrolled ? "90%" : "94%",
          background: scrolled ? "rgba(19, 48, 6, 0.85)" : "rgba(255, 255, 255, 0.03)",
          borderColor: scrolled ? electricCyan + "44" : "rgba(255, 255, 255, 0.08)",
        }}
      >
        <div style={styles.logoContainer}>
          <div style={{ ...styles.logoIcon, boxShadow: `0 0 15px ${electricCyan}44` }}>⚡</div>
          <div style={{ ...styles.logoText, color: lightOrange }}>
            SWITCHITY <span style={{ color: electricCyan, fontWeight: 300 }}>NETWORKS</span>
          </div>
        </div>

        {/* Desktop Links */}
        <ul className="nav-links-container" style={styles.navLinks}>
          {menuItems.map((item, index) => (
            <li
              key={index}
              style={styles.menuItem}
              onMouseEnter={() => setActiveMenu(index)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div
                style={{
                  ...styles.glassButton,
                  color: activeMenu === index ? electricCyan : "#eee",
                  background: activeMenu === index ? "rgba(255, 255, 255, 0.05)" : "transparent",
                }}
              >
                {item.name}
                <span
                  style={{
                    ...styles.arrow,
                    transform: activeMenu === index ? "rotate(180deg)" : "rotate(0deg)",
                    color: activeMenu === index ? electricCyan : "inherit",
                  }}
                >
                  ▾
                </span>
              </div>

              {activeMenu === index && (
                <ul
                  className="dropdown-enter"
                  style={{ ...styles.dropdown, top: "100%" }} // ✅ dropdown aligned with menu item
                  onMouseEnter={() => setActiveMenu(index)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  {item.subMenu.map((sub, i) => (
                    <li
                      key={i}
                      style={styles.dropdownItem}
                      onClick={() => {
                        if (subRoutes[sub]) {
                          navigate(subRoutes[sub]); // ✅ navigate to page
                          setActiveMenu(null);
                        }
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "rgba(6, 249, 236, 0.1)";
                        e.target.style.color = electricCyan;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.color = "#94a3b8";
                      }}
                    >
                      {sub}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <div style={styles.mobileToggle} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? "✕" : "☰"}
        </div>
      </nav>

      {/* 🚀 ROUTES */}
      <Routes>
        <Route path="/api-services" element={<ApiServices />} />
        <Route path="/automation" element={<Automation />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>

      {/* 🔷 HERO */}
      <main style={styles.mainContent}>
        <div style={styles.glassCard}>
          <div style={styles.badge}>SYSTEM STATUS: OPTIMAL</div>
          <h1 style={styles.title}>
            Next-Gen <br />
            <span style={styles.gradientText}>Automation.</span>
          </h1>
          <p style={styles.subtitle}>
            Empowering network infrastructure with **Electric Glass** architecture. 
            High speed. Zero friction. Pure Switchity.
          </p>
          <div style={styles.buttonGroup}>
            <button
              className="btn-hover"
              style={{ ...styles.ctaPrimary, background: `linear-gradient(135deg, ${electricCyan}, #04b3a8)` }}
            >
              Initialize Node
            </button>
            <button className="btn-hover" style={styles.ctaSecondary}>
              Protocol Docs
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  pageWrapper: {
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
    position: "relative",
    background: "#02040a",
  },
  orb: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(120px)",
    zIndex: 1,
  },
  orbOrange: { width: "45vw", height: "45vw", background: "rgba(255, 179, 71, 0.08)", top: "-10%", right: "-5%" },
  orbCyan: { width: "40vw", height: "40vw", background: "rgba(19, 48, 6, 0.4)", bottom: "-10%", left: "-5%" },
  navbar: {
    position: "fixed",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
    margin: "20px auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "100px",
    backdropFilter: "blur(300px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    transition: "0.4s cubic-bezier(0.19, 1, 0.22, 1)",
  },
  logoContainer: { display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" },
  logoIcon: { width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", background: "rgba(6, 249, 236, 0.15)", fontSize: "18px" },
  logoText: { fontWeight: "800", fontSize: "17px", letterSpacing: "1px" },
  navLinks: { display: "flex", gap: "5px" },
  mobileToggle: { display: "flex", cursor: "pointer", fontSize: "24px", color: "#06F9EC", padding: "0 10px" },
  menuItem: { position: "relative" },
  glassButton: { padding: "10px 18px", borderRadius: "100px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", transition: "0.3s", fontWeight: "600", fontSize: "13px" },
  arrow: { fontSize: "10px", transition: "0.3s" },
  dropdown: {
    position: "absolute",
    top: "100%", // ✅ aligned with parent
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(5, 15, 5, 0.95)",
    borderRadius: "24px",
    padding: "10px",
    minWidth: "220px",
    border: "1px solid rgba(6, 249, 236, 0.2)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
    zIndex: 1001,
  },
  dropdownItem: { padding: "12px 20px", borderRadius: "14px", cursor: "pointer", color: "#94a3b8", fontSize: "14px", transition: "0.3s" },
  mainContent: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 20px" },
  glassCard: { maxWidth: "850px", textAlign: "center", zIndex: 10, padding: "60px 40px", borderRadius: "40px", background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(255, 255, 255, 0.05)", backdropFilter: "blur(10px)" },
  badge: { display: "inline-block", padding: "6px 16px", borderRadius: "100px", background: "rgba(6, 249, 236, 0.1)", border: "1px solid #06F9EC33", color: "#06F9EC", fontSize: "10px", fontWeight: "800", letterSpacing: "2px", marginBottom: "25px" },
  title: { fontSize: "clamp(3rem, 10vw, 5.5rem)", fontWeight: "800", lineHeight: 0.9, marginBottom: "30px" },
  gradientText: { background: "linear-gradient(to right, #06F9EC, #FFB347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  subtitle: { color: "#94a3b8", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto 40px", lineHeight: "1.6" },
  buttonGroup: { display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" },
  ctaPrimary: { padding: "18px 40px", borderRadius: "100px", border: "none", color: "#030712", fontWeight: "800", fontSize: "15px", cursor: "pointer", transition: "0.3s" },
  ctaSecondary: { padding: "18px 40px", borderRadius: "100px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontWeight: "600", fontSize: "15px", cursor: "pointer", transition: "0.3s" },
};

export default AppWrapper;