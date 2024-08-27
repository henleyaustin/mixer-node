const SoundMixer = require('native-sound-mixer').default;
const { DeviceType } = require('native-sound-mixer');

const device = SoundMixer.getDefaultDevice(DeviceType.RENDER);

const sessionStore = new Map();

// Function to generate a unique ID
const generateUniqueId = () => {
    let id;
    do {
        // Generate a random 4-digit number between 1000 and 9999
        id = Math.floor(1000 + Math.random() * 9000).toString();
    } while (sessionStore.has(id)); // Ensure the ID is unique
    return id;
};

// Function to map sessions to IDs
const mapSessionsToIds = sessions => {
    return sessions
        .filter(session => session.name && session.name.trim() !== '') // Filter out sessions with empty names
        .map(session => {
            const sessionId = generateUniqueId();

            sessionStore.set(sessionId, session); // Store session with unique ID

            return {
                id: sessionId,
                name: session.name,
                currentVolume: session.volume * 100 // Multiply for sliders
            };
        });
};

const getAllAudioStreams = async (req, res) => {
    try {
        if (!device) {
            return res.status(500).json({ error: 'No audio device set' });
        }

        const sessions = device.sessions;
        const sessionData = mapSessionsToIds(sessions);

        res.json(sessionData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get audio streams' });
    }
};

const updateAudioStream = async (req, res) => {
    let newVolume = parseFloat(req.body.newVolume);
    let sessionId = req.body.sessionId;

    // Normalize newVolume to a number between 0 and 1 by dividing by 100
    if (isNaN(newVolume)) {
        return res
            .status(400)
            .json({ error: 'Invalid volume. Volume should be a number.' });
    }

    try {
        const session = sessionStore.get(sessionId);

        if (!session) {
            return res.status(404).json({ error: 'Audio session not found' });
        }

        session.volume = newVolume; // Update the session volume

        res.json({ id: sessionId, name: session.name, volume: newVolume });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update audio stream' });
    }
};

module.exports = {
    getAllAudioStreams,
    updateAudioStream
};
