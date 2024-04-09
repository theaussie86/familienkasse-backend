import mongoose from "mongoose";

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@familienkasse.i5hq0pp.mongodb.net/${process.env.NODE_ENV === "test" ? process.env.TEST_DB_NAME : process.env.DB_NAME}?retryWrites=true&w=majority&appName=Familienkasse`;

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
  } catch (error) {
    console.error("MongoDB connection failed");
    console.error(error);
    process.exit(1);
  }
};
