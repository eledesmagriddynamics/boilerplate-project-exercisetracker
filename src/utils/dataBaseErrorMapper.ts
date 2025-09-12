import { DatabaseError } from "../errors/DatabaseError";

export const mapDatabaseError = (error: any): Error => {
  if (error.code === 'SQLITE_CONSTRAINT') {
    if (error.message.includes('UNIQUE constraint failed')) {
      const field = error.message.match(/UNIQUE constraint failed: (\w+)\.(\w+)/)?.[2];
      return new DatabaseError(`${field || 'Field'} already exists`, 409);;
    }
  }

  return error;
};