import React, { useEffect, useState } from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import remoteConfig from '@react-native-firebase/remote-config';
import { MaterialIcons } from '@expo/vector-icons';
import Share from 'react-native-share';

import { CardWithIcon } from '../cards/CardWithIcon';

export function ShareApp() {

    const [link, setLink] = useState(null);

    useEffect(() => {
        (async () => {
            const link = await dynamicLinks().buildShortLink({
                domainUriPrefix: 'https://italiancorner.page.link',
                link: `https://italiancorner.page.link/welcome`,
            });
            setLink(link);
        })();
    }, []);

    function handleShareApp() {
        Share
            .open({
                title: "Italian Corner App",
                subject: 'Italian Corner App',
                message: `Try out this awesome app !!\n\nOpen App : ${link}\n\nDocs : ${'https://github.com/mrakesh0608/Italian-Corner'}\n\nDownload Apk : ${remoteConfig().getValue('DOWNLOAD_APK').asString()}`
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <CardWithIcon
            title='Share App'
            onPress={handleShareApp}
            Icon={({ color }) =>
                <MaterialIcons
                    name='share'
                    size={24} color={color}
                />
            }
        />
    );
}