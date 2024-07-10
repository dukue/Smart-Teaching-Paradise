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
      return   <View>
      {undefined.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.university}>{item.university}</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>取消收藏</Text>
          </TouchableOpacity>
        </View>
      ))}
      </View>
    case "教材答案":
      return   <View>
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
          {/* <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>收藏</Text>
          </TouchableOpacity> */}
        </View>
      ))}
      </View>
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
    image: 'https://img12.360buyimg.com/n0/jfs/t2539/258/18717035/216892/52587458/56324b6dNe94ce9d5.jpg',
    rank: 'TOP 1',
    rankColor: '#FF7043',
  },
  {
    id: 2,
    title: '习近平新时代中国特色社会主义思想',
    university: '中国政法大学 | 吴韬臻',
    image: 'https://news.youth.cn/sz/201806/W020180607530991538803.jpg',
    rank: 'TOP 2',
    rankColor: '#FFCA28',
  },
  {
    id: 3,
    title: '毛泽东思想和中国特色社会主义理论体系概论',
    university: '北京大学 | 优学院',
    image: 'https://pic.rmb.bdstatic.com/bjh/news/7d8e6fbb2ed94409d67b95f7cf171bae7378.png',
    rank: 'TOP 3',
    rankColor: '#FFCA28',
  },
  {
    id: 4,
    title: '创新创业基础',
    university: '石家庄财经职业学院 | 吴海军',
    image: 'https://img14.360buyimg.com/pop/jfs/t1/127103/34/14994/541789/5f8726b9E85140505/d2cfe408dcb97b3e.jpg',
    rank: 'TOP 4',
    rankColor: '#42A5F5',
  },
  {
    id: 5,
    title: '大学生心理健康教育与素养提升',
    university: '湖南信息职业技术学院 | 李莉',
    image: 'https://img10.360buyimg.com/n1/jfs/t1/199222/11/27032/37610/6311afd0E5ef1a454/097b7117eb0d24ef.jpg',
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
  