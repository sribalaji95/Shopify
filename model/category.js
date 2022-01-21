var sequelize = require('../config/db.config')
var Sequelize = require("sequelize");
var Inventory = require('./inventory')

var Category = sequelize.define('category', {

   
    categoryId : {
        type: Sequelize.INTEGER,
        autoIncrement: true,

        primaryKey: true

    } ,
    categoryName: Sequelize.STRING

},{
timestamps: false,
createdAt: false,

// If don't want updatedAt
updatedAt: false,
}
)
// Category.associate = function(models) {
//     console.log("+++ ss", models)

//     Inventory.belongsTo(models.Category, {foreignKey: 'c_id'});

// }


module.exports = Category