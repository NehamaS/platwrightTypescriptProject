import { type Locator } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { LoginType } from '../setup/types';
export class LoginPage extends BasePage {
    readonly emailInput: Locator = this.page.getByTestId('input-email');
    readonly passwordInput: Locator = this.page.getByTestId('input-password');
    readonly signInButton: Locator = this.page.getByTestId('button-auth.signIn.buttonLabel');

    async goto(baseUrl: string) {
        await this.page.goto(baseUrl);
    }

    async login({ userName, password }:LoginType) {
        await this.emailInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}
