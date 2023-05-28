import { useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import * as Location from 'expo-location';

import firestore from '@react-native-firebase/firestore';
import * as firebase from '#src/firebase';
import list from '#src/db.json';

export function useInitUser({
    user, theme, cart, dispatch
}) {

    //update User on Change
    useEffect(() => {
        const unsubscribe = auth().onUserChanged(async (user) => {

            if (!user) dispatch({ type: 'INIT' })
            else {
                console.log(user);

                dispatch({ type: 'SET_USER', payload: user });
                await firebase.initNewUser({ theme });

                if (!user.displayName) dispatch({ type: 'SET_IS_NEW_USER', payload: true })
                else dispatch({ type: 'SET_IS_NEW_USER', payload: false })
            }
        });
        return unsubscribe; // Unsubscribe from further state changes
    }, []);

    //update Cart on User Change
    useEffect(() => {
        if (!user) return;

        const unsubscriber = firestore()
            .collection('Users')
            .doc(auth().currentUser.uid)
            .onSnapshot(querySnap => {
                try {
                    const data = querySnap?.data()
                    Object.keys(data?.cart).map(key => {
                        if (data.cart[key] <= 0) delete data.cart[key]
                    })

                    dispatch({ type: 'SET_INFO', payload: { ...data } });
                } catch (error) {
                    console.log(error);
                    // setError(error.message);
                }
            });

        return unsubscriber;
    }, [user]);

    //Read Current Location of User & save address to Auth Context API
    useEffect(() => {
        if (!user) return;
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permission to access location was denied');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                const address = await Location.reverseGeocodeAsync(location.coords);

                const { postalCode, name, street, city, region, country } = address[0]

                let myaddress = '';
                [name, street, city, region, postalCode, country].forEach(item => {
                    if (item) myaddress += myaddress.length ? `, ${item}` : item
                })

                dispatch({ type: 'SET_ADDRESS', payload: { path: myaddress, postalCode } })
            } catch (error) {
                console.log(error);
            }
        })();
    }, [user])


    //Calculate Cart Bill
    useEffect(() => {
        if (!user) return;

        console.log(cart);

        const bill = {
            price: 0,
            quantity: 0,
            delivery: 49,
            cart: {}
        };

        Object.keys(cart).forEach((item) => {
            bill.cart[item] = {
                price: list['items'][item].price,
                quantity: cart[item]
            }

            bill.price += bill.cart[item].price * bill.cart[item].quantity;
            bill.quantity += bill.cart[item].quantity;
        })
        dispatch({ type: 'SET_BILL', payload: { ...bill, grandTotal: bill.price + bill.delivery } })
    }, [cart, user]);
}