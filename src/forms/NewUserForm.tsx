import React from 'react';
import auth from '@react-native-firebase/auth';
import { Formik } from "formik";
import * as yup from 'yup';

import { useUploadImg } from '#src/hooks';
import { windowWidth } from '#src/utils';

import FormikTextInput from '#src/forms/FormikTextInput';
import { SubmitBtn } from '#src/elements';
import { FontAwesome } from '@expo/vector-icons';
import { useThemeContext } from '#src/context/ThemeContext';

export default function NewUserForm({ isPending, error, onSubmit }) {

    const { colors } = useThemeContext();

    const { photoURL = '', displayName = '', phoneNumber = '', email = '' } = auth().currentUser;

    const { uploadImg, UploadImgComp } = useUploadImg({
        initialImg: photoURL ? { uri: photoURL } : null,
    });

    const initialValues = {
        displayName, phoneNumber, email,
    };

    return (
        <>
            {!photoURL && !uploadImg &&
                <FontAwesome name='user-o' size={100} color={colors.text} style={{
                    alignSelf: 'center',
                }} />
            }
            <UploadImgComp
                imgStyle={{
                    width: windowWidth * 0.45,
                    height: windowWidth * 0.45,
                    // borderRadius: 100,
                }}
            />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(val, actions) => {
                    // actions.resetForm();
                    // console.log(val);
                    onSubmit({ ...val, photoURL: uploadImg?.uri });
                }}
                enableReinitialize
            >{props =>
                <>
                    <FormikTextInput
                        formikProps={props}
                        varName={'displayName'}

                        placeholder={'Name'}
                        egText="e.g. John Doe"
                    />
                    {auth().currentUser?.providerData[0]?.providerId === 'google.com' ?
                        <FormikTextInput
                            formikProps={props}
                            varName={'email'}

                            placeholder={'Email'}
                            egText={'e.g. example@email.com'}

                            keyboardType='email-address'
                            editable={auth().currentUser?.providerData[0]?.providerId !== 'google.com'}
                        /> : null
                    }
                    {auth().currentUser?.providerData[0]?.providerId === 'phone' ?
                        <FormikTextInput
                            formikProps={props}
                            varName={'phoneNumber'}

                            placeholder={'Phone number'}
                            egText="e.g. 9876543210"

                            keyboardType='phone-pad'
                            editable={false}
                        /> : null
                    }
                    <SubmitBtn
                        title={isPending ? 'Saving ...' : 'Save'}
                        onPress={() => props.handleSubmit()}
                        disabled={isPending || !props.isValid}

                        isPending={isPending}
                        errTxt={error}
                    />
                </>
                }
            </Formik>
        </>
    );
}

const validationSchema = yup.object({
    displayName: yup.string().required("Required"),
    email: yup.string().notRequired().email().matches(/@[^.]*\./, { message: "Invalid Email Format" }),
    phoneNumber: yup.string().notRequired()
})