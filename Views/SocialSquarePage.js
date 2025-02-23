import React,{useEffect,useState} from 'react';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { View,Text, Image, ScrollView,Icon, HStack, Button,ButtonText,ButtonIcon,Spinner,Center} from '@gluestack-ui/themed';
import { ThumbsUp,MessageSquareText,Share2,Heart,Plus } from 'lucide-react-native';
import api from '../utils/api';
import PostModal from './PostModal';

const SocialAppPage = ({navigation,isActive,showLogin}) => {
  const [data, setData] = useState([]); // 初始为空列表
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [flag, setFlag] = useState(false);
  const [endTip, setEndTip] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  useEffect(() => {
    getData(0);
  }, [flag]); 
  const getData = async(num) => {
    try {
      setIsLoading(true);
      await api.get('/post/getPostList',{params:{
        pageSize:6,
        pageNum:num * 6
      }}).then(res => {
        if(res.data.length > 0){
          setData([...data, ...res.data]); // 将新数据添加到现有数据中
          setIsLoading(false);;
        }else{
          setIsLoading(false);
          setEndTip(true);
        }
      })
    }catch(err){
      console.log(err)
    }
  }
  const handleEndReached = async(num) => {
      setPageNum(num);
      await getData(num);
  }
  const refreshData = async() => {
    setData([]);
    setEndTip(false);
    setPageNum(0);
    setFlag(!flag);
  }
const renderItem = ({ item }) => (
    <View style={styles.post}>
      <TouchableOpacity onPress={() => navigation.navigate('PostDetail',{postItem:item})}>
      <View style={styles.userInfo}>
        <Image accessibilityLabel='avatar' source={{ uri: item.avatar }} style={styles.avatar} />
        <HStack  space="md" style={styles.userNameContainer}>
          <Text style={styles.userName}>{item.nickname}</Text>
          <Button size="sm" variant="solid" action="primary"><ButtonIcon as={Heart} size='sm' mr='$1'/><ButtonText>关注</ButtonText></Button>
        </HStack>
      </View>
    <Text style={styles.postTitle}>{item.title}</Text>
    <Text style={styles.postText}>
      {item.content}
    </Text>
    </TouchableOpacity>
    {item.images!='' && <View style={styles.imageGrid}>
      {item.images.split(',').map((image,index) => (
        <Image accessibilityLabel='avatar' key={index} source={{ uri: image }} style={styles.image}/>
      ))}
    </View>}
    <View style={styles.postActions}>
      <HStack><Icon as={ThumbsUp} size="md" mr='$1' mt='$0.5' color='$black'/><Text>{item.likes}</Text></HStack>
      <HStack><Icon as={MessageSquareText} mr='$1' mt='$0.5' size="md" color='$black'/><Text>{item.favorites}</Text></HStack>
      <HStack><Icon as={Share2} size="md" mr='$1' mt='$0.5' color='$black'/><Text>{item.shares}</Text></HStack>
    </View>
  </View>
  );
  return (
    <View style={{ display: isActive ? "flex" : "none",flex:1}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>广场</Text>
        <Text style={styles.headerText}>关注</Text>
      </View>
      <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.post_id}
      refreshing={refreshing}
      onRefresh={refreshData}  
      onEndReached={()=>handleEndReached(pageNum + 1)}
      />
      {isLoading && <Center>
        <HStack space="sm">
          <Spinner />
          <Text size="md">加载中</Text>
        </HStack>
      </Center>}
      {endTip && <Center><Text size="md">没有更多数据了</Text></Center>}
      <PostModal showLogin={showLogin} renderDate={refreshData}/>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  post: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userNameContainer:{
    flex:1,
    marginHorizontal:'auto',
    padding:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  userStatus: {
    color: '#007bff',
  },
  postText: {
    marginVertical: 10,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 100,
    height: 100,
    margin: 2,
  },
  mainImage: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  postTitle:{
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default SocialAppPage;