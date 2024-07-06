import React, { useContext } from "react";
import { Box} from "@gluestack-ui/themed";
import { Home,ClipboardPlus,UserRound,BarChartBig,Radar} from 'lucide-react-native';

import { MobileBottomTabs } from "../Components/MobileBottomTabs";
import { ThemeContext } from "../App";

import LoginModal from "./loginModal";
import HomePage from "./HomePage";
import SocialSquarePage from "./SocialSquarePage";
import ProfilePage from "./ProfilePage";
import DataAnalysisPage from "./DataAnalysisPage";


const bottomTabs = [
    {
      icon: Home,
      label: "主页",
    },
    {
      icon: Radar,
      label: "广场",
    },
    {
      icon: ClipboardPlus,
      label: "添加计划",
    },
    {
      icon: BarChartBig,
      label: "统计",
    },
    {
      icon: UserRound,
      label: "我的",
    },
  ];
const MainPage = ({navigation}) => {
    const [activeTab, setActiveTab] = React.useState("主页");
    const [loginVisible,setVisible] = React.useState(false);
    return (
      <>
        <Box
          flex={1}
          sx={{
            _light: { bg: "white" },
            _dark: { bg: "$backgroundDark950" },
          }}
        >
  
          <Box flex={1}>
            <ProfilePage showLogin={setVisible} isActive={activeTab === "我的"} />
            <HomePage navigation={navigation} showLogin={setVisible} isActive={activeTab === "主页"}/>
            <SocialSquarePage isActive={activeTab === "广场"}/>
            <DataAnalysisPage isActive={activeTab === "统计"}/>
            <LoginModal visible={loginVisible} showLogin={setVisible}/>
          </Box>

          <Box
            h={72}
            alignItems="center"
            w="100%"
            sx={{
              "@md": {
                display: "none",
              },
              _dark: { borderColor: "$borderDark900" },
            }}
            borderTopWidth="$1"
            borderColor="$borderLight50"
          >
            <MobileBottomTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              bottomTabs={bottomTabs}
            />
          </Box>
        </Box>
        {/* )} */}
      </>
    );
  };
  export default MainPage;