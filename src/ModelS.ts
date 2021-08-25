import { By, until, WebDriver } from "selenium-webdriver";

const fs = require("fs");

export class ModelS {
    driver: WebDriver;
    url: string = "https://www.tesla.com/"

    // locator for Tesla logo (home button)
    teslaLogo: By = By.xpath("//a[@aria-label='Tesla Logo']");

    //locator for model x button in drop down menu
    modelSButton: By = By.xpath("//a[@href='/models']");

    // locator for order now button on model x page
    orderNowButton: By = By.xpath("(//a[@data-gtm-interaction='order now'])[1]");

    // locator for footer containing price
    priceFooter: By = By.className("footer-action-block");

    // locator for lease tab
    leaseTab: By = By.id("finance_options-lease-panel-tab");

    // locator for Downpayment input
    downpayment: By = By.id("downpayment");

    // locator for annual miles
    annualMiles: By = By.id("distance");

    // locator for selecting 12,000 annual miles option
    twelveKMiles: By = By.xpath("//option[@value='12000']");

    // locator for term of lease
    leaseTerm: By = By.id("term");

    // locator for amount due at signing
    amountSigning: By = By.id("amountDueAtSigning");

    // locator for lease payment
    leasePayment: By = By.xpath("//th[@role='columnheader'][2]");


    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    /**
     * This will navigate to https://www.tesla.com/. The driver will 
     * locate the Tesla logo to verify that we are on the Tesla website.
     * @example await page.navigate();
     */
    async navigate() {
        await this.driver.get(this.url);
        await this.driver.wait(until.elementLocated(this.teslaLogo));
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.teslaLogo)));
    }

    /**
     * This will get the price of the Tesla by getting the string, replacing the comma with 
     * an empty space to connect the numbers. The substring will remove the '$' in the string
     * so only numbers will be returned.
     * @param elementBy
     * @returns the price of the Tesla
     * @example await page.getPrice(page.basePrice);
     */
    async getPrice(elementBy: By) {
        await this.driver.wait(until.elementLocated(elementBy));
        let price = await (await this.driver.findElement(elementBy)
        .getText())
        .split(",")
        .join("")
        .substr(1, 6);
        return price;
    }

    /**
     * Ths will find the downpayment input, clear its contents and set a specified amount using numbers only.
     * @param amount 
     * @example await page.setDownpayment(9000);
     */
    async setDownpayment(amount: number) {
      let input = await this.driver.findElement(this.downpayment);
      await this.driver.wait(until.elementIsEnabled(input));
      await input.clear();
      await input.sendKeys(`${amount}\n`);

    }

    /**
     * This will get the value of the attribute to get the amount due at signing. 
     * Before returning, the string is split at the comma and joined with an empty
     * space. The "$" will not be included in the string.
     * The amount due at signing is composed of the downpayment, 
     * first month's payment and an acquisition fee of $695.
     * @returns the amount due at signing
     * @example await page.getAmountDue();
     */
    async getAmountDue() {
      await this.driver.wait(until.elementLocated(this.amountSigning));
      let amount = await (await this.driver.findElement(this.amountSigning)
      .getAttribute("value"))
      .split(",")
      .join("")
      .substr(1,6);
      return amount;

    }

    /**
     * This will simply get the text of the lease payments.
     * @returns the monthly lease payments in string form 
     * like this example: "$1045 / mo"
     * @example await page.getLeasePayment();
     */
    async getLeasePayment() {
      await this.driver.wait(until.elementLocated(this.leasePayment));
      let amount = await (await this.driver.findElement(this.leasePayment)
      .getText())
      return amount;
    }

    async sendKeys(elementBy: By, keys) {
        await this.driver.wait(until.elementLocated(elementBy));
        return this.driver.findElement(elementBy).sendKeys(keys);
    }

    async getText(elementBy: By) {
        await this.driver.wait(until.elementLocated(elementBy));
        return (await this.driver.findElement(elementBy)).getText();
    }

    async click(elementBy: By) {
        await this.driver.wait(until.elementLocated(elementBy));
        return this.driver.findElement(elementBy).click();
    }

   /**
   * Will take a screenshot and save it to the filepath/filename provided.
   * Automatically saves as a .png file.
   * @param {string} filepath - the filepath relative to the project's base folder where you want the screenshot saved
   * @example
   * page.takeScreenshot("myFolder/mypic")
   * //picture saves in "myFolder" as "mypic.png"
   */
  async takeScreenshot(filepath: string) {
    fs.writeFile(
      `${filepath}.png`,
      await this.driver.takeScreenshot(),
      "base64",
      (e) => {
        if (e) console.log(e);
        else console.log("screenshot saved successfully");
      }
    );
  }
}