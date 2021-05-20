import { document } from "../utils/dynamodbClient";

export const handle = async (event) => {
  const { id } = event.pathParameters

  const params = {
    TableName: "todos",
    FilterExpression: "user_id = :id",
    ExpressionAttributeValues: {
      ":id": id,
    },
  }

  const result = await document.scan(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items)
  }
}