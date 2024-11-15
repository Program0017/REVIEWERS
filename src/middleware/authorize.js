const Authorize = (...allowedRoles) => {
	return (req, res, next) => {
		const userRoles = req.user.roles.map(role => role.name);

		if (allowedRoles.some(role => userRoles.includes(role))) {
			return next();
		} else {
			return res.status(403).json({ error: 'Unauthorized: Insufficient permissions' });
		}
	}
}


const checkPermision = (permissionName) => {
	return (req, res, next) => {
		const userPermissions = req.user.roles.flatMap(role => role.permissions.map(perm => perm.name));

		// Check if the user has the required permission
		if (userPermissions.includes(permissionName)) {
			return next();
		} else {
			return res.status(403).json({ error: 'Unauthorized: Missing permission' });
		}
	};
};

module.exports = { authorize, checkPermission };
