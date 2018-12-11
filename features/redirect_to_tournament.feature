Feature: Redirect to Tournament

  Scenario: Given a way to long Code
    When I navigate to "http://localhost:3000/index"
    Then element having id "tournament-code-submit" should have text as "Turnier-Code öffnen"
    Then I enter "18583874562345" into input field having name "code"
    Then I click on element having id "tournament-code-submit" and text "Turnier-Code öffnen"
    Then element having class "running-text" should have partial text as "Die aufgerufene Seite wurde leider nicht gefunden."
    And element having class "running-text" should have partial text as "Wir empfehlen, die eingegebene Seite über die Startseite zu suchen."
