const Router = require("express").Router;
const router = new Router();
const AuthMiddleware = require("../middlewares/AuthMiddleware.js");
const checkAdminRole = AuthMiddleware.checkAdminRole.bind(AuthMiddleware);
const AdminPC = require("../controllers/AdminPanelController.js");

/* user */
router.post("/get-contacts", checkAdminRole, AdminPC.getContacts);
router.post("/add-contact", checkAdminRole, AdminPC.addContact);
router.post("/delete-contact", checkAdminRole, AdminPC.deleteContact);
router.put("/put-contact", checkAdminRole, AdminPC.putContact);

module.exports = router;
