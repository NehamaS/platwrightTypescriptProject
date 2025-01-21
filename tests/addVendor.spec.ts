import { test, expect } from '../fixtures/baseTest';
import { VendorType, LoginType } from '../setup/types';
import { INVALID_EMAIL_ADDRESS_ERROR_MSG, COMPANY_ALREADY_EXIST_ERROR_MSG, testParams } from '../setup/constants';
import casual from 'casual';

import * as dotenv from 'dotenv';
dotenv.config();

const vendorDetails: VendorType = {
    vendorBusinessName: casual.name,
    vendorContactName: casual.full_name,
    vendorEmailName: casual.email,
    vendorPhone: `(972) ${casual.integer(100, 999)}-${casual.integer(1000, 9999)}`
};

const loginDetails: LoginType = {
    userName: process.env.USER_NAME || 'autotest1+autotest-stg-automation-homeassignment-1@melio.com',
    password: process.env.PASSWORD || '85z6Jiv#@L95XQ84'
};

test.describe('Add New Vendor', () => {
    test('verifies add new vendor', async ({ loginPage, vendorPage, addNewVendorPage, paymentOptionsPage, vendorDetailsPage, baseURL }) => {
        await loginPage.goto(baseURL || '');
        await loginPage.login(loginDetails);
        await vendorPage.clickToAddVendor();
        await addNewVendorPage.addVendor(vendorDetails);
        await paymentOptionsPage.clickSkipForNow();

        const newVendorNotifMsg = await vendorPage.getNewVendorNotifMsg();
        expect(newVendorNotifMsg).toBe(`New vendor ${vendorDetails.vendorBusinessName} added`); 

        await vendorPage.clickOnVendorByName(vendorDetails.vendorBusinessName || '');
        const currentVendorDetails: VendorType = await vendorDetailsPage.getAllVendorDetails();
        expect(currentVendorDetails).toEqual(vendorDetails);
    });

    test('verifies relevant error when type invalid inputs', async({ loginPage, vendorPage, addNewVendorPage, baseURL }) => {
        await loginPage.goto(baseURL || '');
        await loginPage.login(loginDetails);
        await vendorPage.clickToAddVendor();

        vendorDetails.vendorBusinessName = testParams.addVendor.alreadyExistVendor;
        await addNewVendorPage.addVendor(vendorDetails);
        const companyAlreadyExistsErrorMsg = await vendorPage.getCompanyAlreadyExistsErrorMsg();
        expect(companyAlreadyExistsErrorMsg).toBe(COMPANY_ALREADY_EXIST_ERROR_MSG); 

        vendorDetails.vendorEmailName = casual.name;
        await addNewVendorPage.addVendor(vendorDetails);
        const inValidEmailAddressErrorMsg = await vendorPage.getEnterValidEmailAddressErrorMsg();
        expect(inValidEmailAddressErrorMsg).toBe(INVALID_EMAIL_ADDRESS_ERROR_MSG); 
    });
});