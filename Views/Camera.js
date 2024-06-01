import React,{useEffect,useRef,useState,useCallback} from "react";
import { StyleSheet} from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { Box,Center } from '@gluestack-ui/themed';
import { Camera,useCameraDevice,useCameraPermission} from "react-native-vision-camera";
import { useAppState} from "@react-native-community/hooks";
import CameraMenu from "../Components/CameraMenu";
import CaptureButton from "../Components/CaptureButton";
const CameraScreen = () => {
    const [isCameraInitialized, setIsCameraInitialized] = useState(false)
    const { hasPermission, requestPermission } = useCameraPermission()
    const camera = useRef(null)

    const device = useCameraDevice('back')
    const isFocused = useIsFocused()
    const appState = useAppState()
    const isActive = isFocused && appState === "active"
    const takePhoto =  useCallback(async () => {
        try {
          if (camera.current == null) throw new Error('相机未初始化')
          const photo = await camera.current.takePhoto({
            flash: on,
            enableShutterSound: true,
          })
        //   const snapshot = await camera.current.takeSnapshot({
        //     quality: 100
        //   })
        //   onMediaCaptured(photo, 'photo')
        } catch (e) {
          console.error('拍照失败!', e)
        }
      })
    const onInitialized = useCallback(() => {
        console.log('相机初始化!')
        setIsCameraInitialized(true)
    }, [])
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
            androidPreviewViewType="texture-view"
            isActive={isActive}
            preview={true}
        />
        <Box bg="black" flex={1.5}>
        <CameraMenu/>
        <Center>
        <CaptureButton  enabled={isCameraInitialized} capture={takePhoto} flex={2}/>
        </Center>
        </Box>
        </>
        )
}

export default CameraScreen;