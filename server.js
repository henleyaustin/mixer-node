const app = require('./app');
const localtunnel = require('localtunnel');
const readline = require('node:readline');

function askQuestion (query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve =>
        rl.question(query, ans => {
            rl.close();
            resolve(ans);
        })
    );
}

async function getValidPort () {
    let port;
    while (true) {
        const ans = await askQuestion(
            'What port do you want to run on? (Default is 5001) '
        );

        // Use default port 5001 if no input is provided
        port = parseInt(ans, 10);
        if (!ans) {
            port = 5001;
            break;
        }

        // Validate if the port number is within the valid range (1-65535)
        if (!isNaN(port) && port >= 1 && port <= 65535) {
            break;
        } else {
            console.log(
                'Invalid port number. Please enter a valid port between 1 and 65535.'
            );
        }
    }
    return port;
}

(async () => {
    const port = await getValidPort();

    app.listen(port, async () => {
        console.log(`\nThe server is now running on port ${port}.\n`);
        console.log(`You can access it locally at: http://localhost:${port}\n`);

        // Create a Localtunnel for the port
        try {
            const tunnel = await localtunnel({ port });

            console.log(
                `A secure tunnel to your local server has been created at: ${tunnel.url}\n\n`
            );

            console.log(
                'To set up remote control for your audio settings, please follow these instructions:\n' +
                    '1. Click on the link above (or copy and paste it into your web browser).\n' +
                    '2. Follow the instructions in the browser. This step is important to make sure the connection is secure and ready to use.\n' +
                    "3. Once the connection is confirmed and active, copy the link from your browser's address bar.\n" +
                    '4. Paste the copied link into the mixer app. This will allow the app to connect and control your audio settings from other devices.\n\n' +
                    "Please make sure you've completed these steps before using the mixer app to ensure everything works smoothly.\n\n" +
                    'When you are done, press Ctrl + C in this terminal to close the application.'
            );

            // Optionally, handle tunnel closure
            tunnel.on('close', () => {
                console.log(
                    'The secure tunnel has been closed. If you need to reconnect, please restart the application.'
                );
            });
        } catch (err) {
            console.error(
                'There was an issue creating the secure connection. Please try again or contact support if the problem persists.',
                err
            );
        }
    });
})();
