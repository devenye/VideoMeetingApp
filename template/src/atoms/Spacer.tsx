import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface SpacerProps {
  size: number;
  horizontal?: boolean;
}

const Spacer = ({size, horizontal = false}: SpacerProps) => {
  return (
    <View
      style={{
        width: horizontal ? size : 'auto',
        height: !horizontal ? size : 'auto',
      }}
    />
  );
};

export default Spacer;

const styles = StyleSheet.create({});
