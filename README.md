# Neighborhood-Safety-App
The neighborhood safety app is a community-driven software solution designed to enhance public safety and infrastructure management by providing residents with a platform to report and track local safety issues.

Dependencies
-----------
This app uses [Expo](https://docs.expo.dev/), Expo GO, EAS Build, [React Native](https://reactnative.dev/), TypeScript, and Vercel.

It will also use Python, FastAPI, MySQL/MongoDB, and Google Maps API.


Set up/View on Local Machine
-------
We'll need the following to get started:
* [Expo Go](https://expo.dev/go) installed on a physical device (if you wish to preview the app on mobile)
* [Node.js](https://nodejs.org/en) (LTS version) installed

Steps:
1. Clone this repository.
2. Navigate to the Neighborhood-Safety-App folder _inside_ the Neighborhood-Safety-App repo in your terminal.
3. In your terminal, run the following:

```bash
npx expo start

```
4. Depending on your machine, this may take a few minutes but you should see something like this:
    ![run expo start](./run%20expo%20start.png)
5. Once this is loaded, load the app using your preferred method (QR code, web, etc). To stop the build, hit ````Ctrl + C```` in the terminal.

Happy coding!

Builds
--------
The app is available as a web version using Vercel and is automatically deployed whenever there are new commits. 

See live web version here ➡️ [https://neighborhood-safety-app.vercel.app/](https://neighborhood-safety-app.vercel.app/)

For developers, the latest Android builds can be accessed on the Expo Dashboard for the Expo Organization. 

To build yourself, you must be a member of the organization and have an account set up.

Follow the instuctions below:

1. Install EAS CLI if you haven't already
```bash
npm install -g eas-cli
```
2. Install Expo CLI
```bash
npm install -g expo-cli
```
3. Run the login command and follow the prompts to log in
```bash
eas login
```
4. To start the Android build run
```bash
eas build --platform android
```
Once the build has started, you'll see progress in your terminal. Additionally, you can monitor the build status and logs from the EAS Build Dashboard through your account.

When the build is completed, you will get a link to download the APK or AAB file.

Adding new pages
-------------
First, ensure that you have run the following commands in  your terminal:

```bash
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```
* **To add a new page:** Navigate to the *(tabs)* subdirectory in the *app* directory. Add your new file, using the *.tsx* file extension.
* **Add page to navigation:** add another screen within the Tabs component in *(tabs)/_layout.tsx*

For more detailed instructions see official documentation: [Add Navigation](https://docs.expo.dev/tutorial/add-navigation/).


More Useful Documentation
---------
* [Using Android Studio Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
* [Publishing websites](https://docs.expo.dev/guides/publishing-websites/)
* [React fundamentals](https://reactnative.dev/docs/intro-react)
* [Expo Tutorial](https://docs.expo.dev/tutorial/introduction/)
