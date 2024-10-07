const axios = require('axios')

const sendRequest = async (clientNumber) => {
    try{
        const response = await axios.get('http://localhost:3000/read-file');
        console.log(`Client ${clientNumber}:`, response.data);
    } catch (error) {
        console.error('Client ${clientNumber} Error:', error.message);
    }
};

for (let i = 1; i <= 1000; i++){
    sendRequest(i);
}