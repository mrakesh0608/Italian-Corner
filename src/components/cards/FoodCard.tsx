import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ImageSourcePropType } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { useThemeContext } from '#src/context/ThemeContext';
import { useAuthContext } from '#src/context/AuthContext';

import { updateUser } from '#src/firebase';
import { usePED } from '#src/hooks';

import { Text, Image, IncDecBtn } from '#src/elements';
import { CardContainer } from '#src/components/cards/CardContainer';

import list from '#src/db.json';

export function FoodCard({
    id, img = require('#assets/icon2.png'),
    size = 'default'
}: {
    id: string,
    img?: ImageSourcePropType,
    size?: 'small' | 'default'
}) {

    if (!id) return;

    const { colors } = useThemeContext();
    const { cart } = useAuthContext();
    const styles = makeStyles({ colors });
    const { data, setData } = usePED();

    useEffect(() => {
        setData({
            ...list['items'][id],
            quantity: cart[id] ? cart[id] : 0
        })
    }, [id, cart]);

    function updateQuantity({ value }) {
        updateUser({
            [`cart.${id}`]: value
        })
    }

    if (!data) return null;

    return (
        <TouchableWithoutFeedback>
            <CardContainer style={[
                styles.container,
            ]}>
                <View>
                    <Image source={img} style={[
                        styles.img,
                        size === 'small' && { width: 100, height: 100 }
                    ]} resizeMode={'contain'} />
                </View>
                <View style={{ flexGrow: 1, marginLeft: 30, flexShrink: 1 }}>
                    <Text style={{ fontSize: 18 }}>{data.title}</Text>
                    {data.desc && size === 'default' && <Text>{data.desc}</Text>}
                    <Text style={{ marginTop: 20, fontSize: 16, color: 'coral', fontWeight: 'bold' }}>₹ {data.price}</Text>
                    <IncDecBtn
                        value={data.quantity}
                        onIncrement={() => updateQuantity({
                            value: firestore.FieldValue.increment(1)
                        })}
                        onDecrment={() => updateQuantity({
                            value: firestore.FieldValue.increment(-1)
                        })}
                    />
                </View>
            </CardContainer>
        </TouchableWithoutFeedback>
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
        width: 140,
        height: 140,
        borderRadius: 40
    }
})