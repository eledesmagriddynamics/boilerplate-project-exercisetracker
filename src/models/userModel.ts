export class UserModel {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  async createUser(username: string) {
    const result = await this.db.run(
      'INSERT INTO users (username) VALUES (?)',
      username
    );
    return { username, _id: result.lastID };
  }

  async getAllUsers() {
    return this.db.all('SELECT id as _id, username FROM users');
  }
}