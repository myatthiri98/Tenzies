export interface GameState {
    dice: number[];
    heldDice: boolean[];
    attempts: number;
    status: "PLAYING" | "WON";
  }
  
  export const ROLL_DICE = "ROLL_DICE";
  export const HOLD_DIE = "HOLD_DIE";
  export const CHECK_FOR_WIN = "CHECK_FOR_WIN";
  export const RESET_GAME = "RESET_GAME";
  
  export interface RollDiceAction {
    type: typeof ROLL_DICE;
  }
  
  export interface HoldDieAction {
    type: typeof HOLD_DIE;
    payload: number;
  }
  
  export interface CheckForWinAction {
    type: typeof CHECK_FOR_WIN;
  }
  
  export interface ResetGameAction {
    type: typeof RESET_GAME;
  }
  
  export type GameActions =
    | RollDiceAction
    | HoldDieAction
    | CheckForWinAction
    | ResetGameAction;
  