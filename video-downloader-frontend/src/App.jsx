import { useState } from "react";
import axios from "axios";
import { Vortex } from "./components/Vortex.jsx";
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
    <Vortex>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 max-w-xl w-full text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Video Downloader
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 mb-4"
          >
            <input
              type="text"
              placeholder="Enter Streamtape link..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              required
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 transition"
            >
              {loading ? "Resolving..." : "Get Link"}
            </button>
          </form>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          {downloadLink && (
            <div className="bg-white/70 rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                Preview
              </h2>
              <a
                href={downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-blue-700 underline"
              >
                {downloadLink}
              </a>
              <br />
              <a
                href={downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3"
              >
                <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
                  Open / Download Video
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </Vortex>
  );
}

export default App;
