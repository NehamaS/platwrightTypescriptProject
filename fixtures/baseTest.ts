import { test as baseTest } from '@playwright/test';
import { LoginPage, VendorsPage, AddNewVendorPage, PaymentOptionsPage, VendorDetailsPage } from '../pages';

interface PageObjects {
    loginPage: LoginPage;
    vendorsPage: VendorsPage;
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
    vendorsPage: async ({ page }, use) => {
        await use(new VendorsPage(page)); 
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