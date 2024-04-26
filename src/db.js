const mongoose = require('mongoose');

const connect = async () => {
    try {
      mongoose.connection.on("connected", () => {
        console.log("connected to mongoDB");
      });
  
      mongoose.connection.on("error", () => {
          console.log("error while connection..");
        });
  
      const connect = await mongoose.connect('mongodb+srv://italiyaravi704:<password>@user.tvxbzs0.mongodb.net/?retryWrites=true&w=majority&appName=user');
    } catch (error) {
      console.error("database connection error...", error);
    }
  };

  export default connect;