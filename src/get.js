import handler from "./util/handler";
import dynamoDB from "./util/dynamoDB";

export const main = handler (async (event) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        //key defines the partition key and sort key of the item to be retrieved
        Key: {
            userId: "123",
            noteId: event.pathParameters.id, // id of note from path
        },
    };

    const result = await dynamoDB.get(params);
    if(!result.Item) {
        throw new Error ("Item not found.");
    }
    //Return the retrieved item
    return result.Item;
})