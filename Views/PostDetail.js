import React,{useState,useEffect} from 'react';
import {StyleSheet,TouchableOpacity} from 'react-native';
import { View, Text, Button,ButtonText,Input,InputField,Card,Image,AvatarImage,Avatar,ScrollView } from '@gluestack-ui/themed'
import api from '../utils/api';
const PostDetail = ({route}) => {
  const post = route.params.postItem;
  const [comment,setComment] = useState(null);
  useEffect(() => {
    getPostComment();
    getUserById(post.userId)
  },[])
  const getPostComment = async() => {
    // 获取帖子详情的API调用]
    await api.get('/post/getCommentByPost',{params:{
      postId:post.postId
    }}).then(res => {
      setComment(res.data);
    })
  }
  const getUserById = async(id) => {
    // 获取用户信息的API调用
    const user = await api.get('/user/findById',{params:{
      id:id
    }})
    return user.data;
  }
  return (
    <View style={styles.container}>
      {post!==null && <Card style={styles.card}>
        <View style={styles.header}>
          <Avatar style={styles.avatar}>
            <AvatarImage source={{ uri: post.avatar }} />
          </Avatar>
          <View>
            <Text style={styles.username}>{post.nickname}</Text>
            <Text style={styles.userDetails}>{post.postDate}</Text>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text>关注</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.content}>
          {post.title}
        </Text>
        <Text style={styles.comment}>
          {post.content}
        </Text>
        {post.images!='' && <View style={styles.imageGrid}>
          {post.images.split(',').map((image,index) => (
            <Image key={index} source={{ uri: image }} style={styles.image}/>
          ))}
          </View>}
      </Card>}
      <View style={styles.actions}>
        <View style={styles.actionsLeft}>
          <TouchableOpacity>
            <Text style={styles.actionText}>分享{post.shares}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.actionText}>收藏{post.favorites}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.actionText}>评论{post.likes}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.actionText}>全部回复</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.comments}>
      {comment!==null && comment.map((item,index)=>(
        <Card style={styles.card}>
        <View style={styles.header}>
          <Image source={'http://124.223.107.207/Upload/default.jpg'} style={styles.avatar} />
          <View>
            <Text style={styles.username}>测试(评论功能开发中)</Text>
            <Text style={styles.userDetails}>{item.commentDate}</Text>
          </View>
        </View>
        <Text style={styles.content}>
           {item.content}
        </Text>
        {/* <View style={styles.reply}>
          <Text style={styles.replyText}>
            无忧楼主: 哈哈，你真是个小吧
          </Text>
          <Text style={styles.replyText}>
            无忧楼主: 几个月过去了，这小吧还是这么逆天
          </Text>
        </View> */}
      </Card>
      ))}
      </ScrollView>
      <View style={styles.footer}>
        <Input style={styles.input}>
          <InputField  placeholder="写下你的评论..."/>
        </Input>
        <Button style={styles.sendButton}>
          <ButtonText>发送</ButtonText>
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  userDetails: {
    fontSize: 12,
  },
  followButton: {
    marginLeft: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  content: {
    fontSize: 14,
    marginBottom: 8,
  },
  comment: {
    fontSize: 12,
    marginBottom: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  stats: {
    fontSize: 12,
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionsLeft: {
    flexDirection: 'row',
    spaceBetween: 16,
  },
  actionText: {
    marginRight: 16,
  },
  likes: {
    marginLeft: 'auto',
    fontSize: 12,
  },
  reply: {
    padding: 8,
    borderRadius: 8,
  },
  replyText: {
    fontSize: 12,
    marginBottom: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: 8,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  sendButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
export default PostDetail;