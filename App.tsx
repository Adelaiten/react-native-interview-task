import { NativeBaseProvider } from "native-base";
import React from 'react';
import {
  StyleSheet
} from 'react-native';
import HomeScreen from "./src/screens/HomeScreen";


function App(): React.JSX.Element {
  return (
    <NativeBaseProvider>
      <HomeScreen/>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
});

export default App;
