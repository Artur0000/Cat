### Instructions

- After cloning the project you need to build it - yarn setup
- Run on ios simulator - yarn ios
- Run on android emulator - yarn android
- Run tests - yarn test
- Create bundle file for ios - yarn ios-bundle
- Create bundle file for android - yarn android-bundle

- Run on ios device - Select your project in the Xcode Project Navigator, then select your main target. Look for the "General" tab. Go to "Signing" and make sure your Apple developer account or team is selected under the Team dropdown. Press the Build and run button

- Run on android device - Make sure your device is connected bu running `adb devices`, then run `yarn android`
