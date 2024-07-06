import React,{useEffect,useRef,useState,useCallback} from "react";
import { StyleSheet,TouchableOpacity,Dimensions} from "react-native";
import  {Image,Box,Spinner,View,Text,ScrollView,Button,Center,HStack} from '@gluestack-ui/themed'
import ImagePicker from 'react-native-image-crop-picker';
import axios from "react-native-axios";
import RNFS from 'react-native-fs';
import base64 from 'base-64';
import {getTextUrl,APPID} from '../utils/aiPath'

const previewScreen = ({route}) => {
    const {photo,activeItem} = route.params;
    //裁剪后的图片
    const [imagePath, setImagePath] = useState(null);
    const [result, setResult] = useState(null);
    useEffect(() => {
        if (photo && photo.path) {
            ImagePicker.openCropper({
                path: `file://${photo.path}`,
                width: 1280,
                height: 960,
                freeStyleCropEnabled:true,
                showCropGuidelines:false,
                hideBottomControls:true,
              }).then(image => {
                setImagePath(image.path);
              })
        }
    },[photo])
    if (!imagePath) {
        return 
        <Spinner/> 
    }
    /**
         * case0：翻译
         * case1：批作业
         * case2：搜题
         * case3：文档识别
         * case4：转world
         */
    switch (activeItem) {
        case '0':
            return <View></View>
            break;
        case '1':
            return <View></View>
            break;
        case '2':
            Search(imagePath);
            break;

    }
    
}

const Search = (imagePath) => {
    RNFS.readFile(imagePath, 'base64')
    .then((base64String) => {
            params = {
                header: {
                app_id: APPID,
                status: 3
                },
                parameter: {
                sf8e6aca1: {
                    category: "ch_en_public_cloud",
                    result: {
                    encoding: "utf8",
                    compress: "raw",
                    format: "json"
                    }
                }
                },
                payload: {
                sf8e6aca1_data_1: {
                    encoding: "jpg",
                    status: 3,
                    image: base64String
                    }
                }  
            }
        const postImg = async () => {
            try{
            const res = await axios.post(getTextUrl(),params).then((res)=>{
                console.log(res.data.payload.result.text)
                const decodedString = base64.decode(res.data.payload.result.text);
                console.log(decodedString)
                })
            }catch(error){
                console.log(error)
            }
        }
        postImg()
    })
    .catch((err) => {
      console.error('Error reading image file:', err);
    });
    
    return(
        <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image accessibilityLabel='avatar' source={{ uri: imagePath }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
            <ScrollView>
                {/* {result !== null && <Center>
                    <HStack space="lg">
                        <Spinner />
                        <Text size="md">加载中</Text>
                    </HStack>
                </Center>} */}
                <Box>

                </Box>
            </ScrollView>
        </View>
        </View>
       
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageContainer: {
        flex: 2,
    },
    image: {
        width: '100%',
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 8,
    }
})
export default previewScreen