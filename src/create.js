import * as uuid from "uuid";
import dynamoDB from "./util/dynamoDB";


export async function main (event) {
    //Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            //The attributes of the item to be created
            userId: "123", //The id of the author
            noteId: uuid.v1(),  // A unique id
            content: data.body, //parsed from request body
            attachment: data.attachment, // parsed from request body
            createdId: Date.now(),
        },
    };

    await dynamoDB.put(params);

    return params.Item;
}