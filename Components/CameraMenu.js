import React from 'react';
import {TouchableOpacity, StyleSheet } from 'react-native';
import { View, Text, ScrollView } from '@gluestack-ui/themed'

const MenuItem = ({ title, active, onPress }) => {
  const textStyle = active ? styles.activeText : styles.inactiveText;
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const HorizontalMenu = () => {
  const menuItems = ['搜题','翻译','作业批改','文档扫描','拍照转Word'];

  return (
    <ScrollView
      horizontal={true}
      style={styles.scrollView}
    >
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          title={item}
          active={index === 0} // 假设第一个菜单项是激活状态
          onPress={() => console.log(`Selected: ${item}`)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex:4,
  },
  item: {
    paddingVertical:2,
    marginHorizontal:10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeText: {
    color: 'white', // 激活状态的文本颜色
  },
  inactiveText: {
    color: 'gray', // 非激活状态的文本颜色
  },
});

export default HorizontalMenu;