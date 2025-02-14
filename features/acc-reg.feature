Feature: Register page
    # As an unauthentified user, I can access to the registration page
    # More informations : https://saas-bedrock-streaming.henix.com/squash/requirement-workspace/high-level-requirement/877/content?anchor=information

    Background: Accept all coockies
        # As a M6 user I accept all site coockies
        Given I use the client "m6"
        And I visit path "home"
        And I accept coockies's site

    Scenario: TC01
        # As a non authentified user on the player lock page I can register
        # Test case : https://saas-bedrock-streaming.henix.com/squash/test-case-workspace/test-case/detail/5331/content?anchor=information

        Given I visit path "registration"

        Then I should have "inscription" in url 
        And I should see an element with role "heading" and name "Créer un compte"