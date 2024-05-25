import React from "react";
import Header from "../Components/Header";
import HorizontalMenu from "../Components/HorizontalMenu";
import {
  VStack,
} from "@gluestack-ui/themed";
import { ScrollView } from "react-native";

/**
 * 主页
 */
const HomePage = ({ isActive }) => {
  return (
    <ScrollView style={{ display: isActive ? "flex" : "none" }}>
      <VStack px="$5" py="$4" space="lg" flex={1}>
        <Header/>
        <HorizontalMenu/>
      </VStack>
    </ScrollView>
  );
};

export default HomePage;