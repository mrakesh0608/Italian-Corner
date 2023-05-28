import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { DefaultScreen, CardWithIcon } from '#src/components';
import { Image, Text } from '#src/elements';
import { addOrder } from '#src/firebase';

export default function PaymentScreen({ navigation, route }) {

    const { bill, address } = route.params
    console.log(bill);

    function createOrder({ paymentMode }) {
        addOrder({
            ...bill,
            address: { ...address },
            paymentMode
        }, (err, res) => {
            if (res?.status === 200) navigation.reset({
                index: 1,
                routes: [{
                    name: 'HomeTabs'
                }, {
                    name: 'Order Details',
                    params: { id: res?.id, data: res.data }
                }],
            } as never);
        })
    }

    return (
        <DefaultScreen>
            <Text style={{ fontSize: 16 }}>Choose Payment Method</Text>
            <CardWithIcon
                Icon={() => <Image source={require('#assets/upi.webp')} style={{ width: 24, height: 24 }} />}
                title='UPI'
                onPress={() => createOrder({ paymentMode: 'UPI' })}
            />
            <CardWithIcon
                Icon={({ color }) => <FontAwesome name="credit-card" size={24} color={color} />}
                title='Credit & Debit Card'
                onPress={() => createOrder({ paymentMode: 'Credit & Debit Card' })}
            />
        </DefaultScreen>
    );
}