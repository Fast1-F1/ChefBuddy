import { LinearGradient } from 'expo-linear-gradient';
import { View, Dimensions } from 'react-native';

export default function Profile() {
  return (
    <View className="flex-1">
      <LinearGradient
        colors={['#833ab4', '#fd1d1d', '#fcb045']}
        style={{ height: Dimensions.get('window').height }}
      />
    </View>
  );
}
