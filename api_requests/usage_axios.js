//import axios from 'axios'
const axios = require('axios');
const {expect} = require('chai')
const data = require('../api_requests/data/dummy_data.json')
const fs = require('fs-extra')
        
describe('actions for dummy website', async() => {
    let userId = '';
    let userName;
    let userPwd;
    let token;
    let token_value;

    it('Create user', async() => {
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

    it('Create a product', async () => {
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

// put - replacing full list of data, patch - can replace 1+ fields
    it.skip('update user data', async () => {
        const updateUserData = await axios.patch(`${data.baseUrl}/users/add`, 
        {
            'firstName': 'emailTut',
            'lastName': 'abc123',
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(updateUserData.statusText);
    });
});