const mongoose = require("mongoose");
const Question = require("./models/Question");
const SafePlace = require("./models/SafePlace");
const BuildingType = require("./models/BuildingType");
const SafetyRecommendation = require("./models/SafetyRecommendation");

mongoose.connect("mongodb://127.0.0.1:27017/resqguide");

const buildingTypes = [
  { name: "residential" },
  { name: "commercial" },
  { name: "hospital" },
  { name: "school" },
  { name: "warehouse" }
];

const questions = [
  // ─── RESIDENTIAL ───
  { questionText: "What type of fire suppression system is installed?", buildingType: "residential", options: ["None", "Basic", "Adequate", "Advanced"], weight: 1 },
  { questionText: "Are emergency exits clearly marked and accessible?", buildingType: "residential", options: ["Blocked", "Limited", "Adequate", "Well-marked"], weight: 1 },
  { questionText: "What is the condition of the electrical wiring?", buildingType: "residential", options: ["Poor", "Average", "Good", "Excellent"], weight: 1 },
  { questionText: "Is there a working smoke/fire alarm system?", buildingType: "residential", options: ["None", "Basic", "Adequate", "Advanced"], weight: 1 },
  { questionText: "How would you rate the structural integrity of the building?", buildingType: "residential", options: ["Poor", "Average", "Good", "Excellent"], weight: 1 },

  // ─── COMMERCIAL ───
  { questionText: "Does the building have a fire suppression sprinkler system?", buildingType: "commercial", options: ["None", "Basic", "Adequate", "Advanced"], weight: 1 },
  { questionText: "Are emergency exits clearly marked and accessible?", buildingType: "commercial", options: ["Blocked", "Limited", "Adequate", "Well-marked"], weight: 1 },
  { questionText: "Is there a building evacuation plan posted?", buildingType: "commercial", options: ["None", "Basic", "Adequate", "Advanced"], weight: 1 },
  { questionText: "What is the condition of the electrical systems?", buildingType: "commercial", options: ["Poor", "Average", "Good", "Excellent"], weight: 1 },
  { questionText: "Are fire extinguishers present and regularly serviced?", buildingType: "commercial", options: ["None", "Basic", "Adequate", "Advanced"], weight: 1 },

  // ─── HOSPITAL ───
  { questionText: "Is there a backup power generator for emergencies?", buildingType: "hospital", options: ["None", "Basic", "Adequate", "Advanced"], weight: 1 },
  { questionText: "Are emergency exits clearly marked and accessible?", buildingType: "hospital", options: ["Blocked", "Limited", "Adequate", "Well-marked"], weight: 1 },
  { questionText: "What is the fire suppression system level?", buildingType: "hospital", options: ["None", "Basic", "Adequate", "Advanced"], weight: 1 },
  { questionText: "Is there a patient evacuation protocol?", buildingType: "hospital", options: ["None", "Basic", "Adequate", "Advanced"], weight: 1 },
  { questionText: "How is the overall structural integrity rated?", buildingType: "hospital", options: ["Poor", "Average", "Good", "Excellent"], weight: 1 },

  // ─── SCHOOL ───
  { questionText: "Are fire drills conducted regularly?", buildingType: "school", options: ["None", "Basic", "Adequate", "Advanced"], weight: 1 },
  { questionText: "Are emergency exits clearly marked and accessible?", buildingType: "school", options: ["Blocked", "Limited", "Adequate", "Well-marked"], weight: 1 },
  { questionText: "Is there a fire alarm system in place?", buildingType: "school", options: ["None", "Basic", "Adequate", "Advanced"], weight: 1 },
  { questionText: "What is the condition of the electrical systems?", buildingType: "school", options: ["Poor", "Average", "Good", "Excellent"], weight: 1 },
  { questionText: "Is there a disaster response plan available?", buildingType: "school", options: ["None", "Basic", "Adequate", "Advanced"], weight: 1 },

  // ─── WAREHOUSE ───
  { questionText: "What type of fire suppression system is installed?", buildingType: "warehouse", options: ["None", "Basic", "Adequate", "Advanced"], weight: 1 },
  { questionText: "Are hazardous materials stored safely?", buildingType: "warehouse", options: ["Poor", "Average", "Good", "Excellent"], weight: 1 },
  { questionText: "Are emergency exits clearly marked and accessible?", buildingType: "warehouse", options: ["Blocked", "Limited", "Adequate", "Well-marked"], weight: 1 },
  { questionText: "What is the condition of the structural supports?", buildingType: "warehouse", options: ["Poor", "Average", "Good", "Excellent"], weight: 1 },
  { questionText: "Is there an emergency response plan for workers?", buildingType: "warehouse", options: ["None", "Basic", "Adequate", "Advanced"], weight: 1 }
];

const safePlaces = [
  { name: "City General Hospital", type: "Hospital", location: "12 Main Street, City Center" },
  { name: "Central Community Hall", type: "Shelter", location: "45 Park Avenue, Downtown" },
  { name: "Green Valley School", type: "Evacuation Center", location: "78 School Road, North Zone" },
  { name: "District Police Headquarters", type: "Emergency Services", location: "3 Law Street, East Block" },
  { name: "Red Cross Relief Camp", type: "Relief Camp", location: "90 Relief Road, West End" },
  { name: "Municipal Fire Station No. 1", type: "Fire Station", location: "22 Fire Lane, Central District" }
];

const recommendations = [
  { riskLevel: "Low", recommendation: "Maintain current safety standards and conduct periodic reviews.", category: "General" },
  { riskLevel: "Low", recommendation: "Schedule annual safety inspections to keep standards up.", category: "Inspection" },
  { riskLevel: "Medium", recommendation: "Improve safety equipment to meet minimum required standards.", category: "Equipment" },
  { riskLevel: "Medium", recommendation: "Ensure all emergency exits are clearly marked and unobstructed.", category: "Exits" },
  { riskLevel: "Medium", recommendation: "Train staff and occupants on emergency procedures.", category: "Training" },
  { riskLevel: "High", recommendation: "Install fire extinguishers immediately on every floor.", category: "Fire Safety" },
  { riskLevel: "High", recommendation: "Create and post a detailed emergency evacuation plan.", category: "Evacuation" },
  { riskLevel: "High", recommendation: "Conduct regular safety drills at least once per quarter.", category: "Drills" },
  { riskLevel: "High", recommendation: "Inspect and repair all electrical systems immediately.", category: "Electrical" },
  { riskLevel: "High", recommendation: "Engage a certified structural engineer to assess building integrity.", category: "Structure" }
];

const seed = async () => {
  try {
    // Clear existing data
    await Question.deleteMany({});
    await SafePlace.deleteMany({});
    await BuildingType.deleteMany({});
    await SafetyRecommendation.deleteMany({});

    // Insert fresh data
    await BuildingType.insertMany(buildingTypes);
    await Question.insertMany(questions);
    await SafePlace.insertMany(safePlaces);
    await SafetyRecommendation.insertMany(recommendations);

    console.log("✅ Database seeded successfully!");
    console.log(`   → ${buildingTypes.length} building types`);
    console.log(`   → ${questions.length} questions (5 per building type)`);
    console.log(`   → ${safePlaces.length} safe places`);
    console.log(`   → ${recommendations.length} safety recommendations`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seed();
