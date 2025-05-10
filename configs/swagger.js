import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "blog api",
            version: "1.0.0",
            description: "blog api",
            contact:{
                name: "Diego Santandrea",
                email: "dsantandrea-2021518@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/kfc-blog/v1"
            }
        ]
    },
    apis:[

    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi }