const db = require('./../Database/Connection')
const util = require('util')
const { getCityId, getOngkir } = require('../Helpers/CheckoutHelpers/rajaongkir')
const { getAddress, getNearestStorage } = require('../Services/CheckoutService/CheckoutService')
const query = util.promisify(db.query).bind(db)

const getUserAddress = async (req, res) => {
    let user_id = req.user.id
    let shipping_weight
    if (req.body.totalWeight > 30000) {
        shipping_weight = 30000
    } else {
        shipping_weight = req.body.totalWeight
    }
    // console.log(shipping_weight)

    try {
        const getUserAddress = await getAddress(user_id)
            .catch((err) => { throw err })

        if (getUserAddress === `User don't have address yet`) {
            return res.status(204).send({
                error: false,
                message: getUserAddress
            })
        }

        let latitude = getUserAddress.latitude
        let longitude = getUserAddress.longitude

        const getStorage = await getNearestStorage(latitude, longitude, 1)
            .catch((err) => { throw err })

        let city_origin_id = getStorage[0].rajaongkir_city_id
        let city_destination = getUserAddress.user_city

        const getCityDestination_id = await getCityId(city_destination)
            .catch((err) => { throw err })

        const getShippingFee = await getOngkir(city_origin_id, getCityDestination_id, shipping_weight)
            .catch((err) => { throw err })

        let dataToSend = {
            userAddress: getUserAddress.user_address,
            shippedFrom: getStorage[0].city,
            shippingFee: getShippingFee,
        }

        res.status(200).send({
            error: false,
            message: 'get user address and shipping fee success',
            result: dataToSend
        })
    } catch (error) {
        // console.log(error)
        res.status(500).send({
            error: true,
            message: error
        })
    }
}

const createTransaction = async (req, res) => {
    // console.log(req.body)
    let storage_location = req.body.shippedFrom
    let receiver = req.body.shippingAddress.name
    let address = req.body.shippingAddress.address
    let city = req.body.shippingAddress.city
    let postal_code = req.body.shippingAddress.postal_code
    let telephone = req.body.shippingAddress.telephone
    let province = req.body.shippingAddress.province
    let longitude = req.body.shippingAddress.longitude
    let latitude = req.body.shippingAddress.latitude
    let user_id = req.body.shippingAddress.user_id
    let payment_method = req.body.bank

    let total_price = req.body.productTotalPrice
    let ongkir = req.body.shippingFee

    let userProduct = req.body.userCartProduct
    let update_user_reward_query = `UPDATE user SET reward_used = CURRENT_TIMESTAMP WHERE id = ${user_id}`
    // ambil storage_id buat transaction
    let getStorage_id_query = 'SELECT * FROM storage WHERE city = ?'
    // check Total Stock dulu
    let checkTotalStock_query = 'SELECT * FROM product WHERE id = ?'
    let updateTotalStock_query = 'UPDATE product SET total_stocks = ? WHERE id = ?'
    // masukkin transaction
    let insertShippingAddress_query = `INSERT INTO shipping_address (receiver, address, city, province, postal_code, telephone, longitude, latitude) VALUES ('${receiver}', '${address}', '${city}', '${province}', '${postal_code}', '${telephone}', '${longitude}', '${latitude}')`
    let insertTransaction_query = `INSERT INTO transaction (total_price, ongkir, user_id, storage_id, shipping_address_id, transaction_status_id, payment_method) VALUES ('${total_price}', '${ongkir}', '${user_id}', ?,  ?, ?, ?)`

    let insertTransactionLog_query = 'INSERT INTO transaction_log (`transaction_id`, `transaction_status_id`) VALUES (? , ?)'
    let insertTransactionDetails_query = 'INSERT INTO transaction_details (name, price, discount_percentage, quantity, transaction_id, product_id) VALUES (?, ?, ?, ?, ?, ?)'
    // cek stok gudang dulu 
    let checkStorageStock_query = 'SELECT * FROM stock WHERE storage_id = ? AND product_id = ?'
    // kalau stoknya cukup. update storageStock
    let updateStorageStock_query = 'UPDATE stock SET stock = ?, purchased_stock = ? WHERE storage_id = ? AND product_id = ?'
    // kalau ga cukup jalanin query getNearest Storage lagi, insert Stok Request
    let createStockRequest_query = 'INSERT INTO stock_request (destination_storage_id, requested_stock, transaction_details_id, stock_request_status_id) VALUES (?, ?, ?, ?)'
    let createStockRequestLog_query = 'INSERT INTO stock_request_log (transaction_details_id, stock_request_status_id) VALUES (?, ?)'

    let deleteUserCart_query = 'DELETE FROM cart WHERE user_id = ?'
    try {
        const update_user_reward = await query(update_user_reward_query)
            .catch((err) => { throw err })

        const getStorage_id = await query(getStorage_id_query, storage_location)
            .catch((err) => { throw err })
        let storage_id = getStorage_id[0].id

        await query('Start Transaction')
        // cek quantity yg dibeli melebihi stock apa ngga
        await Promise.all(userProduct.map(async (value) => {
            let product_id = value.product_id
            let quantity = value.quantity
            const checkTotalStock = await query(checkTotalStock_query, product_id)
                .catch((err) => { throw err })

            let totalStocks = checkTotalStock[0].total_stocks
            if (quantity > totalStocks) throw `The quantity of the item you want to buy exceeds the stock`
            let updatedTotalStock = totalStocks - quantity
            const updateTotalStock = await query(updateTotalStock_query, [updatedTotalStock, product_id])
                .catch((err) => { throw err })
        }))


        const insertToShippingAddress = await query(insertShippingAddress_query)
            .catch((err) => { throw err })

        // console.log(insertToShippingAddress)
        let shipping_address_id = insertToShippingAddress.insertId

        const insertTransaction = await query(insertTransaction_query, [storage_id, shipping_address_id, 1, payment_method])
            .catch((err) => { throw err })

        let transaction_id = insertTransaction.insertId
        let event_name = 'update_expired_at_' + transaction_id

        let createTransactionScheduler_query = `CREATE EVENT ${event_name} ON SCHEDULE AT date_add(NOW(), INTERVAL 1 DAY) DO UPDATE transaction SET transaction_status_id = 5  WHERE id = ${transaction_id}`
        const createTransactionScheduler = await query(createTransactionScheduler_query)
            .catch((err) => { throw err })

        let event_insert_log = 'insert_to_log_' + transaction_id
        let createInsertToLogScheduler_query = `CREATE EVENT ${event_insert_log} ON SCHEDULE AT date_add(NOW(), INTERVAL 1 DAY) DO INSERT INTO transaction_log (transaction_id, transaction_status_id) VALUES (${transaction_id}, 5)`
        const createInsertToLogScheduler = await query(createInsertToLogScheduler_query)
            .catch((err) => { throw err })

        const insertTransactionLog = await query(insertTransactionLog_query, [transaction_id, 1])
            .catch((err) => { throw err })
        console.log(userProduct)
        await Promise.all(userProduct.map(async (value) => {
            let product_name = value.name
            let price = value.price
            let discount_percentage = value.discount_percentage
            let quantity = value.quantity
            let product_id = value.product_id

            const insertTransactionDetails = await query(insertTransactionDetails_query, [product_name, price, discount_percentage, quantity, transaction_id, product_id])
                .catch((err) => { throw err })

            let transaction_details_id = insertTransactionDetails.insertId

            let event_product = 'return_product_' + transaction_details_id

            let createReturnTotalStock_query = `CREATE EVENT ${event_product} ON SCHEDULE AT date_add(NOW(), INTERVAL 1 DAY) DO UPDATE product SET total_stocks = total_stocks + ${quantity}  WHERE id = ${product_id}`

            const createReturnProduct = await query(createReturnTotalStock_query)
                .catch((err) => { throw err })

            let storage_event = 'return_storage_stock_' + transaction_details_id

            let createReturnStorageStock_query = `CREATE EVENT ${storage_event} ON SCHEDULE AT date_add(NOW(), INTERVAL 1 DAY) DO UPDATE stock SET stock = stock + ${quantity}, purchased_stock = purchased_stock - ${quantity} WHERE id = ${product_id};`

            const createReturnStorageStock = await query(createReturnStorageStock_query)
                .catch((err) => { throw err })

            const checkStorageStock = await query(checkStorageStock_query, [storage_id, product_id])
                .catch((err) => { throw err })
            let stockQty = checkStorageStock[0].stock
            let purchased_stock = checkStorageStock[0].purchased_stock
            if (stockQty >= quantity) {
                let updatedStock = stockQty - quantity
                let updatedPurchasedStock = quantity + purchased_stock
                const updateStorageStock = await query(updateStorageStock_query, [updatedStock, updatedPurchasedStock, storage_id, product_id])
                    .catch((err) => { throw err })
            } else {
                let requested_stock = quantity - stockQty
                let updatedPurchasedStock = stockQty
                const updateStorageStock = await query(updateStorageStock_query, [0, updatedPurchasedStock, storage_id, product_id])
                    .catch((err) => { throw err })
                const createStockRequest = await query(createStockRequest_query, [storage_id, requested_stock, transaction_details_id, 1])
                    .catch((err) => { throw err })
                const createStockRequestLog = await query(createStockRequestLog_query, [transaction_details_id, 1])
                    .catch((err) => { throw err })
            }
        }))

        const deleteUserCart = await query(deleteUserCart_query, user_id)
            .catch((err) => { throw err })
        await query('Commit')

        res.status(200).send({
            error: false,
            message: 'Create Transaction Success',
            result: transaction_id
        })
    } catch (error) {
        // console.log(error)
        await query('Rollback')
        res.status(500).send({
            error: true,
            message: error
        })
    }
}

module.exports = {
    getUserAddress: getUserAddress,
    createTransaction: createTransaction
}