express = require('express');
const {getEmp, addEmp, updateEmp, deleteEmp } = require('../controllers/empController')

const router = express.Router();

router.get('/employee',getEmp);
router.post('/employee',addEmp);
router.put('/employee/:empid',updateEmp);
router.delete('/employee/:empid',deleteEmp);

module.exports = router;