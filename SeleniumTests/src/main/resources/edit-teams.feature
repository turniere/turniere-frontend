
  Feature: Edit Teams
    Background: User is on a tournament edit page
      Given User navigates to Tournament Edit Page he owns

    Scenario: Normal Name is accepted
      When I enter a team name "someunusedteamname"
      And I click on change
      Then a success notification should pop up

    Scenario: Empty name is not accepted
      When I enter a team name ""
      And I click on change
      Then a fail notification should pop up

    Scenario: Duplicate names are not accepted
      When I enter a team name that is already taken
      And I click on change
      Then a fail notification should pop up
