import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface DieProps {
  value: number;
  isHeld: boolean;
  onHold: () => void;
}

const Die = ({ value, isHeld, onHold }) => {
  return (
    <TouchableOpacity
      style={[styles.die, isHeld ? styles.heldDie : styles.defaultDie]}
      onPress={onHold}
    >
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
  },
  defaultDie: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  heldDie: {
    backgroundColor: "#ff6666",
    borderColor: "#ff6666",
  },
  dieText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
