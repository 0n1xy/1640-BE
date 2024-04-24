const mongoose = require("mongoose");
require("dotenv").config();

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DB_HTTP);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Bad connection");
    console.log(error);
  }
}


// , {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }
module.exports = { connectDatabase };
