module.exports = class UserDto {
  email;
  id_user;
  role;

  constructor(model) {
    this.email = model.email;
    this.id_user = model.id_user;
    this.role = model.role;
  }
};
