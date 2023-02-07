const initMondayClient = require('monday-sdk-js');
const {replace} = require("sinon");


async function getColumns(boardId, mondayClient) {

  const query = `query($boardId: [Int]) {
        boards (ids: $boardId) {
        columns{
     id
     title
     settings_str
     type
      }
     }
    }`;
  const variables = {boardId};
  const response = await mondayClient.api(query, {variables});

  return response.data.boards[0].columns;

}

async function getItemIdListByGroupId(boardId, groupId, mondayClient) {
  let itemList = [];
  let page = 0;
  let limit = true;


  while (limit) {
    page += 1;
    const query = `query($boardId: [Int],$groupId:[String!]){
    boards (ids: $boardId) {
        groups (ids: $groupId) {
        items (limit:100, page:${page}) {
        id
      }
    }
  }
}`;
    const variables = {boardId, groupId}
    let res = await mondayClient.api(query, {variables});
    const items = await res.data.boards[0].groups[0].items;
    if (items.length == 0) {
      limit = false;
    } else {
      itemList = [...items];
    }
  }
  return  itemList;

}

async function getItemColumnValue(itemIdList, mondayClient){
  let responseList = [];
  //[ { id: '3483810153' }, { id: '3517773049' }] 형식으로 되어 있는 list 가공
  //[3483810153, 3517773049...]

  let itemIdArray = [];
  console.log(itemIdList);
  for (let i = 0; i < itemIdList.length; i++) {
    console.log(itemIdList[i].id);
    itemIdArray.push(itemIdList[i].id);

  }

  // division = 배열 자르기 item 가지고 컬럼 value 조회하기 => 복잡도 고려해야함 30개씩 쪼개 보내기?
  let listArray = division(itemIdArray, 30);
  for (let i = 0; i < listArray.length; i++) {
    try {
      const query = `query {
          items (ids:[${listArray[i]}] ) {
              id
          column_values {
              id
              text
            }
       }
  }`;
      await mondayClient.api(query)
        .then((res) => {
          let a = res.data.items
          responseList.push(...a)

        });

    } catch (e) {
      console.log(e);

    }
  }
  return responseList;
};


const getCSVDataByBoardIdAndGroupId = async(token, boardId, groupId) => {
  //아이템 많으면 쪼개야함 - 추후
  const mondayClient = initMondayClient();
  mondayClient.setToken(token);
  //1. 보드 컬럼 가져오기
  const columns= await getColumns(boardId, mondayClient);
  //2. 아이템 그룹Id 로 조회 후 데이터 넣기
 const itemIdList = await getItemIdListByGroupId(boardId,groupId,mondayClient);
  // console.log(itemIdList);
  //3. 아이템 id를 가지고 컬럼 value 조회 (복잡도 고려해서 30개씩 쪼개 사용)
  const itemTextList =  await getItemColumnValue(itemIdList,mondayClient);
  console.log(itemTextList[0].column_values);


}

//원하는 숫자로 아이템 자르기
const division = (arr, n) => {
  const length = arr.length;
  const divide = Math.floor(length / n) + (Math.floor(length % n) > 0 ? 1 : 0);
  const newArray = [];

  for (let i = 0; i < divide; i++) {
    // 배열 0부터 n개씩 잘라 새 배열에 넣기
    newArray.push(arr.splice(0, n));
  }
  return newArray;
}

const getGroupIdAndValue = async (token, boardId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const query = `query($BOARD_ID: [Int]) {
          boards (ids: $BOARD_ID) {
          groups {
            id
            title
            color
          }
       }
      }`;
    const variables = {boardId};

    const response = await mondayClient.api(query, {variables});
    await console.log(response.data.boards[0].groups);
    return response.data.boards[0].groups;
  } catch (e) {
    console.log("group 읽기 실패");
    return false;
  }
};


const changeColumnValue = async (token, boardId, itemId, columnId, value) => {
  try {
    const mondayClient = initMondayClient({token});

    const query = `mutation change_column_value($boardId: Int!, $itemId: Int!, $columnId: String!, $value: JSON!) {
        change_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
          id
        }
      }
      `;
    const variables = {boardId, columnId, itemId, value};

    const response = await mondayClient.api(query, {variables});
    return response;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getGroupIdAndValue,
  getCSVDataByBoardIdAndGroupId
};
