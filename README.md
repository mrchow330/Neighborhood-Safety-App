# Neighborhood-Safety-App
The neighborhood safety app is a community-driven software solution designed to enhance public safety and infrastructure management by providing residents with a platform to report and track local safety issues.


For this project, we are using [Expo](https://docs.expo.dev/) and [React Native](https://reactnative.dev/).

Dependencies
-----------
We'll need the following to get started:

* [Expo Go](https://expo.dev/go) installed on a physical device (if you wish to preview the app on mobile)
* [Node.js](https://nodejs.org/en) (LTS version) installed

Set up/Build
-------
1. Clone this repository.
2. Navigate to the Neighborhood-Safety-App folder in your terminal.
3. In your terminal, run the following:

```bash
npx expo start

```
4. Depending on your machine, this may take a few minutes but you should see something like this:
    ![run expo start](./run%20expo%20start.png)
5. Once this is loaded, load the app using your preferred method. To stop the build, hit ````Ctrl + C```` in the terminal.

Happy coding!

Adding new pages
-------------
First, ensure that you have run the following commands in  your terminal:

```bash
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```
* **To add a new page:** Navigate to the *(tabs)* subdirectory in the *app* directory. Add your new file, using the *.tsx* file extension.
* **Add page to navigation:** add another screen within the Tabs component in *(tabs)/_layout.tsx*

For more detailed instructions see official documentation: [Add Navigation](https://docs.expo.dev/tutorial/add-navigation/).
