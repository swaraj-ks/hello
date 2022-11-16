const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLObjectsThunk,
    GraphQLList,
    GraphQLNonNull,GraphQLBoolean,
} = graphql;

const TeacheType = new GraphQLObjectType({
    name: 'teachers',
    fields: ( ) => ({
        First_name:{type:GraphQLString},
        Last_name:{type:GraphQLString},
        Pass:{type:GraphQLString},
        DOB:{type:GraphQLString},
        Phone_Number:{type:GraphQLInt},
        Email:{type:GraphQLString},
        Gender:{type:GraphQLString},
        About:{type:GraphQLString},
        State:{type:GraphQLString},
        Street:{type:GraphQLString},
        District:{type:GraphQLString},
        Pin:{type:GraphQLInt},
        Profile_pic:{type:GraphQLString},
        Resume:{type:GraphQLString},
        Qualification:{type:GraphQLObjectsThunk},
        Certification:{type:GraphQLObjectsThunk},
        Training_from_campus:{type:GraphQLObjectsThunk},
        Experience:{type:GraphQLObjectsThunk},
        Transactions:{type:GraphQLObjectsThunk},
        status:{type:GraphQLBoolean},

        applied_jobs:{type:GraphQLObjectsThunk},
        // author: {
        //     type: AuthorType,
        //     resolve(parent, args){
        //         return Author.findById(parent.authorId);
        //     }
        // }
    })
});
module.exports = TeacheType;