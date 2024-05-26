import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { View, Text, Image, ScrollView,Divider } from '@gluestack-ui/themed'
import { SwitchCamera } from 'lucide-react-native';

export default function Widget() {
  const [activeTab,setActiveTab] = React.useState("我的收藏") 
  const Hmenu = ["我的收藏","教材答案","网课答案",]
    return (
            <ScrollView style={styles.container}>
              <View pb="$2" style={styles.menu}>
                {Hmenu.map((item,index)=>(
                  <Text onPress={()=>{
                    setActiveTab(item)
                  }} key={index} style={activeTab===item?styles.menuItemActive:styles.item}>{item}</Text>
                ))}
              </View>
              <Divider my="$1" />
              <View>
                <MenuPanel isActive={activeTab}/>
              </View>
            </ScrollView>
          );
        };
        
const MenuPanel=(item)=>{
  switch(item.isActive){
    case "我的收藏":
      return <Text>我的收藏</Text>
    case "教材答案":
      return <Text>教材答案</Text>
    case "网课答案":
      return (
        <View>
        {undefined.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.university}>{item.university}</Text>
              <View style={styles.rankContainer}>
                <Text style={[styles.rank, { backgroundColor: item.rankColor }]}>{item.rank}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>收藏</Text>
            </TouchableOpacity>
          </View>
        ))}
        </View>
      )
  }
}

const undefined = [
  {
    id: 1,
    title: '形势与政策',
    university: '吉林大学 | 李静',
    image: 'https://img.zcool.cn/community/01b39d5adafc44a801214a61f6a5af.jpg@2o.jpg',
    rank: 'TOP 1',
    rankColor: '#FF7043',
  },
  {
    id: 2,
    title: '习近平新时代中国特色社会主义思想',
    university: '中国政法大学 | 吴韬臻',
    image: 'https://img.zcool.cn/community/01b39d5adafc44a801214a61f6a5af.jpg@2o.jpg',
    rank: 'TOP 2',
    rankColor: '#FFCA28',
  },
  {
    id: 3,
    title: '毛泽东思想和中国特色社会主义理论体系概论',
    university: '北京大学 | 优学院',
    image: 'https://img.zcool.cn/community/01b39d5adafc44a801214a61f6a5af.jpg@2o.jpg',
    rank: 'TOP 3',
    rankColor: '#FFCA28',
  },
  {
    id: 4,
    title: '创新创业基础',
    university: '石家庄财经职业学院 | 吴海军',
    image: 'https://img.zcool.cn/community/01b39d5adafc44a801214a61f6a5af.jpg@2o.jpg',
    rank: 'TOP 4',
    rankColor: '#42A5F5',
  },
  {
    id: 5,
    title: '大学生心理健康教育与素养提升',
    university: '湖南信息职业技术学院 | 李莉',
    image: 'https://img.zcool.cn/community/01b39d5adafc44a801214a61f6a5af.jpg@2o.jpg',
    rank: 'TOP 5',
    rankColor: '#FF7043',
  },
];
const styles = StyleSheet.create({
    container: {
    flex: 1,
    },
    menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    },
    menuItem: {
    fontSize: 16,
    },
    menuItemActive: {
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
    },
    card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    },
    image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    },
    cardContent: {
    flex: 1,
    marginLeft: 10,
    },
    title: {
    fontSize: 16,
    fontWeight: 'bold',
    },
    university: {
    fontSize: 14,
    marginVertical: 5,
    },
    rankContainer: {
    flexDirection: 'row',
    },
    rank: {
    fontSize: 12,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    },
    button: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    },
    buttonText: {
    fontSize: 14,
    color: '#007AFF',
    },
});
  