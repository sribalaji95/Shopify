var sequelize = require('../config/db.config')
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");
var Inventory = require('../model/inventory')
var Category = require('../model/category')
var Supplier = require('../model/supplier');
var WareHouse = require('../model/warehouse');

exports.getAll = function(req, res, next) {

    sequelize.query("select * from inventories left join categories c ON inventories.c_id = c.categoryId left join suppliers as s on s.s_id = inventories.s_id;", {
            type: sequelize.QueryTypes.SELECT
        })
        .then(function(inventories) {
            console.log(inventories)
            res.send(inventories)
        })

}

exports.addInventory = async function(req, res, next) {

    try {
        const [CATEGORY, created] = await Category.findOrCreate({
            where: {
                categoryName: req.body.c_name
            },
            defaults: {
                categoryName: req.body.c_name
            }
        });
        console.log("CID ", CATEGORY.dataValues.cID);
        try {
            const [SUPPLIER, created] = await Supplier.findOrCreate({
                where: {
                    supplierName: req.body.s_name
                },
                defaults: {
                    supplierName: req.body.s_name
                }
            });
            console.log(SUPPLIER.dataValues.s_id);
            const inventory = {
                name: req.body.name,
                description: req.body.description,
                stockCount: req.body.stockCount,
                price: req.body.price,
                s_id: SUPPLIER.dataValues.s_id,
                c_id: CATEGORY.dataValues.categoryId,
                discount: req.body.discount,
                available: req.body.available,
                threshold: req.body.threshold
            }


            Inventory.create(inventory)
                .then(data => {
                    console.log("Success ", data)
                    res.send(data);
                })
                .catch(err => {
                    console.log("Errr ", err)

                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Tutorial."
                    });
                });

        } catch (err1) {
            console.log(err1);
        }

    } catch (err) {
        console.log(err);
    }

}
exports.updateInventory = function(req, res, next) {

    Inventory.update({
            name: req.body.name,
            description: req.body.description,
            stockCount: req.body.stockCount,
            price: req.body.price,
            discount: req.body.discount,
            available: req.body.available,
            threshold: req.body.threshold
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(function(updatedInventory) {
            console.log(updatedInventory);
            res.status(201).send("Update Success")
        }).catch(e => {
            console.log(e)
        })


}


exports.deleteInventory = function(req, res, next) {

    Inventory.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(Inv) {
        console.log(Inv);
        res.status(200).send("Delete Success")
    }).catch(e => {
        console.log(e)
    })


}

exports.exportCSV = function(req, res, next) {


    sequelize.query("select * from inventories left join categories c ON inventories.c_id = c.categoryId left join suppliers as s on s.s_id = inventories.s_id;", {
            type: sequelize.QueryTypes.SELECT
        })
        .then(function(inventories) {
            console.log(inventories)
            const jsonData = JSON.parse(JSON.stringify(inventories));
            console.log("jsonData", jsonData);

            const json2csvParser = new Json2csvParser({
                header: true
            });
            const csv = json2csvParser.parse(jsonData);

            fs.writeFile("products_" + new Date().toDateString() + ".csv", csv, function(error) {
                if (error) throw error;
                console.log("Write Successful");
                res.status(200).send("Write Successfull to " + "products_" + new Date().toDateString() + ".csv")
            });
        })

}

exports.getMinandMaxCount = function(req, res, next) {

    console.log("insdide")
    Inventory
        .findAndCountAll({
            where: {
                availbility: 1
            },

        })
        .then(result => {
            console.log(result.count);
            console.log(result.rows);
        }).catch(e => {
            console("er ", e)

        })
}

exports.createWareHouse = async function(req, res, next) {


    //   const warehouse = {
    //     wareHouseName: req.body.name,
    //     location: req.body.location
    //  }
    console.log("s ", req.params.id)
    try {
        const [WAREHOUSE, created] = await WareHouse.findOrCreate({
            where: {
                wareHouseName: req.body.name
            },
            defaults: {
                wareHouseName: req.body.s_name,
                location: req.body.location
            }
        })
        Inventory.update({
                w_id: WAREHOUSE.dataValues.id
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function(updatedInventory) {
                console.log(updatedInventory);
                res.status(201).send("Update Success")
            }).catch(e => {
                console.log(e)
            })
    } catch (err) {
        console.log(err);
    }


}