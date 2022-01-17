# bybit-sell-limit-bot
This bot that will set sell limits based on a config file. It can be used for new crypto launches when time is of the essence. 

# Setup and running of the bot
Install dependencies using a dependency manager such as npm using `npm i`.

Make sure you have filled in the config file correctly. When you're ready, run `yarn start`. 

# Config file
You will need to setup an api key through your bybit account. When doing so, it will provide you an api key and a private api key. The api key will be given to the bybit api as a parameter and the private api key will be used to generate your signature. 
