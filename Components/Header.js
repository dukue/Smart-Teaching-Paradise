import React from 'react';
import { StyleSheet } from 'react-native';
import { View,Divider,Text,Avatar,Icon,Input,InputSlot,InputIcon,InputField,Card,Heading,AvatarFallbackText,AvatarImage } from '@gluestack-ui/themed';
import { Search,Camera,MessageCircleQuestion,Clock } from 'lucide-react-native';


/**
 * 主页头部布局（header+banner）
 * */
const HeaderLayout = () => {
        return (
        <View p="$2">
            <View style={styles.header}>
                <Avatar size="sm" bg="$blue600">
                <AvatarFallbackText>Henry Stan</AvatarFallbackText>
                <AvatarImage
                    source={{
                    uri: "http://124.223.107.207/Upload/shark.png",
                    }}
                />
                </Avatar>
                    <Text style={styles.headerText}>设置年级</Text>
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
                <Card size="md" style={styles.card} variant="elevated"  m="$2">
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
        