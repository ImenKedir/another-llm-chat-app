import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { Table } from "sst/node/table"

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export async function getCount(): Promise<number> {
    const get = new GetCommand({
        TableName: Table.counter.tableName,
        Key: {
            counter: "hits",
        },
    });
    const results = await db.send(get);
    return results.Item ? results.Item.tally : 0;
}

export async function incrementCount(): Promise<number> {
    let count = await getCount();
    const update = new UpdateCommand({
        TableName: Table.counter.tableName,
        Key: {
            counter: "hits",
        },
        UpdateExpression: "SET tally = :count",
        ExpressionAttributeValues: {
            ":count": ++count,
        },
    });
    await db.send(update);
    return count;
}
