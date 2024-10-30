    const SUCCESSFULL_MESSAGES = require('../../constants/successfullMessages');
    const { revokeToken } = require('../../utils/revokedTokens'); 

    const logoutUser = async (req, res) => {
        const token = req.headers['authorization']?.split(' ')[1];

        if (token) {
            revokeToken(token);
        }

        res.status(200).json({
            message: SUCCESSFULL_MESSAGES.LOGOUT_SUCCESSFULLY,
        });
    };

    module.exports = {
        logoutUser,
    };
