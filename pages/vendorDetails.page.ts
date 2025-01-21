import { type Locator } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { VendorType } from '../setup/types';
export class VendorDetailsPage extends BasePage {
    readonly companyNameInput: Locator = this.page.getByTestId('form-input-companyName');
    readonly fullNameInput: Locator = this.page.getByTestId('form-input-fullName');
    readonly emailInput: Locator = this.page.getByTestId('form-input-email');
    readonly phoneInput: Locator = this.page.getByTestId('form-input-phone');

    async getAllVendorDetails():Promise<VendorType> {
        return {
            vendorBusinessName: await this.companyNameInput.textContent() || '',
            vendorContactName: await this.fullNameInput.textContent() || '',
            vendorEmailName: await this.emailInput.textContent() || '',
            vendorPhone: await this.phoneInput.textContent() || '',
        };
    }
}
