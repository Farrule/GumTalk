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
