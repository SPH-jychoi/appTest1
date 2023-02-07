const router = require('express').Router();
const mondayRoutes = require('./monday');

router.use(mondayRoutes);

router.get('/data',function (req,res){
  res.get();
})


router.get('/', function (req, res) {
  res.json(getHealth());
});

router.get('/health', function (req, res) {
  res.json(getHealth());
  res.end();
});

router.get('/test', function (req,res){

})

function getHealth() {
  return {
    ok: true,
    message: 'Healthy',
  };
}

module.exports = router;
