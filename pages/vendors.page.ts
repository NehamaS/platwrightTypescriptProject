import { type Locator } from '@playwright/test';
import { BasePage } from '../pages/base.page';
export class VendorsPage extends BasePage {
    readonly addVendorButton:Locator = this.page.getByText('Add vendor');
    readonly newVendorNotifMsg:Locator = this.page.getByTestId('dashboard-notification-description');
    readonly searchVendorInput:Locator = this.page.getByPlaceholder('Search vendors');
    readonly searchIcon:Locator = this.page.getByTestId('search-icon');
    readonly companyAlreadyExistsErrorMsg = this.page.getByTestId('form-error-message-companyName');
    readonly enterValidEmailAddressErrorMsg = this.page.getByTestId('form-error-message-email');
   
    async clickToAddVendor() {
        await this.addVendorButton.click({ timeout: 90000 });
    }

    async clickOnVendorByName(vendorName: string) {
        await this.searchVendorInput.fill(vendorName);
        await this.searchIcon.click();
        await this.page.locator(`text=/^${vendorName}$/i`).click();
    }

    async getNewVendorNotifMsg(): Promise<string> {
        return await this.newVendorNotifMsg.textContent({ timeout: 60000 }) ?? '';
    }

    async getCompanyAlreadyExistsErrorMsg(): Promise<string> {
        return await this.companyAlreadyExistsErrorMsg.textContent({ timeout: 60000 }) ?? '';
    }

    async getEnterValidEmailAddressErrorMsg(): Promise<string> {
        return await this.enterValidEmailAddressErrorMsg.textContent({ timeout: 60000 }) ?? '';
    }
}

