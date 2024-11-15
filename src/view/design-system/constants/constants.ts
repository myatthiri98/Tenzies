export const DICE_COUNT = 10;
export const DIE_MAX_VALUE = 9;

export enum Labels {
  ROLL_BUTTON = "Roll",
  WIN = "You Won!",
  TITLE = "Tenzies",
  INSTRUCTIONS = "Roll until all dice are the same...",
  ATTEMPTS = "Attempts: ",
  WIN_TITLE = "Congratulations!",
  WIN_MESSAGE = "You won the game! Play again?",
  PLAY_AGAIN = "Play Again",
}

export enum GameState {
  PLAYING,
  WON,
}

export const generateDice = () => Array.from({ length: DICE_COUNT }, () => Math.ceil(Math.random() * DIE_MAX_VALUE));
