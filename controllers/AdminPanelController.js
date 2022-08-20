const UserService = require("../service/UserService.js");
const ApiError = require("../exceptions/ApiError.js");
const ContactsService = require("../service/ContactsService.js");

class AdminPanelController {
  static async getContacts(req, res, next) {
    try {
      let { page, limit, searchObj } = req.body;
      console.log(req.body);
      if (!page) {
        page = 1;
      }
      if (!limit) {
        limit = 10;
      }

      const users = await ContactsService.getContacts(page, limit, searchObj, req.user.id_user);
      res.json(users);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  static async putContact(req, res, next) {
    try {
      const { id_contact, name, phone } = req.body;
      const { id_user } = req.user;

      const user = await ContactsService.putContact(
        {
          id_contact,
          name,
          phone,
        },
        id_user
      );
      res.json(user);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  static async addContact(req, res, next) {
    try {
      const { id_user } = req.user;
      const user = await ContactsService.addContact(id_user);
      res.json("good");
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  static async deleteContact(req, res, next) {
    try {
      const { id_user } = req.user;
      const { id_contact } = req.body;
      await ContactsService.deleteContact({
        id_user,
        id_contact,
      });
      res.json("good");
    } catch (e) {
      next(e);
    }
  }
}

module.exports = AdminPanelController;
