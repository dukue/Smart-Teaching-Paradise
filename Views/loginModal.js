import React,{useState,useContext} from 'react';
import { StyleSheet,TouchableHighlight,Dimensions } from 'react-native';
import { Actionsheet,Center,ActionsheetContent,ActionsheetBackdrop,
        ActionsheetDragIndicatorWrapper,ActionsheetDragIndicator,
        Button,ButtonText,ButtonIcon,Box,FormControl,Heading,Input,
        InputField,Text,VStack,InputSlot,InputIcon,Icon,HStack,useToast,
        Toast,ToastTitle,ToastDescription} from '@gluestack-ui/themed';
import {AlertTriangleIcon,Check,EyeIcon,EyeOffIcon,ArrowLeftIcon} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';
import {UserDataContext} from '../Views/MainPage';

export default function LoginModal({visible,showLogin}) {
    const user = useContext(UserDataContext);
    const [username, setUsername] = useState(''); 
    const handleUserChange = (text) => {
        setUsername(text);
      };
    const [password, setPassword] =useState('');
    const [password1, setPass1word] =useState('');
    const handlePassChange = (text) => {
        setPassword(text);
        if(text==password1||password1==''){
            setPassTip(false)
        }else{
            setPassTip(true)
        }
      };
    const handlePass1Change = (text) => {
        setPass1word(text);
        if(text==password){
            setPassTip(false)
        }else{
            setPassTip(true)
        }
      };
    const toast = useToast();
    const [id,setId] = React.useState(1)
    const screenHeight = Dimensions.get('window').height;
    const handleClose = () => showLogin(!visible);
    const [showPassword, setShowPassword] = useState(false);
    const handleState = () => {
        setShowPassword((showState) => {
        return !showState
        })
    };
    const [passTip,setPassTip] = useState(false)
    const [registerPage, togglePage] = useState(false)
    /**
     * 登录
     */
    const login = async() => {
        if(username==''||password==''){
            toast.show({
                placement: "top",
                render: ({ id }) => {
                  const toastId = "toast-" + id
                  return (
                    <Toast bg="$error300" nativeID={toastId} action="attention" variant="solid">
                      <Icon as={AlertTriangleIcon} color="$white" mt="$1" mr="$3" />
                      <VStack space="xs">
                        <ToastTitle color="$textLight50">警告！</ToastTitle>
                        <ToastDescription color="$textLight50">
                          用户名和密码不能为空
                        </ToastDescription>
                      </VStack>
                    </Toast>
                  )
                },
              })
        }else{
            try {
                await api.get('/user/login',{
                params:{
                    username: username,
                    password: password
                }}).then(response => {
                     // 存储数据
                    AsyncStorage.setItem('token', response.data.accessToken);
                    AsyncStorage.setItem('Id',response.data.userId.toString());
                    AsyncStorage.setItem('username', response.data.username);
                    if(response.data.avatar == '' || response.data.avatar == null){
                      AsyncStorage.setItem('avatar', 'http://124.223.107.207/Upload/default.jpg');
                      AsyncStorage.setItem('nickname', response.data.username);
                      user.setUserDate({nickname:response.data.username,avatar:'http://124.223.107.207/Upload/default.jpg',Id:response.data.userId,islogin:true})
                    }else{
                      AsyncStorage.setItem('avatar', response.data.avatar);
                      AsyncStorage.setItem('nickname', response.data.nickname);
                      user.setUserDate({nickname:response.data.nickname,avatar:response.data.avatar,Id:response.data.userId,islogin:true})
                    }
                    // AsyncStorage.setItem('email', response.data.email);
                    // AsyncStorage.setItem('phone', response.data.phone);
                    AsyncStorage.setItem('islogin', 'true');
                    handleClose();
                    setUsername('');
                    setPassword('');
                    
                    toast.show({
                        placement: "top",
                        render: ({ id }) => {
                          const toastId = "toast-" + id
                          return (
                            <Toast bg="$green800" nativeID={toastId} action="attention" variant="solid">
                              <Icon as={Check} color="$white" mt="$1" mr="$3" />
                              <VStack space="xs">
                                <ToastDescription color="$textLight50">
                                  登录成功
                                </ToastDescription>
                              </VStack>
                            </Toast>
                          )
                        },
                      })
                })
          } catch (error) {
            console.log(error)
            toast.show({
                placement: "top",
                render: ({ id }) => {
                  const toastId = "toast-" + id
                  return (
                    <Toast bg="$error300" nativeID={toastId} action="attention" variant="solid">
                      <Icon as={AlertTriangleIcon} color="$white" mt="$1" mr="$3" />
                      <VStack space="xs">
                        <ToastTitle color="$textLight50">错误！</ToastTitle>
                        <ToastDescription color="$textLight50">
                          用户名或密码错误
                        </ToastDescription>
                      </VStack>
                    </Toast>
                  )
                },
              })
          }
        }
    };
    const register = async()=>{
        if(!username || !password){
            toast.show({
                placement: "top",
                render: ({ id }) => {
                  const toastId = "toast-" + id
                  return (
                    <Toast bg="$error300" nativeID={toastId} action="attention" variant="solid">
                      <Icon as={AlertTriangleIcon} color="$white" mt="$1" mr="$3" />
                      <VStack space="xs">
                        <ToastTitle color="$textLight50">警告！</ToastTitle>
                        <ToastDescription color="$textLight50">
                          用户名和密码不能为空
                        </ToastDescription>
                      </VStack>
                    </Toast>
                  )
                },
              })
        }else if(password!=password1){
            setPassTip(true);
        }else{
            setPassTip(false);
            try {
                await api.get('/user/addUser', {
                    params:{
                    username: username,
                    password: password,
                    avatar:"http://124.223.107.207/Upload/default.jpg",
                    nickname:username
                  }}).
                    then(response => {
                        if(response.data==1){
                            toast.show({
                                placement: "top",
                                render: ({ id }) => {
                                  const toastId = "toast-" + id
                                  return (
                                    <Toast bg="$error700" nativeID={toastId} action="attention" variant="solid">
                                      <Icon as={AlertTriangleIcon} color="$white" mt="$1" mr="$3" />
                                      <VStack space="xs">
                                        <ToastTitle color="$textLight50">警告！</ToastTitle>
                                        <ToastDescription color="$textLight50">
                                          用户已存在
                                        </ToastDescription>
                                      </VStack>
                                    </Toast>
                                  )
                                },
                              })
                        }else if(response.data==2){
                            toast.show({
                                placement: "top",
                                render: ({ id }) => {
                                  const toastId = "toast-" + id
                                  return (
                                    <Toast bg="$green700" nativeID={toastId} action="attention" variant="solid">
                                      <Icon as={AlertTriangleIcon} color="$white" mt="$1" mr="$3" />
                                      <VStack space="xs">
                                        <ToastDescription color="$textLight50">
                                          注册成功
                                        </ToastDescription>
                                      </VStack>
                                    </Toast>
                                  )
                                },
                              })
                              togglePage(!registerPage)
                        }
                    })
                }catch(err){
                  
                }
         };
    }
    return (
      <Box>
        <Actionsheet isKeyboardDismissable={false} isOpen={visible} onClose={handleClose} zIndex={999}>
          <ActionsheetBackdrop />
          <ActionsheetContent p={2} zIndex={999}>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            {/* 登录 */}
            {!registerPage && <Center w='100%' h={screenHeight/1.5}>
            <FormControl
                p="$4"
                width="90%"
                borderWidth="$1"
                borderRadius="$lg"
                borderColor="$borderDark300"
                $dark-borderWidth="$1"
                $dark-borderRadius="$lg"
                $dark-borderColor="$borderDark800"
                >
                <VStack space="3xl">
                    <Heading lineHeight="$md">
                        登录
                    </Heading>
                    <VStack space="xs">
                    <Text lineHeight="$xs">
                        用户名
                    </Text>
                    <Input variant="rounded">
                        <InputField value={username} onChangeText={handleUserChange} type="text" />
                    </Input>
                    </VStack>
                    <VStack space="xs">
                    <Text lineHeight="$xs">
                        密码
                    </Text>
                    <Input textAlign="center" variant="rounded">
                        <InputField value={password} onChangeText={handlePassChange} type={showPassword ? "text" : "password"} />
                        <InputSlot pr="$3" onPress={handleState}>
                        <InputIcon
                            as={showPassword ? EyeIcon : EyeOffIcon}
                            color="$darkBlue500"
                        />
                        </InputSlot>
                    </Input>
                    </VStack>
                    <Button
                    ml="auto"
                    onPress={() => {
                        login()
                    }}
                    >
                    <ButtonText color="$white">登录</ButtonText>
                    </Button>
                </VStack>
            </FormControl>
            <HStack mt="$10">
                <Text lineHeight="$xs" mt="$3">没有账号?</Text>  
                <Button onPress={()=>togglePage(!registerPage)} ml="$3" size="md" variant="link" action="primary">
                    <ButtonText>立即注册</ButtonText>
                </Button>
            </HStack>
            </Center>}
            {/* 注册 */}
            {registerPage &&             <>
            <Button onPress={()=>togglePage(!registerPage)} position='absolute' left='$10' top='$5' size="md" variant="link" action="primary">
                <ButtonIcon mr="$1" as={ArrowLeftIcon} />
                    <ButtonText>返回</ButtonText>
            </Button>
            <Center w='100%' h={screenHeight/1.5}>
            <FormControl
                p="$4"
                width="90%"
                borderWidth="$1"
                borderRadius="$lg"
                borderColor="$borderLight300"
                $dark-borderWidth="$1"
                $dark-borderRadius="$lg"
                $dark-borderColor="$borderDark800"
                >
                <VStack space="3xl">
                    <Heading lineHeight="$md">
                        注册
                    </Heading>
                    <VStack space="xs">
                    <Text lineHeight="$xs">
                        用户名
                    </Text>
                    <Input>
                        <InputField value={username} onChangeText={handleUserChange} placeholder="请输入用户名" type="text" />
                    </Input>
                    </VStack>
                    <VStack space="xs">
                        <Text lineHeight="$xs">
                            密码
                        </Text>
                    <Input textAlign="center">
                        <InputField value={password} onChangeText={handlePassChange} placeholder="请输入密码" type={showPassword ? "text" : "password"} />
                        <InputSlot pr="$3" onPress={handleState}>
                        <InputIcon
                            as={showPassword ? EyeIcon : EyeOffIcon}
                            color="$darkBlue500"
                        />
                        </InputSlot>
                    </Input>
                    </VStack>
                    <VStack space="xs">
                        <HStack alignContent='center' justifyContent='space-between'>
                        <Text lineHeight="$xs">
                            确认密码
                        </Text>
                        {passTip && <Text fontSize="$sm" color='$red500' fontWeight='bold' lineHeight="$2xs">
                            ! 两次密码不一致
                        </Text>}
                        </HStack>

                    <Input textAlign="center">
                        <InputField value={password1} onChangeText={handlePass1Change} placeholder="再次确认密码" type={showPassword ? "text" : "password"} />
                        <InputSlot pr="$3" onPress={handleState}>
                        <InputIcon
                            as={showPassword ? EyeIcon : EyeOffIcon}
                            color="$darkBlue500"
                        />
                        </InputSlot>
                    </Input>
                    </VStack>
                    <Button
                    ml="auto"
                    onPress={() => {
                        register();
                    }}
                    >
                    <ButtonText color="$white">注册</ButtonText>
                    </Button>
                </VStack>
            </FormControl>
            </Center>
            </>
            }
          </ActionsheetContent>
        </Actionsheet>
      </Box>
    )
}
