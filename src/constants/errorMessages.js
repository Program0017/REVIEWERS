const ERROR_MESSAGES = {
    EMAIL_IN_USE: "The provided email is already in use.",
    USERNAME_IN_USE: "The provided username is already in use.",
    REGISTRATION_FAILED: "An error occurred while registering the user.",
    INTERNAL_SERVER_ERROR: "An internal server error has occurred.",

    PROFILE_NOT_UPDATED: "An error occurred while updating the user profile.",

    UNAUTHORIZED_ACCESS: "Access denied. Token not provided.",

    USERS_NOT_FOUND: "No users found.",
    ERROR_FETCHING_USERS: "An error occurred while fetching the list of users.",

    SEARCH_INTERNAL_SERVER_ERROR: "An internal server error occurred during the user search.",
    REVIEW_CREATION_FAILED: "An error occurred while creating the review.",
    REVIEW_NOT_FOUND: "The specified review could not be found.",
    REVIEWS_NOT_FOUND: "No reviews were found.",
    TOGGLE_REVIEW_FAILED: "Failed to change the review status.",
    REVIEW_NOT_UPDATED: "Failed to update the review.",
    REVIEW_VALIDATION_FAILED:  "An error occurred while valadating the review for the business.",

    VOTE_ACTION_FAILED: "An error occurred while attempting to register or withdraw the vote.",

    REPORT_REASON_REQUIRED: "A reason for the report is required.",
    REPORT_ERROR: "An error occurred while reporting the review.",
    REPORT_NOT_FOUND: "The specified report could not be found.",
    UNREPORT_ERROR: "An error occurred while attempting to unreport the review.",

    
    BUSINESS_CREATION_FAILED: "An error occurred while creating the business.",
    BUSINESS_NOT_UPDATED: "Failed to update the business.",
    TOGGLE_BUSINESS_FAILED: "Failed to change the business status.",
    BUSINESSES_NOT_FOUND: "No business were found.",

    MISSING_SEARCH_PARAMETERS: "Not found search parameters",

    REWARD_CREATION_FAILED: "An error occurred while creating the reward.",
    REWARD_UPDATE_FAILED: "An error occurred while updatin the reward.",
    REWARD_NOT_FOUND: "The specified reward could not be found.",
    REWARDS_NOT_FOUND: "No rewards were found.",
    REWARD_CLAIM_FAILED: "Failed to claim the reward"
};

module.exports = ERROR_MESSAGES;
