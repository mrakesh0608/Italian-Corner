# 🤝 Contributing to Italian Corner

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

If you have a suggestion that would make this better, please fork the repo and create a pull request. Please go through existing issues and pull requests to check if somebody else is already working on it.

## Steps to Contribute

1. Fork or Clone the repo `git clone https://github.com/mrakesh0608/Italian-Corner.git` or `gh repo clone mrakesh0608/Italian-Corner`
2. Create your Feature Branch `git checkout -b feature/[feature-name]`
3. Commit your Changes `git commit -m 'New Feature : [feature-name]'`
4. Push to the Branch `git push origin feature/[feature-name]`
5. Open a Pull Request

## Setup
- Change directory into root folder of application `cd Italian-Corner`
- Install dependencies `npm i` 
- To install the [EAS CLI](https://expo.dev/eas) for builds `npm i -g eas-cli`
- Copy your configuration files into configs folder
    - It contains 2 files.
    - Rename to `google-services.json` for Android.
    - Rename to `GoogleService-Info.plist` for IOS.


### Development Build
- For Android, download development build apk from this [link](https://github.com/mrakesh0608/Italian-Corner/releases/download/v0.1.0/Italian-Corner-Dev.apk).<div align='center'>OR</div>Build your own development apk using `npm run build-dev-apk` & download it from [Expo dev](https://expo.dev/).
- Install development build apk in your Android device.
- Start metro bundler `npm start`
- Start metro bundler with empty cache `npm run start-c`
- To open the app, scan the QR code from Metro Bundler with Expo Go [(Android)](https://play.google.com/store/apps/details?id=host.exp.exponent) or Camera app [(iOS)](https://apps.apple.com/in/app/expo-go/id982107779).

### Production Build - Android App
- To build production ready apk `npm run build-apk`
- Download apk from [Expo dev](https://expo.dev/)
- Install and run the Android app on your device.

Don't forget to give a star ⭐️ to this repository.

Thanks again 😉 !! 