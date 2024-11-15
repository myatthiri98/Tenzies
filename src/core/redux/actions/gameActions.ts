import { CHECK_FOR_WIN, GameActions, HOLD_DIE, RESET_GAME, ROLL_DICE } from "../types";

export const rollDice = (): GameActions => ({
  type: ROLL_DICE,
});

export const holdDie = (index: number): GameActions => ({
  type: HOLD_DIE,
  payload: index,
});

export const checkForWin = (): GameActions => ({
  type: CHECK_FOR_WIN,
});

export const resetGame = (): GameActions => ({
  type: RESET_GAME,
});
