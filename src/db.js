import mongoose from 'mongoose';

const connect = async () => {
    try {
      mongoose.connection.on("connected", () => {
        console.log("connected to mongoDB");
      });
  
      mongoose.connection.on("error", () => {
          console.log("error while connection..");
        });
  
      const connect = await mongoose.connect("mongodb+srv://italiyaravi704:S1roMzo21k5lC8Fu@user-data.uegxxdl.mongodb.net/?retryWrites=true&w=majority&appName=user-data");
    } catch (error) {
      console.error("database connection error...", error);
    }
  };

export default connect;