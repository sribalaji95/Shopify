var sequelize = require('../config/db.config')
var Sequelize = require("sequelize");
var Category = require('./category');
var Supplier = require('./supplier');
var WareHouse = require('./warehouse');


var Inventory = sequelize.define('inventory', {

    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    id : {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1()

    } ,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    stockCount : Sequelize.INTEGER,
    discount: Sequelize.INTEGER,
    available : Sequelize.BOOLEAN,
    threshold: Sequelize.INTEGER,
    c_id: {
        type : Sequelize.INTEGER,
        references: {
            model: Category, 
            key: 'categoryId'
          },
          field: 'c_id'
        
    },
    s_id: {
        type : Sequelize.INTEGER,
        references: {
            model: Supplier, 
            key: 's_id'
          }
          
    },
    w_id: {
        type : Sequelize.INTEGER,
        references: {
            model: WareHouse, 
            key: 'id'
          }
         // field: 'w_id'
        
    },
}

)
// Inventory.belongsTo(Category, {as:'Category', foreignKey: 'cID'})

// Inventory.associate = function(models) {
//     console.log("+++ ", models)
//     Inventory.hasOne(models.Category, {foreignKey: 'cID', as: 'cat'});

// }

module.exports = Inventory