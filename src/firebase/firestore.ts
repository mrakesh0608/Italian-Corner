import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as utils from '#src/utils';

export async function initNewUser(payload) {
    if (!auth().currentUser) return;

    firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .get().then(res => {
            if (res.exists) return;

            firestore()
                .collection('Users')
                .doc(auth().currentUser.uid)
                .set(payload)
        })
        .catch(error => {
            utils.ToastErrorOfFirebase(error);
        })
}

export function updateUser(payload) {
    if (!auth().currentUser) return;

    firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .update(payload)
        .catch(error => {
            utils.ToastErrorOfFirebase(error);
        })
}

export async function getOrderById(id, cb) {

    if (!auth().currentUser) return;

    firestore()
        .collection('Order')
        .doc(id)
        .get()
        .then(res => {
            console.log(id, res);

            const data = res?.data();
            if (data) cb(null, data);
            else throw Error("Something Went Wrong")
        })
        .catch(error => {
            utils.ToastErrorOfFirebase(error);
            cb(error, null);
        })
}

export async function addOrder(payload: any, cb: any) {

    if (!auth().currentUser) return;
    payload['createdAt'] = firestore.FieldValue.serverTimestamp();
    payload['uid'] = auth().currentUser.uid;
    payload['status'] = 'On the way'

    firestore()
        .collection('Orders')
        .add({ ...payload })
        .then(res => {
            //make cart empty after order
            firestore()
                .collection('Users')
                .doc(auth().currentUser.uid)
                .set({
                    cart: {}
                })

            // console.log(res);

            //get data
            res.get().then(res => {
                cb(null, { status: 200, id: res.id, data: res?.data() });
            })
        })
        .catch(error => {
            utils.ToastErrorOfFirebase(error);
            cb(error, null);
        })
}