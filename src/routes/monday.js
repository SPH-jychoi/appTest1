const router = require('express').Router();
const { authenticationMiddleware } = require('../middlewares/authentication');
const mondayController = require('../controllers/monday-controller');
const subscribeControlller = require('../controllers/subscribe-controller');


router.post('/monday/execute_action', authenticationMiddleware, mondayController.executeAction);
router.post('/monday/get_remote_list_options', authenticationMiddleware, mondayController.getRemoteListOptions);

//test 중
//구독 api
router.post('/subscribe', authenticationMiddleware, subscribeControlller.subscribeAction);
//구독취소 api
router.post('/unsubscribe', authenticationMiddleware, subscribeControlller.unsubscribeAction);
//action
router.post('/action', authenticationMiddleware, subscribeControlller.action);

module.exports = router;
