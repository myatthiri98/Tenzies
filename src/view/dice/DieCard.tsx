import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { T } from "../design-system/theme";

type DieCardProps = {
  value: number;
  isHeld: boolean;
  onHold: () => void;
  selectedNumber: number | null;
};

function DieCard({ value, isHeld, onHold ,selectedNumber}: DieCardProps) {

    const backgroundColor = isHeld
    ? value === selectedNumber
      ? T.colors.held// matched color
      : T.colors.red   // mismatched color
    : T.colors.white;
    
  return (
    <Pressable style={[styles.die, { backgroundColor }]} onPress={onHold}>
    <Text style={styles.dieText}>{value}</Text>
  </Pressable>
  );
}

const styles = StyleSheet.create({
  die: {
    borderRadius: T.border.radius.extraRounded,
    padding: T.spacing.small,
    margin: T.spacing.extraSmall,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: T.shadow.color,
    shadowOffset: T.shadow.offset,
    shadowOpacity: T.shadow.opacity,
    shadowRadius: T.shadow.radius,
    elevation: 3,
  },
  held: {
    backgroundColor: T.colors.held,
    borderColor: T.colors.primary,
    borderWidth: T.border.width.thick,
  },
  dieText: {
    fontSize: T.font.size.medium,
    fontWeight: T.font.weight.bold,
    color: T.colors.darkBlue,
  },
});

export default DieCard;
