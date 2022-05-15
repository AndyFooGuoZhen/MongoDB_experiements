import { VStack, Text, Input, Box, Button } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

function App() {
  const [foodName, setFoodName] = useState("");
  const [daysEaten, setDaysEaten] = useState(0);

  const sendToDatabase = () => {
    axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: daysEaten,
    });
  };

  return (
    <VStack w={"100%"} h={"100vh"} justify="center" align={"center"}>
      <Box w={"70%"} justify="center" align={"center"}>
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
        <Button onClick={sendToDatabase}>Post to database</Button>
      </Box>
    </VStack>
  );
}

export default App;
