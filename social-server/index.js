const express = require('express');
const app = express();
const axios = require('axios');
const port = 8000; // You can set any port number you prefer
require('dotenv').config(); // Load environment variables from a .env file

app.get('/google/callback', async (req, res) => {
  try {
    const { code, state } = req.query; // Extract code and state from the query parameters
    
    // Exchange the authorization code for an access token
    const tokenResponse = await axios.post(`https://${process.env.OKTA_HOST}/oauth2/default/v1/token`, {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.REDIRECT_URI, // Use your redirect URI
      client_id:process.env.CLIENT_ID, // Okta client ID
      client_secret:process.env.CLIENT_SECRET, // Okta client secret
    },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

    const accessToken = tokenResponse.data.access_token; // Extract access token from the response

    // Retrieve user information using the access token
    const userInfoResponse = await axios.get(`https://${process.env.OKTA_HOST}/oauth2/default/v1/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userInfo = userInfoResponse.data; // User information obtained from Okta

    // Process userInfo or save user data to your database
    // For example:
    // await saveUserDataToDatabase(userInfo);

    // res.send(`Login successful. User data obtained. ${JSON.stringify(userInfo)}`);
    res.send(`Login successful`);
  } catch (error) {
    console.error('Error handling login callback:', error);
    res.status(500).send('An error occurred during login callback.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
