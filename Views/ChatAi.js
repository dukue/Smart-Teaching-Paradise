import React,{ useEffect } from 'react';
import { TouchableOpacity,StyleSheet } from 'react-native';
import { View,Text,Spinner,Input,Icon,InputField,ScrollView,Button,ButtonIcon,HStack,VStack,Pressable,useToast,Toast,ToastTitle,ToastDescription } from '@gluestack-ui/themed';
import { SendIcon,AlertTriangleIcon} from 'lucide-react-native';
import getWebsocketUrl,{APPID} from '../utils/aiPath';

export default function ChatScreen(){
  const toast = useToast()
  const [id,setId] = React.useState(0)
  const [message, setMessage] = React.useState('');
  const [tempmessage, setTempMessage] = React.useState('');
  const [msflag, setMsflag] = React.useState(false);
  const [messageList, setMessageList] = React.useState([
      {
        role:'ai',
        content:'你好，我是AI助手，有什么可以帮助你的吗？'
      }
  ])

  
      // websocket发送数据
  async function SendMessage(messages,setMessageList) {
    let system = "";
    if(messages !== ""){
      const ws = new WebSocket(getWebsocketUrl());
      var params = {
          header: {
              app_id: APPID, "uid": "fd3f47e3-d"
          }, parameter: {
              chat: {
                  "domain": "generalv3.5", "temperature": 0.5, "max_tokens": 1024
              }
          }, payload: {
              message: {
                text: [
                    {"role": "user", "content":messages}
                ]
              }
          }
      }
      let newUserMessage = {
        role: "user",
        content: messages
      }
      setMessageList(prevMessages => [...prevMessages, newUserMessage]);
        ws.onopen = e => {
          console.log("websocket连接成功?")
          ws.send(JSON.stringify(params))
        };
        setMessage("")
        ws.onmessage = e => {
          setMsflag(true)
          var data = JSON.parse(e.data)
          var aiMessage = data.payload.choices.text[0].content
          system +=aiMessage    
          setTempMessage(system)
          if(data.header.status === 2){
            let newSystemMessage = {
              role: "ai",
              content: system
            }
            setMsflag(false)
            setMessageList(prevMessages => [...prevMessages, newSystemMessage]);
          }
        }
        ws.onclose = e => {
        }
    }else{
      toast.show({
        placement: "top right",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast bg="$error700" nativeID={toastId} action="warning" variant="solid">
              <Icon as={AlertTriangleIcon} color="$white" mt="$1" mr="$3" />
              <VStack space="xs">
                <ToastTitle color="$textLight50">警告！</ToastTitle>
                <ToastDescription color="$textLight50">
                  输入内容不能为空
                </ToastDescription>
              </VStack>
            </Toast>
          )
        },
      })
    }
   
  }    
      return (
        <View style={styles.container}>
          <ScrollView style={styles.chatContainer}>
            {messageList.map((message, index) => (
              <View key={index} style={[styles.messageContainer, message.role === "user" ? styles.userMessageContainer : styles.aiMessageContainer]}>
                <Text style={[styles.message, message.role === "user" ? styles.userMessage : styles.aiMessage]}>{message.content}</Text>
              </View>
            ))}
            {msflag && (
            <View style={styles.aiMessageContainer}>
                <Text style={styles.aiMessage}>{tempmessage}</Text>  
                <Spinner size="small" />
            </View>)}
            {/* <Text style={styles.timestamp}>17:04</Text> */}
          </ScrollView>
          <HStack style={styles.footer}>
            <Input style={styles.input}>
              <InputField onChangeText={message=>{setMessage(message)}} value={message}  placeholder="有问题尽管问我~" />
            </Input>
            <Button onPress={()=>{SendMessage(message,setMessageList)}}>
              <ButtonIcon as={SendIcon} size="md" color="white" />
            </Button>
          </HStack>
        </View>
      )
};
   // 连接websocket
function connectWebSocket() {
  const ws = new WebSocket(getWebsocketUrl());
  ws.onopen = e => {
    // connection opened
    ws.send(JSON.stringify(params))
  };
    ws.onmessage = e => {
      // a message was received
      console.log(e.data);
    };   
    ws.onerror = e => {
      // an error occurred
      console.log(e.message);
    };
}

      
        

const styles = StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: '#fff',
          },
          chatContainer: {
            flex: 1,
            padding: 16,
          },
          systemMessage: {
            backgroundColor: '#f0f0f0',
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
          },
          timestamp: {
            textAlign: 'center',
            color: '#aaa',
            marginBottom: 10,
          },
          userMessageContainer: {
            alignItems: 'flex-end',
            marginBottom: 10,
          },
          userMessage: {
            backgroundColor: '#007aff',
            color: '#fff',
            padding: 10,
            borderRadius: 10,
          },
          aiMessageContainer: {
            backgroundColor: '#f0f0f0',
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
          },
          aiMessage: {
            marginBottom: 10,
          },
          footer: {
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: '#ddd',
          },
          input: {
            flex: 1,
            backgroundColor: '#f0f0f0',
            borderRadius: 10,
            marginRight: 10,
          },
        });