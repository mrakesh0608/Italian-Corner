import React from 'react'
import { AntDesign } from '@expo/vector-icons';

import { CapsuleBtn } from '#src/elements';
import { useGoogleOAuth } from '#src/hooks';

export function GoogleBtn({
    title = 'Continue with Google'
}) {
    const { signIn, isPending } = useGoogleOAuth();

    return (
        <CapsuleBtn
            title={title}
            TextLeftComp={({ color }) =>
                <AntDesign name="google" size={24} color={color} />
            }
            onPress={signIn}
            isPending={isPending}
        />
    )
}