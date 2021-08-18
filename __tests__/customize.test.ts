import { Tesla } from "../src/Tesla";
import { WebDriver, Builder, Capabilities, By, until } from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

const page = new Tesla(driver);