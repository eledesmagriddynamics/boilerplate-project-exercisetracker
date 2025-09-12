export interface Exercise {
  id: number;
  user_id: number;
  description: string;
  duration: number;
  date: string; // ISO date string (YYYY-MM-DD)
}

export interface ExerciseResponse {
  userId: number;
  exerciseId: number;
  description: string;
  duration: number;
  date: string; // Formatted date string (e.g., "Mon Jan 01 1990")
}

export interface CreateExerciseRequest {
  description: string;
  duration: number;
  date?: string;
}