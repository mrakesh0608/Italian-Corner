import React from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';

//use this component when no flatlist is required
export function DefaultScreen({
    children, style
}: {
    children: React.ReactNode,
    style?: StyleProp<ViewStyle>
}) {
    return (
        <ScrollView contentContainerStyle={[{
            padding: 20,
            flexGrow: 1
        }, style]}>
            {children}
        </ScrollView>
    );
}