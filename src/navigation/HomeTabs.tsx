import React, { useEffect, useRef } from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Animatable from 'react-native-animatable';

import { useThemeContext } from '#src/context/ThemeContext';
import * as Icons from '#src/icons';

import HomeScreen from '#src/screens/protected/tabs/HomeScreen';
import UserScreen from '#src/screens/protected/tabs/UserScreen';
import CartScreen from '#src/screens/protected/tabs/CartScreen';
import { useAuthContext } from '#src/context/AuthContext';
import { Text } from '#src/elements';
import MyOrdersScreen from '#src/screens/protected/tabs/MyOrdersScreen';

const Tab = createBottomTabNavigator();

const TabButton = ({
    Icon, activeIcon, inActiveIcon, props, badge = null
}: {
    props: any,
    Icon: any,
    activeIcon: any,
    inActiveIcon: any,
    badge?: string | number
}) => {

    const { onPress, accessibilityState } = props;
    const { colors } = useThemeContext();

    const focused = accessibilityState?.selected;
    const viewRef = useRef(null);

    useEffect(() => {
        if (focused) viewRef.current.animate({
            0: { scale: 0.8, color: colors.inactiveTint },
            1: { scale: 1.2, color: colors.activeTint }
        });
        else viewRef.current.animate({
            0: { scale: 1.2, color: colors.activeTint },
            1: { scale: 1, color: colors.inactiveTint }
        });
    }, [focused])

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            style={styles.container}>
            <Animatable.View
                ref={viewRef}
                duration={280}
                style={styles.container}>
                {badge ?
                    <Text style={[{
                        borderRadius: 100,
                        paddingHorizontal: 3,
                        backgroundColor: colors.activeTint,
                        color: 'white',
                        position: 'absolute',
                        top: 2,
                        right: 20,
                        fontSize: 12
                    }, focused && { fontSize: 10, top: 6 }]}>{badge}</Text> : null
                }
                <Icon Icon={Icon} size={24} name={focused ? activeIcon : inActiveIcon} color={focused ? colors.activeTint : colors.inactiveTint} />
            </Animatable.View>
        </TouchableWithoutFeedback>
    )
}

export default function HomeTabs() {

    const { cart } = useAuthContext();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen
                name={'Home'} component={HomeScreen}
                options={{
                    tabBarButton: (props) =>
                        <TabButton
                            props={props}
                            Icon={Icons.Ionicons}
                            activeIcon='ios-home' inActiveIcon='ios-home-outline'
                        />
                }}
            />
            <Tab.Screen
                name={'Cart'} component={CartScreen}
                options={{
                    tabBarButton: (props) =>
                        <TabButton
                            props={props}
                            badge={Object.keys(cart).length}
                            Icon={Icons.Feather}
                            activeIcon='shopping-cart' inActiveIcon='shopping-cart'
                        />
                }}
            />
            <Tab.Screen
                name={'Orders'} component={MyOrdersScreen}
                options={{
                    tabBarButton: (props) =>
                        <TabButton
                            props={props}
                            Icon={Icons.Feather}
                            activeIcon='shopping-bag' inActiveIcon='shopping-bag'
                        />
                }}
            />
            <Tab.Screen
                name={'User'} component={UserScreen}
                options={{
                    tabBarButton: (props) =>
                        <TabButton
                            props={props}
                            Icon={Icons.FontAwesome}
                            activeIcon='user' inActiveIcon='user-o'
                        />
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})