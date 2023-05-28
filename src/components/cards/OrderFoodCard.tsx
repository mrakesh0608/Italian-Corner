import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useThemeContext } from '#src/context/ThemeContext';

import { Text, Image } from '#src/elements';
import { CardContainer } from '#src/components/cards/CardContainer';

import list from '#src/db.json';

const img = require('#assets/icon2.png')

export function OrderFoodCard({
    item = {}
}: {
    item?: object
}) {
    const { navigate } = useNavigation();
    if (!item) return;

    const { colors } = useThemeContext();
    const styles = makeStyles({ colors });

    // console.log(item);

    item['title'] = list.items[item['id']]?.title

    return (
        <TouchableOpacity onPress={() => navigate('Food Categorie' as never, { title: item['id']?.split('-')[0] } as never)} >
            <CardContainer style={[
                styles.container,
            ]}>
                <View>
                    <Image source={img} style={[
                        styles.img
                    ]} resizeMode={'contain'} />
                </View>
                <View style={{ flexGrow: 1, marginLeft: 30, flexShrink: 1, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16 }}>{item['title']}</Text>
                    <Text style={{ color: 'coral', fontWeight: 'bold' }}>₹ {item['price']}</Text>
                    <Text>Qty : {item['quantity']}</Text>
                </View>
            </CardContainer>
        </TouchableOpacity>
    );
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
        width: 65,
        height: 65,
        borderRadius: 40
    }
})