import React from 'react'
import { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { useAuthContext } from '#src/context/AuthContext';

import HomeTabs from '#src/navigation/HomeTabs';
import AppInfoScreen from '#src/screens/protected/AppInfoScreen';
import FoodCategorieScreen from '#src/screens/protected/FoodCategorieScreen';
import PaymentScreen from '#src/screens/protected/PaymentScreen';
import OrderDetails from '#src/screens/protected/OrderDetails';
import UserEditScreen from '#src/screens/protected/UserEditScreen';

const Stack = createStackNavigator();

export default function ProtectedStack() {

    const navigation = useNavigation();
    const { isNewUser } = useAuthContext();

    useEffect(() => {
        if (isNewUser) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'User Edit Screen' }],
            } as never);
        }

    }, [isNewUser])

    return (
        <Stack.Navigator initialRouteName={isNewUser ? 'User Edit Screen' : 'HomeTabs'}>
            <Stack.Screen name='HomeTabs' component={HomeTabs}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="User Edit Screen" component={UserEditScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name='Food Categorie' component={FoodCategorieScreen} />
            <Stack.Screen name='Order Details' component={OrderDetails} />
            <Stack.Screen name='Payment' component={PaymentScreen} />
            <Stack.Screen name='App Info' component={AppInfoScreen} />
        </Stack.Navigator>
    );
}