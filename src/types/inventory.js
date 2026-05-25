/**
 * @typedef {Object} Warehouse
 * @property {string} id
 * @property {string} name
 * @property {string} location
 * @property {string} manager
 * @property {string} contactNumber
 * @property {number} stockAvailable
 * @property {number} stockShipping
 * @property {number} revenue
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} image
 * @property {string} category
 * @property {string} sku
 * @property {number} available
 * @property {number} totalSell
 * @property {number} unitPrice
 * @property {string} addedDate
 */

/**
 * @typedef {Object} InventoryFilters
 * @property {string} search
 * @property {string} productId
 * @property {string} category
 */

/**
 * @typedef {'admin' | 'dealer'} UserRole
 */

module.exports = {}

