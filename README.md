# amani-rn-sdk

amani-rn-sdk is a library that brings amani artifical intelligence modules together and make it work in your React Native project.

## Installation

By yarn:

```bash
yarn add https://git@github.com/AmaniTechnologiesLtd/amani-rn-sdk
```

or NPM:

```bash
npm install https://git@github.com/AmaniTechnologiesLtd/amani-rn-sdk
```

### Required dependencies:

| Name                                 | Recommended Version |
| ------------------------------------ | ------------------- |
| react-native-camera                  | 3.15.0              |
| react-native-fs                      | 2.16.2              |
| react-native-webview                 | 8.2.1               |
| react-native-svg                     | 10.1.0              |
| @react-native-community/image-editor | 2.3.0               |
| react-native-document-picker         | 3.2.4               |
| react-native-device-info             | 5.4.1               |
| @react-native-community/geolocation  | 2.0.2               |
| lottie-react-native                  | 3.3.2               |
| lottie-ios                           | 3.1.3               |
| react-native-permissions             | 2.1.5               |

To install all of the dependencies run the following command:

```bash
yarn add react-native-camera react-native-webview@8.2.1 react-native-svg@10.1.0 @react-native-community/image-editor react-native-document-picker react-native-fs react-native-device-info @react-native-community/geolocation lottie-react-native lottie-ios@3.1.3 react-native-permissions
```

or

```bash
npm install react-native-camera react-native-webview@8.2.1 react-native-svg@10.1.0 @react-native-community/image-editor react-native-document-picker react-native-fs react-native-device-info @react-native-community/geolocation lottie-react-native lottie-ios@3.1.3 react-native-permissions
```

If your React Native version is below the 0.60, please run command below.

```bash
react-native link
```

## Android Configuration

### Append these code lines to shown paths

android/app/src/main/AndroidManifest.xml:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

android/app/build.gradle:

```gradle
android {
    ...
    defaultConfig {
        ...
        missingDimensionStrategy 'react-native-camera', 'general' // <--- insert this line
    }
}
```

android/app/src/main/java/[...]/MainApplication.java:

```java
import com.rnfs.RNFSPackage;
```

## IOS Configuration

### Append these code lines to shown paths

ios/[...]/Info.plist:

```xml
<key>NSCameraUsageDescription</key>
<string>Example Camera Description</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>Example Location Description</string>

```

ios/Podfile:

```
target 'YourAwesomeProject' do

  # …

  permissions_path = '../node_modules/react-native-permissions/ios'

  pod 'Permission-Camera', :path => "#{permissions_path}/Camera.podspec"
  pod 'Permission-LocationWhenInUse', :path => "#{permissions_path}/LocationWhenInUse.podspec"

end
```

Install pod dependencies by running:

```bash
cd ios && pod install
```

## Integration

| Available props | Required | Type              | Default |
| --------------- | -------- | ----------------- | ------- |
| authData        | true     | object            | -       |
| customerData    | true     | object            | -       |
| onExit          | true     | callback function | -       |
| server          | false    | string            | tr      |
| onError         | false    | callback function | -       |
| onActivity      | false    | callback function | -       |

```js
import AmaniAi from 'amani-rn-sdk';

// These given values are all fake, they all just to show usage of this package.
const authValues = {
  appKey: 'exampleAppKey',
  appPassword: 'exampleAppPasword',
};

const customer = {
  id_card_number: '00000000000', // If you have a customer that already exists in Amani Service, pass the id here,

  // Or create a new customer
  id_card_number: '00000000000', // Like TC Number
  name: 'example name',
  email: 'example@mail.com',
  phone: '+905321111111',
};

return (
  <AmaniAi
    server="tr"
    authData={authValues}
    customerData={customer}
    onError={(error) => console.log(error)}
    onExit={(values) => console.log(values)}
    onActivity={(event) => console.log(event)} // Fired on every screen touch and other specific events
  />
);
```
