# **Audio Mixer Server App**

This Node.js application allows you to control audio settings on your Windows PC through a simple web interface. The app runs a local server that interacts with your system's sound settings, enabling you to adjust volume levels for different applications via an HTTPS-secured connection.

## **Features**

-   Control system audio settings through a web interface.
-   Adjust volume levels for individual applications.
-   Accessible from any device via a secure HTTPS connection.

## **How It Works**

The app runs a local web server on your Windows machine and uses Localtunnel to create an HTTPS-secured connection to your device. This allows you to control your system's audio settings remotely through a web interface.

## **Requirements**

-   **Windows OS:** This app is designed to run on Windows as it interacts with the Windows sound mixer.
-   **Localtunnel:** The app requires Localtunnel to expose the local server with HTTPS.
-   **Network Access:** Ensure your device and any other devices accessing the server are connected to the internet.

## **Installation**

1. **Download the Package:** Download the latest version of the packaged app from the [Releases](#) section of this repository.
2. **Unzip the Files:** Unzip the downloaded package to your preferred directory.
3. **Run the App:** Double-click the `.exe` file to start the server. You should see a terminal window open indicating that the server is running.

## **Usage**

### Accessing the App

1. **Open the Terminal Window:** After running the `.exe`, a terminal window will appear with details about the server. The app will automatically set up a Localtunnel and provide a secure HTTPS URL (e.g., `https://your-tunnel-url.loca.lt`).
2. **Connect via HTTPS:**
    - On any device connected to the internet, open a browser and enter the HTTPS URL provided by Localtunnel.
    - This URL will be accessible as long as the app is running.

### Controlling Audio Settings

1. **Select the Application:** The web interface will display a list of applications currently playing audio. Select the application whose volume you want to adjust.
2. **Adjust Volume:** Use the sliders to adjust the volume levels. Changes will be reflected immediately on your Windows machine.

## **Important Security Notice**

This app requires Localtunnel to provide an HTTPS-secured connection. **Only use this service if you understand the security implications.** While Localtunnel secures your connection with HTTPS, exposing your local server to the internet can pose risks. Avoid sharing your Localtunnel URL with anyone you don't trust.

## **Privacy**

This app does not collect any personal data. All interactions with your system's audio settings are done locally on your machine. Localtunnel only facilitates the secure connection.

## **Troubleshooting**

-   **App Doesn't Start:** Ensure you're running the app on a Windows machine. If the terminal window closes immediately, try running the `.exe` as an administrator.
-   **Issues with Sound Settings:** If the app isn't controlling the audio settings as expected, ensure that the applications you want to control are actively playing audio.

## **License**

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## **Credits**

This app uses the `volume-supervisor` Node.js library by romlm, licensed under the MIT License.
