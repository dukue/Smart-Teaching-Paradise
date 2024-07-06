import React from 'react';
import { View, Text, Button, ButtonText, Card } from '@gluestack-ui/themed';

const StatisticsScreen = ({isActive}) => {
  return (
    
    <View style={{ display: isActive ? "flex" : "none",flex:1,padding:16}}>
      <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>统计数据</Text>

      <Card m="$2">
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Text style={{ color: '#3b82f6' }}>累计专注</Text>
          <Text style={{ color: '#3b82f6' }}>时长</Text>
          <Text style={{ color: '#3b82f6' }}>日均时长</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 24 }}>0</Text>
          <Text style={{ fontSize: 24 }}>0分钟</Text>
          <Text style={{ fontSize: 24 }}>0分钟</Text>
        </View>
      </Card>

      <Card m="$2">
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Text style={{ color: '#3b82f6' }}>当日专注 2024-06-13</Text>
          <Text style={{ color: '#3b82f6' }}>时长</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 24 }}>0</Text>
          <Text style={{ fontSize: 24 }}>0分钟</Text>
        </View>
      </Card>

      <Card m="$2">
        <Text style={{ color: '#3b82f6', marginBottom: 8 }}>专注时长分布 2024-06-13</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Text style={{ color: '#3b82f6' }}>日</Text>
          <Text style={{ color: '#3b82f6' }}>周</Text>
          <Text style={{ color: '#3b82f6' }}>月</Text>
          <Text style={{ color: '#3b82f6' }}>自定义</Text>
        </View>
        <Text style={{ textAlign: 'center', color: '#64748b', marginBottom: 8 }}>暂无专注数据，点击待办上的开始按钮来专注计时吧</Text>
        <View style={{ alignItems: 'center' }}>
          <Button color="#3b82f6">
            <ButtonText>查看专注记录</ButtonText>
            </Button>
        </View>
      </Card>

      <Card m="$2">
        <Text style={{ color: '#3b82f6', marginBottom: 8 }}>本月专注时段分布 2024年06月</Text>
        <Text style={{ textAlign: 'center', color: '#64748b' }}>暂无专注数据，点击待办上的开始按钮来专注计时吧</Text>
      </Card>

    </View>
  );
};

export default StatisticsScreen;