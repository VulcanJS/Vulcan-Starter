Feature: 002 Movie CRUD
  As an authorized user
  I want to Create, Retrieve, Update and Delete a registry of movies

  @watch
  Scenario: Login new user
    Given that I have opened the main page : "http://localhost:3000/"
    When I enter my email "you@yourorg.com" and password : "yourpassword",
    And I have clicked on the "Sign in" button.
    Then I see I am allowed to "Insert New Document".

  @watch
  Scenario: Create a new movie
    Given I enter a movie "The Shining" from "1980"
    And I enter a movie review "Scared the livin' crap outta me!"
    When I click the "Submit" button.
    Then I see the movie details at the top of the list below.


  @watch
  Scenario: Logout new user
    Given I am at the main page, "http://localhost:3000/"
    When I logout,
    Then I see the login form again.

