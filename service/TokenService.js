const jwt = require("jsonwebtoken");
const { models } = require("../models/models-export.js");
const ApiError = require("../exceptions/ApiError.js");

// noinspection JSUnusedLocalSymbols
class TokenService {
  generateTokens(payload) {
    // noinspection JSCheckFunctionSignatures
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.EXPIRES_IN_ACCESS_TOKEN,
    });
    // noinspection JSCheckFunctionSignatures
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  id_artist_contract;

  validateAccessToken(token) {
    try {
      // noinspection JSCheckFunctionSignatures
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      // noinspection JSCheckFunctionSignatures
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    try {
      const update = await models.tokens.update(
        {
          fk_user_id: userId,
          refresh_token: refreshToken,
        },
        {
          where: {
            fk_user_id: userId,
          },
        }
      );
      const notExist = update["0"] === 0;
      if (notExist) {
        const create = await models.tokens.create({
          fk_user_id: userId,
          refresh_token: refreshToken,
        });
      }
    } catch (e) {
      throw ApiError.DatabaseError("Error at save token");
    }
  }

  async removeToken(refreshToken, next) {
    try {
      // noinspection JSCheckFunctionSignatures
      const oldToken = await models.tokens.findOne({
        where: {
          refresh_token: refreshToken,
        },
      });
      if (oldToken) {
        await oldToken.destroy();
      }
      return oldToken;
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TokenService();
