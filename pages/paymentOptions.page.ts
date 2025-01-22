import { type Locator } from '@playwright/test';
import { BasePage } from '../pages/base.page';
export class PaymentOptionsPage extends BasePage {
    readonly skipForNowButton:Locator = this.page.getByText('Skip for now');

    async clickSkipForNow() {
        await this.skipForNowButton.click({ timeout: 60000 });
    }
}

