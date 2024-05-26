import React from "react";
import { StyleSheet, View } from "react-native";


const data=[
  { x: "Cats", y: 35 },
  { x: "Dogs", y: 40 },
  { x: "Birds", y: 55 }
]

export default function DataAnalysisPage({isActive}) {
  return (
    <View style={{ display: isActive ? "flex" : "none" }}>

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
