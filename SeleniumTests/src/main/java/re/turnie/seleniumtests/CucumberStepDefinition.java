package re.turnie.seleniumtests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class CucumberStepDefinition {

    protected WebDriver driver;

    protected void checkDriverAvailability() {
        if(driver == null) {
            SystemConstants.TestBrowser browser = SystemConstants.BROWSER_USED_FOR_TESTS;
            System.setProperty(browser.getSystemComponentName(), browser.getDriverPath());

            switch (browser) {
                case Chrome:
                    driver = new ChromeDriver();
                    break;
                case Firefox:
                    driver = new FirefoxDriver();
                    break;
                default:
                    System.out.println("Driver could not be setup.");
            }
        }
    }
}
