import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { updateTodo } from "../../businessLogic/todos"
import { createLogger } from '../../utils/logger'

const logger = createLogger("GenerateUploadUrl")

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const requestId = event.requestContext.requestId

  logger.info(`${requestId} Entering GetToDos service...`)

  const todoId = event.pathParameters.todoId
  logger.info(`${requestId} Updated ToDo record: ${todoId}`)

  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  logger.info(`${requestId} Updated fields: ${JSON.stringify(updatedTodo)}`)

  updateTodo(todoId, updatedTodo)
  logger.info("${requestId} Update complete!")

  logger.info("${requestId} Exiting with status code 200")

  return {
    statusCode: 200,
    body: JSON.stringify({})
  }
})

handler
  .use(cors({credentials: true}))

