import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../design-system/components/CustomButton";
import CustomModal from "../design-system/components/CustomModal";
import DieList from "../dice/DieList";
import { T } from "../design-system/theme";
import { Labels } from "../design-system/constants/constants";
import { rollDice, holdDie, checkForWin, resetGame } from '../../core/redux/slices/gameSlice';
import { RootState } from "../../core/redux/store";


function MainScreen() {
  const dice = useSelector((state: RootState) => state.game.dice);
  const heldDice = useSelector((state: RootState) => state.game.heldDice);
  const attempts = useSelector((state: RootState) => state.game.attempts);
  const status = useSelector((state: RootState) => state.game.status);
  const selectedNumber = useSelector((state: RootState) => state.game.selectedNumber); 
  const dispatch = useDispatch();

  const rollDiceHandler = () => {
    if (status === 'MISMATCH') {
      Alert.alert("Mismatched Dice", "Please select dice with the same number before rolling.");
      return;
    }
    dispatch(rollDice());
    dispatch(checkForWin());
  };

  const holdDieHandler = (index: number) => {
    dispatch(holdDie(index));
  };

  const resetGameHandler = () => {
    dispatch(resetGame());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Labels.TITLE}</Text>
      <Text style={styles.instructions}>{Labels.INSTRUCTIONS}</Text>
      <Text style={styles.attempts}>
        {Labels.ATTEMPTS} {attempts}
      </Text>
      <DieList dice={dice} heldDice={heldDice} onHoldDie={holdDieHandler} selectedNumber={selectedNumber} />
      <View style={styles.buttonContainer}>
        <CustomButton
          title={status === "WON" ? Labels.WIN : Labels.ROLL_BUTTON}
          onPress={rollDiceHandler}
        />
      </View>
      <CustomModal
        visible={status === "WON"}
        title={Labels.WIN_TITLE}
        message={Labels.WIN_MESSAGE}
        onClose={resetGameHandler}
        buttonText={Labels.PLAY_AGAIN}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: T.colors.lightBlue,
    padding: T.spacing.medium,
  },
  title: {
    fontSize: T.font.size.xLarge,
    fontWeight: T.font.weight.bold,
    marginBottom: T.spacing.medium,
    textAlign: "center",
  },
  instructions: {
    fontSize: T.font.size.regular,
    marginBottom: T.spacing.medium,
    textAlign: "center",
  },
  attempts: {
    fontSize: T.font.size.regular,
    fontWeight: T.font.weight.bold,
    marginBottom: T.spacing.medium,
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: T.spacing.xxLarge,
  },
});

export default MainScreen;
