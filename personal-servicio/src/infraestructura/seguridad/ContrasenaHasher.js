import bcrypt from "bcrypt";

export default class ContrasenaHasher {
  constructor(saltRounds = 12) {
    this.saltRounds = saltRounds;
  }

  async hash(contrasena) {
    return bcrypt.hash(contrasena, this.saltRounds);
  }

  async verificar(contrasena, contrasenaHash) {
    return bcrypt.compare(contrasena, contrasenaHash);
  }
}