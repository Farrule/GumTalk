import { Component } from 'react';
import { Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

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
