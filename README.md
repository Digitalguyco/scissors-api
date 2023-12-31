# URL SHORTENER AND QR-CODE GENERATOR API Built with Flask, Flask_RestX
---
## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Live API](#live-api)
- [Upcoming Updates](#upcoming-updates)

## Introduction
Brief is the new black, this is what inspires the team at Scissor. In today’s world, it’s important to keep things as short as possible, and this applies to more concepts than you may realize. From music, speeches, to wedding receptions, brief is the new black. Scissor is a simple tool which makes URLs as short as possible. Scissor thinks it can disrupt the URL shortening industry and give the likes of bit.ly and ow.ly a run for their money within 2 years.
## Features
- Authenticated requests(User) can send a POST Request containing a long url and the custom name to endpoint `\shorturl\shorturl`, and a response with a generated short url along with a qrcode will be returned as a response.
- Authenticated requests(User) can send a GET Request to get a Link QR Code
- Authenticated requests(User) can send a GET Request to get Link History
- Authenticated requests(User) can send a GET Request to get a Link Anlyltics
- Authenticated requests(User) can send a DELETE Request to get a Delete a shortned Link

## API Installation
- Clone the repository
- Create a virtual environment `python3 -m venv venv` or with `virtualenv venv`
- Install the requirements `pip install -r requirements.txt`
- Create a .env file and add `SECRET_KEY='your secret'` `JWT_SECRET_KEY='your secret'` `DATABASE_URL='your_dburl'`
- Inside api/ folder Then Open `__init__.py` and set `def create_app(config=config_dict['prod']):` to `def create_app(config=config_dict['test']):`
- Initialize the database `Flask db init`
- Run the application `python3 runserver.py`

## Frontend Client Installation
- Change directory to scissors-frontend `cd scissors-frontend`
- Install the requirements `npm install`
- Start the devlopment server `npm start`



## Usage
- To run the application, run `python3 runserver.py`
- To run the tests, run `python3 -m pytest`
### You can Test The API with either a Client service like PostManAPI or You can test with the Client I built. to use this: -
- Start Client devlopment server `cd scissors-frontend` then `npm start`

## Contributing
- Fork the repository
- Clone the repository
- Create a virtual environment `python3 -m venv venv` or with `virtualenv venv`
- Install the requirements `pip install -r requirements.txt`
- Create a new branch `git checkout -b new-branch`
- Make your changes
- Commit your changes `git commit -m "commit message"`
- Push to the branch `git push origin new-branch`
- Create a pull request

## Live API
- [Scissors-API](https://scissors-api-56ra.onrender.com/)

## Upcoming Updates
- Live host of frontend
- 3rd party authentifications
- More analytics data
- Earn per click Feature