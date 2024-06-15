// Lucky Didan Ramadhan
// HW 12
import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

function Board() {
  //penggunaan state pada squares dan nextValue, lalu membuat variabel winner dan status
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextValue, setNextValue] = useState("X");
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  function selectSquare(square) {
    //penyelesaian function selectSquare
    if (squares[square] || winner) return;
    const updatedSquares = [...squares];
    updatedSquares[square] = nextValue;
    setSquares(updatedSquares);
    setNextValue(calculateNextValue(updatedSquares));
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setNextValue("X");
  }

  function renderSquare(i) {
    return (
      <Button
        size='lg'
        height='100px'
        width='100px'
        onClick={() => selectSquare(i)}
        colorScheme='cyan'
        variant={squares[i] ? "outline" : "outline"}
      >
        {squares[i]}
      </Button>
    );
  }

  return (
    <VStack spacing={8} mt={5}>
      <Heading as='h2' size='lg'>
        {status}
      </Heading>
      <Grid templateColumns='repeat(3, 1fr)' gap={3}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </Grid>
      <Button size='lg' onClick={restart} colorScheme='red' mt={10}>
        Restart
      </Button>
    </VStack>
  );
}

function Game() {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100vh'
    >
      <Board />
    </Box>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
