import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Die from "../dice/Die";
import Button from "../design-system/components/Button";
import { T } from "../design-system/theme";
import CustomModal from "../design-system/components/CustomModal";

// Constants to avoid magic strings and numbers
const DICE_COUNT = 10;
const DIE_MAX_VALUE = 9;
const ROLL_BUTTON_TEXT = "Roll";
const WIN_TEXT = "You Won!";
const TITLE_TEXT = "Tenzies";
const INSTRUCTIONS_TEXT =
  "Roll until all dice are the same. Click each die to freeze it at its current value between rolls.";
const ATTEMPTS_TEXT = "Attempts: ";
const WIN_TITLE_TEXT = "Congratulations!";
const WIN_MESSAGE_TEXT = "You won the game! Do you want to play again?";
const PLAY_AGAIN_BUTTON_TEXT = "Play Again";

const generateDice = () =>
  Array.from({ length: DICE_COUNT }, () =>
    Math.ceil(Math.random() * DIE_MAX_VALUE)
  );

const MainScreen = () => {
  const [dice, setDice] = useState<number[]>(generateDice());
  const [heldDice, setHeldDice] = useState<boolean[]>(
    Array(DICE_COUNT).fill(false)
  );
  const [attempts, setAttempts] = useState<number>(0);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [heldDiceValue, setHeldDiceValue] = useState<number | null>(null);

  const rollDice = useCallback(() => {
    if (!gameWon && canRoll()) {
      setAttempts((prev) => prev + 1);
      setDice((prevDice) =>
        prevDice.map((die, idx) =>
          heldDice[idx] ? die : Math.ceil(Math.random() * DIE_MAX_VALUE)
        )
      );
      checkForWin();
    }
  }, [gameWon, heldDice]);

  const holdDie = useCallback(
    (index: number) => {
      if (!gameWon) {
        setHeldDice((prevHeldDice) => {
          const newHeldDice = [...prevHeldDice];
          newHeldDice[index] = !newHeldDice[index];

          const newHeldValue = dice[index];
          setHeldDiceValue(newHeldValue);

          return newHeldDice;
        });
      }
    },
    [gameWon, dice]
  );

  const canRoll = useCallback(() => {
    const heldDiceValues = dice.filter((_, idx) => heldDice[idx]);
    return (
      heldDiceValues.length === 0 ||
      heldDiceValues.every((value) => value === heldDiceValues[0])
    );
  }, [heldDice, dice]);

  const isCorrect = useCallback(
    (index: number) => heldDiceValue !== null && heldDiceValue === dice[index],
    [heldDiceValue, dice]
  );

  const checkForWin = useCallback(() => {
    const allHeld = heldDice.every((isHeld) => isHeld);
    const allSameValue = dice.every((die) => die === dice[0]);

    if (allHeld && allSameValue) {
      setGameWon(true);
    }
  }, [heldDice, dice]);

  const resetGame = useCallback(() => {
    setAttempts(0);
    setDice(generateDice());
    setHeldDice(Array(DICE_COUNT).fill(false));
    setGameWon(false);
    setHeldDiceValue(null);
  }, []);

  const handlePlayAgain = useCallback(() => {
    resetGame();
  }, [resetGame]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{TITLE_TEXT}</Text>
      <Text style={styles.instructions}>{INSTRUCTIONS_TEXT}</Text>
      <Text style={styles.attempts}>
        {ATTEMPTS_TEXT}
        {attempts}
      </Text>

      <FlatList
        data={dice}
        renderItem={({ item, index }) => (
          <Die
            value={item}
            isHeld={heldDice[index]}
            isCorrect={isCorrect(index)}
            onHold={() => holdDie(index)}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        numColumns={5}
        contentContainerStyle={styles.diceContainer}
        columnWrapperStyle={styles.columnWrapper}
        style={styles.flatList}
      />

      <Button
        title={gameWon ? WIN_TEXT : ROLL_BUTTON_TEXT}
        onPress={rollDice}
        disabled={!canRoll() || gameWon}
      />

      <CustomModal
        visible={gameWon}
        title={WIN_TITLE_TEXT}
        message={WIN_MESSAGE_TEXT}
        onClose={handlePlayAgain}
        buttonText={PLAY_AGAIN_BUTTON_TEXT}
      />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: T.colors.white,
    padding: T.spacing.medium,
  },
  title: {
    fontSize: T.font.size.large,
    fontWeight: T.font.weight.bold,
    marginBottom: T.spacing.small,
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
  flatList: {
    flexGrow: 0,
    marginBottom: T.spacing.medium,
  },
  diceContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  columnWrapper: {
    justifyContent: "center",
  },
});
