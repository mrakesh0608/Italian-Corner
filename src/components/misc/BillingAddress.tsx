import React from 'react';
import { View } from 'react-native';

import { Text } from '#src/elements';

import { CardContainer } from '#src/components/cards/CardContainer';

export function BillingAddress({ address }) {

    if (typeof address !== 'object') return;

    return (
        <View>
            <Text style={{ fontSize: 16 }}>Billing Address</Text>
            <CardContainer>
                <Text>{address?.['path']}</Text>
            </CardContainer>
        </View>
    );
}