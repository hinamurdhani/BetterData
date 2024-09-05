import { test, Page, BrowserContext, expect } from "@playwright/test";
import { PageManager } from "../PageObjects/PageManager";
import users from "../TestData/user.json";
import { WareHousePage } from "../PageObjects/WareHousePage";

//All test scripts are interlinked
test.describe.serial(
  "File Upload Scenarios",
  { tag: "@fileUpload" },
  () => {
    let pm: PageManager;
    let page: Page;
    let context: BrowserContext;
    let projectURL: string;
    let warehouseObj: WareHousePage;
    let fileName : string;
    
    test.beforeAll(async ({ browser }) => {
      context = await browser.newContext();
      page = await context.newPage();
      pm = new PageManager(page, context);
      projectURL = "https://app.betterdata.ai/betterdata/app/projects";
      await pm.loginPageObject().navigateToBaseUrl();
      await pm.loginPageObject().loginWithUsernameAndPassword(users["Hina_User"].username, users["Hina_User"].password);
      await expect(page).toHaveURL(projectURL); // Move this line inside the 'beforeAll' block
      warehouseObj = await pm.loginPageObject().goToWareHousePage();
    });

    test.afterAll(async () => {
      await context.close();
    });

    test("verify csv file is getting uploaded successfully", async () => {
        fileName = "table_data"+ warehouseObj.generateRandomNumber();
      await warehouseObj.clickOnAddDataSourceTop();
      await warehouseObj.clickIHaveDataSource();
        await warehouseObj.uploadFile("TestData", "table_data.csv");
        await warehouseObj.clickOnNextButton();
        await warehouseObj.enterFileName(fileName);
        await warehouseObj.enterDescription("this is testdata");
        await warehouseObj.clickOnAddDataSource();
        await expect(warehouseObj.fileUploaded).toBeVisible();
        await expect(warehouseObj.fileUploadWithName("table_data.csv")).toBeVisible();
    });

    test("verify the preview of the uploaded file", async () => {
      await warehouseObj.clickOnClose()
      await warehouseObj.clickOnDataProfile(fileName)
      await expect(warehouseObj.dataSourcePrview).toBeVisible();
      await expect(warehouseObj.dataSourceName(fileName)).toBeVisible();
      await expect(warehouseObj.dataSourceContent).toBeVisible();
    });
  }
);
