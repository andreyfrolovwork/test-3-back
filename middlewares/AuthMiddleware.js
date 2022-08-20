const ApiError = require("../exceptions/ApiError.js");
const tokenService = require("../service/TokenService.js");

class AuthMiddleware {
  static async #check(req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return next(ApiError.UnauthorizedError());
      }
      const accessToken = authorizationHeader.split(" ")[1];
      if (!accessToken) {
        return next(ApiError.UnauthorizedError());
      }
      const userData = tokenService.validateAccessToken(accessToken);
      req.user = userData;
      return userData;
    } catch (e) {
      return false;
    }
  }

  static async checkArtistRole(req, res, next) {
    const userData = await this.#check(req, res, next);
    if (userData && userData.role !== "artist") {
      return next(ApiError.NotEnoughRightsError());
    } else if (!userData) {
      next(ApiError.UnauthorizedError());
    } else {
      next();
    }
  }

  static async checkAdminRole(req, res, next) {
    const userData = await this.#check(req, res, next);
    if (userData && userData.role !== "admin") {
      return next(ApiError.NotEnoughRightsError());
    } else if (!userData) {
      next(ApiError.UnauthorizedError());
    } else {
      next();
    }
  }
}

module.exports = AuthMiddleware;
