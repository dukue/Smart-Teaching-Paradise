import React, { useEffect } from "react";
import { Box } from "@gluestack-ui/themed";
import { Home,ClipboardPlus,UserRound,BarChartBig,Radar} from 'lucide-react-native';
import { MobileBottomTabs } from "../Components/MobileBottomTabs";
import ModeChangeButton from "../Components/ModeChangeButton";

import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import DataAnalysisPage from "./DataAnalysisPage";

// import Explorepage from "./ExplorePage";
// import MobileSidebarActionsheet from "./MobileSidebarActionsheet";

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
const MainPage = () => {
    const [activeTab, setActiveTab] = React.useState("主页");

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
            <ProfilePage isActive={activeTab === "我的"} />
            <HomePage isActive={activeTab === "主页"}/>
            <DataAnalysisPage isActive={activeTab === "统计"}/>
            {/* <Explorepage setActiveTab={setActiveTab} activeTab={activeTab} /> */}
  
            <ModeChangeButton />
          </Box>
          {/* mobile bottom tabs */}
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