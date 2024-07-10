import React,{useState,useContext} from 'react';
import {StyleSheet,TouchableOpacity} from 'react-native';
import { Actionsheet,ActionsheetContent,ActionsheetBackdrop,imagePath,Image,Input,
    InputField,Text,TextInput,Center,Button,ButtonText,View,Textarea,TextareaInput,
    Fab,FabIcon,FabLabel,HStack,Heading,Icon,ActionsheetItem,AlertDialogBackdrop,AlertDialog,AlertDialogContent,AlertDialogCloseIcon,AlertDialogHeader,AlertDialogBody,AlertDialogFooter,AlertDialogDescription} from '@gluestack-ui/themed';
import {Plus,CheckCircleIcon} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import api from '../utils/api';
import nowTime from '../utils/date';
import { UserDataContext} from '../Views/MainPage';

export default function PostModal({renderDate,showLogin}) {
    const user = useContext(UserDataContext);
    const [showActionsheet, setShowActionsheet] = React.useState(false)
    const handleClose = () => {
      try {
        const value = user.userDate.islogin
          if(value == null){
              // 显示登录界面
              showLogin(true);
          }else if (value !== true) {
              // 显示登录界面
              showLogin(true);
          }else{
            setShowActionsheet(!showActionsheet)
          }
          } catch (error) {
        // 处理错误
        console.log('Error loading data', error);
        }
    
    }
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [images,setImages] = useState([])
    const [addVisible,setAddVisible] = useState(true);
    const [showAlertDialog, setShowAlertDialog] = React.useState(false)

    const openPicker = () => {
        ImagePicker.openPicker({
          width: 1080,
          height: 960,
          freeStyleCropEnabled:true,
          showCropGuidelines:false,
        }).then(image => {
          // 处理裁剪后的图片
          addImage(image.path);
          console.log(images)
        })
        .catch(err => console.error('Error:', err));
      };

      const addImage = (newImage) => {
        if(images.length >= 5){
            setAddVisible(false);
            setImages((prevImages) => [...prevImages, newImage]);
        }else{
            setImages((prevImages) => [...prevImages, newImage]);
        }
      };

      const sendPost = async () => {
        try{
          await api.post('/post/sendPost',{
                userId:await AsyncStorage.getItem("Id"),
                title:title,
                content:content,
                images:images.join(','),
                postDate:nowTime(),
            }).then(res =>{
                    setShowAlertDialog(true)
                    setTitle('')
                    setContent('')
                    setShowActionsheet(false)
                    setImages([])
                    setAddVisible(true)
                    renderDate()
            })
        }catch(err){
           console.error('Error:', err)
        }
      }
    return (
        <>
            <Fab
                size="sm"
                placement="bottom right"
                bg="$emerald600"
                onPress={() =>handleClose()}>
                <FabIcon as={Plus} mr="$1" fill="currentColor"/>
                <FabLabel>发帖</FabLabel>
            </Fab>
          <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
            <ActionsheetBackdrop />
            <ActionsheetContent flex={0.95} zIndex={999}>
                <View style={styles.container}>
                    <Input variant="underlined" style={styles.titleInput}>
                        <InputField value={title} onChangeText={setTitle} maxLength={31} placeholder="请输入完整贴子标题(5-31个字)" type="text" />
                    </Input>
                    <Textarea size="xl" style={styles.contentInput}>
                        <TextareaInput value={content} onChangeText={setContent} multiline={true} fontSize={16} placeholder="请输入正文（建议200-2000字）" />
                    </Textarea>
                    <View style={styles.imageUploadContainer}>
                    {images.map((item, index) =>
                        (<Image source={{ uri: item }} key={index} style={styles.image} />))}
                        {addVisible && <TouchableOpacity onPress={openPicker} style={styles.imageUploadButton}>
                            <Text style={styles.imageUploadButtonText}>+</Text>
                        </TouchableOpacity>}
                    </View>
                    <Center>
                        <Button bottom='0' width='100%' bg="$emerald600" onPress={sendPost}>
                            <ButtonText>发送</ButtonText>
                        </Button>
                    </Center>
                </View>
            </ActionsheetContent>
          </Actionsheet>
          {/* 弹窗 */}
          <AlertDialog
              isOpen={showAlertDialog}
              onClose={() => {
                setShowAlertDialog(false)
              }}
            >
              <AlertDialogBackdrop />
              <AlertDialogContent>
                <AlertDialogHeader borderBottomWidth="$0">
                  <HStack space="sm" alignItems="center">
                    <Icon
                      as={CheckCircleIcon}
                      color="$success700"
                      $dark-color="$success300"
                    />
                    <Heading size="lg">发帖成功！</Heading>
                  </HStack>
                </AlertDialogHeader>
                <AlertDialogBody>
                  <Text size="sm">
                    请注意发送内容合规合法，自觉维护网络环境。
                  </Text>
                </AlertDialogBody>
                <AlertDialogFooter borderTopWidth="$0">
                  <Button
                    variant="outline"
                    size="sm"
                    action="secondary"
                    mr="$3"
                    onPress={() => {
                      setShowAlertDialog(false)
                    }}
                  >
                    <ButtonText>确认</ButtonText>
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#fff',
      padding: 16,
      marginTop: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    closeButton: {
      padding: 8,
    },
    closeButtonText: {
      fontSize: 24,
      color: '#000',
    },
    tabContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
    },
    tab: {
      marginHorizontal: 16,
      fontSize: 18,
      color: '#000',
    },
    activeTab: {
      color: '#000',
      borderBottomWidth: 2,
      borderBottomColor: '#000',
    },
    titleInput: {
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      fontSize: 16,
      marginBottom: 16,
    },
    contentInput: {
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      fontSize: 16,
      width: '100%',
      height:200,
      marginBottom: 16,
    },
    imageUploadContainer: {
        width: '100%',
      marginBottom: 16,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 8,
    },
    imageUploadButton: {
      width: 100,
      height: 100,
      backgroundColor: '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },
    imageUploadButtonText: {
      fontSize: 48,
      color: '#999',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 16,
      color: '#000',
    },
    sectionSubtitle: {
      fontSize: 14,
      color: '#999',
    },
    arrowButton: {
      padding: 8,
    },
    arrowButtonText: {
      fontSize: 18,
      color: '#999',
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 16,
    },
    tag: {
      backgroundColor: '#f0f0f0',
      padding: 8,
      borderRadius: 16,
      marginRight: 8,
      marginBottom: 8,
    },
    tagText: {
      fontSize: 14,
      color: '#000',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    footerButton: {
      flex: 1,
      padding: 8,
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 4,
    },
    footerButtonText: {
      fontSize: 14,
      color: '#000',
    },
  });
  