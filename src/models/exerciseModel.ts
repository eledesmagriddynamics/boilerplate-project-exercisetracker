import { CreateExerciseRequest, Exercise } from "../interfaces";

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

  async createExercise(userId: number, exercise: CreateExerciseRequest): Promise<Exercise> {
    const { description, duration, date } = exercise;
    
    const result = await this.db.run(
      'INSERT INTO exercises (user_id, description, duration, date) VALUES (?, ?, ?, ?)',
      [userId, description, duration, date]
    );
    
    return await this.getExerciseById(result.lastID);
  }

  async getUserExercises(userId: number, options: {
    from?: string;
    to?: string;
    limit?: number;
  } = {}): Promise<Exercise[]> {
    let query = 'SELECT * FROM exercises WHERE user_id = ?';
    const params: any[] = [userId];

    // Add date filters
    if (options.from) {
      query += ' AND date >= ?';
      params.push(options.from);
    }

    if (options.to) {
      query += ' AND date <= ?';
      params.push(options.to);
    }
 
    query += ' ORDER BY id DESC';

    // Add limit
    if (options.limit && options.limit > 0) {
      query += ' LIMIT ?';
      params.push(options.limit);
    }

    return await this.db.all(query, params);
  }

  async getUserExerciseCount(userId: number, options: {
    from?: string;
    to?: string;
  } = {}): Promise<number> {
    let query = 'SELECT COUNT(*) as count FROM exercises WHERE user_id = ?';
    const params: any[] = [userId];

    // Add date filters
    if (options.from) {
      query += ' AND date >= ?';
      params.push(options.from);
    }

    if (options.to) {
      query += ' AND date <= ?';
      params.push(options.to);
    }

    const result = await this.db.get(query, params);
    return result.count;
  }
}