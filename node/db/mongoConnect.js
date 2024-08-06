const mongoose = require('mongoose');
require("dotenv").config(); 

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://repro:yDIr4pfv6Fbkmp7j@repro.v8llfpe.mongodb.net/');
  // await mongoose.connect(process.env.MONGO_CONNECT);
  console.log("mongo connect repro atlas");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

