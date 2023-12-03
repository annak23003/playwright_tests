async function getToken(data) {
    const response = await request.post(
        '/api/auth/login', { 
        data: {
            email: 'email@dmytro.com',
            password: 'abc123'
        },
        headers: {
             "Content-Type": "application/json"
        }
    });
    expect(response.ok()).toBeTruthy();
    const serializeResponse = await response.json();
    expect(serializeResponse).toHaveProperty("token");
    return serializeResponse.token;
}
