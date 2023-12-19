import mongoose from "mongoose";

const ConnectDatabase = () => {
  mongoose.connect(process.env.MongoDburl + "/zEcom").then(() => {
    console.log("Database is conneted");
  });
};


export { ConnectDatabase };
