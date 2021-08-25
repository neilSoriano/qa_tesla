import { By, until, WebDriver } from "selenium-webdriver";

const fs = require("fs");

export class Locations {
    driver: WebDriver;
    url: string = "https://www.tesla.com/"

    // locator for Tesla logo (home button)
    teslaLogo: By = By.xpath("//a[@aria-label='Tesla Logo']");

    // locator for Menu button
    menuButton: By = By.xpath("//span[contains(text(), 'Menu')]");

    //locator for Find Us button
    findUsButton: By = By.xpath("//span[contains(text(), 'Find Us')]");

    // locator for search bar
    searchBar: By = By.id("pac-input");

    // locator for map
    map: By = By.className("map_container");

    // locator for store and galleries filter
    storesAndGallleries: By = By.xpath("(//span[contains(text(), 'Stores and Galleries')])[1]");

    // locator for service filter
    service: By = By.xpath("(//span[contains(text(), 'Service')])[1]");

    // locator for destination charging filter
    destCharging: By = By.xpath("(//span[contains(text(), 'Destination Charging')])[1]");

    // locator for body shops filter
    bodyShops: By = By.xpath("(//i[@class='filter-icon tsla-icon-shop-circle'])[1]")

    // locator for card header labeled "Supercharger"
    cardHeader: By = By.xpath("(//h4[@class='card-type_header'][1])[2]");



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