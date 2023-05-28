import React from 'react';
import { View, TouchableOpacity, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { timeHourMin } from '#src/utils';
import { useThemeContext } from '#src/context/ThemeContext';

import { Text } from '#src/elements';
import { CardContainer } from '#src/components/cards/CardContainer';

export function OrderCard({ order }) {

    const { colors } = useThemeContext();
    const { navigate } = useNavigation();
    // console.log(order);

    return (
        <TouchableOpacity onPress={() => navigate('Order Details' as never, { id: order.id, data: { ...order } } as never)}>
            <CardContainer>
                <View style={styles.container}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{order.id}</Text>
                    <Text style={{
                        color: order.status === 'Cancelled' ? colors.error : colors.success,
                        fontWeight: 'bold'
                    }}>{order.status}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.txt2}>{order.quantity} Items  •  Total: ₹ {order.grandTotal}</Text>
                    <Text style={styles.txt2}>{timeHourMin(order.createdAt.toDate())}</Text>
                </View>
            </CardContainer>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txt2: {
        color: 'gray',
        fontSize: 12
    }
})