import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import * as firebase from '#src/firebase';
import * as utils from '#src/utils';
import { usePED } from './usePED';

export function useNewUser() {

    const { navigate } = useNavigation();

    const { isPending, setIsPending, error, setError } = usePED();

    async function handleProfile({ displayName, photoURL }) {
        const up = {};

        if (displayName) up['displayName'] = displayName;

        if (photoURL && photoURL !== auth().currentUser.photoURL) {

            const url = await firebase.uploadFile({
                path: `photoURL/${auth().currentUser.uid}`,
                file: photoURL
            })
            if (url) up['photoURL'] = url;
        }
        if (Object.keys(up).length) {
            await auth().currentUser.updateProfile(up)
            console.log('User profile updated');
        }
    }

    const saveInfo = async (values) => {
        setIsPending(true);
        setError(null);

        const { displayName, photoURL } = values;
        console.log(values);

        try {
            await handleProfile({ displayName, photoURL });

            utils.haptics('Success');
            navigate('HomeTabs' as never)
        }
        catch (error) {
            console.log(error);
            setError(await utils.showableErrorText(error));
            utils.haptics('Error');
        }
        finally { setIsPending(false); }
    }

    return { saveInfo, isPending, error }
}