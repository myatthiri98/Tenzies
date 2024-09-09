import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Die from "../design-system/components/Die";

const MainScreen = () => {
  const [dice, setDice] = useState<number[]>(
    Array.from({ length: 10 }, () => Math.ceil(Math.random() * 6))
  );
  const [heldDice, setHeldDice] = useState<boolean[]>(Array(10).fill(false));
  const [attempts, setAttempts] = useState<number>(0);

  const rollDice = () => {
    setAttempts(attempts + 1);
    setDice(
      dice.map((die, idx) =>
        heldDice[idx] ? die : Math.ceil(Math.random() * 6)
      )
    );
  };

  const holdDie = (index: number) => {
    setHeldDice(
      heldDice.map((isHeld, idx) => (idx === index ? !isHeld : isHeld))
    );
  };

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
            onHold={() => holdDie(index)}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        numColumns={5}
        columnWrapperStyle={styles.diceContainer}
      />

      <TouchableOpacity style={styles.rollButton} onPress={rollDice}>
        <Text style={styles.rollButtonText}>Roll</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
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
  },
  diceContainer: {
    justifyContent: "center",
    marginBottom: 10,
  },
  rollButton: {
    backgroundColor: "#4b6aff",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  rollButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MainScreen;
