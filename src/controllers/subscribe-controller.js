const mondayService = require("../services/monday-service");
const transformationService = require("../services/transformation-service");
const dataService = require("../services/data-service");

async function subscribeAction(req, res) {
  console.log("subscribe");
  const {shortLivedToken} = req.session;
  const {payload} = req.body;
  const {inputFields} = payload;
  const {boardId, groupId} = inputFields;
  //보드 아이디에 있는 그룹 조회 한 뒤 아이템 가져오기
  // const text = await dataService.getGroupIdAndValue(shortLivedToken,boardId);
  console.log("=========== subscribeAction ==============")
  console.log(boardId);
  console.log(groupId);

  try {
   await dataService.getCSVDataByBoardIdAndGroupId(shortLivedToken,boardId,groupId);


  }catch (e){
    console.error("작동 되지 않았습니다.");
    console.log(e)
  }
  //
  // try {
  //   const {boardId} = inputFields;
  //
  //   console.log("============ payload ============")
  //   console.log(payload);
  //   console.log(inputFields);
  //
  //   // const text = await mondayService.getColumnValue(shortLivedToken, itemId, sourceColumnId);
  //   // const text = await dataService.getGroupIdAndValue(shortLivedToken,boardId);
  //
  //
  //   //   if (!text) {
  return res.status(200).send({});
  //   //
  //   //   const transformedText = transformationService.transformText(
  //   //     text,
  //   //     transformationType ? transformationType.value : 'TO_UPPER_CASE'
  //   //   );
  //   //
  //   //   await mondayService.changeColumnValue(shortLivedToken, boardId, itemId, targetColumnId, transformedText);
  //   //
  //   //   return res.status(200).send({});
  //   // } catch (err) {
  //   //   console.error(err);
  //   //   return res.status(500).send({ message: 'internal server error' });
  // }catch(e){
  //     console.error(e);
  //
  // }
}


async function unsubscribeAction(req, res) {
  console.log("unsubscribe");
  //레시피 삭제
  return res.status(200).send({});


}

async function action(req, res) {
  console.log("action!")
}

module.exports = {
  subscribeAction,
  unsubscribeAction,
  action
}
