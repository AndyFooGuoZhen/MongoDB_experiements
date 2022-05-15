const express = require("express");
const mongoose = require("mongoose");
const app = express();

const FoodeModel = require("./models/Food");
app.use(express.json()); //receive informtion from frontend using json format

mongoose.connect(
  "mongodb+srv://Andy:Mongo4life@crud.guk3v.mongodb.net/food?retryWrites=true&w=majority",

  {
    useNewUrlParser: true,
  }
);

app.get("/", async (req, res) => {
  const food = new FoodeModel({ foodName: "Apple", daysSinceIAte: 3 });

  try {
    await food.save();
    res.send("inserted data"); //show on screen that data has been sent
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
