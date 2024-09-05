import { Page, BrowserContext } from "@playwright/test";
import { LoginPage } from "../PageObjects/LoginPage";
import { WareHousePage } from "../PageObjects/WareHousePage";

export class PageManager {
    private readonly page: Page;
    private readonly context: BrowserContext;
    private readonly loginPage: LoginPage
    private readonly warehousePage: WareHousePage

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.loginPage = new LoginPage(this.page, this.context);
        this.warehousePage = new WareHousePage(this.page, this.context);
    }

    loginPageObject() {
        return this.loginPage;
    }

    warehousePageObject() {
        return new WareHousePage(this.page, this.context);
    }
}
