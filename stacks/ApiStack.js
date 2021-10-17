import * as sst from '@serverless-stack/resources';

export default class ApiStack extends sst.Stack {
    //public reference to the api
    api;

    constructor (scope, id, props) {
        super( scope, id, props);

        const { table } = props;

        //create the api
        this.api = new sst.Api (this, "Api", {
            defaultFunctionProps: {
                environment: {
                    TABLE_NAME: table.tableName
                },
            },
            routes: {
                "POST /notes": "src/create.main"
            }
        });
        //Allow the api to access the table
        this.api.attachPermissions([table]);

        //show the API endpoint in the output
        this.addOutputs({
            ApiEndpoint: this.api.url,
        })
    }
}