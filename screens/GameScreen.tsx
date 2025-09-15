import { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Text, StyleSheet, View } from 'react-native';
import NavigateButton from '../components/Button/NavigateButton';

type RootStackParamList = {
  HomeScreen: undefined;
  GameScreen: undefined;
};

type GameScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GameScreen'
>;
type Props = {
  navigation: GameScreenNavigationProp;
};
const GameScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text>ゲーム画面</Text>
      <NavigateButton
        title="ホームに戻る"
        onPress={() => navigation.navigate('HomeScreen')}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GameScreen;
