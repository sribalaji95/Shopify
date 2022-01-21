var sequelize = require('../config/db.config')
var Sequelize = require("sequelize");


var Supplier = sequelize.define('supplier', {

   
    s_id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true

    } ,
    
    supplierName: Sequelize.STRING

},{
    timestamps: false,
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
    }

)


module.exports = Supplier