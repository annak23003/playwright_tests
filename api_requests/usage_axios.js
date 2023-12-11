//import axios from 'axios'
const axios = require('axios');
const {expect} = require('chai')
const data = require('../api_requests/data/dummy_data.json')
const fs = require('fs-extra');
const { URLSearchParams } = require('url');
        
describe('actions for users on dummy website', async() => {
    let userId = '';
    let userName;
    let userLName;
    let userPwd;
    let token;
    let token_value;

    it.skip('Create user', async() => {
        const createUser = await axios.post(`${data.baseUrl}/users/add`,
        {
            'firstName': 'Muhammad',
            'lastName': 'Ovi',
            'age': 250
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(createUser.data);
        userId = createUser.data.id;
    });

    it.skip('Create a product', async () => {
        const createProduct = await axios.post(`${data.baseUrl}/products/add`,
        {
            'title': 'MyOwnProduct'
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.token}`
            }
        })
        console.log(createProduct.data);
        expect(createProduct.status).equal(200);
    });

    it('Get users by search params', async() => {
        //fetch('https://dummyjson.com/users/filter?key=hair.color&value=Brown')
        const params = new URLSearchParams([['key', 'hair.color'], ['value', 'Brown']])
        const getUserByParams = await axios.get(`${data.baseUrl}/users/filter`, {params})
        expect(getUserByParams.status).equal(200);
        //console.log(getUserByParams.data.users[2]);
        userName = getUserByParams.data.users[2].firstName;
        userId = getUserByParams.data.users[2].id;
        userLName = getUserByParams.data.users[2].lastName;
        //console.log(userName);
        //Arely
    })

    it('Get user by id', async () => {
        const getUser = await axios.get(`${data.baseUrl}/users/${userId}`);
        expect(userName).equal(getUser.data.firstName);
        expect(userLName).equal(getUser.data.lastName);
    })

    it.skip('update user data', async () => {
        const updateUserData = await axios.patch(`${data.baseUrl}/users/1`, 
        {
            'firstName': 'Marko',
            'lastName': 'Polo',
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.token}`
            }
        });
        console.log(updateUserData.statusText);
        console.log(updateUserData.status);
        console.log(updateUserData.data);
    });
});