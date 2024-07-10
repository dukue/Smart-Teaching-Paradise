import React,{useEffect,useRef,useState,useCallback} from "react";
import { StyleSheet,TouchableOpacity} from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { Box,Center,View,Text, HStack,Icon } from '@gluestack-ui/themed';
import { Camera,useCameraDevice,useCameraPermission} from "react-native-vision-camera";
import { useAppState} from "@react-native-community/hooks";
import CameraMenu from "../Components/CameraMenu";
import CaptureButton from "../Components/CaptureButton";
import { ImageIcon,Zap,ZapOff } from "lucide-react-native";
import ImagePicker from 'react-native-image-crop-picker';

const CameraScreen = ({navigation}) => {
    const [isCameraInitialized, setIsCameraInitialized] = useState(false)
    const [activeItem,setActiveItem] = useState(2) 
    const { hasPermission, requestPermission } = useCameraPermission()
    const [flash,setFlash] = useState('off')
    const camera = useRef(null)
    const device = useCameraDevice('back')
    const isFocused = useIsFocused()
    const appState = useAppState()
    const isActive = isFocused && appState === "active"
    const takePhoto =  useCallback(async () => {
        try {
          if (camera.current == null) throw new Error('相机未初始化')
          const photo = await camera.current.takePhoto({
            flash: flash,
            enableShutterSound: true,
          })
          setPreView(photo)
        } catch (e) {
          console.error('拍照失败!', e)
        }
      })
    const onInitialized = useCallback(() => {
        console.log('相机初始化!')
        setIsCameraInitialized(true)
    }, [])

    const toggleFlash = () => {
      if(flash==='on'){
        setFlash('off')
      }else{
        setFlash('on')
      }
    }

    const openPicker = () => {
      ImagePicker.openPicker({
        width: 1080,
        height: 960,
        freeStyleCropEnabled:true,
        showCropGuidelines:false,
      }).then(image => {
        // 处理裁剪后的图片
        setPreView(image)
      })
      .catch(err => console.error('Error:', err));
    };

    const Cropping = (photo) => {
      ImagePicker.openCropper({
        path: `file://${photo}`,
        width: 1280,
        height: 960,
        freeStyleCropEnabled:true,
        showCropGuidelines:false,
        hideBottomControls:true,
      }).then(image => {
        // 处理裁剪后的图片
        navigation.navigate('PreviewScreen',{photo:image,activeItem:activeItem})
      })
    }
    /**
     * case0：翻译
     * case1：批作业
     * case2：搜题
     * case3：听写
     * case4：world(开发中)
     */
    const setPreView = useCallback((photo) => {
      switch(activeItem){
        case 0:
          Cropping(photo.path)
          break;
        case 1:
          Cropping(photo.path)
          break;
        case 2:
          Cropping(photo.path)
          break;
        case 3:
          Cropping(photo.path)
          break;
      }
    })
    if(device == null) return null
    useEffect(() => {
            if (hasPermission) {
                // 相机权限已授予，可以开始使用相机
            }
            else {
                // 相机权限未授予，可以请求权限
                requestPermission()
                }
            }, [hasPermission, requestPermission])

    return (
        <>
        <Camera
            flex={8.5}
            device={device}
            photo={true}
            ref={camera}
            enableZoomGesture={true}
            onInitialized={onInitialized}
            resizeMode="cover"
            androidPreviewViewType="texture-view"
            isActive={isActive}
            preview={true}
        />
        <Box bg="black" flex={1.5}>
          <CameraMenu active={{activeItem,setActiveItem}} flex={8}/>
          <HStack style={{justifyContent: 'space-around'}} flex={2}>
            <TouchableOpacity onPress={openPicker}>
            <Box p="$5">
              <Icon as={ImageIcon} size="xl" color="white"/>
            </Box>
            </TouchableOpacity>
            <CaptureButton capture={takePhoto} flex={2}/>
            <TouchableOpacity onPress={toggleFlash}>
            <Box p="$5">
              <Icon as={flash === 'on' ? Zap:ZapOff} size="xl" color="white"/>
            </Box>
            </TouchableOpacity>
          </HStack>
        </Box>
        </>
        )
}
export default CameraScreen;