import React from 'react';
import { ActivityIndicator } from 'react-native'

import { useThemeContext } from '#src/context/ThemeContext';

import { Text } from '../Text'
import { CenterView } from './CenterView';

export function LoadingComp({
    title = 'Loading',
    showInRow = true
}: {
    title?: string,
    showInRow?: boolean
}) {

    const { colors } = useThemeContext();

    return <CenterView style={showInRow ? {
        flexDirection: 'row'
    } : {
        flexDirection: 'column-reverse'
    }}>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>{title}</Text>
        <ActivityIndicator
            color={colors.text}
            style={{ marginLeft: 12 }}
        />
    </CenterView>
}