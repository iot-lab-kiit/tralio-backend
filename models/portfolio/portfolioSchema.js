const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
    profile: {
        firstName: {
            type: "String",
            required: [true, "Please Provide First Name."],
        },
        lastName: {
            type: "String",
            required: [true, "Please Provide Last Name."],
        },
        bio: {
            type: "String",
            required: [true, "Please Provide Bio"],
        },
    },
    education: [{
        degree: {
            type: String,
            required: [true, "Please Provide Degree"],
        },
        school: {
            type: "String",
        },
        city: {
            type: "String",
        },
        country: {
            type: "String",
        },
        startDate: {
            type: "String",
        },
        endDate: {
            type: "String",
        },
    }, ],
    skills: [{
        name: {
            type: "String",
        },
        desc: {
            type: "String",
        },
        level: {
            type: "String",
        },
    }, ],
    projects: [{
        title: {
            type: "String",
        },
        desc: {
            type: "String",
        },
    }, ],
    experiences: [{
        title: {
            type: "String",
        },
        desc: {
            type: "String",
        },
    }, ],

    courses: [{
        title: {
            type: "String",
        },
        institute: {
            type: "String",
        },
    }, ],
    organizations: [{
        name: {
            type: "String",
        },
        position: {
            type: "String",
        },
        city: {
            type: "String",
        },
        country: {
            type: "String",
        },
    }, ],
    interests: [{
        name: {
            type: "String",
        },
        desc: {
            type: "String",
        },
    }, ],
    awards: [{
        name: {
            type: "String",
        },
        issuer: {
            type: "String",
        },
    }, ],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);

//this is an example schema ... need front end team help to make proper schema.