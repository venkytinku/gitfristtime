import { BeforeAll, AfterAll, After, Before, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { pageFixture } from "../hooks/pageFixture";
import { TestData1, TestData2, TestData3 } from '../Files/TestData.json'

let page: Page;
let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {

    browser = await chromium.launch({
        headless: false,
        args: ["--start-maximized"],
    });

    console.log("BeforeAll")

});

Before(async function () {

    context = await browser.newContext({
        recordVideo: { dir: 'test-result/videos' },
        viewport: null
    });

    page = await context.newPage();

    pageFixture.page = page

    console.log("Before")
});

After(async function ({ pickle, result }) {

    if (result?.status === Status.FAILED) {
        // Screenshots are saved in the directory after the test is completed for each scenario
        const img = await pageFixture.page.screenshot({ path: `./test-result/ScreenshotsFailed/${pickle.name}.png` });

        await this.attach(img, 'image/png');

        // Attach video on failure (if enabled in Playwright config)
        const videoPath = await page.video()?.path();
        
        if (videoPath) {
            this.attach(videoPath, 'video/webm');
        }
    }
    else if (result?.status === Status.PASSED) {
        const img = await pageFixture.page.screenshot({ path: `./test-result/ScreenshotsPassed/${pickle.name}.png` });

        await this.attach(img, 'imagepasssed/png');

        const videoPath = await page.video()?.path();

        if (videoPath) {
            this.attach(videoPath, 'video/webm');
        }
    }
    console.log("after")
});

AfterAll(async function () {

    //close
    await page.close();

    //browser.close/context.close 
    await browser.close();

    console.log("afterAll")

    console.log("==============================")
});


Then('i close the browser in hooks', async function () {

    //await browser.close()
});

Then('I Verify test data reading from the test data json file', async function () {

    await pageFixture.page.getByPlaceholder("Enter Name").fill(TestData1.Name)

    await pageFixture.page.getByPlaceholder("Enter EMail").fill(TestData1.Email)

    await pageFixture.page.locator("#phone").fill(TestData1.Phone)

    await pageFixture.page.locator("#textarea").fill(TestData1.Address)

    await pageFixture.page.locator(".wikipedia-search-input").fill(TestData1.Wikipedia)

    await pageFixture.page.locator(".wikipedia-search-button").click()
});

Then('I Verify test data reading from the test data json file2', async function () {

    await pageFixture.page.getByPlaceholder("Enter Name").fill(TestData2.Name)

    await pageFixture.page.getByPlaceholder("Enter EMail").fill(TestData2.Email)

    await pageFixture.page.locator("#phone").fill(TestData2.Phone)

    await pageFixture.page.locator("#textarea").fill(TestData2.Address)

    await pageFixture.page.locator(".wikipedia-search-input").fill(TestData2.Wikipedia)

    await pageFixture.page.locator(".wikipedia-search-button").click()
});

Then('I Verify test data reading from the test data json file3', async function () {

    await pageFixture.page.getByPlaceholder("Enter Name").fill(TestData3.Name)

    await pageFixture.page.getByPlaceholder("Enter EMail").fill(TestData3.Email)

    await pageFixture.page.locator("#phone").fill(TestData3.Phone)

    await pageFixture.page.locator("#textarea").fill(TestData3.Address)

    await pageFixture.page.locator(".wikipedia-search-input").fill(TestData3.Wikipedia)

    await pageFixture.page.locator(".wikipedia-search-button").click()
});

Then('I Verify test data reading from the feature file {string},{string},{string},{string},{string},{string}', async function (Name, Email, Phone, Address, Wikipedia,  errormessgae) {

    await pageFixture.page.getByPlaceholder("Enter Name").fill(Name)

    await pageFixture.page.getByPlaceholder("Enter EMail").fill(Email)

    await pageFixture.page.locator("#phone").fill(Phone)

    await pageFixture.page.locator("#textarea").fill(Address)

    await pageFixture.page.locator(".wikipedia-search-input").fill(Wikipedia)

    await pageFixture.page.locator(".wikipedia-search-button").click()

    //await expect(page.locator("sayali")).toHaveText(errormessgae)
});

Then('I Verify test data reading from the feature file1 {string},{string}', async function (username,password) {

   await pageFixture.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    await pageFixture.page.locator("//*[@name='username']").fill(username)

    await pageFixture.page.locator("//*[@name='password']").fill(password)

    await pageFixture.page.locator("//*[@type='submit']").click()
});

Then('I launch the test automation practice hooks', async function () {

    await page.goto("https://testautomationpractice.blogspot.com/")

});