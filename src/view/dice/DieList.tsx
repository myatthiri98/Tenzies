import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import DieCard from "./DieCard";
import { T } from "../design-system/theme";

type DieListProps = {
  dice: number[];
  heldDice: boolean[];
  onHoldDie: (index: number) => void;
};

function DieList({ dice, heldDice, onHoldDie }: DieListProps) {
  return (
    <FlatList
      style={styles.dieList}
      data={dice}
      renderItem={({ item, index }) => (
        <DieCard value={item} isHeld={heldDice[index]} onHold={() => onHoldDie(index)} />
      )}
      keyExtractor={(_, index) => index.toString()}
      numColumns={T.size.xSmall}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.columnWrapper}
    />
  );
}

const styles = StyleSheet.create({
  dieList: {
    paddingHorizontal: 0,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: T.spacing.small,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});

export default DieList;
