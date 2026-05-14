const logoutController = {};

logoutController.logout = async (req, res) => {
    try {
        res.clearCookie ("authcookie");
        
        return res.status(200).json({ message: "sesión cerrada"});
    } catch (error) {} 
};

export default logoutController;