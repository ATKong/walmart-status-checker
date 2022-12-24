# Walmart Store Status Scraper
This project is a web scraper that logs into Walmart seller accounts and retrieves the status of the seller's store. The status is then stored in a JSON file.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
To run this project, you will need to have the following software installed on your computer:
```
Node.js
Puppeteer
```

## Installation
Clone the repository to your local machine: git clone https://github.com/ATKONG/walmart-store-status-scraper.git
Navigate to the directory where the repository was cloned:
cd walmart-store-status-scraper
Install the required packages: npm install

## Usage
To run the project, you will need to create a file called credentials.txt in the root directory of the project. The file should contain the email addresses and passwords for the Walmart seller accounts you want to scrape, with each account on a separate line in the format email:password.

Once you have created the credentials.txt file, you can run the project by entering the following command:
node index.js
This will execute the script and generate a store_status.json file containing the store status for each of the accounts in the credentials.txt file.

## Data
The data used in this project is the store status information for Walmart seller accounts. The data is retrieved by logging into the accounts and scraping the information from the Walmart seller dashboard.

## Analysis
The analysis consists of a single step: scraping the store status information from the Walmart seller dashboard.

## Results
The results of the analysis are stored in the store_status.json file. The file contains an array of objects, with each object representing the store status for a single Walmart seller account.
