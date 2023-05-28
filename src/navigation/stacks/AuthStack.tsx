import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '#src/screens/auth/SignInScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Sign In" component={SignInScreen} />
        </Stack.Navigator>
    );
}