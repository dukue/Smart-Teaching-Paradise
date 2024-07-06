import React, { useContext } from "react";
import { Fab, FabIcon } from "@gluestack-ui/themed";
import { Moon, Sun } from "lucide-react-native";
import { ThemeContext } from "../App";

const ModeChangeButton = () => {
  const { colorMode, toggleColorMode } = useContext(ThemeContext);
  return (
    <>
      <Fab
        onPress={toggleColorMode}
      >
        <FabIcon as={colorMode === "light" ? Moon : Sun} fill="currentColor" />
      </Fab>
    </>
  );
};

export default ModeChangeButton;