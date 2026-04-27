import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb"
import bcrypt from "bcryptjs"

const ddb = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: process.env.AWS_REGION ?? "us-east-1" })
)

function table() {
  const t = process.env.DDB_TABLE_USERS
  if (!t) throw new Error("DDB_TABLE_USERS not set")
  return t
}

export interface DbUser {
  email: string
  name: string
  passwordHash: string
  image?: string
  createdAt: string
}

export async function findUserByEmail(email: string): Promise<DbUser | null> {
  const res = await ddb.send(new GetCommand({ TableName: table(), Key: { email } }))
  return (res.Item as DbUser) ?? null
}

export async function createUser(email: string, name: string, passwordHash: string): Promise<void> {
  await ddb.send(new PutCommand({
    TableName: table(),
    Item: { email, name, passwordHash, createdAt: new Date().toISOString() },
    ConditionExpression: "attribute_not_exists(email)",
  }))
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
