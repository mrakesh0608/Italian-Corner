import React from 'react';
import { Image, StyleProp, ImageStyle } from 'react-native';

export function AppIcon({ style }: {
    style?: StyleProp<ImageStyle>
}) {
    return (
        <Image
            source={require('#assets/icon2.png')}
            style={[{ alignSelf: 'center', width: 156, height: 156 }, style]}
        />
    );
}