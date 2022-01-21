var sequelize = require('../config/db.config')

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