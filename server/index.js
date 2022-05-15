const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const FoodeModel = require("./models/Food");
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

apps.use(cors());
app.use(express.json()); //receive informtion from frontend using json format

mongoose.connect(
  "mongodb+srv://Andy:Mongo4life@crud.guk3v.mongodb.net/food?retryWrites=true&w=majority",

  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;
  console.log(foodName);
  console.log(days);

  const food = new FoodeModel({ foodName: foodName, daysSinceIAte: days });

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
