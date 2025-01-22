import { test, expect } from '../fixtures/baseTest';
import { VendorType } from '../setup/types';
import { INVALID_EMAIL_ADDRESS_ERROR_MSG, COMPANY_ALREADY_EXIST_ERROR_MSG, USER_NAME, PASSWORD } from '../setup/constants';
import { testParams } from '../setup/testsParams';
import casual from 'casual';

const generateVendorDetails = (): VendorType => ({
    vendorBusinessName: casual.company_name,
    vendorContactName: casual.full_name,
    vendorEmailName: casual.email,
    vendorPhone: `(972) ${casual.integer(100, 999)}-${casual.integer(1000, 9999)}`,
});

test.describe('Add New Vendor', () => {
    test('verifies add new vendor', async ({ loginPage, vendorsPage, addNewVendorPage, paymentOptionsPage, vendorDetailsPage, baseURL }) => {
        const vendorDetails = generateVendorDetails();

        await loginPage.goto(baseURL || '');
        await loginPage.login({ userName: USER_NAME, password: PASSWORD });
        await vendorsPage.clickToAddVendor();
        await addNewVendorPage.addVendor(vendorDetails);
        await paymentOptionsPage.clickSkipForNow();

        // Verify notification message
        const newVendorNotifMsg = await vendorsPage.getNewVendorNotifMsg();
        expect(newVendorNotifMsg).toBe(`New vendor ${vendorDetails.vendorBusinessName} added`);

        // Verify vendor details
        await vendorsPage.clickOnVendorByName(vendorDetails.vendorBusinessName || '');
        const currentVendorDetails: VendorType = await vendorDetailsPage.getAllVendorDetails();
        expect(currentVendorDetails).toEqual(vendorDetails);
    });

    test('verifies relevant error when typing invalid inputs', async ({ loginPage, vendorsPage, addNewVendorPage, baseURL }) => {
        const vendorDetails = generateVendorDetails();

        await loginPage.goto(baseURL || '');
        await loginPage.login({ userName: USER_NAME, password: PASSWORD });
        await vendorsPage.clickToAddVendor();

        // Test "company already exists" error
        vendorDetails.vendorBusinessName = testParams.addVendor.alreadyExistVendor;
        await addNewVendorPage.addVendor(vendorDetails);
        const companyAlreadyExistsErrorMsg = await vendorsPage.getCompanyAlreadyExistsErrorMsg();
        expect(companyAlreadyExistsErrorMsg).toBe(COMPANY_ALREADY_EXIST_ERROR_MSG);

        // Test "invalid email address" error
        vendorDetails.vendorEmailName = casual.name;
        await addNewVendorPage.addVendor(vendorDetails);
        const invalidEmailAddressErrorMsg = await vendorsPage.getEnterValidEmailAddressErrorMsg();
        expect(invalidEmailAddressErrorMsg).toBe(INVALID_EMAIL_ADDRESS_ERROR_MSG);
    });
});