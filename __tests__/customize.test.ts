import { Tesla } from "../src/Tesla";
import { WebDriver, Builder, Capabilities, Key } from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

const page = new Tesla(driver);
const actions = driver.actions();

describe("Tesla Model X Customization", () => {
  it("knows that the base model price is less than the upgraded price", async () => {
    await page.navigate();

    await page.click(page.modelXButton);
    await driver.sleep(2000);
  
    await page.click(page.orderNowButton);
    await driver.sleep(2000);
  
    await page.click(page.purchasePriceButton);
    await driver.sleep(1000);
  
    let baseModelPrice = await parseInt(await page.getPrice(page.basePrice));
    console.log(baseModelPrice);
  
    await page.click(page.plaid);
    await driver.sleep(2000);
  
    await actions.sendKeys(Key.PAGE_DOWN).perform();
    await driver.sleep(1000);
  
    await page.click(page.solidBlack);
    await driver.sleep(2000);
  
    await page.click(page.gallery);
  
    await actions
    .keyDown(Key.ARROW_DOWN)
    .pause()
    .pause()
    .pause()
    .keyUp(Key.ARROW_DOWN)
    .perform();
    await driver.sleep(1000);
  
    await page.click(page.turbineWheels);
    await driver.sleep(2000);
  
    await page.click(page.whiteInterior);
    await driver.sleep(2000);
  
    await page.click(page.sevenSeats);
    await driver.sleep(2000);
  
    await page.click(page.gallery);
  
    await actions.sendKeys(Key.PAGE_DOWN).perform();
    await driver.sleep(1000);
  
    await page.click(page.selfDriving);
    await driver.sleep(2000);
  
    let finalModelPrice = await parseInt(await page.getPrice(page.finalPrice));
    console.log(finalModelPrice);

    expect(baseModelPrice).toBeLessThan(finalModelPrice);
  });

})

afterAll(async () => {
  await driver.quit();
});