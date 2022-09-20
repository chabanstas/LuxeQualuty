const assert = require('assert')

describe('webdriver.io page', () => {

    it('Checking the page title of the Download section', async () => {
        await browser.url('https://www.redmine.org/');
        const menuSectionDownload = await $('ul>li>a[class="download"]');
        await menuSectionDownload.click();
        await browser.pause(2000);
        console.log("Page Title is: " + await browser.getTitle());
    });

    it('Checking the focus of the "Download" menu section after clicking', async () => {
        await browser.url('https://www.redmine.org/');
        const menuSectionDownload = await $('ul>li>a[class="download"]');
        console.log("Download section before click: " + await menuSectionDownload.getAttribute('class'));
        await menuSectionDownload.click();
        console.log("Download section after click: " + await menuSectionDownload.getAttribute('class'));
        //assert.strictEqual(await menuSectionDownload.getAttribute('class'), 'download selected');
        assert.notEqual(await menuSectionDownload.getAttribute('class'), 'download selected');
    });

    it('Sign up for Redmine with not correct mail via the "Ел. пошта" button', async () => {
        await browser.url('https://www.redmine.org/');
        
        const buttonSignUp = await $('ul>li>a[class="register"]');
        await buttonSignUp.click();
        await browser.pause(2000);

        let exit = $('#user_login')
        await exit.setValue('test111@qwecom')

        let password = $('#user_password')
        await password.setValue('qwerty123')

        let confirm = $('#user_password_confirmation')
        await confirm.setValue('qwerty123')

        let firstname = $('#user_firstname')
        await firstname.setValue('test123')

        let lastname = $('#user_lastname')
        await lastname.setValue('qwecom')

        let mail = $('#user_mail')
        await mail.setValue('test111@qwecom')

        const sendButton = await $('form>input[value="Відправити"]');
        await sendButton.click();

        const errorExplanation = await $('form>div>ul>li');
        assert.strictEqual(await errorExplanation.getText('class'), 'Ел. пошта невірне');
    });

    it('Checking the search field with "test123" query', async () => {
        await browser.url('https://www.redmine.org/');

        const elem = await $('form>input[id="q"]');
        await elem.setValue('test123\n');
        await browser.pause(2000);

        const numberOfResult = await $('div>h3');
        console.log(numberOfResult);
        assert.strictEqual(await numberOfResult.getText(), 'Результати (0)');
    });

    it('Testing the search field using the "test123" query with advanced settings', async () => {
        await browser.url('https://www.redmine.org/');

        const elem = await $('form>input[id="q"]');
        await elem.setValue('test123\n');

        const dropDownMenu = await $('form>p>select>option[value="all"]');
        await dropDownMenu.click();

        const questionschbox = await $('form>p>label>input[id="issues"]');
        await questionschbox.click();

        const sendButton = await $('form>p>input[type="submit"]');
        await sendButton.click();

        const numberOfResult = await $('div>h3');
        console.log(numberOfResult);
        assert.strictEqual(await numberOfResult.getText(), 'Результати (5)');
    });
})
