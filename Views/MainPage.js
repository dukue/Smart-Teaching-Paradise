import React, { useContext,createContext,useEffect } from "react";
import { Box} from "@gluestack-ui/themed";
import { Home,ClipboardPlus,UserRound,BarChartBig,Radar} from 'lucide-react-native';

import { MobileBottomTabs } from "../Components/MobileBottomTabs";
import { ThemeContext } from "../App";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
export const UserDataContext = React.createContext();
const MainPage = ({navigation}) => {
    const [activeTab, setActiveTab] = React.useState("主页");
    const [loginVisible,setVisible] = React.useState(false);
    const [userDate,setUserDate] = React.useState({ nickname: '未登录', avatar: 'http://124.223.107.207/Upload/default.jpg' });
    useEffect(() => {
      getUserDate()  
    },[])
    const getUserDate = async () => {
        // 加载昵称
        const nickname = await AsyncStorage.getItem('nickname');
        const nicknameValue = nickname || '未登录';

        // 加载头像
        const avatar = await AsyncStorage.getItem('avatar');
        const avatarValue = avatar || 'http://124.223.107.207/Upload/shark.png';
        // 加载登录状态
        const islogin =  Boolean(await AsyncStorage.getItem('islogin'))
        const isloginValue = islogin || false
        setUserDate({ nickname: nicknameValue, avatar: avatarValue ,islogin:isloginValue}); 
    }
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
            <UserDataContext.Provider value={{ userDate, setUserDate }}>
              <ProfilePage showLogin={setVisible} isActive={activeTab === "我的"} />
              <HomePage  navigation={navigation} showLogin={setVisible} isActive={activeTab === "主页"}/>
              <SocialSquarePage navigation={navigation}  showLogin={setVisible} isActive={activeTab === "广场"}/>
              <DataAnalysisPage isActive={activeTab === "统计"}/>
              <LoginModal visible={loginVisible} showLogin={setVisible}/>
            </UserDataContext.Provider>
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