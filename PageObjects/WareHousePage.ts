import { Page, BrowserContext, Locator, expect } from "@playwright/test";
import { getBaseUrl } from "../config";
import * as path from "path";

export class WareHousePage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly uploadOwn: Locator;
    readonly addDataSource: Locator;
    readonly iHaveDataSource: Locator;
    readonly fileNameInput: Locator;
    readonly descriptionInput: Locator;
    readonly addDataSourceLocatorTop: Locator;
    readonly dataWareHouseHeader: Locator;
    readonly fileUploaded: Locator;
    readonly closeBtn: Locator;
    readonly dataSourcePrview: Locator;
    readonly dataSourceContent: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.uploadOwn = this.page.getByText('Upload own')
        this.addDataSource = this.page.getByRole('button', { name: 'Add new Data Source' })
        this.addDataSourceLocatorTop = this.page.getByRole('button', { name: 'Add data source' })
        this.iHaveDataSource = this.page.getByText('I have a data source ready to')
        this.fileNameInput = this.page.getByPlaceholder('Enter file name')
        this.descriptionInput = this.page.getByRole('textbox', { name: 'Description' })
        this.dataWareHouseHeader = this.page.getByRole('heading', { name: 'Data Warehouse' })
        this.fileUploaded = this.page.getByText("File is uploaded and dataset")
        this.closeBtn = this.page.getByText('Close')
        this.dataSourcePrview = this.page.getByRole('heading', { name: 'Data Source Preview' })
        this.dataSourceContent = this.page.getByLabel('Data Source Preview').locator('div').filter({ hasText: 'NameusernmaepasswordAdjudicationarchieeCHildToGrand2PTC1PTC2Postivie: Gender' }).nth(2);
    }

    readonly fileUploadWithName = (filename) => {
        return this.page.getByText(filename + " - Uploaded");
    }

    readonly dataProfileIcon = (filename) => {
        return this.page.locator("//*[text()='"+filename+"']//ancestor::tr").getByRole('button', { name: 'Data profile' });
    }

    readonly dataSourceName = (filename) => {
return this.page.getByLabel('Data Source Preview').getByText(filename)
    }

    async uploadFile(filePath: string, fileName: string) {
        // const fileChooserPromise = await this.page.waitForEvent("filechooser");
        const [fileChooserPromise] = await Promise.all([
            this.page.waitForEvent("filechooser"), // Wait for the new page event
            this.uploadOwn.click()
        ]);
        // await this.uploadOwn.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(path.join(process.cwd(), filePath, fileName));
    }

    async clickOnAddDataSource() {
            await this.addDataSource.click();
    }

    async clickOnAddDataSourceTop() {
        await this.dataWareHouseHeader.waitFor({ state: 'visible' });
        await this.addDataSourceLocatorTop.click();
    }

    async clickIHaveDataSource() {
        await this.iHaveDataSource.click();
    }

    async clickOnNextButton() {
        await this.page.getByRole('button', { name: 'Next' }).click();
    }

    async enterFileName(fileName: string) {
        await this.fileNameInput.click();
        await this.fileNameInput.fill(fileName);
    }

    async enterDescription(description: string) {
        await this.descriptionInput.fill(description);
    }

    async clickOnClose() {
        await this.closeBtn.click();
    }

    generateRandomNumber(): number {
        return Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    }

    async clickOnDataProfile(fileName: string) {
        while (await this.dataProfileIcon(fileName).isDisabled()) {
            await this.page.reload();
        }
        await this.dataProfileIcon(fileName).click();
    }

}
