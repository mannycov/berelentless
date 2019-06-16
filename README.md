# BeRelentless

A social networking app designed to help you reach your fitness goals

Visit the app at [berelentless.io](http://www.berelentless.io)

## Getting Started

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

### Prerequisites

You will need to create a keys_dev.js in the server config folder with

```
module.exports = {
  // MongoDB
  mongoURI: 'YOUR_OWN_MONGO_URI',
  secretOrKey: 'YOUR_OWN_SECRET',
  // AWS S3 Bucket (for profile photo storage)
  accessKeyId: 'YOUR_OWN_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_OWN_SECRET_ACCESS_KEY'
};

```

## Deployment

Deployed using Heroku

## Built With

The MERN Stack

## Authors

* **Emanuel Covarrubais**

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

* Hat tip to Brad Traversy
