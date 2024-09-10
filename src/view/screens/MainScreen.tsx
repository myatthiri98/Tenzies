import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import Die from "../design-system/components/Die";

const generateDice = () =>
  Array.from({ length: 10 }, () => Math.ceil(Math.random() * 9));

const MainScreen = () => {
  const [dice, setDice] = useState<number[]>(generateDice());
  const [heldDice, setHeldDice] = useState<boolean[]>(Array(10).fill(false));
  const [attempts, setAttempts] = useState<number>(0);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [heldDiceValue, setHeldDiceValue] = useState<number | null>(null);

  const rollDice = useCallback(() => {
    if (!gameWon && canRoll()) {
      setAttempts((prev) => prev + 1);
      setDice((prevDice) =>
        prevDice.map((die, idx) =>
          heldDice[idx] ? die : Math.ceil(Math.random() * 9)
        )
      );
      checkForWin();
    }
  }, [gameWon, heldDice]);

  const holdDie = useCallback(
    (index: number) => {
      if (!gameWon) {
        setHeldDice((prevHeldDice) => {
          const newHeldDice = [...prevHeldDice];
          newHeldDice[index] = !newHeldDice[index];

          const newHeldValue = dice[index];
          setHeldDiceValue(newHeldValue);

          return newHeldDice;
        });
      }
    },
    [gameWon, dice]
  );

  const canRoll = useCallback(() => {
    const heldDiceValues = dice.filter((_, idx) => heldDice[idx]);
    return (
      heldDiceValues.length === 0 ||
      heldDiceValues.every((value) => value === heldDiceValues[0])
    );
  }, [heldDice, dice]);

  const isCorrect = useCallback(
    (index: number) => heldDiceValue !== null && heldDiceValue === dice[index],
    [heldDiceValue, dice]
  );

  const checkForWin = useCallback(() => {
    const allHeld = heldDice.every((isHeld) => isHeld);
    const allSameValue = dice.every((die) => die === dice[0]);

    if (allHeld && allSameValue) {
      setGameWon(true);
      resetGame();
    }
  }, [heldDice, dice]);

  const resetGame = useCallback(() => {
    setTimeout(() => {
      setAttempts(0);
      setDice(generateDice());
      setHeldDice(Array(10).fill(false));
      setGameWon(false);
      setHeldDiceValue(null);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tenzies</Text>
      <Text style={styles.instructions}>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </Text>
      <Text style={styles.attempts}>Attempts: {attempts}</Text>

      <FlatList
        data={dice}
        renderItem={({ item, index }) => (
          <Die
            value={item}
            isHeld={heldDice[index]}
            isCorrect={isCorrect(index)}
            onHold={() => holdDie(index)}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        numColumns={5}
        contentContainerStyle={styles.diceContainer}
        columnWrapperStyle={styles.columnWrapper}
        style={styles.flatList}
      />

      <TouchableOpacity
        style={[styles.rollButton, !canRoll() && styles.disabledRollButton]}
        onPress={rollDice}
        disabled={!canRoll() || gameWon}
      >
        <Text style={styles.rollButtonText}>
          {gameWon ? "You Won!" : "Roll"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  attempts: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
  },
  flatList: {
    flexGrow: 0,
    marginBottom: 20,
  },
  diceContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  columnWrapper: {
    justifyContent: "center",
  },
  rollButton: {
    backgroundColor: "#4b6aff",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignSelf: "center",
  },
  disabledRollButton: {
    backgroundColor: "#aaa",
  },
  rollButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
