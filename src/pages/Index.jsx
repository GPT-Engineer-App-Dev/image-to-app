import { useState, useEffect } from "react";
import { Box, Button, Container, Text, VStack, HStack } from "@chakra-ui/react";

const Index = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [on, setOn] = useState(true);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  const handleStartStop = () => {
    setRunning(!running);
  };

  const handleSplitReset = () => {
    if (running) {
      // Handle split logic here
      console.log("Split at:", time);
    } else {
      setTime(0);
    }
  };

  const handleOnOff = () => {
    setOn(!on);
    if (!on) {
      setTime(0);
      setRunning(false);
    }
  };

  if (!on) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Text fontSize="2xl">Stopwatch is Off</Text>
        <Button onClick={handleOnOff} colorScheme="red">On</Button>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Box bg="black" color="white" p={4} borderRadius="md" width="100%" textAlign="center">
          <Text fontSize="4xl">{new Date(time * 1000).toISOString().substr(11, 8)}</Text>
        </Box>
        <HStack spacing={4}>
          <Button onClick={handleStartStop} colorScheme="green">{running ? "Stop" : "Start"}</Button>
          <Button onClick={handleSplitReset} colorScheme="yellow">{running ? "Split" : "Reset"}</Button>
          <Button onClick={handleOnOff} colorScheme="red">Off</Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;