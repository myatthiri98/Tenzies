import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { T } from "../theme";

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: any;
  testID?: string;
}

function CustomButton ({ title, onPress, disabled = false, style }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, style, disabled && styles.disabledButton]} 
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;

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
