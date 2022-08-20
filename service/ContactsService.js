const { models } = require("../models/models-export.js");
const ApiError = require("../exceptions/ApiError.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

function getSearchParams(searchObj) {
  let obj;
  if (!searchObj) {
    return {};
  }
  if (Object.keys(searchObj).length !== 0) {
    Object.keys(searchObj).forEach((key) => {
      let add = {};
      add[key] = { [Op.like]: `%${searchObj[key]}%` };
      obj = {
        ...obj,
        ...add,
      };
    });
    return obj;
  }
  return {};
}

class ContactsService {
  static async getContacts(page, limit, searchObj, id) {
    function getPage(page, limitForPage) {
      const offset = page * limitForPage - limitForPage;
      return offset;
    }
    const offset = getPage(page, limit);
    let searchParams = getSearchParams(searchObj);
    return models.contacts.findAndCountAll({
      offset: offset,
      limit: limit,
      order: [["name", "ASC"]],
      where: {
        ...searchParams,
        fk_id_user: id,
      },
    });
  }

  static async putContact(puttedContact, id_user) {
    try {
      const { id_contact } = puttedContact;
      puttedContact.fk_id_user = id_user;
      delete puttedContact.id_contact;
      const user = await models.contacts.update(puttedContact, {
        where: {
          id_contact: id_contact,
        },
      });
      if (user[0] === 1) {
        return true;
      } else {
        throw ApiError.DatabaseError("No contacts has been updated");
      }
    } catch (e) {
      throw e;
    }
  }
  static async addContact(id_user) {
    try {
      return models.contacts.create({
        fk_id_user: id_user,
      });
    } catch (e) {
      throw e;
    }
  }
  static async deleteContact(data) {
    try {
      return models.contacts.destroy({
        where: {
          id_contact: data.id_contact,
          fk_id_user: data.id_user,
        },
      });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = ContactsService;
