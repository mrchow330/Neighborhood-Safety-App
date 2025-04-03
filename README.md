# Neighborhood-Safety-App
The neighborhood safety app is a community-driven software solution designed to enhance public safety and infrastructure management by providing residents with a platform to report and track local safety issues.
See live web version here ➡️ [https://neighborhood-safety-app.vercel.app/](https://neighborhood-safety-app.vercel.app/)

## Dependencies

This app uses the following technologies and libraries:

- [Expo](https://docs.expo.dev/) (for building and running the app)
- [React Native](https://reactnative.dev/) (for mobile app development)
- [TypeScript](https://www.typescriptlang.org/) (for type-safe development)
- [Vercel](https://vercel.com/) (for web hosting)
- [MongoDB](https://www.mongodb.com/) (for database management)
- [Cloudinary](https://cloudinary.com/) (for image hosting and management)
- [uuid](https://www.npmjs.com/package/uuid) (for generating unique IDs)
- [Axios](https://axios-http.com/) (for making HTTP requests)
- [Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/) (for selecting images)
- [EAS Build](https://docs.expo.dev/build/introduction/) (for building the app)
- [React Navigation](https://reactnavigation.org/) (for navigation)
- [Expo Router](https://expo.github.io/router/docs) (for file-based routing)

It will also use Python, FastAPI, MongoDB, and Google Maps API.


## Set up/View on Local Machine

To set up and view the app on your local machine, follow these steps:
### Prerequisites

- Install [Node.js](https://nodejs.org/en) (LTS version recommended).
- Install [Expo Go](https://expo.dev/go) on a physical device (if you wish to preview the app on mobile).
- Install [MongoDB](https://www.mongodb.com/) and ensure it is running locally or use a cloud-hosted MongoDB instance.
- Create a [Cloudinary](https://cloudinary.com/) account and set up an upload preset.

### Steps:

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/Neighborhood-Safety-App.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Neighborhood-Safety-App
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the root of the project.
   - Add the following variables:
     ```
     MONGO_URI=your-mongodb-connection-string
     CLOUDINARY_URL=your-cloudinary-upload-url
     ```

5. Start the backend server:
   ```bash
   node server.js
   ```

6. Start the Expo development server:
   ```bash
   npx expo start
   ```

7. Open the app:
   - Scan the QR code in the terminal using the Expo Go app on your mobile device.
   - Alternatively, open the app in a web browser or an emulator.


## Builds

The app is available as a web version using Vercel and is automatically deployed whenever there are new commits. 

See live web version here ➡️ [https://neighborhood-safety-app.vercel.app/](https://neighborhood-safety-app.vercel.app/)

For developers, the latest Android builds can be accessed on the Expo Dashboard for the Expo Organization. 

For more info on whether to build or just use Expo Go, see [this article](https://expo.dev/blog/expo-go-vs-development-builds).

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

## More Useful Documentation

- [Using Android Studio Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [Publishing websites](https://docs.expo.dev/guides/publishing-websites/)
- [React fundamentals](https://reactnative.dev/docs/intro-react)
- [Expo Tutorial](https://docs.expo.dev/tutorial/introduction/)
- [Add new pages/ add Navigation](https://docs.expo.dev/tutorial/add-navigation/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Axios Documentation](https://axios-http.com/docs/intro)

---

Happy coding!