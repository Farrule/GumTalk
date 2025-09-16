import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const cardData = [
  '猫の鳴き真似',
  '目玉焼き',
  'スマホを操作',
  '歯みがき',
  'シャワーを浴びる',
];

const Card = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const translateX = useSharedValue(0);

  // カードデータが空の場合は、エラーメッセージを表示
  if (cardData.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>カードデータが見つかりません</Text>
      </View>
    );
  }

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX < -50) {
        // 左にスワイプした場合
        const nextIndex = (currentCardIndex + 1) % cardData.length;
        setCurrentCardIndex(nextIndex);
      } else if (event.translationX > 50) {
        // 右にスワイプした場合
        const prevIndex =
          (currentCardIndex - 1 + cardData.length) % cardData.length;
        setCurrentCardIndex(prevIndex);
      }
      translateX.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedStyle}>
          <Text style={styles.cardText}>{cardData[currentCardIndex]}</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default Card;
