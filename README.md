# [WindyOTP](https://otp.robbryan.dev)

An authenticator app customizable through a sensible tailwind config.
Made possible using [NativeWind](https://www.nativewind.dev/)

## Features
- Rename code display names
- Delete specific codes
- Import from qr code
- Migrate all totp codes from [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&pli=1) Or Other WindyOTP install
- Export support guarded with device biometrics
- Great support for different TOTP implementations
### TOTP Support
- digits: 6 | 8
- periods: 15 | 30 | 60
- algorithms: sha1 | sha256 | sha512 | md5

## Requirements
- [MoonRepo](https://moonrepo.dev/)

## Local Development
### Mobile app
```bash
moon mobile:start
```

### Showcase site
```bash
moon site:serve
```

## Building
### Mobile app
Manually go to ``apps/mobile`` and follow one of the guides bellow
- [Build using local machine](https://docs.expo.dev/build-reference/local-builds/)
- [Build remotely using Eas](https://docs.expo.dev/build/introduction/)

### Showcase site
```bash
moon site:build
```
Then serve the new dist folder at ``apps/site/dist``

## Technologies Used
### Mobile app
- React native
- Expo
- Typescript
- NativeWind
- [VanillaTOTP (My Library)](https://github.com/robbryandev/vanilla-totp)
- protobufjs
- react-native-qrcode-svg

### Showcase site
- HTML
- CSS
- Tailwind
- Javascript
- Typescript
- Vue

## Known Bugs
* None

## License

MIT License

Copyright (c) 2023 Robert Bryan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.