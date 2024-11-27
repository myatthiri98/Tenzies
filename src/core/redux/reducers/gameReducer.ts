import {
    ROLL_DICE,
    HOLD_DIE,
    CHECK_FOR_WIN,
    RESET_GAME,
    GameState,
    GameActions
  } from "../types";
  
  const initialState: GameState = {
    dice: Array(10).fill(1).map(() => Math.ceil(Math.random() * 9)),
    heldDice: Array(10).fill(false),
    attempts: 0,
    status: "PLAYING",
  };
  
  const gameReducer = (state = initialState, action: GameActions): GameState => {
    switch (action.type) {
      case ROLL_DICE:
        if (state.status === "PLAYING") {
          return {
            ...state,
            attempts: state.attempts + 1,
            dice: state.dice.map((die, idx) =>
              state.heldDice[idx] ? die : Math.ceil(Math.random() * 9)
            ),
          };
        }
        return state;
  
      case HOLD_DIE:
        return {
          ...state,
          heldDice: state.heldDice.map((held, idx) =>
            idx === action.payload ? !held : held
          ),
        };
  
      case CHECK_FOR_WIN:
        if (
          state.heldDice.every((isHeld) => isHeld) &&
          state.dice.every((value) => value === state.dice[0])
        ) {
          return { ...state, status: "WON" };
        }
        return state;
  
      case RESET_GAME:
        return initialState;
  
      default:
        return state;
    }
  };
  
  export default gameReducer;
  