import { Given, setDefaultTimeout, Then } from '@cucumber/cucumber';
import { loadEnvFile } from 'node:process';
import { toASCII } from 'node:punycode';
import { Browser, chromium, expect, firefox, Page, webkit } from 'playwright/test';

import { TestData1, TestData2, TestData3 } from '../Files/TestData.json'

let browser: Browser, page: Page, page1: Page

setDefaultTimeout: (60 * 1000)

let file1 = "./test-result/screenshots/fullpagescreenshot.jpg"

Given('I launch the browser', async function () {

    console.log('I launch the browser')

    // to launch the browser

    browser = await chromium.launch({

        headless: false,

        args: ['--start-maximized']
    })

    const context = await browser.newContext({ viewport: null })

    page = await context.newPage()

});

Given('I launch the firefox browser', async function () {

    console.log('I launch the firefox browser')

    browser = await firefox.launch({

        headless: false,

        args: ['--start-maximized']
    })

    const context = await browser.newContext({ viewport: null })

    page = await context.newPage()

});

Given('I launch the webkit browser', async function () {

    console.log('I launch the webkit browser')

    browser = await webkit.launch({

        headless: false,

        args: ['--start-maximized']
    })

    const context = await browser.newContext({ viewport: null })

    page = await context.newPage()

});

Given('I launch the headless browser', async function () {

    console.log('I launch the headless browser')

    browser = await chromium.launch({

        headless: true,

        args: ['--start-maximized']
    })

    const context = await browser.newContext({ viewport: null })

    page = await context.newPage()

});


Then('I launch the facebook', async function () {

    await page.goto("https://www.facebook.com/")
});


Then('I close the browser', async function () {

    await page.close()
});

Then('I launch the test automation practice', async function () {

    await page.goto("https://testautomationpractice.blogspot.com/")

});

Then('I Verify Playwright Locators', async function () {

    await page.goto("https://testautomationpractice.blogspot.com/")


    //Await page.getByPlaceholder(“attribute value of the placeholder attribute name”).methods()

    console.log("====================getByPlaceholder====================")

    await page.getByPlaceholder("Enter Name").fill("Quality")

    await page.getByPlaceholder("Enter EMail").fill("test@gmail.com")

    console.log("====================getByText====================")

    await page.getByText("START").click()

    await page.getByText("STOP").click()

    console.log("====================getByRole====================")

    await page.getByRole('button', { name: 'START' }).click()

    await page.getByRole('button', { name: 'STOP' }).click()

    await page.getByRole('checkbox', { name: 'Sunday' }).scrollIntoViewIfNeeded()

    await page.getByRole('checkbox', { name: 'Sunday' }).click()

    await page.getByRole('checkbox', { name: 'Monday' }).click()

    await page.getByRole('checkbox', { name: 'Tuesday' }).click()

    await page.getByPlaceholder("Enter Name").scrollIntoViewIfNeeded()

    //

});

Then('I launch the parabank', async function () {

    await page.goto("https://parabank.parasoft.com/parabank/index.htm")
});

Then('I Verify Playwright Locators1', async function () {

    console.log("====================getByAltText====================")

    await page.getByAltText("ParaBank").click()

    console.log("====================getByTitle====================")

    await page.getByTitle("ParaBank").click()

    await page.goto("https://login.salesforce.com/")

    console.log("====================getByLabel====================")

    await page.getByLabel("Username").fill("bhavani")

    await page.getByLabel("Password").fill("dhanasekhar")
});

Then('I Verify xpath and css selectors', async function () {

    console.log("====================xpath====================")

    console.log("====================absolutexpath====================")

    //Await page.locator(‘absolutexpath’).methods()

    //await page.locator("/html/body/div[4]/div[2]/div[2]/div[2]/div[2]/div[2]/div[2]/div/div[4]/div[1]/div/div/div[1]/div[1]/div/div/div/div/div[2]/div[1]/input[1]").fill("Ajay")

    console.log("====================Relativexpath====================")

    await page.locator("//input[@id='name']").fill("Ajay")

    await page.locator("//*[@id='email']").fill("Ajay@gmail.com")

    console.log("====================css Selector====================")

    await page.locator("input[id='name']").type("testing")

    // # means id in css Selector

    await page.locator("#phone").fill("8908900989")

    // . means class in css Selector

    await page.locator(".wikipedia-search-input").fill("playwright")

});


Then('I Verify xpath methods', async function () {

    console.log("====================Relativexpath====================")

    console.log("====================contains====================")

    await page.locator("//input[contains(@id,'female')]").click()

    await page.locator("//*[contains(@id,'sunday')]").click()

    await page.locator("//*[contains(@id,'textarea')]").fill("hyderabad")

    console.log("====================starts-with====================")

    await page.locator("//input[starts-with(@id,'male')]").click()

    await page.locator("//*[starts-with(@id,'monday')]").click()

    await page.locator("//*[starts-with(@id,'textarea')]").fill("chennai")

    console.log("====================Text===================")

    var text = await page.locator("//h2[text()='Alerts & Popups']").innerText()

    console.log("1st way of text is:", text)

    text = await page.locator("//*[text()='Alerts & Popups']").innerText()

    console.log("2nd way of text is:", text)

    text = await page.locator("//*[contains(text(),'Alerts & Popups')]").innerHTML()

    console.log("3rd way of text is:", text)

    text = await page.locator("//*[starts-with(text(),'Alerts & Popups')]").innerHTML()

    console.log("4th way of text is:", text)

    /*1st way of text is: Alerts & Popups
2nd way of text is: Alerts & Popups
3rd way of text is: Alerts &amp; Popups
4th way of text is: Alerts &amp; Popups*/

    console.log("====================And===================")

    await page.locator("//input[@type='text'and @id='name']").fill("quality")

    await page.locator("//*[@type='text' and contains(@id,'name')]").type("testing")

    console.log("====================or===================")

    var orElements = await page.locator("//*[@type='text' or contains(@id,'name')]").all()

    console.log(orElements.length) //13

});

Then('I Verify xpath relative Axes', async function () {

    console.log("====================Relativexpath====================")

    console.log("====================parent====================")

    var parentElements = await page.locator("//*[contains(@id,'name')]//parent::div").all()

    console.log("parentElements count is:", parentElements.length) //parentElements count is : 1

    console.log("====================ancestor====================")

    var ancestorElements = await page.locator("//*[contains(@id,'name')]//ancestor::div").all()

    console.log("ancestorElements count is:", ancestorElements.length) //ancestorElements count is : 20

    console.log("====================preceding====================")

    var precedingElements = await page.locator("//*[contains(@id,'name')]//preceding::div").all()

    console.log("precedingElements count is:", precedingElements.length) //precedingElements count is : 94

    console.log("====================child====================")

    var childElements = await page.locator("//div[@class='form-group']//child::input[@type='text']").all()

    console.log("childElements count is:", childElements.length) //childElements count is : 3

    await page.locator("//div[@class='form-group']//child::input[@type='text']").first().fill("leela")

    console.log("====================descendant====================")

    var descendantElements = await page.locator("//div[@class='form-group']//descendant::input[@type='text']").all()

    console.log("descendantElements count is:", descendantElements.length) //descendantElements count is :3

    await page.locator("//div[@class='form-group']//descendant::input[@type='text']").last().fill("8908908900")

    console.log("====================following====================")

    var followingElements = await page.locator("//div[@class='form-group']//following::input").all()

    console.log("followingElements count is:", followingElements.length) //followingElements count is :32

    console.log("====================followingSibling====================")

    var followingSiblingElements = await page.locator("//*[@id='field1']//following-sibling::br").all()

    console.log("followingSiblingElements count is:", followingSiblingElements.length) //followingSiblingElements count is :3

    followingSiblingElements = await page.locator("//*[@id='field1']//following-sibling::input").all()

    console.log("followingSiblingElements count is:", followingSiblingElements.length)  //followingSiblingElements count is :1

    await page.locator("//*[@id='field1']//following-sibling::input").fill("Divine")

    console.log("====================css selector====================")

    console.log("====================contains====================")

    //input[id* ='female']

    await page.locator("input[id*='female']").click()

    console.log("====================starts-with====================")

    //input[id^ ='male'] 

    await page.locator("input[id^='tuesday'] ").click()
});


Then('I Verify Playwright Methods part1', async function () {

    console.log("==========to reload the page===============")

    await page.reload()

    console.log("==========to click the web element in the page===============")

    await page.getByText('New Tab').click()

    console.log("==========to go to previous page===============")

    await page.bringToFront()

    await page.locator("#Wikipedia1_wikipedia-search-input").fill("leela")

    console.log("==========to enter text to the textbox==============")

    await page.getByPlaceholder("Enter Name").fill("Friday")

    await page.getByPlaceholder("Enter EMail").type("Friday@gmail.com")

    console.log("====================to get more than one webe element at a time====================")

    var elements = await page.locator("//*[@type='text']").all()

    console.log("elements count is:", elements.length) //elements count is :13

    elements = await page.locator("//*[@id='field1']//following-sibling::input").all()

    console.log("followingSiblingElements count is:", elements.length)  //followingSiblingElements count is :1

    await page.locator("//*[@id='field1']//following-sibling::input").fill("Divine")

    console.log("====================to get the title of the web page====================")

    //1st way

    var titleOfTheWebPage = await page.title()

    console.log("1st way is:", titleOfTheWebPage) //1st way is: Automation Testing Practice

    //2nd way

    console.log("2nd way is ", await page.title()) //2nd way is: Automation Testing Practice

    console.log("====================to get the url of the web page====================")

    //1st way

    var url = await page.url()

    console.log("1st way is:", url) //1st way is: https://testautomationpractice.blogspot.com/

    //2nd way

    console.log("2nd way is ", await page.url()) //2nd way is: https://testautomationpractice.blogspot.com/

    console.log("====================to scroll to the respective web element====================")

    await page.locator("#field1").scrollIntoViewIfNeeded()

    console.log("====================to clear the text of the web element====================")

    await page.locator("#field1").clear()

    await page.locator("#field1").fill("Ranjith")

    console.log("====================to read the Text of a web element===================")

    var text = await page.locator("//h2[text()='Alerts & Popups']").innerText()

    console.log("1st way of text is:", text)

    text = await page.locator("//*[text()='Alerts & Popups']").innerText()

    console.log("2nd way of text is:", text)

    text = await page.locator("//*[contains(text(),'Alerts & Popups')]").innerHTML()

    console.log("3rd way of text is:", text)

    text = await page.locator("//*[starts-with(text(),'Alerts & Popups')]").innerHTML()

    console.log("4th way of text is:", text)

    /*1st way of text is: Alerts & Popups
2nd way of text is: Alerts & Popups
3rd way of text is: Alerts &amp; Popups
4th way of text is: Alerts &amp; Popups*/

    console.log("====================to read the Text for more than one web element 1st way===================")

    var webElementsCount = await page.locator("//*[@class='title']").allInnerTexts()

    console.log("webElementsCount in 1st way is :", webElementsCount.length) //webElememtsCount in 1st way is : 17

    console.log("===================for loop===========")

    for (var i = 0; i < webElementsCount.length; i++) {

        console.log(webElementsCount[i])
    }

    /*Automation Testing Practice
Upload Files
Dynamic Web Table
Pagination Web Table
Tabs
Dynamic Button
Alerts & Popups
Mouse Hover
Double Click
Drag and Drop
Slider
SVG Elements
Scrolling DropDown
Labels And Links
Form
ShadowDOM*/

    console.log("====================to read the Text for more than one web element 2nd way===================")

    var webElementsCount = await page.locator("//*[@class='title']").allTextContents()

    console.log("webElementsCount in 2nd way is :", webElementsCount.length) //webElememtsCount in 1st way is : 17

    console.log("===================for loop===========")

    for (var i = 0; i < webElementsCount.length; i++) {

        console.log(webElementsCount[i])
    }

    /*Automation Testing Practice
Upload Files
Dynamic Web Table
Pagination Web Table
Tabs
Dynamic Button
Alerts & Popups
Mouse Hover
Double Click
Drag and Drop
Slider
SVG Elements
Scrolling DropDown
Labels And Links
Form
ShadowDOM*/

    console.log("====================to right click on the web element ===================")

    await page.getByText("START").click({ button: 'right' })

});

Then('I Verify Playwright Methods part2', async function () {

    console.log("==========hidden===============")

    let hidden = await page.locator("#female").isHidden()

    console.log("hidden status is:", hidden) //false

    if (hidden == false) {

        await page.locator("#female").click()
    }

    console.log("==========visible===============")

    let visible = await page.locator("#sunday").isVisible()

    console.log("visible status is:", visible) //true

    if (visible == true) {

        await page.locator("#sunday").click()
    }

    console.log("==========disabled===============")

    let disabled = await page.locator("#monday").isDisabled()

    console.log("disabled status is:", disabled) //false

    if (disabled == false) {

        await page.locator("#monday").click()
    }

    console.log("==========enabled===============")

    let enabled = await page.locator("#tuesday").isEnabled()

    console.log("enabled status is:", enabled) //true

    if (enabled == true) {

        await page.locator("#tuesday").click()
    }

    console.log("==========editable===============")

    let editable = await page.locator("#textarea").isEditable()

    console.log("editable status is:", editable) //true

    if (editable == true) {

        await page.locator("#textarea").fill("hi everyone good morning")
    }

    console.log("==========checked===============")

    let checked = await page.locator("#saturday").isChecked()

    console.log("checked status is:", checked) //false

    if (checked == false) {

        //1st way

        //await page.locator("#saturday").click()

        //2nd way

        await page.locator("#saturday").setChecked(true)

        checked = await page.locator("#saturday").isChecked()

        console.log("checked status is:", checked) //true
    }

    if (checked == true) {

        //1st way

        // await page.locator("#saturday").click()

        //2nd way

        // await page.locator("#saturday").setChecked(false)

        // checked = await page.locator("#saturday").isChecked()

        // console.log("checked status is:", checked) //false

        //3rd way

        await page.locator("#saturday").uncheck()

        checked = await page.locator("#saturday").isChecked()

        console.log("checked status is:", checked) //false
    }
});

Then('I Verify Playwright Methods part3', async function () {

    // await page.goto("https://www.myntra.com/")

    // console.log("======================mouse hover===================")

    // await page.locator("//*[text()='Home']").first().hover()

    // console.log("======================highlight===================")

    // await page.getByPlaceholder("Search for products, brands and more").highlight()

    // await page.getByPlaceholder("Search for products, brands and more").fill("Home")

    // console.log("======================get Attribute===================")

    // var attributeValue = await page.getByPlaceholder("Search for products, brands and more").getAttribute("placeholder")

    // console.log("attributeValue of placeholder is :", attributeValue) //attributeValue of placeholder is : Search for products, brands and more

    // attributeValue = await page.getByPlaceholder("Search for products, brands and more").getAttribute("class")

    // console.log("attributeValue of class is :", attributeValue) //attributeValue of class is : desktop-searchBar

    // attributeValue = await page.getByPlaceholder("Search for products, brands and more").getAttribute("data-reactid")

    // console.log("attributeValue of data-reactid is :", attributeValue) //attributeValue of data-reactid is : 1039

    await page.locator("#field1").scrollIntoViewIfNeeded()

    console.log("==================1st way to enter the text in the textbox=========")

    await page.locator("#field1").clear()

    await page.locator("#field1").type("quality")

    console.log("==================2nd way to enter the text in the textbox=========")

    await page.locator("#field1").fill(" ")

    await page.locator("#field1").type("online")

    console.log("==================3rd way to enter the text in the textbox=========")

    await page.locator("#field1").press("Control+A")

    await page.keyboard.press("Delete")

    await page.keyboard.up("Control")

    await page.keyboard.insertText("Ranjith")

    console.log("==================4th way to enter the text in the textbox=========")

    await page.locator("#field1").clear()

    await page.locator("#field1").fill("hi everyone")

    //pressSequentially method will behave same like a type method that means it will concat new value with the old value

    await page.locator("#field1").pressSequentially("Saturday")

    console.log("==================drag and drop==============")

    const one = await page.locator("#draggable")

    const two = await page.locator("#droppable")

    await one.scrollIntoViewIfNeeded()

    await one.dragTo(two)
});

Then('I Verify Playwright Methods part4', async function () {

    var colorDropdown = await page.locator("#colors")

    await colorDropdown.scrollIntoViewIfNeeded()

    await colorDropdown.selectOption("Red")

    await colorDropdown.selectOption("Blue")

    await colorDropdown.selectOption("Yellow")

    await colorDropdown.selectOption(["Red", "Green", "Yellow"])

    /* class work

    1) perform dropdown selection for the Sorted List dropdown

 2) store all options  in Sorted List dropdown in a tuple or array

 3) using inner texts methos and by using loops and if condition you need to sleect the option */

    await page.locator("//*[@id='country']").click()

    var count = await page.locator("//*[@id='country']/option").allInnerTexts()

    for (let i = 0; i < count.length; i++) {

        var countryName = await page.locator("//*[@id='country']/option").nth(i).getAttribute('value')

        console.log("countryName is :", countryName)

        if (countryName == 'india') {

            await page.locator("//*[@id='country']").selectOption({ index: 9 })
        }

    }


    console.log("====================nth===============")

    await page.locator("//*[@type='text']").first().fill("divine")

    await page.locator("//*[@type='text']").last().fill("last web element")

    await page.locator("//*[@type='text']").nth(5).fill("divine")

    await page.locator("//*[@type='text']").nth(9).fill("divine")

    console.log("====================screenshots===============")

    console.log("====================1st way to take the screenshot for the web element only===============")

    await page.locator("//*[@type='text']").first().scrollIntoViewIfNeeded()

    await page.locator("//*[@type='text']").first().fill("Aniket")

    await page.getByPlaceholder("Enter Name").highlight()

    await page.getByPlaceholder("Enter Name").screenshot({ path: 'WebelementScreenshot.png' })

    console.log("====================2nd way to take the screenshot upyo screenlength===============")

    await page.screenshot({ path: 'uptoscreenlength.jpg' })

    console.log("====================3rd way to take the screenshot of a full page===============")

    await page.screenshot({ path: "fullpagescreenshot.jpg", fullPage: true })

    console.log("====================screenshot storage on a folder level===============")

    await page.screenshot({ path: './test-result/screenshots/fullpagescreenshot.jpg', fullPage: true })

    // not working methods

    await page.goForward()

    await page.goBack()
});

Then('I Verify Playwright dates using typescript code', async function () {

    const todaysDate = new Date()

    console.log("todaysDate is:", todaysDate) //: 2026-01-03T02:57:36.925Z

    const localDate = todaysDate.toLocaleDateString()

    console.log("localDate is:", localDate) //localDate is: 3/1/2026

    const yesterdaysDate = new Date(todaysDate)

    yesterdaysDate.setDate(todaysDate.getDate() - 1)

    console.log(yesterdaysDate.toLocaleDateString()) // 2/1/2026

    const futureDate = new Date(todaysDate)

    futureDate.setDate(todaysDate.getDate() + 5)

    console.log(futureDate.toLocaleDateString()) // 8/1/2026

    await page.locator("#datepicker").scrollIntoViewIfNeeded()

    await page.locator("#datepicker").fill(futureDate.toLocaleDateString())

    const year = todaysDate.getFullYear()

    const month = (todaysDate.getMonth() + 1).toString()

    const day = todaysDate.getDate()

    await page.locator("#datepicker").fill(month + "/" + day + "/" + year)

    await page.locator("#datepicker").fill(year + "/" + month + "/" + day)

    const completeMonthName = todaysDate.toLocaleDateString('en-us', { month: "long" })

    console.log("completeMonthName is ", completeMonthName) //completeMonthName is  January

    const shortMonthName = todaysDate.toLocaleDateString('en-us', { month: "short" })

    console.log("shortMonthName is ", shortMonthName) //shortMonthName is  Jan
});

Then('I Verify Playwright web table static way', async function () {

    let webTable = await page.locator("//table[@name='BookTable']").isVisible()

    if (webTable == true) {

        console.log("web table is displayed in the web page")

        let expectedText = "Animesh"

        let actualText = await page.locator("//table[@name='BookTable']/tbody/tr[4]/td[2]").innerText()

        if (actualText == expectedText) {

            console.log(expectedText, "is displayed in the web page")
        }
        else {

            console.log(expectedText, "is not displayed in the web page")
        }
    }
    else {

        console.log("web table is not displayed in the web page")
    }
});

Then('I Verify Playwright web table static way2', async function () {

    let webTable = await page.locator("//table[@name='BookTable']").isVisible()

    if (webTable == true) {

        console.log("web table is displayed in the web page") //web table is displayed in the web page

        let expectedText = "Java"

        let actualText = await page.locator("//table[@name='BookTable']/tbody/tr[4]/td[2]").innerText()

        if (actualText == expectedText) {

            console.log(expectedText, "is displayed in the web page")
        }
        else {

            console.log(expectedText, "is not displayed in the web page") // java is not displayed in the web page
        }
    }
    else {

        console.log("web table is not displayed in the web page")
    }
});

Then('I Verify Playwright web table dynamic way', async function () {

    let webTable = await page.locator("//table[@name='BookTable']").isVisible()

    if (webTable == true) {

        console.log("web table is displayed in the web page") //web table is displayed in the web page

        await await page.locator("//table[@name='BookTable']").scrollIntoViewIfNeeded()

        let rows = await page.locator("//table[@name='BookTable']/tbody/tr").all()

        if (rows.length > 0) {

            for (let i = 2; i <= rows.length; i++) {

                let columns = await page.locator("//table[@name='BookTable']/tbody/tr[" + i + "]/td").all()

                if (columns.length > 0) {

                    for (let j = 1; j <= columns.length; j++) {

                        let expectedText = "Java"

                        let actualText = await page.locator("//table[@name='BookTable']/tbody/tr[" + i + "]/td[" + j + "]").innerText()

                        console.log("===========equals method=========")

                        if (actualText == expectedText) {

                            console.log(expectedText, "is displayed in the web page on the row no :" + i + " and column number is:", j)
                        }
                        console.log("===========contains method=========")

                        if (actualText.includes(expectedText)) {

                            console.log(expectedText, "is displayed in the web page on the row no :" + i + " and column number is:", j)
                        }
                    }

                } else {

                    console.log(" the web table doesn't have columns")
                }
            }

        }
        else {

            console.log(" the web table doesn't have rows")
        }


    }
    else {

        console.log("web table is not displayed in the web page")
    }
});

Then('I Verify Playwright web calendar static way', async function () {

    await page.locator("#datepicker").scrollIntoViewIfNeeded()

    await page.locator("#datepicker").click()

    let webCalendar = await page.locator(".ui-datepicker-calendar").isVisible()

    if (webCalendar == true) {

        console.log("web Calendar is displayed in the web page")

        let expectedDate = "28"

        let actualDateText = await page.locator("//*[@class='ui-datepicker-calendar']/tbody/tr[5]/td[4]").innerText()

        let actualDate = await page.locator("//*[@class='ui-datepicker-calendar']/tbody/tr[5]/td[4]")

        if (actualDateText == expectedDate) {

            console.log(expectedDate, "is displayed in the web Calendar")

            await actualDate.click()
        }
        else {

            console.log(expectedDate, "is not displayed in the web Calendar") // java is not displayed in the web page
        }
    }
    else {

        console.log("web Calendar is not displayed in the web page")
    }
});


Then('I Verify Playwright and method', async function () {

    await page.getByPlaceholder("Enter Name").fill("Ranjith")

    //1st way

    console.log("============================xpath and method=====================")

    await page.locator("//input[@placeholder='Enter EMail' and @id='email']").fill("testing@gmaill.com")

    //2nd way

    console.log("============================playwright and method=====================")

    await page.getByPlaceholder("Enter Phone").and(page.locator("//input[@id='phone']")).fill("8976567766")

    await page.locator(".wikipedia-search-input").and(page.locator("#Wikipedia1_wikipedia-search-input")).fill("testing")

});

Then('I Verify Playwright filters', async function () {

    await page.goto("https://www.saucedemo.com/")

    await page.getByPlaceholder("Username").fill("standard_user")

    await page.getByPlaceholder("Password").fill("secret_sauce")

    await page.locator("#login-button").click()

    await page.locator("//*[@class='inventory_item']")
        .filter({ hasText: 'Sauce Labs Onesie' })
        .getByRole('button', { name: 'Add to cart' }).click()

    await page.locator("//*[@class='inventory_item']")
        .filter({ hasText: 'Sauce Labs Fleece Jacket' })
        .getByRole('button', { name: 'Add to cart' }).click()

    await page.locator("//*[@class='inventory_item']")
        .filter({ hasText: 'Sauce Labs Backpack' })
        .getByRole('button', { name: 'Add to cart' }).click()

    await page.locator("//*[@class='inventory_item']")
        .filter({ hasText: 'Sauce Labs Onesie' })
        .getByRole('button', { name: 'Remove' }).click()

    await page.goto("https://testautomationpractice.blogspot.com/")

    await page.locator("//div[@class='form-check form-check-inline']/label")
        .filter({ hasText: 'Monday' }).click()

    await page.locator("//div[@class='form-check form-check-inline']/label")
        .filter({ hasText: 'Frid' }).click()

    await page.locator("//div[@class='form-check form-check-inline']/label")
        .filter({ hasText: 'FeMale' }).click()

    await page.locator("//div[@class='form-check form-check-inline']/label")
        .filter({ hasText: 'Male' }).first().click()
});

Then('I Verify Playwright simple alert', async function () {

    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")

    await page.on('dialog', (dialog) => {

        console.log("dialog/popup type is", dialog.type()) //alert

        expect(dialog.type()).toContain("alert")

        console.log("dialog/popup message    is", dialog.message()) //I am a JS Alert

        expect(dialog.message()).toContain("I am a JS Alert")

        dialog.accept()
    })

    await page.locator("//button[text()='Click for JS Alert']").click()

});


Then('I Verify Playwright confirmation alert', async function () {

    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")

    await page.on('dialog', (dialog) => {

        console.log("dialog/popup type is", dialog.type()) //confirm

        expect(dialog.type()).toContain("confirm")

        console.log("dialog/popup message    is", dialog.message()) //I am a JS Confirm

        expect(dialog.message()).toContain("I am a JS Confirm")

        dialog.accept()
    })

    await page.locator("//button[text()='Click for JS Confirm']").click()
});

Then('I Verify Playwright confirmation alert2', async function () {

    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")

    await page.on('dialog', (dialog) => {

        console.log("dialog/popup type is", dialog.type()) //confirm

        expect(dialog.type()).toContain("confirm")

        console.log("dialog/popup message    is", dialog.message()) //I am a JS Confirm

        expect(dialog.message()).toContain("I am a JS Confirm")

        dialog.dismiss()
    })

    await page.locator("//button[text()='Click for JS Confirm']").click()
});

Then('I Verify Playwright prompt alert', async function () {

    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")

    await page.on('dialog', (dialog) => {

        console.log("dialog/popup type is", dialog.type()) //prompt

        expect(dialog.type()).toContain("prompt")

        console.log("dialog/popup message    is", dialog.message()) //I am a JS prompt

        expect(dialog.message()).toContain("I am a JS prompt")

        dialog.accept()
    })

    await page.locator("//button[text()='Click for JS Prompt']").click()
});

Then('I Verify Playwright prompt alert2', async function () {

    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")

    await page.on('dialog', (dialog) => {

        console.log("dialog/popup type is", dialog.type()) //prompt

        expect(dialog.type()).toContain("prompt")

        console.log("dialog/popup message    is", dialog.message()) //I am a JS prompt

        expect(dialog.message()).toContain("I am a JS prompt")

        dialog.dismiss()
    })

    await page.locator("//button[text()='Click for JS Prompt']").click()
});

Then('I Verify Playwright prompt alert3', async function () {

    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")

    await page.on('dialog', (dialog) => {

        console.log("dialog/popup type is", dialog.type()) //prompt

        expect(dialog.type()).toContain("prompt")

        console.log("dialog/popup message    is", dialog.message()) //I am a JS prompt

        expect(dialog.message()).toContain("I am a JS prompt")

        dialog.accept("hi quality thought team, good morning")
    })

    await page.locator("//button[text()='Click for JS Prompt']").click()
});

Then('I Verify Playwright file upload', async function () {

    console.log("============upload single file================")

    await page.locator("#singleFileInput").scrollIntoViewIfNeeded()

    //1st way

    var singleFileUpload = await page.waitForSelector("#singleFileInput", { timeout: 5000 })

    await singleFileUpload.setInputFiles("./test-result/screenshots/fullpagescreenshot.jpg")

    //2nd way

    //await page.locator("#singleFileInput").setInputFiles("./test-result/screenshots/fullpagescreenshot.jpg")

    await page.locator("//button[text()='Upload Single File']").click()

    console.log("===============Upload multiple file=================")

    var multiFileUpload = await page.waitForSelector("#multipleFilesInput")

    await multiFileUpload.setInputFiles([file1, "./test-result/cucumber-report.html"])

    await page.locator("//button[text()='Upload Multiple Files']").click()

    await singleFileUpload.setInputFiles("C:/Users/Abcom/OneDrive/Desktop/Automation_Playwright/22ndNov2025/Playwright Topics/10th Class_Frames_upload files/Frames.docx")

    await page.locator("//button[text()='Upload Single File']").click()
});

Then('I Verify Playwright frames', async function () {

    //https://demoqa.com/frames


    await page.goto("https://ui.vision/demo/webtest/frames/")

    var allFramesCount = await page.frames()

    console.log("allFramesCount is", allFramesCount.length) //allFramesCount is 7


    /*syntax:
await page.frameLocator(xpath).locator(locator/playwrightlocator).methods()

*/

    //1st way

    // await page.frameLocator('//frame[@src="frame_1.html"]').locator("//input[@name='mytext1']").fill("hi team how are you")

    //2nd way

    const frame1 = await page.frameLocator('//frame[@src="frame_1.html"]').locator("//input[@name='mytext1']")

    frame1.fill("hi team how are you")

    //3rd way

    var frame3 = await page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_3.html' })

    await frame3?.fill("//input[@name='mytext3']", "Ranjith")

    var childFramesCount = await frame3?.childFrames()

    console.log("childFramesCount is", childFramesCount?.length) //childFramesCount is 1

    // in playwright if the user wants to sue nested frame using index they should wirte the child farems inside the if condition

    if (childFramesCount && childFramesCount.length > 0) {

        await childFramesCount[0].locator("//span[text()='I am a human']").click()

        await childFramesCount[0].locator("//span[text()='Form Autofilling']").click()
    }

    var frame4 = await page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_4.html' })

    await frame4?.fill("//input[@name='mytext4']", "Leela")

    /* class work handle frame2 and frame 5 either by using xpath or url*/
});

Then('verify jazz pharma', async function () {

    // await page.goto("https://www.jazzpharma.com/")

    // await page.locator("//*[text()='About']").first().hover()

    //     await page.locator("//*[text()='Leadership']").click()

    //  await page.goto("https://www.facebook.com/")

    // await page.getByPlaceholder("Email address or phone number").fill("qt")

    //     await page.getByPlaceholder("Password").fill("qt")


    await page.goto("https://demowebshop.tricentis.com/")

    await page.locator(".search-box-text.ui-autocomplete-input").fill("books")

    await page.locator(".button-1.search-box-button").click()
});


Then('I Verify Playwright waits', async function () {

    await page.goto("https://www.facebook.com/")

    console.log("=============waitForTimeout()===================")

    //syntax: await page.waitForTimeout(10000) // 10000 milliseconds means 10 seconds

    // await page.waitForTimeout(10000) //10000 milliseconds means 10 seconds

    await page.getByPlaceholder("Email address or phone number").fill("qt")

    await page.getByPlaceholder("Password").fill("qt")

    /*syntax: 
1st way:
await page.waitForSelector(webelement) 

2nd way:
await page.waitForSelector(webelement,{timeout:10000}) 
*/
    console.log("=============waitForSelector()===================")

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    console.log("============================1st way==================")

    await page.waitForSelector("//*[@name='username']")

    await page.locator("//*[@name='username']").fill("Admin")

    console.log("============================2nd way==================")

    await page.waitForSelector("//*[@name='password']", { timeout: 15000 }) //15 seconds

    await page.locator("//*[@name='password']").fill("admin123")

    console.log("=============WaitForLoadState()===================")

    /*syntax: 
    1st way:
    await page.waitForloadState() 
    
    2nd way:
    await page.waitForloadState(10000) 
    */

    //1st way
    await page.waitForLoadState()

    await page.locator("//*[@type='submit']").click()

    //2nd way

    await page.waitForLoadState("domcontentloaded") // html and css content is loaded on the web page

    await page.locator("//*[text()='Admin']").click()

    //3rd way

    await page.waitForLoadState("domcontentloaded", { timeout: 6000 }) // html and css content is loaded on the web page

    await page.locator("//*[text()='PIM']").click()

    //4th way

    await page.waitForLoadState("load", { timeout: 6000 }) // html, css and images is loaded on the web page

    await page.locator("//*[text()='Leave']").click()

    //5th way

    await page.waitForLoadState("load") // html, css and images is loaded on the web page

    await page.locator("//*[text()='Time']").click()

    //6th way

    await page.waitForLoadState("networkidle") // no network issues like 500, 404

    await page.locator("//*[text()='Recruitment']").click()

    //7th way

    await page.waitForLoadState("networkidle", { timeout: 9000 }) // no network issues like 500, 404

    await page.locator("//*[text()='My Info']").click()
});

Then('I verify windows handling', async function () {

    console.log('I launch the browser')

    browser = await chromium.launch({

        headless: false,

        args: ['--start-maximized']
    })

    const context = await browser.newContext({ viewport: null })

    let page1 = await context.newPage()

    var page2 = await context.newPage()

    const page3 = await context.newPage()

    let allPagesCount = context.pages()

    console.log("allPagesCount is:" + allPagesCount.length)// allPagesCount is : 3

    await page1.goto("https://testautomationpractice.blogspot.com/")

    await expect(page1).toHaveTitle("Automation Testing Practice")

    await page2.goto("https://login.salesforce.com/")

    await expect(page2).toHaveTitle("Login | Salesforce")

    await page3.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    await expect(page3).toHaveTitle("OrangeHRM")

    await page3.locator("//*[@name='username']").fill("Admin")

    await page3.locator("//*[@name='password']").fill("admin123")

    await page3.locator("//*[@type='submit']").click()

    await allPagesCount[0].bringToFront()

    await page1.getByText("New Tab").scrollIntoViewIfNeeded()

    await page1.getByText("New Tab").click()

    await page1.waitForTimeout(5000)

    allPagesCount = context.pages()

    console.log("allPagesCount is:" + allPagesCount.length)// allPagesCount is : 4

    await allPagesCount[3].close()

    console.log("=====================switch to 2nd page/tab and enetre credentials=========")

    await allPagesCount[1].bringToFront()

    await page2.getByLabel("Username").fill("Quality")

    await page2.getByLabel("Password").fill("Thought")

    console.log("=====================switch to 1st page/tab and enetre credentials=========")

    await allPagesCount[0].bringToFront()

    const pagePopup = page1.waitForEvent("popup")

    await page1.getByText("Popup Windows").scrollIntoViewIfNeeded()

    await page1.getByText("Popup Windows").click()

    await page1.waitForTimeout(5000)

    const popupPage = await pagePopup

    console.log(" popupPage title is", popupPage.title())

    allPagesCount = context.pages()

    console.log("allPagesCount is:" + allPagesCount.length)// allPagesCount is : 5

    // to close the specific window/tab/web page

    await allPagesCount[4].close()

    // to close the complete browser

    await context.close()

});

// Then('I Verify test data reading from the test data json file', async function () {

//     await page.getByPlaceholder("Enter Name").fill(TestData1.Name)

//     await page.getByPlaceholder("Enter EMail").fill(TestData1.Email)

//     await page.locator("#phone").fill(TestData1.Phone)

//     await page.locator("#textarea").fill(TestData1.Address)

//     await page.locator(".wikipedia-search-input").fill(TestData1.Wikipedia)

//     await page.locator(".wikipedia-search-button").click()
// });

// Then('I Verify test data reading from the test data json file2', async function () {

//     await page.getByPlaceholder("Enter Name").fill(TestData2.Name)

//     await page.getByPlaceholder("Enter EMail").fill(TestData2.Email)

//     await page.locator("#phone").fill(TestData2.Phone)

//     await page.locator("#textarea").fill(TestData2.Address)

//     await page.locator(".wikipedia-search-input").fill(TestData2.Wikipedia)

//     await page.locator(".wikipedia-search-button").click()
// });

// Then('I Verify test data reading from the test data json file3', async function () {

//     await page.getByPlaceholder("Enter Name").fill(TestData3.Name)

//     await page.getByPlaceholder("Enter EMail").fill(TestData3.Email)

//     await page.locator("#phone").fill(TestData3.Phone)

//     await page.locator("#textarea").fill(TestData3.Address)

//     await page.locator(".wikipedia-search-input").fill(TestData3.Wikipedia)

//     await page.locator(".wikipedia-search-button").click()
// });

// Then('I Verify test data reading from the feature file {string},{string},{string},{string},{string},{string}', async function (Name, Email, Phone, Address, Wikipedia,  errormessgae) {

//     await page.getByPlaceholder("Enter Name").fill(Name)

//     await page.getByPlaceholder("Enter EMail").fill(Email)

//     await page.locator("#phone").fill(Phone)

//     await page.locator("#textarea").fill(Address)

//     await page.locator(".wikipedia-search-input").fill(Wikipedia)

//     await page.locator(".wikipedia-search-button").click()

//     //await expect(page.locator("sayali")).toHaveText(errormessgae)
// });

// Then('I Verify test data reading from the feature file1 {string},{string}', async function (username,password) {

//    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

//     await page.locator("//*[@name='username']").fill(username)

//     await page.locator("//*[@name='password']").fill(password)

//     await page.locator("//*[@type='submit']").click()
// });