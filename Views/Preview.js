import React,{useEffect,useRef,useState,useCallback} from "react";
import { StyleSheet,TouchableOpacity,Dimensions} from "react-native";
import  {Image,Box,Spinner,View,Text,ScrollView,Button} from '@gluestack-ui/themed'
import ImagePicker from 'react-native-image-crop-picker';
import axios from "react-native-axios";

const previewScreen = ({ route, activeItem}) => {
    const {photo} = route.params;
    //裁剪后的图片
    const [imagePath, setImagePath] = useState(null);
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

    return(
        <View style={styles.container}>
        <View style={styles.imageContainer}>
            {/* <Image source={{ uri: imagePath }} style={styles.image} /> */}
        </View>
        <ScrollView style={styles.textContainer}>
            <Text>hellp</Text>
        </ScrollView>
        </View>
       
    )
}

const Search = () => {
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageContainer: {
        flex: 3,
        backgroundColor: 'blue',
    },
    image: {
        width: '100%',
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 7,
    }
})
export default previewScreen