import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { T } from "../design-system/theme";

type DieCardProps = {
  value: number;
  isHeld: boolean;
  onHold: () => void;
};

function DieCard({ value, isHeld, onHold }: DieCardProps) {
  return (
    <Pressable style={[styles.die, isHeld && styles.held]} onPress={onHold}>
      <Text style={styles.dieText}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  die: {
    backgroundColor: T.colors.white,
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
