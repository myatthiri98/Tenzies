import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../design-system/components/CustomButton";
import CustomModal from "../design-system/components/CustomModal";
import DieList from "../dice/DieList";
import { GameState, generateDice, Labels } from "../design-system/constants/constants";
import { T } from "../design-system/theme";

function MainScreen() {
  const [dice, setDice] = useState<number[]>(generateDice());
  const [heldDice, setHeldDice] = useState<boolean[]>(Array(10).fill(false));
  const [attempts, setAttempts] = useState<number>(0);
  const [gameState, setGameState] = useState<GameState>(GameState.PLAYING);

  const rollDice = useCallback(() => {
    if (gameState === GameState.PLAYING) {
      setDice((prevDice) =>
        prevDice.map((die, idx) => (heldDice[idx] ? die : Math.ceil(Math.random() * 9)))
      );
      setAttempts((prev) => prev + 1);
      checkForWin(dice, heldDice);
    }
  }, [gameState, heldDice, dice]);

  const holdDie = useCallback((index: number) => {
    setHeldDice((prev) =>
      prev.map((isHeld, idx) => (idx === index ? !isHeld : isHeld))
    );
  }, []);

  const checkForWin = useCallback((currentDice: number[], currentHeldDice: boolean[]) => {
    if (currentHeldDice.every((isHeld) => isHeld) && currentDice.every((value) => value === currentDice[0])) {
      setGameState(GameState.WON);
    }
  }, []);

  const resetGame = useCallback(() => {
    setDice(generateDice());
    setHeldDice(Array(10).fill(false));
    setAttempts(0);
    setGameState(GameState.PLAYING);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Labels.TITLE}</Text>
      <Text style={styles.instructions}>{Labels.INSTRUCTIONS}</Text>
      <Text style={styles.attempts}>
        {Labels.ATTEMPTS} {attempts}
      </Text>
      <DieList dice={dice} heldDice={heldDice} onHoldDie={holdDie} />
      <View style={styles.buttonContainer}>
        <CustomButton
          title={gameState === GameState.WON ? Labels.WIN : Labels.ROLL_BUTTON}
          onPress={rollDice}
        />
      </View>
      <CustomModal
        visible={gameState === GameState.WON}
        title={Labels.WIN_TITLE}
        message={Labels.WIN_MESSAGE}
        onClose={resetGame}
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
