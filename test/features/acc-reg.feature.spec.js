/** Generated from: features/acc-reg.feature */
import { test } from "playwright-bdd";

test.describe("Register page", () => {

  test.beforeEach(async ({ Given, page, And }) => {
    await Given("I use the client \"m6\"", null, { page });
    await And("I visit path \"home\"", null, { page });
    await And("I accept coockies's site", null, { page });
  });

  test("TC01", async ({ Given, page, Then, And }) => {
    await Given("I visit path \"registration\"", null, { page });
    await Then("I should have \"inscription\" in url", null, { page });
    await And("I should see an element with role \"heading\" and name \"Créer un compte\"", null, { page });
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use("features/acc-reg.feature"),
  $bddFileMeta: ({}, use) => use(bddFileMeta),
});

const bddFileMeta = {
  "TC01": {"pickleLocation":"11:5"},
};