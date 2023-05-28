import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';

import { DefaultScreen } from '#src/components';
import { FoodCard } from '#src/components/cards/FoodCard';

import list from '#src/db.json';
import { TransparentBtn, Text, CenterView } from '#src/elements';
import { useThemeContext } from '#src/context/ThemeContext';
import { CartCard } from '#src/components/cards/CartCard';

export default function FoodCategorieScreen({ navigation, route }) {

    const { colors } = useThemeContext();

    const { title } = route.params

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({});

    useEffect(() => {
        navigation.setOptions({ title });
    }, [title])

    useEffect(() => {
        const l = list.categories[title]?.variants

        if (Object.keys(filter).length === 0) {
            setData([...l])
            return;
        }

        if (l?.length) {
            const k = l.filter(i => filter[list.items[i].type])
            setData([...k])
        }
    }, [filter])

    // console.log(list.categories[title]?.variants);
    console.log(filter);

    return <>
        <DefaultScreen>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TransparentBtn
                    title={'Clear'}
                    onPress={() => setFilter({})}
                    containerStyle={{
                        backgroundColor: colors.card,
                        padding: 6,
                        borderRadius: 10,
                        borderWidth: 0.4
                    }}
                />
                {[{
                    title: 'Veg',
                    img: require('#assets/food/veg.png')
                },
                {
                    title: 'Egg',
                    img: require('#assets/food/egg.png')
                }, {
                    title: 'Non Veg',
                    img: require('#assets/food/non-veg.png')
                }].map((item, index) =>
                    <TransparentBtn
                        key={index}
                        title={item.title}

                        onPress={() => {
                            if (filter[item.title]) filter[item.title] = false
                            else filter[item.title] = true

                            setFilter({ ...filter })
                        }}

                        TextLeftComp={() =>
                            <Image
                                source={item.img}
                                style={{ width: 20, height: 20 }}
                            />
                        }
                        containerStyle={{
                            backgroundColor: filter[item.title] ? '#FFD580' : colors.card,
                            padding: 6,
                            borderRadius: 10,
                            borderWidth: 0.4
                        }}
                    />
                )}
            </View>
            {data.length === 0 ?
                <CenterView>
                    <Text style={{ textAlign: 'center' }}>{`No Items Found`}</Text>
                </CenterView>
                : null
            }
            {data.map((item, index) =>
                <FoodCard
                    key={index}
                    id={item}
                />
            )}
            <View style={{ paddingBottom: 65 }} />
        </DefaultScreen>
        <CartCard />
    </>
}