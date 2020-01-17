# amani-ai-sdk

amani-ai-sdk is a library that brings amani artifical intelligence modules together and make it work in your React Native project.

## Installation

By yarn:
```bash
yarn add https://git@github.com/AmaniTechnologiesLtd/amani-ai-sdk
```

or NPM:
```bash
npm install https://git@github.com/AmaniTechnologiesLtd/amani-ai-sdk
```

### Required dependencies:

| Name | Recommended Version |
| ------ | ------ |
| react-native-camera | 3.15.1 |
| react-native-fs | 2.16.2 |
| react-native-webview | 8.0.3 |
| react-native-svg | 10.1.0 |
| @react-native-community/image-editor | 2.2.0 |
| react-native-document-picker | 3.2.4 |
| react-native-device-info | 5.4.1 |
| @react-native-community/geolocation | 2.0.2 |

To get all of these by single command run the following command:

```bash
yarn add react-native-camera react-native-webview react-native-svg @react-native-community/image-editor react-native-document-picker react-native-fs react-native-device-info @react-native-community/geolocation
```

or

```bash
npm install react-native-camera react-native-webview react-native-svg @react-native-community/image-editor react-native-document-picker react-native-fs react-native-device-info @react-native-community/geolocation
```

If your React Native version is below the 0.60,  to link all these dependencies to your project, please run command below.

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

android/settings.gradle:
```gradle
include ':react-native-fs'
project(':react-native-fs').projectDir = new File(settingsDir, '../node_modules/react-native-fs/android')
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
```ruby
pod 'RNFS', :path => '../node_modules/react-native-fs'
```

Install pod dependencies by running:

```bash
cd ios && pod install
```

## Integration

| Available props | Required | Type | Default |
| ------ | ------ | ------ | ------|
| authData | true | object | - |
| customerInformations | true | object | - |
| server | false | string | tr |
| onCreateCustomer | false | callback function | - |
| onExit | false | callback function | - |


```js
import AmaniAi from 'amani-ai-sdk'
// These given values are all fake, they all just to show usage of this package.
const authValues = {
    appKey: 'exampleAppKey',
    appPassword: 'exampleAppPasword'
}

const customer = {
    name: 'example name',
    email: 'example@mail.com',
    phone: '+0123456789'
}

return (
    <AmaniAi
        server="uae"
        authData={authValues}
        customerInformations={customer}
        onCreateCustomer={customer => console.log(customer)}
        onExit={values => console.log(values)}
    />
)
```