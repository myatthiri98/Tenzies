import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

interface DieProps {
  value: number;
  isHeld: boolean;
  isCorrect?: boolean;
  onHold: () => void;
}

const Die = ({ value, isHeld, onHold, isCorrect = false }: DieProps) => {
  function determineBackgroundColor() {
    if (!isHeld) return "#ffffff";
    return isCorrect ? "#ff6666" : "#00cc99";
  }

  const isHeldStyle = {
    backgroundColor: determineBackgroundColor(),
  };

  return (
    <TouchableOpacity style={[styles.die, isHeldStyle]} onPress={onHold}>
      <Text style={styles.dieText}>{value}</Text>
    </TouchableOpacity>
  );
};

export default Die;

const styles = StyleSheet.create({
  die: {
    width: 50,
    height: 50,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dieText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
