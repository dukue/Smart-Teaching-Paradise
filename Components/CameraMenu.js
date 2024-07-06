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

const HorizontalMenu = ({active}) => {
  const menuItems = ['翻译','作业批改','搜题目','文档扫描','拍照转Word'];
  const activeItem = active.activeItem
  const setActiveItem = active.setActiveItem
  const scrollViewRef = React.useRef(null);
  const [scrollViewWidth, setScrollViewWidth] = React.useState(0);
  const onLayoutHandler = (event) => {
    const { width } = event.nativeEvent.layout;
    setScrollViewWidth(width); 
  };
  const centerItem = () => {
    if (scrollViewRef.current) {
      const itemWidth = 100; 
      const activeIndex = activeItem;
      const offset = (activeIndex * itemWidth) - (scrollViewWidth / 2); // 计算偏移量
      scrollViewRef.current.scrollTo({ x: offset, animated: true });
    }
  };
  React.useEffect(() => {
    console.log(active);
    centerItem();
  },[activeItem]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal={true}
      onLayout={onLayoutHandler} 
      style={styles.scrollView}
    >
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          title={item}
          active={index === activeItem} 
          onPress={() => {setActiveItem(index);centerItem()}}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex:1,
  },
  item:{
    width: 100,
    paddingVertical:2,
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