const axios = require('axios');
const {expect} = require('chai')

describe('actions for jsonplaceholder website', async() => {
    let baseUrl = 'https://jsonplaceholder.typicode.com/'
    let idPost = '';

    it('Get post by id', async () => {
        const getUser = await axios.get(`${baseUrl}/posts/1`)
        console.log(getUser.data);
    });

    it('Create new post', async() => {
        const createUser = await axios.post(`${baseUrl}/posts`,
        {
            'title': 'cat',
            'body': 'test',
            'userId': 1,
        },
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
        console.log(createUser.data);
        idPost = createUser.data.id;
    });

    it('Update post data', async () => {
        const updateUserData = await axios.put(`${baseUrl}/posts/1`, 
        {
            'id': `${idPost}`,
            'title': 'text',
            'body': 'bot',
            'userId': 2,
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(updateUserData.data);
        console.log(updateUserData.statusText);
    });
});