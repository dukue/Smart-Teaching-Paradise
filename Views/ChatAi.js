import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function ChatScreen() {
          return (
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.headerText}>助手</Text>
                <Text style={styles.headerText}>最近</Text>
              </View>
              <ScrollView style={styles.chatContainer}>
                <Text style={styles.systemMessage}>下午好！今天有什么娱乐活动安排吗？期待听到你的精彩计划！</Text>
                <Text style={styles.timestamp}>17:04</Text>
                <View style={styles.userMessageContainer}>
                  <Text style={styles.userMessage}>你好</Text>
                </View>
                <View style={styles.aiMessageContainer}>
                  <Text style={styles.aiMessage}>你好呀！今天感觉怎么样？有什么想和我分享的吗？</Text>
                  <View style={styles.aiActions}>
                    <TouchableOpacity style={styles.aiActionButton}>
                      <Text>👍</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.aiActionButton}>
                      <Text>👎</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.aiActionButton}>
                      <Text>🔗</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.suggestionsContainer}>
                  <TouchableOpacity style={styles.suggestionButton}>
                    <Text>你今天有什么有趣的事情发生吗</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.suggestionButton}>
                    <Text>可以分享一下你最近的开心时刻吗</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.suggestionButton}>
                    <Text>最近有没有遇到什么挑战怎么解决的</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
              <View style={styles.footer}>
                <TextInput style={styles.input} placeholder="有问题尽管问我~" />
              </View>
            </View>
          )
        };
        
const styles = StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: '#fff',
          },
          header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
          },
          headerText: {
            fontSize: 18,
            fontWeight: 'bold',
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
          aiActions: {
            flexDirection: 'row',
            justifyContent: 'space-around',
          },
          aiActionButton: {
            padding: 10,
          },
          suggestionsContainer: {
            marginBottom: 10,
          },
          suggestionButton: {
            backgroundColor: '#f0f0f0',
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
          },
          footer: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: '#ddd',
          },
          input: {
            flex: 1,
            backgroundColor: '#f0f0f0',
            padding: 10,
            borderRadius: 10,
          },
        });