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
import * as topics from './Topics.json';
import Box from '../Box/Box';

type TopicsCards = {
  [key: string]: {
    num: number;
    items: string[];
  };
};

const TopicsCards: TopicsCards = topics.topics;
let readed: string[] = [];

const rand = (min: number, max: number): string => {
  // すべての数字が使用されたかチェック
  if (readed.length >= max - min + 1) {
    readed = []; // 使用済み配列をリセット
    console.log('All numbers used. Resetting readed array.');
  }

  while (true) {
    let CardIndex = (
      Math.floor(Math.random() * (max - min + 1)) + min
    ).toString();
    if (!readed.includes(CardIndex)) {
      readed.push(CardIndex);
      console.log('Used numbers:', readed);
      return CardIndex;
    }
  }
};

const min = 1;
const max = Object.keys(TopicsCards).length;

const Card = () => {
  // 初回レンダリング時に一度だけランダムな値を設定します
  const [currentCardIndex, setCurrentCardIndex] = useState(() =>
    rand(min, max)
  );
  const [nextCardIndex, setNextCardIndex] = useState(() => rand(min, max));
  const translateX = useSharedValue(0);

  const updateCards = () => {
    setCurrentCardIndex(nextCardIndex);
    setNextCardIndex(rand(min, max));
    console.log('Swiped left, new currentCardIndex:', nextCardIndex);
  };

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      // スワイプが一定量を超えたらカードを更新
      if (event.translationX < -50) {
        runOnJS(updateCards)();
      }

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
        <Box num={TopicsCards[nextCardIndex].num} />
        <GestureDetector gesture={panGesture}>
          <Animated.View style={animatedStyle}>
            <Text style={styles.cardText}>
              1.{TopicsCards[currentCardIndex].items[0]}
            </Text>
            <Text style={styles.cardText}>
              2.{TopicsCards[currentCardIndex].items[1]}
            </Text>
            <Text style={styles.cardText}>
              3.{TopicsCards[currentCardIndex].items[2]}
            </Text>
            <Text style={styles.cardText}>
              4.{TopicsCards[currentCardIndex].items[3]}
            </Text>
            <Text style={styles.cardText}>
              5.{TopicsCards[currentCardIndex].items[4]}
            </Text>
            <Text style={styles.cardText}>
              6.{TopicsCards[currentCardIndex].items[5]}
            </Text>
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
