const puppeteer = require("puppeteer");
const fs = require("fs");

const results = [];

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:54.0) Gecko/20100101 Firefox/54.0",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
];

const WALMART_SELLER_URL = "https://seller.walmart.com/";
const CREDENTIALS_FILE_PATH = "./credentials.txt";

async function main() {
  const browser = await puppeteer.launch({ headless: true });
  const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

  const credentials = fs
    .readFileSync(CREDENTIALS_FILE_PATH, "utf8")
    .split("\n")
    .map((line) => line.split(":"))
    .filter((pair) => pair.length === 2);

  for (const [email, password] of credentials) {
    const browserContext = await browser.createIncognitoBrowserContext();
    const page = await browserContext.newPage();

    await page.setUserAgent(userAgent);

    console.log(`Logging in with email ${email} and password ${password}`);
    await page.goto(WALMART_SELLER_URL);
    await page.waitForSelector('[data-automation-id="uname"]');
    await page.type('[data-automation-id="uname"]', email);
    await page.waitForSelector('[data-automation-id="pwd"]');
    await page.$('[data-automation-id="pwd"]');
    await page.type('[data-automation-id="pwd"]', password);
    await page.$(".spin-button-children");
    await page.click(".spin-button-children");
    await page.waitForSelector('[data-automation-id="seller-account-status"]');
    const status = await page.$eval(
      '[data-automation-id="seller-account-status"]',
      (el) => el.innerText
    );

      console.log(`Store status for ${email}: ${status}`);
    results.push({ email, status });
  
  fs.writeFileSync("./store_status.json", JSON.stringify(results));


    await page.close();
    await browserContext.close();
  }

  await browser.close();
}

main();
