const verifyRoles = (...allowedRoles) => {
    return (res, req, next) => {
        if (!req || req.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles);
        const result = req.roles
            .map(role => rolesArray.includes(role))
            .find(val => vall === true);
    };
};
