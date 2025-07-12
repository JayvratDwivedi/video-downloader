import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setDownloadLink("");

    try {
      const response = await axios.post("http://localhost:8080/api/resolve", {
        url: inputUrl,
      });

      setDownloadLink(response.data.downloadUrl);
    } catch (err) {
      setError("Error fetching download link.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Video Downloader</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Streamtape link..."
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Resolving..." : "Get Download Link"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {downloadLink && (
        <div className="preview">
          <h2>Preview</h2>
          <a href={downloadLink} target="_blank" rel="noopener noreferrer">
            {downloadLink}
          </a>
          <br />
          <a href={downloadLink} target="_blank" rel="noopener noreferrer">
            <button>Open / Download Video</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
