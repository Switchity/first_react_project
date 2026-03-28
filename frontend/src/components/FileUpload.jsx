// src/components/FileUpload.jsx

import { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/upload_students/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setData(res.data);

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Students File</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <br /><br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {/* 📊 Show Result */}
      {data && (
        <div style={{ marginTop: "20px" }}>
          <h3>Upload Summary</h3>
          <p>✅ Success: {data.success_count}</p>
          <p>❌ Errors: {data.error_count}</p>

          {/* Show errors */}
          {data.errors?.length > 0 && (
            <div>
              <h4>Error Details:</h4>
              <ul>
                {data.errors.map((err, index) => (
                  <li key={index}>
                    Line {err.line}: {err.error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FileUpload;