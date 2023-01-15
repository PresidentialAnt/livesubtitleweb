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
            let invalidRec = [{
                partUrl: "http://parturl",
                audioBlob: "base64",
                word:"test"
            }]
            try{
                const testRec = Recording(invalidRec);
                await testRec.save();
            }catch(error) {
                expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
            }
        })

    })
    describe("User", ()=>{
        test("should respond with ",()=>{
            expect(true).toBe(true)
        })
    })
})