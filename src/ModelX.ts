import { By, until, WebDriver } from "selenium-webdriver";

const fs = require("fs");

export class ModelX {
    driver: WebDriver;
    url: string = "https://www.tesla.com/"

    // locator for Tesla logo (home button)
    teslaLogo: By = By.xpath("//a[@aria-label='Tesla Logo']");

    //locator for model x button in drop down menu
    modelXButton: By = By.xpath("//a[@href='/modelx']");

    // locator for order now button on model x page
    orderNowButton: By = By.xpath("(//a[@data-gtm-interaction='order now'])[1]");

    // locator for purchase price tab
    purchasePriceButton: By = By.id("purchase_price-tab");

    // locator for base price
    basePrice: By = By.xpath("//span[contains(text(), '$99,990')]");

    // locator for final price
    finalPrice: By = By.xpath("//span[contains(text(), '$142,490')]");

    // locator for gallery
    gallery: By = By.className("cf-asset-wrapper");

    // locator for plaid option button
    plaid: By = By.xpath("//label[@for='$MTX11-Plaid']");

    // locator for black paint option
    solidBlack: By = By.css("label[for='PAINT_$PBSB']");

    // locator for turbine wheels
    turbineWheels: By = By.xpath("//label[@for='WHEELS_$WX20']");

    // locator for black and white interior
    whiteInterior: By = By.css("label[for='INTERIOR_PACKAGE_$IWC00']");

    // locator for seven seats
    sevenSeats: By = By.xpath("//div[@data-id='$CC04']");

    // locator for add button for self driving capability
    selfDriving: By = By.xpath('//button[@aria-label="Select Option - Full Self-Driving Capability - $10,000"]');


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