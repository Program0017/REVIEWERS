const UserTagService = require('../../../services/AuxiliarServices/UserTagsServices/UserTagService');
const messageService = require('../../../services/userServices/messageService');

const getUserTagsByUserId = async (req, res) => {

    const  userId  = req.body.user_id; // Extract user_id from the request parameters

    try {
        // Call the service to get all tags for the specific user_id
        const tags = await UserTagService.getTagsByUserId(userId);

        // Check if the user has tags
        if (!tags || tags.length === 0) {
            return res.status(404).json({ message: messageService.getErrorMessage('NO_TAGS_FOUND_FOR_USER') });
        }
        
        // Return the tags with a success message
        return res.status(200).json({
            message: messageService.getSuccessMessage('USER_TAGS_RETRIEVED_SUCCESSFULLY'),
            tags,
        });

    } catch (error) {
        console.error(messageService.getErrorMessage('TAGS_GET_FAILED'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    getUserTagsByUserId,
};