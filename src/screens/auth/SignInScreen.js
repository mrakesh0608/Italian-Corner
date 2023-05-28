import { AppIcon, GoogleBtn } from "#src/components";
import { Text, OR } from '#src/elements';
import FormContainer from "#src/forms/FormContainer";

import gStyles from '#src/styles/gStyles';
import SignInWithPhoneScreen from './SignInWithPhoneScreen';

export default function SignInScreen({ navigation }) {
    return (
        <FormContainer>
            <AppIcon />
            <Text style={gStyles.h2}>Log in or sign up</Text>
            <SignInWithPhoneScreen />
            <OR />
            <GoogleBtn />
        </FormContainer>
    );
}