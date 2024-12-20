import { Button, Input } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, StyleSheet, View, AppState, Dimensions } from 'react-native';

import { supabase } from '../../utils/supabase';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <LinearGradient
      colors={['#833ab4', '#fd1d1d', '#fcb045']}
      style={{ height: Dimensions.get('window').height }}>
      <View style={styles.container}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            style={{ color: 'white' }}
            label="Email"
            placeholderTextColor="gainsboro"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Password"
            style={{ color: 'white' }}
            placeholderTextColor="gainsboro"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
        </View>
        <View style={styles.verticallySpaced}>
          <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
