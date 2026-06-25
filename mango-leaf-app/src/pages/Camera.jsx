import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    startCamera();

    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Unable to access camera.");
      console.log(err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");

    setCapturedImage(image);

    stopCamera();
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const usePhoto = async () => {
    const response = await fetch(capturedImage);

    const blob = await response.blob();

    const file = new File([blob], "camera-image.png", {
      type: "image/png",
    });

    navigate("/", {
      state: {
        image: file,
        preview: capturedImage,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-black flex justify-center items-center p-5">

      <div className="w-full max-w-md">

        <h1 className="text-white text-3xl font-bold text-center mb-6">
          📷 Camera
        </h1>

        <div className="overflow-hidden rounded-3xl border-2 border-green-500 shadow-2xl">

          {!capturedImage ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-[450px] object-cover"
            />
          ) : (
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-[450px] object-cover"
            />
          )}

        </div>

        <canvas
          ref={canvasRef}
          className="hidden"
        />

        {!capturedImage ? (
          <button
            onClick={capturePhoto}
            className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold text-lg transition"
          >
            📸 Capture Photo
          </button>
        ) : (
          <div className="flex gap-4 mt-6">

            <button
              onClick={retakePhoto}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black py-4 rounded-2xl font-bold"
            >
              🔄 Retake
            </button>

            <button
              onClick={usePhoto}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold"
            >
              ✅ Use Photo
            </button>

          </div>
        )}

        <button
          onClick={() => {
            stopCamera();
            navigate("/");
          }}
          className="w-full mt-4 border border-red-500 text-red-400 py-4 rounded-2xl hover:bg-red-500 hover:text-white transition"
        >
          ✖ Close Camera
        </button>

      </div>

    </div>
  );
}