import { Exercise } from "./exercise";
import { User } from "./userInterface";

export interface UserExerciseLog extends User {
  count: number;
  log: Exercise[];
}

export interface ExerciseLogQuery {
  from?: string;  // YYYY-MM-DD format
  to?: string;    // YYYY-MM-DD format
  limit?: string; // Will be converted to number
}
