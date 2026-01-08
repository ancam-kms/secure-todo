import { AuthenticateUser } from './application/usecases/auth/commands/authenticate';
import { localAuthRepository } from './infrastructure';
import AuthScreen from './presentation/screens/Auth';
import DashboardScreen from './presentation/screens/Dashboard';
import TodoDetail from './presentation/screens/TodoDetail';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AppState, useColorScheme } from 'react-native';
import { Todo } from './domain/entities/todo';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Dashboard: undefined;
  TodoDetail: {
    todoDetail?: Todo;
  };
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticateUser = useMemo(
    () => new AuthenticateUser(localAuthRepository),
    [],
  );

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setIsAuthenticated(false);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {!isAuthenticated ? (
        <AuthScreen
          authenticateUser={authenticateUser}
          onAuthenticated={() => setIsAuthenticated(true)}
        />
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
              headerShown: true,
            }}
          >
            <Stack.Screen
              name="Dashboard"
              options={{
                title: 'Dashboard',
              }}
            >
              {props => <DashboardScreen {...props} />}
            </Stack.Screen>

            <Stack.Screen
              name="TodoDetail"
              options={{
                presentation: 'modal',
              }}
            >
              {props => <TodoDetail {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </ThemeProvider>
  );
}
