const UserService = require("../service/UserService.js");
const ApiError = require("../exceptions/ApiError.js");
const { isEmail, isStrongPassword } = require("validator");

class AuthController {
  async registration(req, res, next) {
    try {
      if (!isEmail(req.body.email)) {
        return next(ApiError.BadRequest("Ошибка при валидации email"));
      }
      if (
        !isStrongPassword(req.body.password, {
          minLength: 8,
          minLowercase: 0,
          minUppercase: 0,
          minNumbers: 0,
          minSymbols: 0,
          returnScore: false,
          pointsPerUnique: 0,
          pointsPerRepeat: 0,
        })
      ) {
        return next(ApiError.BadRequest("Ошибка при валидации password"));
      }
      const { email, password, isArtist } = req.body;
      const userData = await UserService.registration(
        email,
        password,
        isArtist,
        next
      );
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password, next);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      res.clearCookie("refreshToken");
      if (refreshToken) {
        const token = await UserService.logout(refreshToken, next);
        return res.json(token?.refresh_token);
      }
      throw ApiError.BadRequest("refreshToken not define");
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken, next);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AuthController();
