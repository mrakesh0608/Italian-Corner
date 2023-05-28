import React from 'react';
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';

import { useThemeContext } from '#src/context/ThemeContext';

import { Text } from '#src/elements';
import { CardContainer } from '#src/components/cards/CardContainer';

export function FoodCategorieCard({ title, desc, imgSource = require('#assets/icon.png'), onPress }) {

    const { colors } = useThemeContext();
    const styles = makeStyles({ colors });

    return (
        <TouchableOpacity onPress={onPress}>
            <CardContainer style={[
                styles.container,
            ]}>
                <View>
                    <Image source={imgSource} style={styles.img} resizeMode={'contain'} />
                </View>
                <View style={{ flexShrink: 1, alignItems: 'center', marginLeft: 10 }}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={{ textAlign: 'center', marginTop: 18 }}>{desc}</Text>
                </View>
            </CardContainer>
        </TouchableOpacity>
    )
}

const makeStyles = ({ colors }) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.card,
        padding: 24,
    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 100
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})