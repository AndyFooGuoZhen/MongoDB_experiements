import {
  VStack,
  Text,
  Input,
  Box,
  Button,
  GridItem,
  Grid,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [foodName, setFoodName] = useState("");
  const [daysEaten, setDaysEaten] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [newFood, setNewFood] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
      console.log(foodList);
    });
  }, []);

  const sendToDatabase = () => {
    axios
      .post("http://localhost:3001/insert", {
        foodName: foodName,
        days: daysEaten,
      })
      .then(() => {
        setFoodList([
          ...foodList,
          { foodName: foodName, daysSinceIAte: daysEaten },
        ]);
      });
  };

  const updateFood = (id) => {
    console.log(id);
    axios.put("http://localhost:3001/update", { id: id, newFoodName: newFood });
  };

  return (
    <VStack
      w={"100%"}
      minH={"100vh"}
      minW={"400px"}
      justify="center"
      align={"center"}
    >
      <Box w={"90%"} justify="center" align={"center"}>
        <Text p={"2rem"}> CRUD experiment</Text>
        <Input
          p={"2rem"}
          mb={"2rem"}
          placeholder="Enter Food Name"
          onChange={(event) => {
            setFoodName(event.target.value);
            console.log(foodName);
          }}
        ></Input>
        <Input
          p={"2rem"}
          mb={"2rem"}
          placeholder="Enter Days eaten Name"
          onChange={(event) => {
            setDaysEaten(event.target.value);
            console.log(daysEaten);
          }}
        ></Input>
        <Button onClick={sendToDatabase} mb={"2rem"}>
          Post to database
        </Button>
      </Box>

      <SimpleGrid w={"80%"} minChildWidth="300px" spacing="40px">
        {foodList.map((food, key) => {
          return (
            <Box
              key={key}
              borderRadius="3rem"
              mb={"2rem"}
              p="5rem"
              border="1px"
              borderColor="gray.300"
              justifyContent={"center"}
            >
              <Text textAlign={"center"} mb={"1rem"}>
                {food.foodName + " " + food.daysSinceIAte}
              </Text>
              <Input
                placeholder="New Food Name"
                mb={"1rem"}
                onChange={(event) => {
                  setNewFood(event.target.value);
                }}
              />
              <Button mr={"1rem"} onClick={() => updateFood(food._id)}>
                Update
              </Button>
              <Button>Delete</Button>
            </Box>
          );
        })}
      </SimpleGrid>
    </VStack>
  );
}

export default App;
