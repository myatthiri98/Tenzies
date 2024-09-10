import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { T } from "../theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: any;
  testID?: string;
}

const Button = ({ title, onPress, disabled = false, style }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, style, disabled && styles.disabledButton]} // Merge passed style with default button style
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: T.colors.primary,
    paddingVertical: T.spacing.small,
    paddingHorizontal: T.spacing.large,
    borderRadius: T.border.radius.extraRounded,
    alignSelf: "center",
  },
  disabledButton: {
    backgroundColor: T.colors.disabled,
  },
  text: {
    color: T.colors.white,
    fontWeight: T.font.weight.bold,
    fontSize: T.font.size.medium,
  },
});
