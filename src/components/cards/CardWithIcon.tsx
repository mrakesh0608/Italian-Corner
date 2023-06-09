import React from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

import { useThemeContext } from '#src/context/ThemeContext';

import { Text } from '#src/elements';
import { CardContainer } from '#src/components/cards/CardContainer';

export function CardWithIcon({ Icon, title, desc, onPress, containerStyle, TitleRightComp }: {
    Icon: any,
    title?: string,
    desc?: string,
    onPress?: any,
    containerStyle?: StyleProp<ViewStyle>,
    TitleRightComp?: any
}) {

    const { colors } = useThemeContext();

    function R() {
        return (
            <CardContainer style={containerStyle}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{ flex: 0.15 }}>
                        <Icon color={colors.text} size={24} />
                    </View>
                    <View style={{ flex: 0.85 }}>
                        {title &&
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                <Text style={{ fontSize: 16 }}>{title}</Text>
                                {TitleRightComp && <TitleRightComp />}
                            </View>
                        }
                        {desc && <Text style={{ color: 'gray' }}>{desc}</Text>}
                    </View>
                </View>
            </CardContainer>
        )
    }

    //when its not used as a dialog CallerContent
    if (typeof onPress === 'function') return (
        <TouchableOpacity onPress={onPress}>
            <R />
        </TouchableOpacity>
    )
    return <R />;
}