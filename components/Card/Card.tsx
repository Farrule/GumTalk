import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
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
  console.log('Initial currentCardIndex:', currentCardIndex); // 初期値をログ出力
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
      console.log('translateX.value:', translateX.value); // translationXの値をログ出力
    })
    .onEnd((event) => {
      if (event.translationX < -50) {
        // 左にスワイプした場合
        const nextIndex = (currentCardIndex + 1) % cardData.length;
        runOnJS(setCurrentCardIndex)(nextIndex);
        console.log('Swiped left, nextIndex:', nextIndex);
      } else if (event.translationX > 50) {
        // 右にスワイプした場合
        const prevIndex =
          (currentCardIndex - 1 + cardData.length) % cardData.length;
        runOnJS(setCurrentCardIndex)(prevIndex);
        console.log('Swiped right, prevIndex:', prevIndex);
      }

      // スワイプ後のcurrentCardIndexをログ出力
      console.log(
        'Current card index after swipe:',
        (currentCardIndex + cardData.length) % cardData.length
      );

      translateX.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={animatedStyle}>
            <Text style={styles.cardText}>{cardData[currentCardIndex]}</Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
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
