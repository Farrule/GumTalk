import { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Text, StyleSheet, View } from 'react-native';
import NavigateButton from '../components/Button/NavigateButton';

type RootStackParamList = {
  HomeScreen: undefined;
  GameScreen: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;
type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text>ガムトーク</Text>
      <Text>箱からカードを一枚引きます</Text>
      <Text>箱の中の一番上のカードの数字を見ます</Text>
      <Text>カードを引いた人が数字に該当したお題の話をします</Text>
      <Text>話にオチがなくても大丈夫</Text>
      <Text>話終わったら「いい話や」と言って上げてください</Text>
      <Text>場が和み会話が弾みます</Text>
      <NavigateButton
        title="ゲームスタート"
        onPress={() => navigation.navigate('GameScreen')}
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

export default HomeScreen;
