
  Feature: Login
    Background: User is on login page
      Given User navigates to Login Page

    Scenario: Logging in with wrong credentials will give error
      When I enter email "unregistereduser@gmail.com"
      And I enter password "asdf1234"
      And I click on login
      Then Login should show error messages

    Scenario: User with correct credentials will be logged in
      Given a user is registered as "GherkinTestUser" with email "gherkintestuser@gmail.com" and password "asdf1234"
      When I enter email "gherkintestuser@gmail.com"
      And I enter password "asdf1234"
      And I click on login
      Then the user "GherkinTestUser" should be logged in

    Scenario: User with correct credentials will be redirected to index after login
      Given a user is registered as "GherkinTestUser" with email "gherkintestuser@gmail.com" and password "asdf1234"
      When I enter email "gherkintestuser@gmail.com"
      And I enter password "asdf1234"
      And I click on login
      Then the user should be redirected to index
