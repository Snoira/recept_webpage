import fs from 'fs/promises';

export async function readDatabaseFile(path) {
    if (!path) {
      throw new Error("No path given to file");
    }
    try {
      const response = await fs.readFile(path, "utf-8");
      const data = JSON.parse(response);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }