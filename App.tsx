import React from 'react';
import "react-native-devsettings";
import { StyleSheet,SafeAreaView } from 'react-native';
import { GluestackUIProvider,View} from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Header from "./Components/Header";
import  MainPage  from './Views/MainPage';
import ChatScreen from './Views/ChatAi';

const Stack = createNativeStackNavigator()

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
    <NavigationContainer>
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
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={MainPage} options={{ headerShown: false }}/>
      <Stack.Screen name='ChatScreen' component={ChatScreen} options={{title:"Ai问答"}}/>
    </Stack.Navigator>
   </ThemeContext.Provider>
    </GluestackUIProvider>
    </SafeAreaView>
    </NavigationContainer>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  }
});