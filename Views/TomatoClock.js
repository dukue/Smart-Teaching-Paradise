import React from 'react';
import { StyleSheet,TouchableOpacity } from 'react-native';
import {View, Text,Image, ScrollView, Button,ButtonIcon,ButtonText, HStack } from "@gluestack-ui/themed";
import { AddIcon } from '@gluestack-ui/themed';

const Task = ({ text, time, imageUrl }) => (
  <View style={[styles.task, { backgroundImage: `url(${imageUrl})` }]}>
    <View style={styles.taskHeader}>
      <Text style={styles.taskText}>{text}</Text>
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.buttonText}>开始</Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.taskTime}>{time}</Text>
  </View>
);
const TomatoClock = () => {
  const getDate = async() => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM plans',
              [],
              (_, resultSet) => {
                console.log('查询结果：', resultSet);
              },
              error => console.error('查询失败', error)
            );
      });
  }
  getDate()
  return (

    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <HStack w={'100%'} justifyContent='space-between'>
          <Text style={styles.title}>待办</Text>
          <Button style={styles.buttonText}>
                <ButtonIcon as={AddIcon}></ButtonIcon>
                <ButtonText>点击添加待办</ButtonText>
            </Button>
        </HStack>
      </View>
      <Task text="待办是指您要专注的事" time="1 分钟" imageUrl="https://placehold.co/600x200?text=Task+1" />
      <Task text="右上角+号添加待办" time="10 分钟" imageUrl="https://placehold.co/600x200?text=Task+2" />
      <Task text="长按待办编辑或删除" time="25 分钟" imageUrl="https://placehold.co/600x200?text=Task+3" />
      <Task text="点击开始按钮来专注计时" time="25 分钟" imageUrl="https://placehold.co/600x200?text=Task+4" />
      <View style={[styles.task, { backgroundImage: `url(https://placehold.co/600x200?text=Task+5)` }]}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskText}>读书</Text>
          <Image source={{ uri: 'https://placehold.co/50x50?text=Donut' }} style={styles.donutImage} />
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.buttonText}>开始</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.taskTime}>25 分钟</Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modeButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  buttonText: {
    color: '#fff',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    spaceBetween: 16,
  },
  task: {
    backgroundColor: '#64b5f6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskText: {
    color: '#fff',
  },
  startButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  taskTime: {
    color: '#fff',
    marginTop: 8,
    fontSize: 12,
  },
  donutImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});
export default TomatoClock;