import { DarkTheme, DefaultTheme } from '@react-navigation/native';

const commonColors = {
    error: 'red',
    success: 'green'
}

export const AppLightTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        ...commonColors,
        text: 'black',
        card: '#F9F8FB',
        border: '#9F9F9F',
        primary: '#333333',
        background: '#EEE',

        card2: 'lightgreen',
        activeTint: 'tomato',
        inactiveTint: 'gray',
        placeholder: 'gray',
        nearBackground: 'lightgray',
        nearBg: 'lightgray',
        focusColor: '#1e90ff',
        addColor: '#23963F'
    }
}

export const AppDarkTheme = {
    ...DarkTheme,
    dark: true,
    colors: {
        ...DarkTheme.colors,
        ...commonColors,
        text: 'white',
        card: '#222222',
        border: '#444859',
        primary: '#f9f9f9',
        background: '#121212',

        card2: '#176b5b',
        activeTint: 'tomato',
        inactiveTint: 'gray',
        placeholder: 'gray',
        nearBg: 'gray',
        focusColor: '#1e90ff',
        addColor: 'white'
    }
}