import React from 'react';
import { FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useThemeContext } from '#src/context/ThemeContext';

import { CapsuleBtn, CenterView, Text } from '#src/elements';
import { useAuthContext } from '#src/context/AuthContext';
import { BillDetails, BillingAddress, FoodCard } from '#src/components';

export default function CartScreen({ navigation }) {

    const { colors } = useThemeContext();
    const { cart, address, bill } = useAuthContext();

    if (!(Object.keys(cart).length)) {
        return (
            <CenterView>
                <Text>Your cart is empty. Add something from the Menu.</Text>
                <CapsuleBtn
                    title='Browse Menu'
                    onPress={() => navigation.navigate('Home')}
                    containerStyle={{ marginTop: 30 }}
                    textStyle={{ color: colors.addColor }}
                />
            </CenterView>
        );
    }

    return (
        <FlatList
            ListHeaderComponent={
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>Cart</Text>
            }

            data={Object.keys(cart)}
            keyExtractor={(item, index) => item + index}

            contentContainerStyle={{ paddingHorizontal: 20 }}

            renderItem={({ item }) => <FoodCard id={item} size={'small'} />}
            ListFooterComponent={
                <>
                    <BillDetails bill={bill} />
                    <BillingAddress address={address} />
                    <CapsuleBtn
                        title='Proceed to Pay'
                        onPress={() => navigation.navigate('Payment', { bill: { ...bill }, address })}
                        containerStyle={{
                            marginBottom: 50
                        }}
                        TextLeftComp={() =>
                            <Ionicons name="ios-wallet" size={24} color={colors.text}/>
                        }
                    />
                </>
            }
        />
    );
}