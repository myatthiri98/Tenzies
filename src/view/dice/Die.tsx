import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { T } from "../design-system/theme";

interface DieProps {
  value: number;
  isHeld: boolean;
  isCorrect?: boolean;
  onHold: () => void;
}

const Die = ({ value, isHeld, onHold, isCorrect = false }: DieProps) => {
  const determineBackgroundColor = () => {
    if (!isHeld) return T.colors.white;
    return isCorrect ? T.colors.correct : T.colors.held;
  };

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
    alignItems: "center",
    justifyContent: "center",
    margin: T.spacing.small,
    borderRadius: T.border.radius.roundedSmall,
    borderWidth: T.border.width.thin,
    borderColor: T.colors.grey,
  },
  dieText: {
    fontSize: T.font.size.medium,
    fontWeight: T.font.weight.bold,
  },
});
