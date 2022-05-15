const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const FoodModel = require("./models/Food");
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

app.use(cors());
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

  const food = new FoodModel({ foodName: foodName, daysSinceIAte: days });

  try {
    await food.save();
    res.send("inserted data"); //show on screen that data has been sent
  } catch (err) {
    console.log(err);
  }
});

app.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;

  console.log(id);
  // fix put request

  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
  // try {
  //   await FoodModel.findById(id, (updatedFood) => {
  //     // updatedFood.foodName = newFoodName;
  //     console.log(updatedFood);
  //     // updatedFood.save();
  //     res.send("update");
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
});

app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
