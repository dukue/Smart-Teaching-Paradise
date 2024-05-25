import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar,VictoryPie,VictoryPolarAxis,VictoryChart, VictoryTheme } from "victory-native";

const data=[
  { x: "Cats", y: 35 },
  { x: "Dogs", y: 40 },
  { x: "Birds", y: 55 }
]

export default function DataAnalysisPage({isActive}) {
  return (
    <View style={{ display: isActive ? "flex" : "none" }}>
         <VictoryChart polar
  theme={VictoryTheme.material}
>
  {
     ["cat", "dog", "bird", "dog", "frog", "fish"].map((d, i) => {
      return (
        <VictoryPolarAxis dependentAxis
          key={i}
          label={d}
          labelPlacement="perpendicular"
          style={{ tickLabels: { fill: "none" } }}
          axisValue={d}
        />
      );
    })
  }
  <VictoryBar
    style={{ data: { fill: "tomato", width: 25 } }}
    data={[
      { x: "cat", y: 10 },
      { x: "dog", y: 25 },
      { x: "bird", y: 40 },
      { x: "frog", y: 50 },
      { x: "fish", y: 50 }
    ]}
  />
</VictoryChart>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});
