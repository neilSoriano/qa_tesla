import { ModelS } from "../src/ModelS";
import { WebDriver, Builder, Capabilities, Key, By, until, Actions } from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

const page = new ModelS(driver);

describe("Financing a Tesla", () => {
  it("can lease a Tesla Model S with a downpayment of $11,000", async () => {
    await driver.manage().window().maximize();
    await page.navigate();

    await page.click(page.modelSButton);
    await driver.sleep(2000);
    await page.click(page.orderNowButton);
    await driver.sleep(2000);

    await page.click(page.priceFooter);
    await driver.sleep(2000);

    await page.click(page.leaseTab);
    await driver.sleep(2000);
    // await page.takeScreenshot("screenshots/lease_default_values");

    await page.setDownpayment(11000);
    await driver.sleep(2000);

    await page.click(page.twelveKMiles);
    await driver.sleep(2000);
    // await page.takeScreenshot("screenshots/lease_details");

    let amtDue = await parseInt(await page.getAmountDue());
    await driver.sleep(2000);

    let leaseAmt = await page.getLeasePayment();
    await driver.sleep(2000);

    expect(amtDue).toEqual(12774);
    expect(leaseAmt).toBe("$1,079 /mo")


  });
})

afterAll(async () => {
  await driver.quit();
});