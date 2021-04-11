# ct-delivery
Creates an endpoint that returns the drive time from the closest kitchen

# Prerequisites
- NodeJs ([download](https://nodejs.org/en/download/))
- NPM

# Setup
1. Clone `ct-delivery` and check out branch `main`
2. Run `npm i`
3. Configure your local environment variables
4. Run `npm start`

# Example Request
Local
```sh
curl -X "POST" "http://localhost:8080/delivery" \
     -H "Content-Type: application/json" \
     -d $'{"address": "500 S Capitol Ave, Indianapolis, IN"}'
```

OR

Public
```sh
curl -X "POST" "http://www.samlesem.com/delivery" \
     -H "Content-Type: application/json" \
     -d $'{"address": "500 S Capitol Ave,, Indianapolis, IN"}'
```

#### Configure Local Environment
Create a file called `.env` and include `GOOGLE_API_KEY=<your_api_key>`
