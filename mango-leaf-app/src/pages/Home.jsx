import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import mangoLeaf from "../assets/mango.jpg";
import FeatureCard from "../components/Featurecard";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeSection, setActiveSection] = useState("");
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
  if (location.state?.image) {
    setImage(location.state.image);
    setPreview(location.state.preview);

    navigate("/", {
      replace: true,
      state: null,
    });
  }
}, [location, navigate]);
  
  
  const handlePredict = async () => {
  if (!image) {
    alert("Please upload an image first");
    return;
  }

  const formData = new FormData();
  formData.append("image", image);

  try {
    setLoading(true);

    const response = await fetch(
      "https://rim0911-mango-leaf-backend-clean.hf.space/predict",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.disease === "Not_Mango") {
      setWarning(
        "⚠️ This does not appear to be a mango leaf. Please upload a clear mango leaf image."
      );
      return;
    }

    setWarning("");

    navigate("/result", {
      state: {
        image: preview,
        disease: data.disease,
        confidence: data.confidence,
      },
    });

  } catch (error) {
    console.log(error);
    alert("Prediction Failed");
  } finally {
    setLoading(false);
  }
};

  return (

    <div className="min-h-screen bg-linear-to-br from-green-950 via-green-900 to-black flex justify-center p-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mt-8">
          

          <h1 className="text-3xl font-bold text-white mt-3">
            Mango Leaf Disease Detection
          </h1>

          <p className="text-green-200 mt-2">
            AI Powered Disease Detection
          </p>
        </div>

        {/* Hero Card */}
        <div className="mt-8 bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-green-500 shadow-2xl">

          <div className="relative">

 <img src={mangoLeaf} alt="Mango Leaf" className="w-full h-48 object-cover rounded-2xl" />

</div>

          <h2 className="text-white text-2xl font-bold mt-5">
            Detect Diseases Instantly
          </h2>

          <p className="text-gray-300 mt-2">
            Upload a mango leaf image and get disease detection,
            severity analysis, prevention and treatment suggestions.
          </p>

          <input
          type="file"
          id="upload"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];

            if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setResult(null);
       }
      }}
     />

          <label
            htmlFor="upload"
            className="block w-full text-center mt-6 bg-green-500 hover:bg-green-600 transition-all duration-300 text-white py-4 rounded-2xl font-semibold shadow-lg cursor-pointer"
          >
            📁 Upload Leaf Image
          </label>

         <button
  onClick={() => navigate("/camera")}
  className="w-full mt-3 bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 text-black py-4 rounded-2xl font-semibold shadow-lg"
>
  📷 Open Camera
</button>

{preview && (
  <div className="mt-4 bg-white/5 border border-green-500/20 rounded-2xl p-3">

    <div className="flex justify-between items-center mb-3">
      <p className="text-green-300 text-sm font-medium">
        Uploaded Leaf
      </p>

      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
        Ready for Analysis
      </span>
    </div>

    <img
      src={preview}
      alt="Preview"
      className="w-full h-40 object-cover rounded-xl"
    />
  </div>
)}



{warning && (
  <div className="mt-4 bg-red-400/50 border border-red-500 rounded-2xl p-4">
    <p className="text-white text-sm font-medium">
      {warning}
    </p>
  </div>
)}

{image && (
  <button
    onClick={handlePredict}
    disabled={loading}
    className="w-full mt-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-green-900/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
  >
    {loading ? "⏳ Analyzing Leaf..." : "🔍 Detect Disease"}
  </button>
)}

 


</div>

        {/* Knowledge Cards */}
        <div className="grid grid-cols-2 gap-4 mt-6">

          <FeatureCard
            icon="🌿"
            title="Diseases"
            onClick={() => setActiveSection("diseases")}
          />

          <FeatureCard
            icon="🔍"
            title="Symptoms"
            onClick={() => setActiveSection("symptoms")}
          />

          <FeatureCard
            icon="💊"
            title="Treatment"
            onClick={() => setActiveSection("treatment")}
          />

          <FeatureCard
            icon="🛡️"
            title="Prevention"
            onClick={() => setActiveSection("prevention")}
          />

        </div>

        {/* Information Section */}
        {activeSection && (
          <div className="mt-6 bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-green-500 ">

            {activeSection === "diseases" && (
              <>
                <h2 className="text-white text-xl font-bold mb-4">
                  🌿 Mango Diseases
                </h2>


    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scroll">

      <div className="bg-white/10 p-4 rounded-2xl text-white border border-white/10">
        <h3 className="font-bold text-green-300 text-xl">Anthracnose</h3>
        <p className="text-sm mt-2">
          A fungal disease that causes dark brown or black spots on mango leaves.
          It spreads rapidly in warm and humid conditions.
        </p>
      </div>

      <div className="bg-white/10 p-4 rounded-2xl text-white border border-white/10">
        <h3 className="font-bold text-green-300 text-xl">Bacterial Canker</h3>
        <p className="text-sm mt-2">
          Causes cracks, lesions and drying of leaves. It can reduce plant growth
          and fruit production.
        </p>
      </div>

      <div className="bg-white/10 p-4 rounded-2xl text-white border border-white/10 hover:bg-green-500/10 transition-all duration-300">
  <h3 className="font-bold text-green-300 text-xl">Die Back</h3>
  <p className="text-sm mt-2">
    A fungal disease that causes drying of twigs and branches from the tip. It weakens the tree and reduces flowering and fruit production.
  </p>
</div>

<div className="bg-white/10 p-4 rounded-2xl text-white border border-white/10 hover:bg-green-500/10 transition-all duration-300">
  <h3 className="font-bold text-green-300 text-xl">Gall Midge</h3>
  <p className="text-sm mt-2">
    An insect pest that attacks young mango leaves and shoots, causing curling, blister-like swellings, and poor plant growth.
  </p>
</div>

<div className="bg-white/10 p-4 rounded-2xl text-white border border-white/10 hover:bg-green-500/10 transition-all duration-300">
  <h3 className="font-bold text-green-300 text-xl">Cutting Weevil</h3>
  <p className="text-sm mt-2">
    A harmful insect pest that feeds on mango leaves, creating semi-circular cuts and reducing the leaf's ability to photosynthesize.
  </p>
</div>

<div className="bg-white/10 p-4 rounded-2xl text-white border border-white/10 hover:bg-green-500/10 transition-all duration-300">
  <h3 className="font-bold text-green-300 text-xl">Powdery Mildew</h3>
  <p className="text-sm mt-2">
    A fungal disease recognized by a white powder-like coating on leaves and flowers, leading to flower drop and reduced fruit development.
  </p>
</div>

<div className="bg-white/10 p-4 rounded-2xl text-white border border-white/10 hover:bg-green-500/10 transition-all duration-300">
  <h3 className="font-bold text-green-300 text-xl">Sooty Mould</h3>
  <p className="text-sm mt-2">
    A black fungal coating that develops on honeydew secreted by insects such as aphids and mealybugs, reducing photosynthesis and leaf health.
  </p>
</div>

<div className="bg-white/10 p-4 rounded-2xl text-white border border-white/10 hover:bg-green-500/10 transition-all duration-300">
  <h3 className="font-bold text-green-300 text-xl">Healthy</h3>
  <p className="text-sm mt-2">
    A healthy mango leaf has a uniform green color, no visible spots, lesions, or insect damage, ensuring efficient photosynthesis and vigorous growth.
  </p>
</div>

    </div>
  </>
)}
        

            {activeSection === "symptoms" && (
              <>
                <h2 className="text-white text-xl font-bold mb-4">
                  🔍 Symptoms Guide
                </h2>
               <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-xl text-white">
  • Black or brown spots on leaves
</div>

<div className="bg-white/10 p-4 rounded-xl text-white">
  • White powdery coating on leaf surface
</div>

<div className="bg-white/10 p-4 rounded-xl text-white">
  • Yellowing and curling of leaves
</div>

<div className="bg-white/10 p-4 rounded-xl text-white">
  • Drying of leaf tips and branches
</div>

<div className="bg-white/10 p-4 rounded-xl text-white">
  • Premature leaf fall
</div>
               </div>
            
              </>
            )}

            {activeSection === "treatment" && (
              <>
                <h2 className="text-white text-xl font-bold mb-4">
                  💊 Treatment & Management Guide
                </h2>

                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scroll">

  <div className="bg-white/10 p-4 rounded-2xl text-white border border-white/10">
    <h3 className="font-bold text-green-300 text-xl">Anthracnose</h3>
    <p className="text-sm mt-2">
      Spray copper-based fungicides, remove infected leaves and branches, and
      maintain orchard hygiene to prevent the spread of infection.
    </p>
  </div>

  <div className="bg-white/10 p-4 rounded-2xl text-white border border-white/10">
    <h3 className="font-bold text-green-300 text-xl">Bacterial Canker</h3>
    <p className="text-sm mt-2">
      Apply copper bactericides, prune infected branches, disinfect pruning
      tools, and avoid injuring the tree during maintenance.
    </p>
  </div>

  <div className="bg-white/10 p-4 rounded-2xl text-white border border-white/10">
    <h3 className="font-bold text-green-300 text-xl">Die Back</h3>
    <p className="text-sm mt-2">
      Remove infected twigs immediately, apply fungicides to pruning wounds,
      and improve tree nutrition for healthy recovery.
    </p>
  </div>

  <div className="bg-white/10 p-4 rounded-2xl text-white border border-white/10">
    <h3 className="font-bold text-green-300 text-xl">Gall Midge</h3>
    <p className="text-sm mt-2">
      Spray recommended insecticides, remove affected leaves, use sticky traps,
      and encourage natural predators to reduce pest populations.
    </p>
  </div>

  <div className="bg-white/10 p-4 rounded-2xl text-white border border-white/10">
    <h3 className="font-bold text-green-300 text-xl">Cutting Weevil</h3>
    <p className="text-sm mt-2">
      Control the pest using suitable insecticides, collect damaged leaves,
      remove weeds, and monitor trees regularly for new infestations.
    </p>
  </div>

  <div className="bg-white/10 p-4 rounded-2xl text-white border border-white/10">
    <h3 className="font-bold text-green-300 text-xl">Powdery Mildew</h3>
    <p className="text-sm mt-2">
      Apply sulfur-based fungicides, improve air circulation, remove infected
      plant parts, and avoid excessive humidity around the trees.
    </p>
  </div>

  <div className="bg-white/10 p-4 rounded-2xl text-white border border-white/10">
    <h3 className="font-bold text-green-300 text-xl">Sooty Mould</h3>
    <p className="text-sm mt-2">
      Wash affected leaves, spray neem oil or fungicides, and control aphids,
      mealybugs, and other insects producing honeydew.
    </p>
  </div>

  <div className="bg-white/10 p-4 rounded-2xl text-white border border-white/10">
    <h3 className="font-bold text-green-300 text-xl">Healthy</h3>
    <p className="text-sm mt-2">
      No treatment is required. Continue proper irrigation, balanced
      fertilization, regular monitoring, and maintain overall orchard hygiene.
    </p>
  </div>

</div>
                
              </>
            )}

            {activeSection === "prevention" && (
              <>
                <h2 className="text-white text-xl font-bold mb-4">
                  🛡️ Prevention Tips
                </h2>

               <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-xl text-white">
  Regularly inspect mango plants for early symptoms.
</div>

<div className="bg-white/10 p-4 rounded-xl text-white">
  Remove infected leaves and branches immediately.
</div>

<div className="bg-white/10 p-4 rounded-xl text-white">
  Maintain proper spacing between trees.
</div>

<div className="bg-white/10 p-4 rounded-xl text-white">
  Avoid excess watering and water stagnation.
</div>

<div className="bg-white/10 p-4 rounded-xl text-white">
  Use disease-free planting material.
</div>
               </div>
              </>
            )}

          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 mb-6">
          <p className="text-gray-400 text-sm">
            Powered by AI & Deep Learning
          </p>
        </div>

      </div>
    </div>
  );
}