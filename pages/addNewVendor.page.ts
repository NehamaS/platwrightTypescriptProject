import { type Locator } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { VendorType } from '../setup/types';
export class AddNewVendorPage extends BasePage {
    readonly companyNameInput: Locator = this.page.getByTestId('form-input-companyName');
    readonly fullNameInput: Locator = this.page.getByTestId('form-input-fullName');
    readonly emailInput: Locator = this.page.getByTestId('form-input-email');
    readonly phoneInput: Locator = this.page.getByTestId('form-input-phone');
    readonly continueButton = this.page.getByTestId('continue-button');

    async addVendor({ vendorBusinessName, vendorContactName, vendorEmailName, vendorPhone }: VendorType) {
        await this.companyNameInput.fill(vendorBusinessName);
        await this.fullNameInput.fill(vendorContactName);
        await this.emailInput.fill(vendorEmailName);
        await this.phoneInput.fill(vendorPhone);
        await this.continueButton.click();
    }
}



