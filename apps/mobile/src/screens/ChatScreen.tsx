import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useChatStore } from '../store/useChatStore';
import { useSocket } from '../hooks/useSocket';
import { GlimrMessage } from '@glimr/shared';

const ChatScreen = () => {
  const [text, setText] = useState('');
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);

  // Get data from our Zustand store
  const messages = useChatStore(state => state.messages);

  // Get the send function from our Socket hook
  const { sendMessage } = useSocket();

  const handleSend = () => {
    if (text.trim()) {
      sendMessage(text);
      setText('');

      // Auto-scroll to bottom when sending
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const renderMessage = ({ item }: { item: GlimrMessage }) => {
    const isMe = item.senderId === 'me';
    return (
      <View
        style={[styles.bubble, isMe ? styles.myBubble : styles.theirBubble]}
      >
        <Text
          style={[styles.messageText, isMe ? styles.myText : styles.theirText]}
        >
          {item.text}
        </Text>
        <Text
          style={[styles.timestamp, isMe ? styles.myTime : styles.theirTime]}
        >
          {new Date(item.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={styles.flex}
      >
        {/* Header - Simple for now */}
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <Text style={styles.headerTitle}>Glimr Chat</Text>
          <View style={styles.onlineDot} />
        </View>

        {/* Message List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={[styles.listContent]}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* Input Bar */}
        <View
          style={[styles.inputWrapper, { paddingBottom: insets.bottom + 10 }]}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={text}
              onChangeText={setText}
              placeholder="Type a message..."
              placeholderTextColor="#9BA1A6"
              multiline
            />
            <TouchableOpacity
              style={[styles.sendButton, !text.trim() && styles.disabledButton]}
              onPress={handleSend}
              disabled={!text.trim()}
            >
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FB' },
  flex: { flex: 1 },
  header: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E9F0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1D1E' },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ADE80',
    marginLeft: 8,
  },
  listContent: { paddingHorizontal: 16, paddingTop: 10 },
  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 8,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  myBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  theirBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 4,
  },
  messageText: { fontSize: 15, lineHeight: 20 },
  myText: { color: '#FFF' },
  theirText: { color: '#1A1D1E' },
  timestamp: { fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
  myTime: { color: 'rgba(255,255,255,0.7)' },
  theirTime: { color: '#9BA1A6' },
  inputWrapper: {
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E9F0',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F1F3F5',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    minHeight: 36,
    maxHeight: 100,
    fontSize: 15,
    color: '#1A1D1E',
    paddingTop: 8,
    paddingBottom: 8,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 8,
    marginBottom: 2,
  },
  disabledButton: { backgroundColor: '#B0C4DE' },
  sendText: { color: '#FFF', fontWeight: '600', fontSize: 14 },
});
