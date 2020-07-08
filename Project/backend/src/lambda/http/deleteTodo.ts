import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { deleteToDo } from "../../businessLogic/todos"

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  console.log("Deleting record: " + todoId)
  await deleteToDo(todoId)

  return {
    statusCode: 200,
    body: JSON.stringify({})
  }

})

handler
  .use(cors({credentials: true}))

