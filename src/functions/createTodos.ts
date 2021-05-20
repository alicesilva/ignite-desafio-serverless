import { document } from "../utils/dynamodbClient";

import { v4 as uuidv4 } from "uuid";
import * as dayjs from "dayjs";

interface ICreateTodo {
  title: string;
  deadline: string;
}
export const handle = async (event) => {
  const { id } = event.pathParameters

  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

  await document
    .put({
      TableName: "todos",
      Item: {
        id: uuidv4(),
        user_id: id,
        title,
        done: false,
        deadline: dayjs(deadline).format("DD/MM/YYYY"),
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo created"
    }),
    headers: {
      "Content-type": "application/json"
    }
  }
}