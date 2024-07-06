import React from "react";

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
  ScrollView
} from "@gluestack-ui/themed";
import {Settings,} from "lucide-react-native";
import { StyleSheet} from "react-native";
import ModeChangeButton from "../Components/ModeChangeButton";
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfilePage = ({ isActive,showLogin }) => {
  const [status, setStatus] = React.useState(false);
  const value = AsyncStorage.getItem('myData')
  return (
    <View style={{ display: isActive ? "flex" : "none",flex:1}}>
      <VStack px="$5" py="$4" space="lg">
        <HStack justifyContent="space-between">
          <Heading size="lg">个人中心</Heading>
          <Settings />
        </HStack>
      <View p="$2" alignItems="center"> 
        <Avatar size="xl">
        <AvatarFallbackText>SS</AvatarFallbackText>
          <AvatarImage
            accessibilityLabel='avatar' 
            source={{
              uri: "http://124.223.107.207/Upload/shark.png",
            }}
          />
         </Avatar>
          {status && <Text style={styles.name}>Cassian</Text>}
          <Text style={styles.status}>No one</Text>
      </View>
              <View style={styles.section}>
                {menu.map((item, index) => (
                  <View key={index} style={styles.row}>
                    <Text style={styles.icon}>{item.icon}</Text>
                    <Text style={styles.label}>{item.label}</Text>
                   {item.switch&&<Switch/>} 
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
  {id: 1, icon:'🌙',label: '设置',switch: false}, 
  {id: 2, icon:'🌙',label: '帮助中心',switch: false}, 
  {id: 3, icon:'🌙',label: 'Notification',switch: false},
  {id: 4, icon:'🌙',label: 'Log out',switch: false},
  {id: 5, icon:'🌙',label: 'Dark mode',switch: true}
]

export default ProfilePage;