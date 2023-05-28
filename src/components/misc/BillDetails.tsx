import React from 'react';
import { View } from 'react-native';

import { useThemeContext } from '#src/context/ThemeContext';

import { Text } from '#src/elements';
import { CardContainer } from '#src/components/cards/CardContainer';

export function BillDetails({ bill, totalText = 'To Pay' }) {

    const { colors } = useThemeContext();
    return (
        <View style={{
            marginVertical: 20
        }}>
            <Text style={{ fontSize: 16 }}>Bill Details</Text>
            <CardContainer>
                {[{
                    text1: 'Item Total',
                    text2: `₹ ${bill.price}`
                }, {
                    text1: 'Delivery Fee',
                    text2: `₹ ${bill.delivery}`
                }, {
                    text1: 'No. of Items',
                    text2: bill.quantity
                }].map((item, index) =>
                    <View
                        key={index}
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                    >
                        <Text>{item.text1}</Text>
                        <Text>{item.text2}</Text>
                    </View>
                )}
                <View style={{
                    borderTopWidth: 0.6,
                    borderStyle: 'dashed',
                    borderColor: colors.text,
                    marginVertical: 16
                }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{totalText}</Text>
                    <Text>₹ {bill.grandTotal}</Text>
                </View>
            </CardContainer>
        </View>
    );
}