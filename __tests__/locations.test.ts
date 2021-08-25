import { Locations } from "../src/Locations";
import { WebDriver, Key, Builder, Capabilities } from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

const page = new Locations(driver);
const actions = driver.actions();

describe("Finding Tesla locations near me", () => {
  it("can find the nearest supercharger in the El Segundo area", async () => {
    await driver.manage().window().maximize();
    await page.navigate();

    await page.click(page.menuButton);
    await driver.sleep(2000);
    await page.click(page.findUsButton);
    await driver.sleep(2000);

    // await page.takeScreenshot("screenshots/google_maps");

    await page.click(page.searchBar);
    await driver.findElement(page.searchBar).sendKeys("El Segundo")
    await driver.sleep(2000);

    // await page.takeScreenshot("screenshots/search_recommendations");

    await actions
    .sendKeys(Key.ARROW_DOWN)
    .sendKeys(Key.RETURN)
    .perform();
    await driver.sleep(2000);

    // await page.takeScreenshot("screenshots/elsegundo_area");

    await page.click(page.storesAndGallleries);
    await driver.sleep(2000);
    await page.click(page.service);
    await driver.sleep(2000);
    await page.click(page.destCharging);
    await driver.sleep(2000);
    await page.click(page.bodyShops);
    await driver.sleep(2000);

    // await page.takeScreenshot("screenshots/selected_filters");

    await actions.move({
      x: 68, 
      y: 22, 
      origin: driver.findElement(page.map)})
      .click()
      .perform();

    await driver.sleep(3000);

    // await page.takeScreenshot("screenshots/filter_bug");

    await page.click(page.bodyShops);
    await driver.sleep(2000);

    // await page.takeScreenshot("screenshots/supercharger");

    expect(await driver.findElement(page.cardHeader).getText()).not.toBe("Destination Charging");
    // console.log(await driver.findElement(page.cardHeader).getText());
    expect(await driver.findElement(page.cardHeader).getText()).toBe("Supercharger");

  })
  
})

afterAll(async () => {
  await driver.quit();
});