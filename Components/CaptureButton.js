import React, { useCallback, useRef } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box,View, Text,  } from '@gluestack-ui/themed';

const CameraButton = ({capture}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        capture()
      }}
    >
      <View bg={'$white'} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60, // 按钮的宽度
    height: 60, // 按钮的高度
    backgroundColor: 'white', // 按钮的背景颜色
    borderRadius: 30, // 按钮的圆角
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // 确保图标和文本不会超出按钮边界
  },
  icon: {
    width: 50, // 图标的大小
    height: 50, // 图标的大小
    borderColor:'black',
    borderWidth:2,
    borderRadius:30,
  },
});

export default CameraButton;