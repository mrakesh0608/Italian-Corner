import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { DefaultScreen, CardWithIcon } from '#src/components';
import { ErrorText, Image, LoadingComp, Text } from '#src/elements';
import { addOrder } from '#src/firebase';
import { usePED } from '#src/hooks';

export default function PaymentScreen({ navigation, route }) {

    const { bill, address } = route.params
    console.log(bill);

    const {
        isPending, setIsPending,
        error, setError,
        data: pendingText, setData: setPendingText //for temporary only , it need to be implemented nicely to show pending
    } = usePED('Processing your Payment');

    function createOrder({ paymentMode }) {
        setIsPending(true);
        setPendingText(`Redirecting to ${paymentMode}`)

        addOrder({
            ...bill,
            address: { ...address },
            paymentMode
        }, (err, res) => {
            setIsPending(false);
            if (res?.status === 200) navigation.reset({
                index: 1,
                routes: [{
                    name: 'HomeTabs'
                }, {
                    name: 'Order Details',
                    params: { id: res?.id, data: res.data }
                }],
            } as never);
            else {
                setError(err.message)
            }
        })
    }

    if (isPending) return <LoadingComp title={pendingText} showInRow={false} />

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
                title='Credit & Debit Card - Rupay'
                onPress={() => createOrder({ paymentMode: 'Credit & Debit Card - Rupay' })}
            />
            <ErrorText>{error}</ErrorText>
        </DefaultScreen>
    );
}