var sequelize = require('../config/db.config')
var Sequelize = require("sequelize");

var Warehouse = sequelize.define('warehouse', {

    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1()

    } ,
    
    wareHouseName: Sequelize.STRING,
    location: Sequelize.STRING

},
{
timestamps: false,
createdAt: false,

// If don't want updatedAt
updatedAt: false,
},

)
// Category.associate = function(models) {
//     console.log("+++ ss", models)

//     Inventory.belongsTo(models.Category, {foreignKey: 'c_id'});

// }


module.exports = Warehouse