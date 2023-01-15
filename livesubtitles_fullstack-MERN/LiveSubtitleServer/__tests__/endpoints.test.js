import request from 'supertest'
import {testDB,dropTable,killDB} from '../testing/testDB'
const {MongoMemoryServer} = require("mongodb-memory-server");
const mongoose = require('mongoose');
require("../models/recording.model")
require('../models/user.model')
const User = mongoose.model("users");
const Recording = mongoose.model("Recording2")

beforeAll(async () =>{
    await testDB();
})
afterEach(async () =>{
    await dropTable();
})
afterAll(async () =>{
    await killDB();
})
describe("Models and Schema", ()=> {
    describe("Recording", ()=>{
        //should contain all relevant fields: token, parturl, blob 
        test("should succeed",async ()=>{
            let validRec = {
                username: "Jeff",
                partURL: "http://parturl",
                audioBlob: "base64",
                word:"test"
            }
            const testRec = new Recording(validRec);
            await testRec.save();
            expect(testRec._id).toBeDefined();
            expect(testRec.username).toBe(validRec.username);
            expect(testRec.partUrl).toBe(validRec.partUrl);
            expect(testRec.audioBlob).toBe(validRec.audioBlob);
            expect(testRec.word).toBe(validRec.word);

            
        })
        test("should fail with not enough fields", async () =>{
            // should recieve validation error since required field is undefined
            let invalidRec = {
                partUrl: "http://parturl",
                audioBlob: "base64",
                word:"test"
            }
            try{
                const testRec = Recording(invalidRec);
                await testRec.save();
            }catch(error) {
                expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
            }
        })

    })
    describe("User", ()=>{
        //should contain all relevant fields: token, parturl, blob 
        test("should succeed",async ()=>{
            let validUser = {
                username: "FredTestsJS",
                password: "BIGHASHEDPWD1234",
                fullname: "Fred McDev",
                cplevel: 4,
                therapistID: 123,
                refreshToken: "refreshToken"
                }
            const testUser = new User(validUser);
            await testUser.save();
            expect(testUser._id).toBeDefined();
            expect(testUser.username).toBe(validUser.username);
            expect(testUser.password).toBe(validUser.password);
            expect(testUser.cplevel).toBe(validUser.cplevel);
            expect(testUser.fullname).toBe(validUser.fullname);
            expect(testUser.therapistID).toBe(validUser.therapistID);
            expect(testUser.refreshToken).toBe(validUser.refreshToken);


            
        })
        test("should fail with not enough fields", async () =>{
            // should recieve validation error since required field is undefined
            let invalidUser = {
                password: "BIGHASHEDPWD1234",
                fullname: "Fred McDev",
                cplevel: "notanumber",
                therapistID: 123,
                refreshToken: "refreshToken"
                }
            try{
                const testUser = User(invalidUser);
                await testUser.save();
            }catch(error) {
                expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
            }
        })
    })
})