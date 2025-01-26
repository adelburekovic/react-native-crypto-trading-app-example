import React from 'react';
import HomeScreen from '../screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator();

export const RootNavigator = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
        </RootStack.Navigator>
    );
};