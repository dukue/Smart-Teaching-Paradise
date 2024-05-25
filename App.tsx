import React from 'react';
import { StyleSheet,SafeAreaView } from 'react-native';
import { GluestackUIProvider,StatusBar,View} from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme
import  MainPage  from './Views/MainPage';

type ThemeContextType = {
  colorMode?: "dark" | "light";
  toggleColorMode?: () => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  colorMode: "light",
  toggleColorMode: () => {},
});

export default function App() {
  const [colorMode, setColorMode] = React.useState<"dark" | "light">("light");

  const toggleColorMode = async () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
    <SafeAreaView
        style={{
          backgroundColor: colorMode === "light" ? "#E5E5E5" : "#262626",
        }}
      />
    <SafeAreaView
    style={{
      ...styles.container,
      backgroundColor: colorMode === "light" ? "white" : "#171717",
    }}
      >
    <GluestackUIProvider config={config} colorMode={colorMode}>
    <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
      <StatusBar backgroundColor={colorMode === "light" ? "white" : "#171717"} barStyle={colorMode === "light"?"dark-content":"light-content"}/>
      <MainPage/>
   </ThemeContext.Provider>
    </GluestackUIProvider>
    </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  }
});