import React,{useContext} from "react";

import {
  HStack,
  Text,
  Heading,
  Switch,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  VStack,
  View,
  Center,
  Button,
  Icon,
  ButtonGroup,
  ButtonText,
  AlertDialogBackdrop,AlertDialogCloseButton,AlertDialog,AlertDialogContent,AlertDialogCloseIcon,AlertDialogHeader,AlertDialogBody,AlertDialogFooter,AlertDialogDescription
} from "@gluestack-ui/themed";
import {Settings,CloseIcon,CircleHelp,Eraser,Eclipse} from "lucide-react-native";
import { StyleSheet,TouchableNativeFeedback} from "react-native";
import ModeChangeButton from "../Components/ModeChangeButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDataContext} from '../Views/MainPage';
import { ThemeContext } from "../App";

const ProfilePage = ({ isActive,showLogin}) => {
  const { colorMode, toggleColorMode } = useContext(ThemeContext);
  const [status, setStatus] = React.useState(false);
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const user = useContext(UserDataContext);
  const confirm = async () => {
     setShowAlertDialog(true)
  }
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('Id');
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('avatar');
    await AsyncStorage.removeItem('nickname');
    await AsyncStorage.removeItem('islogin');
    user.setUserDate({ nickname: '未登录', avatar: 'http://124.223.107.207/Upload/default.jpg',islogin:false})
    setShowAlertDialog(false);
  }
  loadData = async () => {
    try {
        const value = user.userDate.islogin
    if(value == null){
        // 显示登录界面
        showLogin(true);
    }else if (value !== true) {
        // 显示登录界面
        showLogin(true);
    }else{
        console.log("已登录")
    }
    } catch (error) {
    // 处理错误
    console.log('Error loading data', error);
    }
};
  return (
    <View style={{ display: isActive ? "flex" : "none",flex:1}}>
      <VStack px="$5" py="$4" space="lg">
        <HStack justifyContent="space-between">
          <Heading size="lg">个人中心</Heading>
          <Settings />
        </HStack>
      <View p="$2" alignItems="center"> 
      <TouchableNativeFeedback onPress={()=>loadData()}>
        <Avatar backgroundColor={'rgba(0, 0, 0, 0)'} size="xl">
        <AvatarFallbackText>{user.userDate.nickname.slice(0,1)}</AvatarFallbackText>
          <AvatarImage
            accessibilityLabel='avatar' 
            source={{
              uri: user.userDate.avatar,
            }}
          />
         </Avatar>
      </TouchableNativeFeedback>
          {status && <Text style={styles.name}>Cassian</Text>}
          <Text style={styles.status}>{user.userDate.nickname}</Text>
      </View>
              <View style={styles.section}>
                {menu.map((item, index) => (
                  <View key={index} style={styles.row}>
                    <Icon as={item.icon} style={styles.icon}/>
                    <Text style={styles.label}>{item.label}</Text>
                   {item.switch&&<Switch value={colorMode=='dark'?true:false} onToggle={toggleColorMode}/>} 
                  </View>))}
                </View>
      </VStack>
      <View      
      sx={{
          bottom: 0,
          width: "100%",
          padding: "10px",
          alignItems: "center",
        }}>
        <Text color="$warmGray400" size="xs">Powerd by @Duke_ (2024软件杯A5作品)</Text> 
      </View>
      <ModeChangeButton/>
      {user.userDate.islogin && 
        <Center>
            <Button mt={"$2"} width='60%' bg="$red500" onPress={confirm}>
                <ButtonText>退出登录</ButtonText>
            </Button>
        </Center>
        }
      <AlertDialog
        isOpen={showAlertDialog}
        onClose={() => {
          setShowAlertDialog(false)
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">退出登录</Heading>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm">
              确认退出当前账户吗？
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowAlertDialog(false)
                }}
              >
                <ButtonText>取消</ButtonText>
              </Button>
              <Button
                bg="$error600"
                action="negative"
                onPress={() => {logout()}}
              >
                <ButtonText>确认</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  status: {
    fontSize: 16,
    color: 'gray',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    fontSize: 20,
  },
  label: {
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
  },
});


const menu = [
  {id: 1, icon:Settings,label: '设置',switch: false}, 
  {id: 2, icon:CircleHelp,label: '帮助中心',switch: false}, 
  {id: 3, icon:Eraser,label: '清理缓存',switch: false},
  {id: 4, icon:Eclipse,label: '切换模式',switch: true},
]

export default ProfilePage;