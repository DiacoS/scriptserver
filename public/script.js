document.getElementById('postForm').addEventListener('submit', async, async function (event) {
    event.preventDefault();

    const content = document.getElementById('content').value;

    try {
        const response = await fetch('/write-file', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/jason',
            },
            body: JSON.stringify({content}),
        });
        const responseData = await response.text();
        document.getElementById('response').textContent = responseData;
    } catch (err) {
        console.error('Error while sending', error);
        document.getElementById('response').textContent = 'something went wrong..';
    }
});
