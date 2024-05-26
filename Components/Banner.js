import React from 'react';
import { StyleSheet } from 'react-native';
import { View,Text,Icon,Card,Heading} from '@gluestack-ui/themed';
import { Camera,MessageCircleQuestion,Clock } from 'lucide-react-native';

const BannerLayout = () => {
    return (
        <View style={styles.cardsContainer}> 
            <View style={styles.cardsLeft}>
            <Card size="lg" style={styles.card} variant="elevated"  m="$3">
            <Heading mb="$1" size='md'>
                拍照搜索
                <Icon as={Camera} size="md" />
            </Heading>
            <Text mb="$2" size="sm">Photo Search</Text>
            <Text size="sm">搜题、作业批改、翻译、听力播报</Text>
            </Card>
            </View>         
            <View style={styles.cardsRight}>
            <Card onpress={
                ()=>{this.props.navigation.navigate('ChatScreen')}} size="md" style={styles.card} variant="elevated"  m="$2">
            <Heading mb="$1" size="sm">
                AI 问答
                <Icon as={MessageCircleQuestion} size="md"/>
            </Heading>
            <Text size="sm">AI Q&A</Text>
            </Card>
            <Card size="md" style={styles.card} variant="elevated"  m="$2">
            <Heading size="sm">
                番茄时钟
                <Icon as={Clock} size="md"/>
            </Heading>
            <Text size="sm">ketchup clock</Text>
            </Card>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
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
        
export default BannerLayout;
        