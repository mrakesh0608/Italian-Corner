import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'

import { Text } from '#src/elements';

import { FoodCategorieCard } from '../cards/FoodCategorieCard';

import list from '#src/db.json';

export function FoodCategorieList() {

    const { navigate } = useNavigation();

    const categories = list['categories']

    return (
        <View style={{
            marginVertical: 26
        }}>
            {/* displayName can be undefined if signed with other than Google */}
            <Text
                style={{ fontSize: 18, marginVertical: 10 }}
            >{auth().currentUser.displayName?.split(' ')[0]}, What would you like to eat today?</Text>

            {Object.keys(categories).map((item, index) =>
                <FoodCategorieCard
                    key={index}
                    title={item}
                    desc={categories[item]['desc']}
                    imgSource={{ uri: categories[item]['img'] }}
                    onPress={() => navigate('Food Categorie' as never, { title: item } as never)}
                />
            )}
        </View>
    );
}