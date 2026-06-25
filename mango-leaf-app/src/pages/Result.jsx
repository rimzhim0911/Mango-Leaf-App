import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-black text-white text-3xl font-bold">
        No Result Found
      </div>
    );
  }

  const confidence = Number(state.confidence);

  const severity =
    confidence >= 95
      ? "Very High"
      : confidence >= 85
      ? "High"
      : confidence >= 70
      ? "Moderate"
      : "Low";

  const badgeColor =
    state.disease === "Healthy"
      ? "bg-emerald-500"
      : "bg-red-500";

  const diseaseInfo = {
    Anthracnose: {
  description:
    "Anthracnose is a fungal disease caused by Colletotrichum species. It affects mango leaves, flowers, and fruits, causing dark lesions and reducing overall plant health. The disease spreads rapidly during warm and humid weather conditions.",

  symptoms: [
    "Dark brown or black spots on leaves",
    "Irregular lesions with yellow halos",
    "Leaf drying and curling",
    "Premature leaf and fruit drop",
    "Reduced flowering and fruit production",
    "Black sunken spots on fruits"
  ],

  treatment: [
    "Apply copper-based fungicides",
    "Remove and destroy infected leaves",
    "Prune affected branches",
    "Use recommended fungicide sprays during flowering",
    "Maintain orchard sanitation"
  ],

  prevention: [
    "Avoid overhead irrigation",
    "Ensure proper airflow between trees",
    "Regular orchard inspection",
    "Remove fallen leaves and debris",
    "Apply preventive fungicide sprays during humid seasons"
  ]
},
"Bacterial Canker": {
  description:
    "Bacterial Canker is a serious bacterial disease that affects mango leaves, stems, branches and fruits. It causes dark lesions, cracking and reduced plant growth, which can significantly lower fruit quality and yield.",

  symptoms: [
    "Dark water-soaked lesions",
    "Leaf yellowing",
    "Stem cracking",
    "Premature leaf fall",
    "Reduced plant growth",
    "Fruit lesions"
  ],

  treatment: [
    "Apply copper bactericides",
    "Prune infected branches",
    "Disinfect pruning tools",
    "Remove infected parts",
    "Avoid unnecessary injuries"
  ],

  prevention: [
    "Use disease-free plants",
    "Maintain orchard hygiene",
    "Inspect trees regularly",
    "Control insect damage",
    "Ensure proper nutrition"
  ]
},

"Die Back": {
  description:
    "Die Back is a fungal disease in which branches start drying from the tip toward the base. If ignored, it can spread rapidly and reduce fruit production.",

  symptoms: [
    "Dry branch tips",
    "Leaf shedding",
    "Dark lesions",
    "Reduced flowering",
    "Weak growth"
  ],

  treatment: [
    "Prune infected branches",
    "Apply copper fungicides",
    "Seal pruning wounds",
    "Remove infected debris",
    "Maintain tree nutrition"
  ],

  prevention: [
    "Regular pruning",
    "Good drainage",
    "Healthy orchard sanitation",
    "Early disease monitoring",
    "Avoid mechanical damage"
  ]
},

"Gall Midge": {
  description:
    "Gall Midge is a harmful insect pest that attacks young mango leaves and shoots. It causes abnormal growth and weakens plant development.",

  symptoms: [
    "Leaf curling",
    "Blister-like swellings",
    "Premature leaf drop",
    "Distorted leaves",
    "Poor growth"
  ],

  treatment: [
    "Use recommended insecticides",
    "Remove infected leaves",
    "Use sticky traps",
    "Monitor pest population",
    "Encourage natural predators"
  ],

  prevention: [
    "Inspect young shoots",
    "Maintain orchard cleanliness",
    "Use IPM practices",
    "Control breeding sites",
    "Avoid excessive humidity"
  ]
},

"Cutting Weevil": {
  description:
    "Cutting Weevil is an insect pest that damages mango leaves by cutting leaf tissue, reducing photosynthesis and slowing plant growth.",

  symptoms: [
    "Semi-circular leaf cuts",
    "Feeding damage",
    "Reduced leaf area",
    "Poor growth",
    "Irregular leaf edges"
  ],

  treatment: [
    "Apply suitable insecticides",
    "Destroy affected leaves",
    "Use biological control",
    "Monitor infestation",
    "Remove weeds"
  ],

  prevention: [
    "Regular orchard inspection",
    "Maintain clean surroundings",
    "Use pest traps",
    "Control breeding sites",
    "Encourage beneficial insects"
  ]
},
"Powdery Mildew": {
  description:
    "Powdery Mildew is a fungal disease characterized by a white powder-like coating on mango leaves, flowers and young fruits. It reduces photosynthesis and significantly affects flowering and fruit development.",

  symptoms: [
    "White powdery patches",
    "Leaf curling",
    "Flower drop",
    "Reduced fruit set",
    "Poor fruit development",
    "Stunted plant growth"
  ],

  treatment: [
    "Apply sulfur fungicides",
    "Use potassium bicarbonate spray",
    "Remove infected parts",
    "Improve air circulation",
    "Reduce excess humidity"
  ],

  prevention: [
    "Maintain proper spacing",
    "Ensure good sunlight",
    "Inspect regularly",
    "Avoid excessive irrigation",
    "Use resistant varieties"
  ]
},

"Sooty Mould": {
  description:
    "Sooty Mould is a fungal disease that develops as a black soot-like coating on mango leaves. It grows on honeydew secreted by insects like aphids and mealybugs, reducing photosynthesis and weakening the tree.",

  symptoms: [
    "Black powdery coating",
    "Reduced photosynthesis",
    "Yellow leaves",
    "Weak growth",
    "Honeydew insects present",
    "Premature leaf drop"
  ],

  treatment: [
    "Spray neem oil",
    "Use fungicide if required",
    "Control aphids and mealybugs",
    "Wash affected leaves",
    "Improve airflow"
  ],

  prevention: [
    "Regular pest inspection",
    "Maintain orchard hygiene",
    "Use Integrated Pest Management",
    "Prune crowded branches",
    "Monitor during humid weather"
  ]
},

Healthy: {
  description:
    "The uploaded mango leaf appears healthy with no visible symptoms of disease or insect damage. Healthy leaves support efficient photosynthesis and ensure proper plant growth and fruit production.",

  symptoms: [
    "Uniform green color",
    "No spots or lesions",
    "Normal leaf structure",
    "Healthy veins",
    "No insect damage"
  ],

  treatment: [
    "No treatment required",
    "Continue regular irrigation",
    "Maintain balanced fertilization",
    "Monitor periodically"
  ],

  prevention: [
    "Inspect leaves regularly",
    "Maintain orchard hygiene",
    "Provide balanced nutrition",
    "Avoid overwatering",
    "Monitor for pests"
  ]
}

};

const info =
  diseaseInfo[state.disease] || {
    description: "Information not available.",
    symptoms: [],
    treatment: [],
    prevention: [],
  };

const progress = Math.min(Number(state.confidence), 100);

return (

<div className="min-h-screen bg-gradient-to-br from-[#04180d] via-[#0a2b16] to-black py-10 px-5">

<div className="max-w-3xl mx-auto">

<div className="relative group rounded-[30px] overflow-hidden shadow-2xl">

<img

src={state.image}

alt="Leaf"

className="w-full h-[320px] object-cover transition-all duration-700 group-hover:scale-110"

/>

<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/>

<div className="absolute bottom-6 left-6">

<p className="text-green-300 text-sm uppercase tracking-[4px]">

📷 Uploaded Leaf

</p>

<h2 className="text-white text-3xl font-black">

AI Analysis Complete

</h2>

</div>

</div>

<div

className="mt-8 rounded-[32px] p-8 bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-700 shadow-[0_20px_70px_rgba(16,185,129,0.4)] transition-all duration-500 hover:-translate-y-2"

>

<div className="flex justify-between items-center">

<div>

<p className="uppercase text-green-100 tracking-[4px] text-xs">

AI Detection Result

</p>

<h1 className="text-5xl font-black text-white mt-3">

{state.disease}

</h1>

</div>

<div className={`${badgeColor} px-5 py-2 rounded-full text-white font-bold`}>

{severity}

</div>

</div>

<div className="mt-8">

<div className="flex justify-between text-white mb-2">

<span>Prediction Confidence</span>

<span>{progress}%</span>

</div>

<div className="h-4 rounded-full bg-white/20 overflow-hidden">

<div

style={{width:`${progress}%`}}

className="h-full rounded-full bg-white transition-all duration-[2000ms]"

/>

</div>

</div>

</div>

{/* Description */}

<div
className="
group
mt-8
rounded-[28px]
bg-white/10
backdrop-blur-xl
border border-white/10
p-7
text-white
transition-all
duration-500
hover:-translate-y-2
hover:bg-white/15
hover:border-green-400
hover:shadow-[0_15px_40px_rgba(34,197,94,0.3)]
">

<div className="flex items-center gap-4 mb-5">

<div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center text-2xl">
📖
</div>

<div>

<h2 className="text-2xl font-bold">
Description
</h2>

<p className="text-sm text-gray-300">
Disease Overview
</p>

</div>

</div>

<p className="leading-8 text-gray-200">
{info.description}
</p>

</div>

{/* Symptoms */}

<div
className="
group
mt-6
rounded-[28px]
bg-white/10
backdrop-blur-xl
border border-white/10
p-7
text-white
transition-all
duration-500
hover:-translate-y-2
hover:border-yellow-400
hover:shadow-[0_15px_40px_rgba(234,179,8,0.25)]
">

<div className="flex items-center gap-4 mb-5">

<div className="w-14 h-14 rounded-2xl bg-yellow-500 flex items-center justify-center text-2xl">
🩺
</div>

<div>

<h2 className="text-2xl font-bold">
Symptoms
</h2>

<p className="text-sm text-gray-300">
Common Signs
</p>

</div>

</div>

<ul className="space-y-4">

{info.symptoms.map((item,index)=>(

<li
key={index}
className="flex gap-4 items-start"
>

<div className="mt-2 w-3 h-3 rounded-full bg-yellow-400"/>

<span className="text-gray-200">
{item}
</span>

</li>

))}

</ul>

</div>

{/* Treatment */}

<div
className="
group
mt-6
rounded-[28px]
bg-white/10
backdrop-blur-xl
border border-white/10
p-7
text-white
transition-all
duration-500
hover:-translate-y-2
hover:border-blue-400
hover:shadow-[0_15px_40px_rgba(59,130,246,.25)]
">

<div className="flex items-center gap-4 mb-5">

<div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center text-2xl">
💊
</div>

<div>

<h2 className="text-2xl font-bold">
Treatment
</h2>

<p className="text-sm text-gray-300">
Recommended Action
</p>

</div>

</div>

<ul className="space-y-4">

{info.treatment.map((item,index)=>(

<li
key={index}
className="flex gap-4 items-start"
>

<div className="mt-2 w-3 h-3 rounded-full bg-blue-400"/>

<span className="text-gray-200">
{item}
</span>

</li>

))}

</ul>

</div>

{/* Prevention */}

<div
className="
group
mt-6
rounded-[28px]
bg-white/10
backdrop-blur-xl
border border-white/10
p-7
text-white
transition-all
duration-500
hover:-translate-y-2
hover:border-emerald-400
hover:shadow-[0_15px_40px_rgba(16,185,129,.25)]
">

<div className="flex items-center gap-4 mb-5">

<div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-2xl">
🛡️
</div>

<div>

<h2 className="text-2xl font-bold">
Prevention
</h2>

<p className="text-sm text-gray-300">
Future Protection
</p>

</div>

</div>

<ul className="space-y-4">

{info.prevention.map((item,index)=>(

<li
key={index}
className="flex gap-4 items-start"
>

<div className="mt-2 w-3 h-3 rounded-full bg-emerald-400"/>

<span className="text-gray-200">
{item}
</span>

</li>

))}

</ul>

</div>

<button

onClick={()=>navigate("/")}

className="
group
w-full
mt-10
py-5
rounded-3xl
font-bold
text-xl
text-white
bg-gradient-to-r
from-green-500
via-emerald-500
to-green-700
shadow-[0_15px_40px_rgba(34,197,94,.35)]
transition-all
duration-500
hover:scale-[1.02]
hover:-translate-y-1
"

>

🌿 Scan Another Leaf

</button>

</div>

</div>

);

}