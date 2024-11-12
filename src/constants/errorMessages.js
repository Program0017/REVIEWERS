const ERROR_MESSAGES = {
    EMAIL_IN_USE: "The provided email is already in use.",
    USERNAME_IN_USE: "The provided username is already in use.",
    REGISTRATION_FAILED: "An error occurred while registering the user.",
    INTERNAL_SERVER_ERROR: "An internal server error has occurred.",
    TAG_ASSIGN_FAILED: "An error occurred while assigning the tag to the user.",

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
    USER_ID_REQUIRED: "Required user id to update",

    REWARD_CREATION_FAILED: "An error occurred while creating the reward.",
    REWARD_UPDATE_FAILED: "An error occurred while updatin the reward.",
    REWARD_NOT_FOUND: "The specified reward could not be found.",
    REWARDS_NOT_FOUND: "No rewards were found.",
    REWARD_CLAIM_FAILED: "Failed to claim the reward",

    TAG_FAILED: "Failed to create the tag",
    TAG_ID_REQUIRED: "Tag id required",
    NO_TAGS_FOUND: "No tags were found.",
    TAGS_GET_FAILED: "Failed to get the tags",
    NO_TAGS_FOUND_FOR_USER: "No tags were found for this user",
    NO_TAGS_FOUND_FOR_BUSINESS: "No tags were found for this business",
    TAG_NOT_UPDATED: "Failed to updated the tag",

    CATEGORY_FAILED:"Failed to create the type",
    NO_TYPES_FOUND: "No types of this business were found",
    TYPES_GET_FAILED:  "Failed to get the business types",
    TYPE_NOT_UPDATED: "failed to update this Type of business successfully.",

    ACTION_POINT_CREATION_FAILED: "Failed to create the reward point",
    BUSINESS_NOT_UPDATED:  "Failed to updated the reward point",
    ACTION_POINTS_GET_FAILED: "Failed to get the reward points",
    ACTION_POINT_NOT_FOUND: "No reward point were found",

    INVALID_TOKEN_OR_PASSWORD_RESET_FAILED: "Failed to change the password",
    USER_CANNOT_REFER_THEMSELF: "User cannot refer themself",
    
};

module.exports = ERROR_MESSAGES;
