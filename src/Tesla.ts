import { Actions, By, Key, until, WebDriver } from "selenium-webdriver";

export class Tesla {
    driver: WebDriver;
    url: string = "https://www.tesla.com/"

    // locator for Tesla logo (home button)
    teslaLogo: By = By.xpath("//a[@aria-label='Tesla Logo']");

    // locator for menu button
    // menuButton: By = By.xpath("//button[@class='tds-site-nav-item tds--highlighted tds-site-header-menu-link']");

    //locator for model x button in drop down menu
    modelXButton: By = By.xpath("//a[@href='/modelx']");

    // locator for order now button on model x page
    orderNowButton: By = By.xpath("(//a[@data-gtm-interaction='order now'])[1]");

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
    sevenSeats: By = By.xpath('//div[@aria-label="Seven Seats"]');
    
    // locator for add button for self driving capability
    selfDriving: By = By.xpath('//button[@aria-label="Select Option - Full Self-Driving Capability - $10,000"]');



    constructor(driver: WebDriver) {
        this.driver = driver;
    }

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
}