import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { rollDice, holdDie, resetGame, checkForWin } from "../../core/redux/actions/gameActions";
import CustomButton from "../design-system/components/CustomButton";
import CustomModal from "../design-system/components/CustomModal";
import DieList from "../dice/DieList";
import { T } from "../design-system/theme";
import { Labels } from "../design-system/constants/constants";
import { GameActions, GameState } from "../../core/redux/types";
import { Dispatch } from "redux";

function MainScreen() {
  const dice = useSelector((state: GameState) => state.dice);
  const heldDice = useSelector((state: GameState) => state.heldDice);
  const attempts = useSelector((state: GameState) => state.attempts);
  const status = useSelector((state: GameState) => state.status);
  const dispatch = useDispatch<Dispatch<GameActions>>();

  const rollDiceHandler = () => {
    dispatch(rollDice() as GameActions);
    dispatch(checkForWin() as GameActions);
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
      <DieList dice={dice} heldDice={heldDice} onHoldDie={holdDieHandler} />
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
