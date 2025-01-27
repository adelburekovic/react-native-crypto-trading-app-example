import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { Provider } from 'react-redux';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RootNavigator } from './src/navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/store/slices';

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
