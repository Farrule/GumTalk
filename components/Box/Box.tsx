import React from 'react';
import { Text } from 'react-native';

const Box = (num: { num: number }) => {
  return <Text>{num.num}</Text>;
};

export default Box;
