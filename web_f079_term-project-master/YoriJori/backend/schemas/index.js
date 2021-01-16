const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }
    mongoose.connect(
      "mongodb://localhost:27017/yorijoriDB",
      {
        dbName: "yorijoriDB"
      },
      error => {
        if (error) {
          console.log("Connect Error: ", error);
        } else {
          console.log("Connect is Successful");
        }
      }
    );
  };
  connect();
  mongoose.connection.on("error", error => {
    console.log("Connecting Error", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Reconnecting...");
    connect();
  });
  require("./user");
  require("./board");
  require("./comment");
};
