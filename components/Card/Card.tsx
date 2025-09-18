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

type TopicsCards = {
  [key: string]: {
    num: number;
    items: string[];
  };
};

const TopicsCards: TopicsCards = topics.topics;
let card;
let readed: number[] = [];

const rand = (min: number, max: number): number => {
  // すべての数字が使用されたかチェック
  if (readed.length >= max - min + 1) {
    readed = []; // 使用済み配列をリセット
    console.log('All numbers used. Resetting readed array.');
  }

  while (true) {
    let tmp = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!readed.includes(tmp)) {
      readed.push(tmp);
      console.log('Used numbers:', readed);
      return tmp;
    }
  }
};

const min = 1;
const max = 60;

const Card = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState('1');
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX < -50) {
        card = rand(min, max).toString();
        setCurrentCardIndex(card);
        console.log('Swiped left, nextIndex:', card);
      }
      // } else if (event.translationX > 50) {
      //   // 右にスワイプした場合
      //   const prevIndex =
      //     (currentCardIndex - 1 + cardData.length) % cardData.length;
      //   runOnJS(setCurrentCardIndex)(prevIndex);
      //   console.log('Swiped right, prevIndex:', prevIndex);
      // }

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
