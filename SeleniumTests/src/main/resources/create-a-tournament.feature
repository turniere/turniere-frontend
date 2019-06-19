
  Feature: Create a tournament
    Background: User is on create page
      Given User navigates to Create Page

    Scenario: Not logged-in user cannot create a tournament
      When user is not logged in
      Then Login should be shown

    Scenario: Logged in user can create a tournament
      Given a user is logged in
      Then the tournament creation should be shown

    Scenario: Creating a tournament should redirect to the tournament
      Given a user is logged in
      When I enter tournament name "Gherkin Test Tournament"
      And I enter team "1"
      And I enter team "2"
      And I enter team "3"
      And I enter team "4"
      And I click on create
      Then the user should be redirected to a tournament
