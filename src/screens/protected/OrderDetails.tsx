import React, { useEffect } from 'react';

import { getDate, timeHourMinSec } from '#src/utils';
import { getOrderById } from '#src/firebase';
import { usePED } from '#src/hooks';

import { CenterView, ErrorText, Text } from '#src/elements';
import { BillDetails, BillingAddress, DefaultScreen, OrderFoodCard } from '#src/components';

export default function OrderDetails({ route }) {

    const { id, data: routeData } = route.params

    const { error, setError, data, setData } = usePED({});

    useEffect(() => {
        if (routeData) {
            setData(routeData);
            return;
        }

        getOrderById(id, (err, data) => {
            if (err || !data) {
                setError(err.message);
            }
            if (data) {
                setData(data);
            }
        })
    }, [id, routeData])

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
            <Text style={{ fontSize: 16 }}>Status : {data['status']}</Text>
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
        </DefaultScreen>
    );
}