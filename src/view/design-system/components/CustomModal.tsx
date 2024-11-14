import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import { T } from "../theme";

const DEFAULT_BUTTON_TEXT = "OK";

interface CustomModalProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  buttonText?: string;
}

const CustomModal = ({
  visible,
  title,
  message,
  onClose,
  buttonText = DEFAULT_BUTTON_TEXT,
}: CustomModalProps) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{message}</Text>
          <Button title={buttonText} onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: T.colors.modalOverlay,
  },
  modalView: {
    margin: T.spacing.medium,
    backgroundColor: T.colors.white,
    borderRadius: T.spacing.small,
    padding: T.spacing.large,
    alignItems: "center",
    shadowColor: T.colors.grey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: T.font.size.large,
    fontWeight: T.font.weight.bold,
    marginBottom: T.spacing.small,
  },
  modalText: {
    fontSize: T.font.size.regular,
    marginBottom: T.spacing.medium,
    textAlign: "center",
  },
});
