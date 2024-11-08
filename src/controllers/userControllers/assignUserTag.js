const userService = require('../../services/userServices/userService');
const messageService = require('../../services/userServices/messageService');
const UserOutputDTO = require('../../dto/user/userOutputDTO');


const assignTag = async (req, res) => {
    const { userId, tagId } = req.body;

    console.log(req.body);
    
    try {
        const updatedUser = await userService.assignTagToUser(userId, tagId);
        
        const formattedUser = UserOutputDTO.format(updatedUser);


        res.status(200).json({
            message: messageService.getSuccessMessage('TAG_ASSIGNED_SUCCESSFULLY'),
            user: formattedUser,
        });
    } catch (error) {
        res.status(500).json({ message: messageService.getErrorMessage('INTERNAL_SERVER_ERROR') });
    }
};

module.exports = {
    assignTag,
};