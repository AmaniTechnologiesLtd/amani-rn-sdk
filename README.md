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
| jwt-decode                           | 3.1.2               |

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
| --------------- | -------- | ----------------- | ----------------------------|
| token           | true     | string            | -                           |
| onExit          | true     | callback function | -                           |
| server          | false    | string            | https://tr.amani.ai/api/v1/ |
| onError         | false    | callback function | -                           |
| onActivity      | false    | callback function | -                           |

```js
// On server side login to Amani backend and get a token for future requests
// API Key and Secret should be kept at your server  
curl --location --request POST 'https://tr.amani.ai/api/v1/user/login/' \
  --form 'email="exampleAPIKEY"' \
  --form 'password="exampleAPISECRET"'

// Using the token above create a customer and get a customer token
// Customer tokens are valid for only one customer and they have short lifespan
curl --location --request POST 'https://tr.amani.ai/api/v1/customer' \
  --header 'Authorization: TOKEN YOUR_TOKEN_ABOVE' \
  --form 'id_card_number="0000000000"' \
  --form 'name="Example Name"' \
  --form 'email="example@mail.com"' \
  --form 'phone="+905321111111"'

// On your application import AmaniAi SDK
import AmaniAi from 'amani-rn-sdk';

return (
  <AmaniAi
    server="https://tr.amani.ai/api/v1/"
    token={token}
    onError={(error) => console.log(error)}
    onExit={(values) => console.log(values)}
    onActivity={(event) => console.log(event)} // Fired on every screen touch and other specific events
  />
);
```
