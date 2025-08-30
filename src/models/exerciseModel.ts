export class ExerciseModel {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  private async getExerciseById(id: number) {
    return await this.db.get(
      'SELECT * FROM exercises WHERE id = ?',
      [id]
    );
  }

  async createExercise(userId: number, exercise: any) {
    const { description, duration, date } = exercise;
    
    const result = await this.db.run(
      'INSERT INTO exercises (user_id, description, duration, date) VALUES (?, ?, ?, ?)',
      [userId, description, duration, date]
    );
    
    return await this.getExerciseById(result.lastID);
  }
}