import React from 'react';
import { ScrollView } from 'react-native';

import { Text } from '#src/elements';
import { AppIcon } from '#src/components';

const { name, version } = require('#root/app.json').expo;

export default function AppInfoScreen() {
    return (
        <ScrollView contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <AppIcon />
            <Text style={{ marginTop: 20 }}>Version {version}</Text>
        </ScrollView>
    );
}