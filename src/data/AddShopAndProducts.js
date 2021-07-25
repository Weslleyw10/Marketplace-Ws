const Shop = require('../models/Shop')
const Product = require('../models/Product')
const createRecipient = require('../services/pagarme').createRecipient

/** database */
require('../database')

const shops = require('./shop.json')

const AddShopAndProducts = async () => {
    try {
        for (let shop of shops) {
            /** Create Recipient In Pagarme */
            const recipient = await createRecipient(shop)

            if (recipient.error) {
                console.log(recipient)
            } else {
                console.log(recipient)

                /** Create Shop */
                const newShop = await new Shop({
                    ...shop,
                    recipient_id: recipient.data.id
                }).save()

                /** Create Products of Shop */
                await Product.insertMany(
                    shop.produtos.map(product => ({
                        ...product,
                        shop_id: newShop._id
                    }))
                )
            }
        }

        console.log('Final.')



    } catch (error) {
        console.log(error)

    }
}

AddShopAndProducts()
