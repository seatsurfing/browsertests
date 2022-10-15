const { By, Builder, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require("assert");

describe('Confluence Cloud App', function() {
    let driver;

    before(async function() {
        let options = new chrome.Options();
        options.headless();
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        driver = new Builder()
            .setChromeOptions(options)
            .forBrowser('chrome')
            .build();
    });

    after(async () => await driver.quit());

    it('Check app loads', async function() {
        await driver.get('https://team-1609087764900.atlassian.net/wiki/spaces/seatsurfing/pages/439713793/Live+Demo');

        let title = await driver.getTitle();
        assert.equal('Live Demo - Seatsurfing Demo - Confluence', title);

        let macroFrame = await driver.wait(until.elementLocated(By.css('iframe')), 15000);
        let macroId = await macroFrame.getAttribute('id');
        assert.equal(macroId.startsWith('confluence-seatsurfing__seatsurfing-marco__'), true);

        await driver.switchTo().frame(macroFrame);

        let iFrameTitleElement = await driver.findElement(By.css('title'));
        let iFrameTitle = await iFrameTitleElement.getAttribute('innerHTML');
        assert.equal('Seatsurfing for Confluence', iFrameTitle);

        let actualIframe = await driver.findElement(By.css('iframe'));
        
        await driver.switchTo().frame(actualIframe);

        let brand = await driver.wait(until.elementLocated(By.css('a.navbar-brand')), 15000);
        let brandHref = await brand.getAttribute('href');
        assert.equal('https://app.seatsurfing.app/ui/search', brandHref);
    });

});
