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

| Name | Recommended Version |
| ------ | ------ |
| react-native-camera | 3.15.1 |
| react-native-fs | 2.16.2 |
| react-native-webview | 8.0.3 |
| react-native-svg | 10.1.0 |
| @react-native-community/image-editor | 2.2.0 |
| react-native-document-picker | 3.2.4 |
| react-native-device-info | 5.4.1 |
| react-native-geolocation-service | 3.1.0 |

To get all of these by single command run the following command:

```bash
yarn add react-native-camera react-native-webview react-native-svg@10.1.0 @react-native-community/image-editor react-native-document-picker react-native-fs react-native-device-info react-native-geolocation-service
```

or

```bash
npm install react-native-camera react-native-webview react-native-svg@10.1.0 @react-native-community/image-editor react-native-document-picker react-native-fs react-native-device-info react-native-geolocation-service
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

<key>NSLocationAlwaysUsageDescription</key>
<string>Example Location Description</string>

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
| onError | false | callback function | - |
| onExit | false | callback function | - |


```js
import AmaniAi from 'amani-rn-sdk'

// These given values are all fake, they all just to show usage of this package.
const authValues = {
    appKey: 'exampleAppKey',
    appPassword: 'exampleAppPasword'
}

const customer = {

    id: '512', // If you have a customer that already exists in Amani Service, pass the id here,

    // Or create a new customer
    name: 'example name',
    email: 'example@mail.com',
    phone: '+905321111111'

}

return (
    <AmaniAi
        server="tr"
        authData={authValues}
        customerInformations={customer}
        onCreateCustomer={customer => console.log(customer)}
        onError={error => console.log(error)}
        onExit={values => console.log(values)}
    />
)
```