//import axios from 'axios'
const axios = require('axios');
const {expect} = require('chai')
        
describe('actions for dummy website', async() => {
    let baseUrl = 'https://dummyjson.com/'
    let userId = '';
    let userName;
    let userPwd;
    let token;

    it('Create user', async() => {
        const createUser = await axios.post(`${baseUrl}/users/add`,
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

    it('get user by id', async () => {
        const getUser = await axios.get(`${baseUrl}/users/1`)
        console.log(getUser.data);
        userName = getUser.data.username;
        userPwd = getUser.data.password;
    });

    it('Getting credentials', async() =>{
        const getTokenData = await axios.post(`${baseUrl}/auth/login`,
        {
            'username': userName,
            'password': userPwd,
            expiresInMins: 30
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //console.log(getTokenData.data);
        token = getTokenData.data.token;
    });

//     fetch('https://dummyjson.com/products/add', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     title: 'BMW Pencil',
//     /* other product data */
//   })
// })
// .then(res => res.json())
// .then(console.log);
            

    it('Create a product', async () => {
        const createProduct = await axios.post(`${baseUrl}/products/add`,
        {
            'title': 'MyOwnProduct'
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(createProduct.data);
        expect(createProduct.status).equal(200);
    });

// put - replacing full list of data, patch - can replace 1+ fields
    it.skip('update user data', async () => {
        const updateUserData = await axios.patch(`${baseUrl}/users/add`, 
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