document.getElementById('url').textContent = document.URL;

const copyLink = () => {
    navigator.clipboard
        .writeText(document.URL)
        .then(() => {
            const notification = document.getElementById('copyNotification');
            notification.classList.add('show');

            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
        })
        .catch(err => console.error('Failed to copy text:', err));
};
