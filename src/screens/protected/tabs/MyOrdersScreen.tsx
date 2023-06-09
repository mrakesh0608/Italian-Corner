import { useCallback, useState, useEffect } from 'react';
import { TouchableOpacity, SectionList, ActivityIndicator, RefreshControl, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { getDate, todayDate } from '#src/utils';
import { useThemeContext } from '#src/context/ThemeContext';

import { CardContainer, OrderCard } from '#src/components';
import { CapsuleBtn, CenterView, Text } from '#src/elements';
import React from 'react';
import { usePED } from '#src/hooks';

type orderType = 'desc' | 'asc'

export default function MyOrdersScreen({ navigation }) {

    const { colors } = useThemeContext();

    const [loading, setLoading] = useState(false);

    const { error, setError, data, setData } = usePED([]);

    const [order, setOrder] = useState<orderType>('desc');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1200);
    }, []);

    useEffect(() => {
        setLoading(true);

        const unsubscriber = firestore()
            .collection('Orders')
            // .where('uid', '==', auth().currentUser.uid) //this clause has some bug
            .orderBy('createdAt', order)
            .onSnapshot(querySnap => {
                try {
                    if (!querySnap) return;

                    const processedData = {};

                    querySnap.forEach(docSnap => {

                        const val = docSnap.data()
                        if (val?.createdAt && val.uid === auth().currentUser.uid) { //temp sol to where clause

                            let date = getDate(val.createdAt.toDate());

                            if (date === todayDate()) date = 'Today';
                            else if (date === getDate(new Date(Date.now() - 864e5))) date = 'Yesterday';

                            if (!processedData[date]) processedData[date] = [];

                            processedData[date].push({
                                id: docSnap.id,
                                ...val,
                            });
                        }
                    });

                    const data = []
                    Object.keys(processedData).forEach(item => {
                        data.push({
                            date: item,
                            data: processedData[item]
                        })
                    })
                    setData(data);
                } catch (error) {
                    console.log(error);
                    setError(error.message);
                }
                finally { setLoading(false); }
            });

        return unsubscriber;
    }, [order]);

    if (loading) {
        return (
            <CenterView>
                <ActivityIndicator color={colors.text} size='large' />
            </CenterView>
        );
    }
    if (error) {
        return (
            <CenterView>
                <CardContainer>
                    <Text style={{ color: 'red', fontWeight: 'bold' }}>{error}</Text>
                </CardContainer>
            </CenterView>
        );
    }
    if (!data.length) {
        return (
            <CenterView>
                <Text style={{ textAlign: 'center' }}>{`Try out the Italian Corner app to order delicious food\nfor the first time from the menu.`}</Text>
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
        <SectionList
            ListHeaderComponent={
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginTop: 20
                    }}

                    onPress={() => setOrder(order === 'desc' ? 'asc' : 'desc')}
                >
                    <MaterialCommunityIcons
                        name={order === 'desc' ?
                            "sort-calendar-ascending" : "sort-calendar-descending"
                        }
                        size={32} color={colors.text}
                    />
                </TouchableOpacity>
            }

            sections={data}
            keyExtractor={(item, index) => item + index}

            contentContainerStyle={{ paddingHorizontal: 20 }}

            renderSectionHeader={({ section: { date } }) => (
                <Text style={{ fontSize: 18, marginVertical: 10 }}>{date}</Text>
            )}

            renderItem={({ item }) => <OrderCard order={item} />}

            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListFooterComponent={
                <View style={{
                    alignSelf: 'center',
                    backgroundColor: 'gray',
                    paddingHorizontal: 50,
                    paddingVertical: 0.6,
                    marginTop: 30,
                    marginBottom: 40,
                }}></View>
            }
        />
    );
}