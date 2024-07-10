import React,{useEffect,useState,useContext} from 'react';
import { StyleSheet,TouchableNativeFeedback,TouchableHighlight } from 'react-native';
import { View,Text,Avatar,Spinner,Icon,Input,InputSlot,InputIcon,InputField,Card,Heading,AvatarFallbackText,AvatarImage, Button } from '@gluestack-ui/themed';
import { Search,Camera,MessageCircleQuestion,Clock, CodeSquare } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDataContext} from '../Views/MainPage';

/**
 * 主页头部布局（header+banner）
 * */
const HeaderLayout = ({navigation,showLogin}) => {
    const userDate = useContext(UserDataContext);
    if (!userDate || !userDate.userDate.avatar || !userDate.userDate.nickname) {
        return <Spinner/>
      }
        loadData = async () => {
            try {
                const value = userDate.userDate.islogin
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
        <View p="$2">
            <View style={styles.header}>
                <TouchableNativeFeedback onPress={()=>loadData()}>
                    <Avatar backgroundColor={'rgba(0, 0, 0, 0)'} size="sm">
                    <AvatarFallbackText>{userDate.userDate.nickname.slice(0,1)}</AvatarFallbackText>
                    <AvatarImage
                        source={{uri:userDate.userDate.avatar,
                    }}
                    />
                    </Avatar>
                </TouchableNativeFeedback>
                    <Text style={styles.headerText}>{userDate.userDate.nickname}</Text>
                    <View style={styles.searchContainer}>
                        <Input style={styles.searchInput}>
                        <InputSlot pl="$1">
                            <InputIcon as={Search} />
                        </InputSlot>
                        <InputField placeholder="搜索..." />
                    </Input>
                    </View>         
            </View>
            <View style={styles.cardsContainer}> 
                <View style={styles.cardsLeft}>
                <TouchableNativeFeedback onPress={()=>{navigation.navigate('Camera')}}>
                <Card size="lg" style={styles.card} variant="elevated"  m="$3">
                <Heading mb="$1" size='md'>
                    拍照搜索
                    <Icon as={Camera} size="md" />
                </Heading>
                <Text mb="$2" size="sm">Photo Search</Text>
                <Text size="sm">搜题、作业批改、翻译、听力播报</Text>
                </Card>
                </TouchableNativeFeedback>
                </View>         
                <View style={styles.cardsRight}>
                <TouchableNativeFeedback onPress={()=>{navigation.navigate('ChatScreen')}}>
                <Card size="md" style={styles.card} variant="elevated"  m="$2">
                <Heading mb="$1" size="sm">
                    AI 问答
                    <Icon as={MessageCircleQuestion} size="md"/>
                </Heading>
                <Text size="sm">AI Q&A</Text>
                </Card>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={()=>{navigation.navigate('Tomato')}}>
                <Card size="md" style={styles.card} variant="elevated"  m="$2">
                <Heading size="sm">
                    番茄时钟
                    <Icon as={Clock} size="md"/>
                </Heading>
                <Text size="sm">ketchup clock</Text>
                </Card>
                </TouchableNativeFeedback>
                </View>
            </View>
        </View>
        );
    };
    
const styles = StyleSheet.create({
    header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    },
    headerText: {
    marginLeft: 12,
    fontWeight: 'bold',
    },
    searchContainer: {
    flex: 1,
    marginLeft: 12,
    },
    searchInput: {
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 40,
    fontSize: 12,
    },
    cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    },
    cardsLeft: {
        flex:1,
        margin:4   
    },
    cardsRight: {
        flex:1,
        margin:4
    },
    card: {
    flex: 1,
    borderRadius: 10,
    padding: 16,
    marginLeft: 4,
    },
});
        
export default HeaderLayout;
        