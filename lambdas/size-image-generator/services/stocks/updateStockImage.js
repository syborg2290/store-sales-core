const httpInventoryAPI = require("../../utils/http");

const PATCH_STOCK_IMAGES_PATH = '/stocks/image'

const updateStockImage = async (id,data) => httpInventoryAPI.patch(`${PATCH_STOCK_IMAGES_PATH}/${id}`, data);
module.exports = {
    updateStockImage
}
