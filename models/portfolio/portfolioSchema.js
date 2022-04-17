const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
    Profile: {
        firstName: {
            type: "String",
        },
        lastName: {
            type: "String",
        },
        bio: {
            type: "String",
            
        },
    },
    Educations : [
        {
            city: {type: "String"},
            country: {type: "String"},
            school: {type: "String"},
            degree: {type: "String"},
            startDate:{type: "String"},
            endDate:{type: "String"}
        }
    ],
    Skills : [
        {
            name: {type: "String"},
            level: {type: "String"},
            desc: {type: "String"}
        }
    ],
    Projects: [
        {
            title: {type: "String"},
            desc: {type: "String"},
        }
    ],
    Experience: [
        {
            title: {type: "String"},
            desc: {type: "String"},
        }   
    ],
    Courses: [
        {
            title: {type: "String"},
            institution: {type: "String"},
        }
    ],
    Organisations: [
        {
            name: {type: "String"},
            position: {type: "String"},
            city: {type: "String"},
            country: {type: "String"},
        }
    ],
    Interests: [
        {
            name: {type: "String"},
            desc: {type: "String"}
        }
    ],
    Awards: [
        {
            title: {type: "String"},
            issuer: {type: "String"},
        }
    ],

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);

//this is an example schema ... need front end team help to make proper schema.