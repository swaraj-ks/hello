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
const BookType = new GraphQLObjectType({
    name: 'Jobs',
    fields: ( ) => ({
        title:{type:GraphQLString},
        required_exp:{type:Number},
        Qualification:{type:GraphQLString},
        Number_of_vacancy:{type:Number},
        Last_Date:{type:GraphQLInt},
        Description:{type:GraphQLString},
        status:{type:Boolean},
        institution_id:{type:GraphQLString},
        institution_name:{type:GraphQLString}
    })
});
module.exports = BookType;