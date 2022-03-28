
const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/userRoutes/userRoutes.js', "./routes/postRoutes/postRoutes.js" ]

const doc = {
    info: {
        version: "1.0.0",
        title: "Tralio REST API",
        description: "All public endpoints of Tralio API"
    },
    host: "localhost:8000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "User",
            "description": "All user endpoints"
        }
    ],
    // securityDefinitions: {
    //     api_key: {
    //         type: "apiKey",
    //         name: "api_key",
    //         in: "header"
    //     },
    //     petstore_auth: {
    //         type: "oauth2",
    //         authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
    //         flow: "implicit",
    //         scopes: {
    //             read_pets: "read your pets",
    //             write_pets: "modify pets in your account"
    //         }
    //     }
    // },
    // definitions: {
    //     User: {
    //         name: "Jhon Doe",
    //         age: 29,
    //         parents: {
    //             father: "Simon Doe",
    //             mother: "Marie Doe"
    //         },
    //         diplomas: [
    //             {
    //                 school: "XYZ University",
    //                 year: 2020,
    //                 completed: true,
    //                 internship: {
    //                     hours: 290,
    //                     location: "XYZ Company"
    //                 }
    //             }
    //         ]
    //     },
    //     AddUser: {
    //         $name: "Jhon Doe",
    //         $age: 29,
    //         about: ""
    //     }
    // }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js')
})
