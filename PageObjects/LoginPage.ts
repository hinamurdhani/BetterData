import { Page, BrowserContext, Locator, expect } from "@playwright/test";
import { getBaseUrl } from "../config";
import { WareHousePage } from "./WareHousePage";

export class LoginPage{
  readonly page: Page;
  readonly context: BrowserContext;
  readonly userEmailField: Locator;
  readonly passwordField: Locator;
  readonly signInBtn: Locator;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.userEmailField = this.page.getByPlaceholder('Enter email')
    this.passwordField = this.page.getByPlaceholder('Enter password')
    this.signInBtn = this.page.getByRole('button', { name: 'Sign In' })
  }


  async navigateToBaseUrl() {
    await this.page.goto(getBaseUrl());
  }

  /**
   * This method allows you to login using email and password
   * @param username Email of the user
   * @param password Password of the user
   */

  async loginWithUsernameAndPassword(username: string, password: string) {
    await this.userEmailField.click();
    // await this.loginWithEmailPasswordBtn.click();
    await this.userEmailField.fill(username);
    await this.passwordField.fill(password);
    await this.signInBtn.click();
  }

    async goToWareHousePage() {
        await this.page.getByRole('link', { name: 'Data Warehouse' }).click();
        return new WareHousePage(this.page, this.context);
    }
}
