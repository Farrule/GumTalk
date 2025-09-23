import { Button } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
}

const NavigateButton = ({ title, onPress }: Props) => {
  return (
    <Button
      title={title}
      onPress={() => {
        onPress();
      }}
    />
  );
};

export default NavigateButton;
