var sequelize = require('../config/db.config')
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

exports.getAll = function(req, res, next){
   
    sequelize.query("select * from inventories left join categories c ON inventories.c_id = c.categoryId left join suppliers as s on s.s_id = inventories.s_id;",
    { type: sequelize.QueryTypes.SELECT})
    .then(function(inventories){
      console.log(inventories)
      res.send(inventories)
    })
    
}

exports.addInventory = function(req, res, next){
   
    sequelize.query("select * from inventories left join categories c ON inventories.c_id = c.categoryId left join suppliers as s on s.s_id = inventories.s_id;",
    { type: sequelize.QueryTypes.SELECT})
    .then(function(inventories){
      console.log(inventories)
      res.send(inventories)
    })
    
}
exports.updateInventory = function(req, res, next){
   
    sequelize.query("select * from inventories left join categories c ON inventories.c_id = c.categoryId left join suppliers as s on s.s_id = inventories.s_id;",
    { type: sequelize.QueryTypes.SELECT})
    .then(function(inventories){
      console.log(inventories)
      res.send(inventories)
    })
    
}
exports.deleteInventory = function(req, res, next){
   
    sequelize.query("select * from inventories left join categories c ON inventories.c_id = c.categoryId left join suppliers as s on s.s_id = inventories.s_id;",
    { type: sequelize.QueryTypes.SELECT})
    .then(function(inventories){
      console.log(inventories)
      res.send(inventories)
    })
    
}

exports.exportCSV= function(req,res, next){


  sequelize.query("select * from inventories left join categories c ON inventories.c_id = c.categoryId left join suppliers as s on s.s_id = inventories.s_id;",
    { type: sequelize.QueryTypes.SELECT})
    .then(function(inventories){
      console.log(inventories)
      const jsonData = JSON.parse(JSON.stringify(inventories));
      console.log("jsonData", jsonData);
    
      const json2csvParser = new Json2csvParser({ header: true});
      const csv = json2csvParser.parse(jsonData);
    
      fs.writeFile("products_"+new Date().toDateString() +".csv", csv, function(error) {
        if (error) throw error;
        console.log("Write Successful");
        res.status(200).send("Write Successfull to "+ "products_"+new Date().toDateString() +".csv")
      });    
    })
  
}