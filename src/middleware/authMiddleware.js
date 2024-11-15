const ERROR_MESSAGES = require('../constants/errorMessages');
const { verifyToken } = require('../utils/jwtUtils');
const { isTokenRevoked } = require('../utils/revokedTokens'); // Asegúrate de usar el mismo archivo de revokedTokens
const userService = require('../services/userServices/userService'); // Import the user service

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]?.trim(); // Extraer token del header

    if (!token) {
        return res.status(401).json({ message: ERROR_MESSAGES.UNSUCCESFULLY_LOGIN_NO_TOKEN }); // No hay token
    }

    if (isTokenRevoked(token)) {
        return res.status(401).json({ message: 'Invalid or revoked token.' }); // Token is revoked
    }

    try {
        const verifiedUser = verifyToken(token); // Verificar el token
        
        const user = await userService.findUserWithRolesAndPermissions(decoded.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found.' }); // User does not exist
        }

        req.user = user;
        req.roles = user.roles;
        req.user = verifiedUser; // Asignar el usuario verificado al request
        next(); // Continuar con la solicitud
    } catch (error) {
        res.status(400).json({ message: 'Token no válido.' }); // Token inválido
    }
};

module.exports = authMiddleware;
