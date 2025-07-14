import { useState } from "react";
import { Vortex } from "./components/Vortex.jsx";
import Input from "./components/Input.jsx";
import "./App.css";

function App() {
  const [downloadLink, setDownloadLink] = useState("");

  return (
    <Vortex>
      <div className="flex items-center justify-center min-h-screen px-4 ">
        <div className=" shadow-2xl rounded-2xl p-8 max-w-xl w-full text-center">
          <h1 className="text-3xl font-bold mb-6 text-white">
            Video Downloader
          </h1>

          <Input onDownloadLink={setDownloadLink} />

          {downloadLink && (
            <div className="bg-white/70 rounded-lg p-4 shadow-md mt-6">
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
