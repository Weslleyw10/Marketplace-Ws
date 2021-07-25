const express = require('express')
const router = express.Router()

const Shop = require('../models/Shop')
const Products = require('../models/Product')

const createSplitTransaction = require('../services/pagarme').createSplitTransaction

router.get('/shops', async (req, res) => {
    try {
        const shops = await Shop.find({})
        res.json({
            error: false,
            shops
        })

    } catch (error) {
        res.json({ error: true, message: error.message })
    }
})

router.get('/shops/:shopId', async (req, res) => {
    try {
        /** GET Shop */
        const { shopId } = req.params
        const shop = await Shop.findById(shopId)

        /** GET Products Of Shop */
        let productsOfShop = await Products.find({
            shop_id: shop._id,
        }).populate('shop_id', 'recipient_id')

        res.json({
            error: false,
            shop: {
                ...shop._doc,
                productsOfShop
            }
        })

    } catch (error) {
        res.json({ error: true, message: error.message })
    }
})

router.post('/purchase', async (req, res) => {

    

    try {
        const transaction = await createSplitTransaction(req.body)
        res.json(transaction)

    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  });

module.exports = router;