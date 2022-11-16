const graphql = require('graphql');
const teacher = require('../model/Teachers.model');
const teacher_type = require('../types/teachers_type');
const jobs_type = require('../types/jobs_type');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTeacher: {
            type: teacher_type,
            args: {
                First_name:{type:new GraphQLNonNull(GraphQLString)},
                Last_name:{type:new GraphQLNonNull(GraphQLString)},
                Pass:{type:new GraphQLNonNull(GraphQLString)},
                DOB:{type:new GraphQLNonNull(GraphQLString)},
                Phone_Number:{type:new GraphQLNonNull(GraphQLInt)},
                Email:{type:new GraphQLNonNull(GraphQLString)},
                Gender:{type:new GraphQLNonNull(GraphQLString)},
                About:{type:new GraphQLNonNull(GraphQLString)},
                State:{type:new GraphQLNonNull(GraphQLString)},
                Street:{type:new GraphQLNonNull(GraphQLString)},
                District:{type:new GraphQLNonNull(GraphQLString)},
                Pin:{type:new GraphQLNonNull(GraphQLInt)},
                Profile_pic:{type:GraphQLString},
                Resume:{type:GraphQLString},
                Qualification:{type:new GraphQLNonNull(GraphQLObjectsThunk)},
                Certification:{type:GraphQLObjectsThunk},
                Training_from_campus:{type:GraphQLObjectsThunk},
                Experience:{type:new GraphQLNonNull(GraphQLObjectsThunk)},
                Transactions:{type:GraphQLObjectsThunk},
                applied_jobs:{type:GraphQLObjectsThunk}
            },
            resolve(parent, args){
                let teacher = new teacher({
                        First_name:args.first_name,
                        Last_name:args.last_name,
                        Pass:args.pass,
                        DOB:args.dob,
                        Phone_Number:args.first_name,
                        Email:args.first_name,
                        Gender:args.first_name,
                        About:args.first_name,
                        State:args.first_name,
                        Street:args.first_name,
                        District:args.first_name,
                        Pin:args.first_name,
                        Profile_pic:args.first_name,
                        Resume:args.first_name,
                        Qualification:args.first_name,
                        Certification:args.first_name,
                        Training_from_campus:args.first_name,
                        Experience:args.first_name,
                        Transactions:args.first_name,
                        applied_jobs:args.first_name
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});