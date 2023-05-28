import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { useThemeContext } from '#src/context/ThemeContext';
import { useAuthContext } from '#src/context/AuthContext';

import { Text } from '#src/elements';
import { CardContainer } from '#src/components/cards/CardContainer';

export function CartCard() {

    const { navigate } = useNavigation();

    const { colors } = useThemeContext();
    const { cart, bill } = useAuthContext();

    if (Object.keys(cart).length === 0) return null;

    return <>
        <TouchableOpacity
            onPress={() =>
                navigate('HomeTabs' as never, { screen: 'Cart' } as never)
            }
            style={{
                marginHorizontal: 20,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
            }}
        >
            <CardContainer style={{
                borderWidth: 1,
                borderColor: colors.inactiveTint,
                paddingVertical: 10 //remove default padding style
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{ flex: 0.15 }}>
                        <Feather name='shopping-cart' size={24} color={colors.text} />
                    </View>
                    <View style={{ flex: 0.85 }}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Text style={{ fontSize: 16 }}>{Object.keys(cart).length} Unique Items</Text>
                        </View>
                        {bill && <Text style={{ color: 'gray' }}>{bill['quantity']} Items  •  Total: ₹{bill['grandTotal']}</Text>}
                    </View>
                </View>
            </CardContainer>
        </TouchableOpacity >
    </>
}