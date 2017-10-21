Feature: 001 Register a new user
  As an unauthorized user
  I want to join up

  @watch
  Scenario: Register a new user
    Given that I have opened the main page : "http://localhost:3000/"
    And I have clicked on the "Sign up" link
    When I enter my name "You", email "you@yourorg.com" and password : "yourpassword",
    And I have clicked on the "Sign up" button.
    Then I see I am allowed to "Insert New Document".

  @watch
  Scenario: Logout new user
    Given I am at the main page, "http://localhost:3000/"
    When I logout,
    Then I see the login form again.

  @watch
  Scenario: Login new user
    Given that I have opened the main page : "http://localhost:3000/"
    When I enter my email "you@yourorg.com" and password : "yourpassword",
    And I have clicked on the "Sign in" button.
    Then I see I am allowed to "Insert New Document".

  @watch
  Scenario: Logout new user
    Given I am at the main page, "http://localhost:3000/"
    When I logout,
    Then I see the login form again.

