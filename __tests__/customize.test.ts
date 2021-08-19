import { Tesla } from "../src/Tesla";
import { WebDriver, Builder, Capabilities, By, until, Key } from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

const page = new Tesla(driver);
const actions = driver.actions();

test("Tesla Model X Customization", async () => {
  await page.navigate();

  await page.click(page.modelXButton);
  await driver.sleep(2000);

  await page.click(page.orderNowButton);
  await driver.sleep(2000);

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

  await actions.sendKeys(Key.PAGE_DOWN).perform();
  await actions.sendKeys(Key.PAGE_DOWN).perform();
  await driver.sleep(1000);

  await page.click(page.selfDriving);
  await driver.sleep(2000);

})

// afterAll(async () => {
//   await driver.quit();
// });