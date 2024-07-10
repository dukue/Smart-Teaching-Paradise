import React,{useEffect,useRef,useState,useCallback} from "react";
import { StyleSheet,TouchableOpacity,Dimensions,Image as ImageRN } from "react-native";
import  {Image,Box,Spinner,View,Text,ScrollView,Button,ButtonIcon,Center,HStack,Card,Heading,Divider, ButtonText} from '@gluestack-ui/themed'
import axios from "react-native-axios";
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
import { sha256 } from "js-sha256";
import { Ear,EarOff } from "lucide-react-native";
import getWebsocketUrl,{getTextUrl,APPID,getTranslateUrl,getVoiceUrl,getMathUrl} from '../utils/aiPath';
import { Buffer } from "buffer";
import Canvas, { Image as CanvasImage } from 'react-native-canvas';

const previewScreen = ({route}) => {
    const canvasRef = useRef(null);
    const {photo,activeItem} = route.params;
    const { width, height } = Dimensions.get('window');
    const [dst, setDst] = useState(null);
    const [src, setSrc] = useState(null);
    const [mathresult, setMathresult] = useState(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [tempMessage, setTempMessage] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [listenResult,setListenResult] = useState([]);
    //裁剪后的图片
    const [imagePath, setImagePath] = useState(null);
    const [result, setResult] = useState(true);
    useEffect(() => {
        if (photo && photo.path) {
            /**
             * case0：翻译
             * case1：批作业
             * case2：搜题
             * case3：文档识别
             * case4：转world
             */
            getDate(activeItem)
        }
    },[activeItem])

    const getDate = useCallback((activeItem) => {
        if (activeItem == '0') {
            identification(photo.path)
        }else if(activeItem == '1'){
            console.log('批作业')
            mathCorrection(photo.path)
        }else if(activeItem == '2'){
            console.log('搜题')
            identification(photo.path)
        }else if(activeItem == '3'){
            console.log('听写助手')
            identification(photo.path)
        }
    })

    // 文字识别
    const identification = (imagePath) => {
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
                    const res = await axios.post(getTextUrl(),params)
                    const decodeString = Buffer.from(res.data.payload.result.text, 'base64').toString('utf-8')
                    const jsonString = JSON.parse(decodeString)
                    if(activeItem == '0'){
                        translation(concatenateContent(jsonString))}
                    else if(activeItem == '2'){
                        searchQuestion(concatenateContent(jsonString))
                    }else if(activeItem == '3'){
                        let wordsTemp = [];
                        jsonString.pages.forEach(page => {
                            page.lines.forEach(line => {
                                line.words.forEach(word => {
                                   wordsTemp.push(word.content);
                                });
                            });
                        })
                        setListenResult(wordsTemp)
                        setResult(false);
                    }
                }catch(error){
                    console.log(error)
                }
            }
            postImg()
        })
        .catch((err) => {
            console.error('Error reading image file:', err);
        });
    }      
    // 函数用于拼接content字段
    function concatenateContent(data) {
        let concatenatedContent = "";
        // 遍历pages数组
        data.pages.forEach(page => {
        // 遍历lines数组
        page.lines.forEach(line => {
            // 拼接words数组中的content字段
            line.words.forEach(word => {
            concatenatedContent += word.content;
            });
         });
        });
        return concatenatedContent;
    }
    // 翻译
   const translation = async(content)=>{
    const textString = Buffer.from(content).toString('base64')
        params={
            common:{
                app_id:"8f3794a1"
            },
            business:{
                from:"cn",
                to :"en"
            },
            data:{
                text:textString
            }
        }
        // 将 JSON 数据转换为字符串进行sha256哈希
        const jsonString = JSON.stringify(params);
        const mk = sha256(jsonString)
        const hashparam = Buffer.from(mk).toString('base64') 
        const urlmess = getTranslateUrl(hashparam)
        const trans = async () => {
            try{
                await axios.post(urlmess.url,params,{
                    headers:{
                        Host:'itrans.xfyun.cn',
                        Date:urlmess.Date,
                        Digest:urlmess.Digest,
                        Authorization:urlmess.Authorization
                    }
                }).then((res)=>{
                    setDst(res.data.data.result.trans_result.dst)
                    setSrc(res.data.data.result.trans_result.src)
                    setResult(false)
                })
            }catch(err){
                console.log(err)
            }
        }
        trans()
    }
    //作业批改
    const mathCorrection = async(photo) => {
        const base64String =await RNFS.readFile(photo, 'base64')
            params={	   
                common:{
                    app_id:"8f3794a1"
                },
                business:{
                    ent:"math-arith",
                    aue :"raw"
                },
                data:{
                    image: base64String   
                }
            }
              // 将 JSON 数据转换为字符串进行sha256哈希
            const jsonString = JSON.stringify(params);
            const mk = sha256(jsonString)
            const hashparam = Buffer.from(mk).toString('base64') 
            const urlmess = getMathUrl(hashparam)
            const mathresult = async () => {
                try{
                    await axios.post(urlmess.url,params,{
                        headers:{
                            Host:'rest-api.xfyun.cn',
                            Date:urlmess.Date,
                            Digest:urlmess.Digest,
                            Authorization:urlmess.Authorization
                        }
                    }).then((res)=>{
                        const { imp_line_info } = res.data.data.ITRResult.multi_line_info;
                        const { line_word_result } = res.data.data.ITRResult.recog_result[0];
                        
                        const results = [];
                        let correctCount = 0;
                        let incorrectCount = 0;
                    
                        imp_line_info.forEach((item, index) => {
                            const { imp_line_rect, total_score } = item;
                            const { right_down_point_x, right_down_point_y } = imp_line_rect;
                            const question = line_word_result[index].word_content[0];
                            const isCorrect = total_score === 1;
                      
                            results.push({ question, isCorrect });   
                            
                            if( isCorrect) {
                                correctCount++;
                            } else {
                                incorrectCount++;
                            }
                          });
                          setCorrectCount(correctCount)
                          setIncorrectCount(incorrectCount)
                          setMathresult(results)
                          setResult(false)
                    })
                }catch(err){
                    console.log(err)
                }
            }
            mathresult()
    }
    //canvas画布
    handleCanvas = async (imagePath) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            // 绘制图片
            const imageData = await RNFS.readFile(imagePath, 'base64');
            const image = new CanvasImage(canvas);
            image.src = `data:image/png;base64,${imageData}`;
            image.addEventListener('load', () => {
              ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
              mathCorrection(imageData); 
            });
        }
      };

      drawCheckMark = (ctx, x, y) => {
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 20, y - 20);
        ctx.lineTo(x - 40, y);
        ctx.stroke();
      };
    
      drawCrossMark = (ctx, x, y) => {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(x - 20, y - 20);
        ctx.lineTo(x + 20, y + 20);
        ctx.moveTo(x + 20, y - 20);
        ctx.lineTo(x - 20, y + 20);
        ctx.stroke();
      };
     //AI搜题
      searchQuestion = async (messages) => {
        if(messages !== ""){
                let system = ""
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

                ws.onopen = e => {
                    console.log("websocket连接成功?")
                    ws.send(JSON.stringify(params))
                };
                ws.onmessage = e => {
                var data = JSON.parse(e.data)
                var aiMessage = data.payload.choices.text[0].content
                system += aiMessage    
                setTempMessage(system)
                    if(data.header.status === 2){
                        setResult(false);
                        console.log(tempMessage)
                    }
                }
                ws.onclose = e => {}
            }
        }
        listenWord = async (messages) => {
            const base64String = Buffer.from(messages).toString('base64')
            const ws = new WebSocket(getVoiceUrl());
            params = {
                common: {
                  app_id: "8f3794a1"
                },
                business: {
                  aue: "lame",
                  vcn: "xiaoyan",
                  sfl: 1,
                  pitch: 50,
                  speed: 50
                },
                data: {
                  status: 2,
                  text: base64String
                }
              }
              ws.onopen = e => {
                console.log("websocket连接成功?")
                ws.send(JSON.stringify(params))
             };
            ws.onmessage = e => {
                var data = JSON.parse(e.data)
                if(data.data.status == 2){
                    setIsPlaying(true);
                    // 将 base64 数据写入本地文件
                    const path = `${RNFS.DocumentDirectoryPath}/temp.mp3`;
                    RNFS.writeFile(path, data.data.audio, 'base64');
                    // 播放音频
                    const sound = new Sound(path, '', (error) => {
                        if (error) {
                        console.log('Failed to load the sound', error);
                            setIsPlaying(false);
                        return;
                        }
                        sound.play((success) => {
                            if (success) {
                                console.log('Successfully finished playing');
                            } else {
                                console.log('Playback failed due to audio decoding errors');
                            }
                            setIsPlaying(false);
                        });
                    });
                }
            }
            ws.onclose = e => {
                
            }
        }

    return(
        <View style={styles.container}>
            {dst!==null &&<View style={styles.imageContainer}>
                <Image accessibilityLabel='avatar' source={{ uri: photo.path }} style={styles.image} />
               <Center><Text my={"$1.5"} fontSize={"$xs"} color={"$coolGray600"}>本功能基于讯飞的文字识别和机器翻译api</Text></Center>
            </View>}
            <View style={styles.textContainer}>
                <ScrollView>
                    {/* 加载中 */}
                    {result && <Center>
                        <HStack space="lg">
                            <Spinner />
                            <Text size="md">加载中</Text>
                        </HStack>
                    </Center>}
                    {/* 翻译结果 */}
                    {dst!==null && <Box flex={1}>
                        <Card flex={5} size="md" variant="elevated" m="$3">
                            <Heading mb="$1" size="md" color={"$blue600"}>
                                Translation(翻译)
                            </Heading>
                            <Divider my="$1" />
                            <Text>{dst}</Text>
                        </Card>
                        <Card flex={5} size="md" variant="elevated" m="$3">
                            <Heading mb="$1" size="md">
                                Original(源文)
                            </Heading>
                            <Divider my="$1" />
                            <Text>{src}</Text>
                        </Card>
                    </Box>}
                    {/* 作业批改 */}
                    {mathresult!==null && <Box flex={1}>
                        <Card flex={1} size="md" variant="elevated" m="$3">
                            <Heading mb="$1" size="md" color={"$blue600"}>
                                作业批改
                            </Heading>
                            <View style={styles.mathcontainer}>
                                <Image source={{ uri: photo.path }} style={{resizeMode:'stretch',width:'100%',height:photo.cropRect.height}} />
                            </View>
                            <Divider my="$1" />
                            <Center justifyContent="space-between">
                            <Text style={styles.statText}>正确题目: {correctCount}</Text>
                            <Text style={styles.statText}>错误题目: {incorrectCount}</Text>
                            </Center>
                            {mathresult.map((item, index) => (
                            <View key={index} style={styles.resultItem}>
                                <Text style={styles.questionText}>{item.question}</Text>
                                <Text style={item.isCorrect ? styles.correctText : styles.wrongText}>
                                {item.isCorrect ? '√' : '×'}
                                </Text>
                            </View>
                            ))}
                        </Card>
                    </Box>}
                    {/* AI搜题 */}
                    {tempMessage !== '' && <Box flex={1}>
                        <Card flex={1} size="md" variant="elevated" m="$3">
                            <Heading mb="$1" size="md" color={"$blue600"}>
                                解答
                            </Heading>
                            <Text fontSize={"$xs"} color="$gray500">答案来自讯飞AI星火3.5大模型，请自行辨别正误</Text>
                            <Divider my="$1" />
                            <Text>{tempMessage}</Text>
                        </Card>
                    </Box>}
                    {/* 听力 */}
                    {listenResult.length !== 0 && <Box flex={1}>
                        <Card flex={1} size="md" variant="elevated" m="$3">
                            <Heading mb="$1" size="md" color={"$blue600"}>
                                听力
                            </Heading>
                            <Divider my="$1" />
                            <View style={styles.listenContainer}>
                                {listenResult.map((item, index) => (
                                        <View key={index} style={styles.listenItem}>
                                            <Button disabled={isPlaying}  variant="link" action="primary" onPress={() => listenWord(item)}>
                                                <ButtonText>{item}</ButtonText>
                                                <ButtonIcon as={isPlaying?EarOff:Ear} mx={"$1"} size="sm"/>
                                            </Button>
                                        </View>
                                ))}
                            </View>
                        </Card>
                    </Box>
                    }
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
    },
    mathcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    resultItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
      },
      listenContainer:{
        height: '100%',
        flex: 1,
        flexDirection: 'row', // 使子元素水平排列
        flexWrap: 'wrap', // 允许子元素换行
      },
      listenItem:{
        width: '50%', // 每个元素占据父容器宽度的50%
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
      },
      questionText: {
        fontSize: 16,
        color: '#333',
      },
      correctText: {
        fontSize: 16,
        color: 'green',
      },
      wrongText: {
        fontSize: 16,
        color: 'red',
      },
})
export default previewScreen;