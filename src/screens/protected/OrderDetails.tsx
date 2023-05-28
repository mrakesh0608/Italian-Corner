import React, { useEffect } from 'react';

import { getDate, timeHourMinSec } from '#src/utils';
import { getOrderById, updateOrderById } from '#src/firebase';
import { usePED } from '#src/hooks';

import { CenterView, ErrorText, Text, TransparentBtn } from '#src/elements';
import { BillDetails, BillingAddress, DefaultScreen, OrderFoodCard } from '#src/components';
import { useThemeContext } from '#src/context/ThemeContext';

export default function OrderDetails({ route }) {
    const { colors } = useThemeContext();
    const { id, data: routeData } = route.params

    const { isPending, setIsPending, error, setError, data, setData } = usePED({});

    useEffect(() => {
        if (routeData) setData(routeData);
        else getData()
    }, [id, routeData])

    function getData() {
        getOrderById(id, (err, data) => {
            if (err || !data) {
                setError(err.message);
            }
            if (data) {
                setData(data);
            }
        })
    }

    function handleCancel() {
        setIsPending(true)
        updateOrderById(id, {
            status: 'Cancelled'
        }, async (res) => {
            if (res.status === 200)
                setData({
                    ...data,
                    status: 'Cancelled'
                })
        })
    }

    if (error || typeof data !== 'object') {
        return (
            <CenterView>
                <ErrorText>{error}</ErrorText>
            </CenterView>
        );
    }
    console.log(JSON.stringify(data, null, 2));

    return (
        <DefaultScreen>

            <Text style={{ fontSize: 16 }}>Order ID : {id}</Text>
            <Text style={{ fontSize: 16 }}>Payment Mode : {data['paymentMode']}</Text>

            <Text style={{
                fontSize: 16,
                marginTop: 20
            }}>Status : <Text style={{
                color: data.status === 'Cancelled' ? colors.error : colors.success
            }}>{data['status']}</Text></Text>

            <Text style={{ fontSize: 16, marginTop: 20 }}>Date : {getDate(data['createdAt']?.toDate())}</Text>
            <Text style={{ fontSize: 16 }}>Time : {timeHourMinSec(data['createdAt']?.toDate())} </Text>

            <BillDetails bill={data} totalText={'Grand Total'} />
            <BillingAddress address={data['address']} />

            <Text style={{ fontSize: 16 }}>Items</Text>
            {data['cart'] && Object.keys(data['cart']).map((item, index) =>
                <OrderFoodCard
                    key={index}
                    item={{ id: item, ...data['cart'][item] }}
                />
            )}
            {data['status'] !== 'Cancelled' ?
                <TransparentBtn
                    title={'Cancel Order'}
                    isPending={isPending}
                    onPress={handleCancel}
                    textStyle={{
                        color: 'red'
                    }}
                /> : null
            }
        </DefaultScreen>
    );
}