import { test as baseTest } from '@playwright/test';
import { LoginPage, VendorPage, AddNewVendorPage, PaymentOptionsPage, VendorDetailsPage } from '../pages';

interface PageObjects {
    loginPage: LoginPage;
    vendorPage: VendorPage;
    addNewVendorPage: AddNewVendorPage;
    paymentOptionsPage: PaymentOptionsPage;
    vendorDetailsPage: VendorDetailsPage;
}

export const test = baseTest.extend<PageObjects>({
    context: async ({ browser }, use) => {
        const context = await browser.newContext({
            extraHTTPHeaders: {
                'User-Agent': 'qa-automation-homework', 
            },
        });
        await use(context); 
        await context.close(); 
    },

    page: async ({ context }, use) => {
        const page = await context.newPage(); 
        await use(page); 
        await page.close(); 
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page)); 
    },
    vendorPage: async ({ page }, use) => {
        await use(new VendorPage(page)); 
    },
    addNewVendorPage: async ({ page }, use) => {
        await use(new AddNewVendorPage(page)); 
    },
    paymentOptionsPage: async ({ page }, use) => {
        await use(new PaymentOptionsPage(page));
    },
    vendorDetailsPage: async ({ page }, use) => {
        await use(new VendorDetailsPage(page));
    },
});

export const expect = test.expect;