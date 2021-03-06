import { fund } from "../../../src/fund/mod";
import { forceFundmeOnBrowser } from "../../../src/fund/fund-browser";
import {
  noTemplateFound,
  jsonTemplateIsInvalid,
  cannotParseScriptJson,
  failParsingTemplate,
  FundmeError,
} from "../../../src/fund/errors";

describe("test scraping template crashes resulting right throw errors", () => {
  test("fund() is called but no template is found", () => {
    document.body.innerHTML = "";
    forceFundmeOnBrowser();
    expect(() => fund()).toThrowError(FundmeError(noTemplateFound));
    document.body.innerHTML = "";
  });

  test("found <script fundme> but it's not an array", () => {
    document.body.innerHTML = `
      <script fundme type="application/json">
        {
          "address": "$coil.com/my-test",
          "weight": 6
        }
      </script>
    `;
    forceFundmeOnBrowser();
    expect(() => fund()).toThrowError(FundmeError(jsonTemplateIsInvalid));
    document.body.innerHTML = "";
  });

  test("found <script fundme> but it's not a valid JSON", () => {
    document.body.innerHTML = `
      <script fundme type="application/json">
        $coil.com/test-@@
      </script>
    `;
    forceFundmeOnBrowser();
    expect(() => fund()).toThrowError(FundmeError(cannotParseScriptJson));
    document.body.innerHTML = "";
  });

  // parse template errors
  test("fails to parse address from <template data-fund></template>", () => {
    document.body.innerHTML = `
      <template data-fund="" />
    `;
    function fundThrow() {
      forceFundmeOnBrowser();
      fund();
    }
    expect(fundThrow).toThrowError(FundmeError(failParsingTemplate));
    document.body.innerHTML = "";
  });
});
