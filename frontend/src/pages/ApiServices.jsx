import React, { useState } from "react";
import axios from "axios";

export default function ApiServices() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus("");
  };

  const handleUpload = async () => {
    if (!file) return setStatus("Please select a file first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus(`✅ Upload successful: ${response.data.message || "File received"}`);
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload failed. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        color: "white",
        padding: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        minHeight: "100vh",
        background: "#02040a",
      }}
    >
      <h1>Upload Your Text File 🚀</h1>

      <input type="file" accept=".txt" onChange={handleFileChange} />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {status && <p>{status}</p>}
    </div>
  );
}