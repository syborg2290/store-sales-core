const { default: axios } = require('axios');
const {config} = require('dotenv')
config()

const httpInventoryAPI = axios.create({
    baseURL:process.env.INVENTORY_API_URL,
    headers:{
        'x-api-key':process.env.INVENTORY_API_KEY
    }
})

module.exports = httpInventoryAPI;