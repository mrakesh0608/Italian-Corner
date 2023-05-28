import React from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useThemeContext } from '#src/context/ThemeContext';
import { useAuthContext } from '#src/context/AuthContext';

import { Text } from '#src/elements';

export function MyLocation() {

    const { colors } = useThemeContext();
    const { address } = useAuthContext();

    if (!address) return;

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <MaterialIcons name="location-on" size={32} color={colors.text} style={{ marginRight: 6 }} />
            <Text style={{ fontSize: 12, flexShrink: 1 }}>{address['path']}</Text>
        </View>
    )
}