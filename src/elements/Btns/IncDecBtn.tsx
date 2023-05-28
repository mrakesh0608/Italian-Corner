import React from 'react'
import { View, Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { useThemeContext } from '#src/context/ThemeContext';
import { CapsuleBtn } from './CapsuleBtn';
import { Text } from '../Text';

export function IncDecBtn({
    value = 0,
    onIncrement,
    onDecrment
}: {
    value: number,
    onIncrement: Function,
    onDecrment: Function
}) {
    const { colors } = useThemeContext();

    if (value <= 0) {
        return (
            <CapsuleBtn
                title='ADD'
                textStyle={{ color: colors.addColor }}

                TextLeftComp={() => <Entypo name="plus" size={20} color={colors.addColor} style={{ marginRight: 6 }} />}

                onPress={() => onIncrement()}
            />
        );
    }

    return (
        <View style={{
            flexDirection: 'row',
            alignSelf: 'center',
            borderRadius: 25,
            paddingHorizontal: 24,
            paddingVertical: 10,
            marginVertical: 10,

            backgroundColor: colors.nearBg,
        }}>
            <Pressable
                onPress={() => onDecrment()}
                hitSlop={10}
            >
                <Entypo
                    name='minus' size={20}
                    color={colors.addColor}
                />
            </Pressable>
            <Text style={{
                letterSpacing: 1.2,
                fontWeight: 'bold',
                marginHorizontal: 10,
                color: colors.addColor
            }}>{value}</Text>

            <Pressable
                onPress={() => onIncrement()}
                hitSlop={10}
            >
                <Entypo
                    name="plus" size={20}
                    color={colors.addColor}
                />
            </Pressable>
        </View>
    )
}