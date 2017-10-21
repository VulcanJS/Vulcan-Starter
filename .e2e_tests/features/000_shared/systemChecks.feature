Feature: 000 Verify System Configuration
  As a system tester
  I want to see that the system is configured appropriately for these tests

  @watch
  Scenario: Can we read the title and the settings.json parameters
    Given that I have opened the main page : "http://localhost:3000/"
    And that the displayed site name matches the system settings site name.
    And I purge previous test data
    Then the subtitle begins "This is from the"... package
