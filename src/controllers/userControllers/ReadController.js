const userService = require('../../services/userServices/userService');
const messageService = require('../../services/userServices/messageService');
const UserOutputDTO = require('../../dto/user/userOutputDTO');

const listOrSearchUsers = async (req, res) => {
    const { query } = req.query; // Get search parameter from query if it exists
    const page = parseInt(req.query.page) || 1; // Define the page, default is 1
    const pageSize = parseInt(req.query.pageSize) || 10; // Page size, default is 10

    try {
        let users;
        
        // If there's a search parameter, perform the search
        if (query) {
            users = await userService.searchUsers(query, page, pageSize);

            if (users.length === 0) {
                return res.status(404).json({ message: messageService.getErrorMessage('USERS_NOT_FOUND') });
            }
            const userResponse = UserOutputDTO.format(users);

            return res.status(200).json({
                message: messageService.getSuccessMessage('USERS_LISTED'), // Use messageService for success message
                userResponse,
                currentPage: page,
                totalResults: users.length,
            });
        } 
        
        users = await userService.getAllUsers();
        
        const userResponses = UserOutputDTO.format(users);

        return res.status(200).json({
            message: messageService.getSuccessMessage('RETRIEVED_ALL_USERS'), // Use messageService for success message
            userResponses,
        });

    } catch (error) {
        console.error(messageService.getErrorMessage('INTERNAL_SERVER_ERROR_SEARCH'), error);
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') }); // Use messageService for error message
    }
};

module.exports = {
    listOrSearchUsers,
};
