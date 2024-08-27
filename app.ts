function generateApiKey(length: number, type: string): string {
    let charset = '';

    if (type === 'numeric') {
        charset = '0123456789';
    } else if (type === 'alphabetic') {
        charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    } else {
        charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    }

    let apiKey = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        apiKey += charset[randomIndex];
    }
    return apiKey;
}

document.getElementById('generate-btn')!.addEventListener('click', () => {
    const keyLength = parseInt((document.getElementById('key-length') as HTMLSelectElement).value, 10);
    const keyType = (document.getElementById('key-type') as HTMLSelectElement).value;
    const apiKey = generateApiKey(keyLength, keyType);
    (document.getElementById('api-key') as HTMLInputElement).value = apiKey;
    console.log('Generated API Key:', apiKey); // Debugging message
});

document.getElementById('copy-btn')!.addEventListener('click', async () => {
    const apiKeyInput = document.getElementById('api-key') as HTMLInputElement;

    if (apiKeyInput.value) {
        try {
            await navigator.clipboard.writeText(apiKeyInput.value);
            console.log('Copied API Key:', apiKeyInput.value); // Debugging message
            showNotification('API Key copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy API Key: ', err);
            showNotification('Failed to copy API Key', true);
        }
    } else {
        showNotification('No API Key to copy', true);
    }
});

function showNotification(message: string, isError: boolean = false) {
    const notification = document.getElementById('notification')!;
    notification.textContent = message;
    notification.style.backgroundColor = isError ? '#dc3545' : '#28a745';
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000); // Notification will disappear after 3 seconds
}
