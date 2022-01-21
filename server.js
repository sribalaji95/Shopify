var express    = require("express");
var Inventory = require('./routes/inventoryroutes');
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Origin', '*'); //replace localhost with actual host
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

    next();
});
var router = express.Router();

//route to handle user registration
router.get('/getAll',Inventory.getAll);
router.patch('/updateInventory/:id', Inventory.updateInventory);
router.put('/deleteInventory/:id',Inventory.deleteInventory);
router.post('/addInventory',Inventory.addInventory);

app.use('/v1', router);
app.listen(8000);
console.log("Application runnin on port 8000")
// logger.info("Application running");

module.exports = app