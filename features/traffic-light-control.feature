Feature: Traffic light control

  As a user
  I want to select a traffic light signal
  So that I can control which light is active

  Scenario: Initial state has all lights off
    Given the traffic light app is open
    Then the red light should be off
    And the yellow light should be off
    And the green light should be off

  Scenario: Red light can be switched on manually
    Given the traffic light app is open
    When the user selects the red light
    Then the red light should be on
    And the yellow light should be off
    And the green light should be off

  Scenario: Yellow light can be switched on manually
    Given the traffic light app is open
    When the user selects the yellow light
    Then the red light should be off
    And the yellow light should be on
    And the green light should be off

  Scenario: Green light can be switched on manually
    Given the traffic light app is open
    When the user selects the green light
    Then the red light should be off
    And the yellow light should be off
    And the green light should be on

  Scenario: Automatic mode changes the active light over time
    Given the traffic light app is open
    When the user starts automatic mode
    Then the active light should change automatically
