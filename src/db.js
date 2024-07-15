import mongoose from 'mongoose';

const connect = async () => {
    try {
      mongoose.connection.on("connected", () => {
        console.log("connected to mongoDB");
      });
  
      mongoose.connection.on("error", () => {
          console.log("error while connection..");
        });
        
      const connect = await mongoose.connect("mongodb+srv://lakhanimeet0098:OasPKtL4lRQ4hQ8W@cluster0.36exeiw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    } catch (error) {
      console.error("database connection error...", error);
    }
  };

  

export default connect;