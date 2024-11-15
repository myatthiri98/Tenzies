import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GameState = {
  dice: number[];
  heldDice: boolean[];
  attempts: number;
  status: 'PLAYING' | 'WON' | 'MISMATCH';
  selectedNumber: number | null; 
};

const initialState: GameState = {
  dice: Array(10).fill(1).map(() => Math.ceil(Math.random() * 9)),
  heldDice: Array(10).fill(false),
  attempts: 0,
  status: 'PLAYING',
  selectedNumber: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    rollDice: (state) => {
        const canRoll = ['PLAYING', 'MISMATCH'].includes(state.status);
        state.attempts += canRoll ? 1 : 0;
        state.dice = state.dice.map((die, idx) =>
          canRoll && !state.heldDice[idx] ? Math.ceil(Math.random() * 9) : die
        );
        state.status = canRoll ? 'PLAYING' : state.status;
    },
    holdDie: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const dieValue = state.dice[index];
      state.selectedNumber = state.selectedNumber ?? dieValue;

      state.heldDice[index] = !state.heldDice[index];
      
      const heldValues = state.dice.filter((_, idx) => state.heldDice[idx]);
      state.status = heldValues.every((val) => val === state.selectedNumber)
        ? 'PLAYING'
        : 'MISMATCH';

    },
    checkForWin: (state) => {
        state.status =
        state.heldDice.every((isHeld) => isHeld) &&
        state.dice.every((value) => value === state.selectedNumber)
          ? 'WON'
          : state.status;
    },
    resetGame: () => initialState,
  },
});

export const { rollDice, holdDie, checkForWin, resetGame } = gameSlice.actions;

export default gameSlice.reducer;
