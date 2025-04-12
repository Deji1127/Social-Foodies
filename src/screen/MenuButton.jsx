import React from 'react';
import { TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function MenuButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Feather name="menu" size={30} color="#B40324" />
    </TouchableOpacity>
  );
}
