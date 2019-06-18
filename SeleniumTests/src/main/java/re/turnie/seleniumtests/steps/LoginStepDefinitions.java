package re.turnie.seleniumtests.steps;

import cucumber.annotation.en.Given;
import cucumber.annotation.en.Then;
import cucumber.annotation.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import re.turnie.seleniumtests.CucumberStepDefinition;
import re.turnie.seleniumtests.SystemConstants;

import java.util.List;

public class LoginStepDefinitions extends CucumberStepDefinition {

    @Given("^User navigates to Login Page$")
    public void goToLogin() {
        checkDriverAvailability();

        driver.navigate().to(SystemConstants.FRONTEND_URL + "/login");
    }

    @Given("^a user is registered as \"(.*)\" with email \"(.*)\" and password \"(.*)\"$")
    public void assureRegistrationOfUser(String username, String email, String password) {
        checkDriverAvailability();


    }

    @When("^I enter email \"(.*)\"$")
    public void enterEmail(String email) {
        checkDriverAvailability();

        driver.findElement(By.id("email-input")).sendKeys(email);
    }

    @When("^I enter password \"(.*)\"$")
    public void enterPassword(String password) {
        checkDriverAvailability();

        driver.findElement(By.id("password-input")).sendKeys(password);
    }

    @When("^I click on login$")
    public void clickOnLogin() {
        checkDriverAvailability();

        driver.findElement(By.id("login-button")).click();
    }

    @Then("^Login should show error messages$")
    public void checkErrorMessagesShowing() {
        checkDriverAvailability();

        WebElement errorlist = new WebDriverWait(driver, 5)
                .until(ExpectedConditions.presenceOfElementLocated(By.id("error-list")));
        List<WebElement> errortags = errorlist.findElements(By.tagName("li"));
        if(errortags.isEmpty()) {
            System.out.println("Test Failed");
        } else {
            System.out.println("Test Passed");
        }
        driver.quit();
    }

    @Then("^the user \"(.*)\" should be logged in$")
    public void checkForUserBeingLoggedIn(String username) {
        checkDriverAvailability();

        WebElement usernameButton = new WebDriverWait(driver, 5)
                .until(ExpectedConditions.presenceOfElementLocated(By.id("profile-button")));

        if(usernameButton != null && usernameButton.getText().equals(username)) {
            System.out.println("Test Passed");
        } else {
            System.out.println("Test Failed");
        }
        driver.quit();
    }

    @Then("^the user should be redirected to index$")
    public void checkForRedirectionToIndex() {
        checkDriverAvailability();

        String currentURL = driver.getCurrentUrl();
        if(currentURL.equalsIgnoreCase(SystemConstants.FRONTEND_URL + "/")) {
            System.out.println("Test Passed");
        } else {
            System.out.println("Test Failed");
        }
        driver.quit();
    }
}
