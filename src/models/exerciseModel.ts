export class ExerciseModel {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  async createExercise(userId: number, exercise: any) {
    const { description, duration, date } = exercise;
    await this.db.run(
      'INSERT INTO exercises (user_id, description, duration, date) VALUES (?, ?, ?, ?)',
      [userId, description, duration, date || new Date().toISOString()]
    );
  }
}