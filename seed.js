const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://supercluster.td99e5s.mongodb.net/superData',
  {
    user: 'pradipkakade7777_db_user',
    pass: 'Welcome@1234',
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const planetSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  image: String
});

const Planet = mongoose.model('planets', planetSchema);

async function seed() {
  await Planet.deleteMany({});

  await Planet.insertMany([
    {
      id: 1,
      name: "Mercury",
      description: "Mercury is the smallest planet and closest to the Sun.",
      image: "/images/mercury.png"
    },
    {
      id: 2,
      name: "Venus",
      description: "Venus has a thick atmosphere and is the hottest planet.",
      image: "/images/venus.png"
    },
    {
      id: 3,
      name: "Earth",
      description: "Earth is the only planet known to support life.",
      image: "/images/earth.png"
    },
    {
      id: 4,
      name: "Mars",
      description: "Mars is known as the Red Planet.",
      image: "/images/mars.png"
    },
    {
      id: 5,
      name: "Jupiter",
      description: "Jupiter is the largest planet in the Solar System.",
      image: "/images/jupiter.png"
    },
    {
      id: 6,
      name: "Saturn",
      description: "Saturn is famous for its rings.",
      image: "/images/saturn.png"
    },
    {
      id: 7,
      name: "Uranus",
      description: "Uranus rotates on its side.",
      image: "/images/uranus.png"
    },
    {
      id: 8,
      name: "Neptune",
      description: "Neptune is the farthest planet from the Sun.",
      image: "/images/neptune.png"
    }
  ]);

  console.log("✅ Planet data inserted");
  process.exit();
}

seed();
