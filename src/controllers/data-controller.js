const mondayService = require('../services/monday-service');
const transformationService = require('../services/transformation-service');
const { TRANSFORMATION_TYPES } = require('../constants/transformation');



async function getBoardData(req,res) {
  try {

  }
}




async function getTest(req, res) {
  try {
    return res.status(200).send({message: "정연 테스트"});
  } catch (e) {
    return res.status(500).send({message: "테스트 실패"});
  }
}

async function getRemoteListOptions(req, res) {
  try {
    return res.status(200).send(TRANSFORMATION_TYPES);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

module.exports = {
  getRemoteListOptions,
  getTest,
};
