import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function openDb() {
    try {
        const db = await open({
            filename: './mydb.sqlite',
            driver: sqlite3.Database
        });

        // Check if the "notes" table exists, and if not, create it
        const query = `
            CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL
            )`;

        await db.exec(query); // This ensures the table exists without needing to manually create the file or table

        return db;
    } catch (error) {
        console.error('Could not open database', error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

export async function getNotes() {
    try {
        const db = await openDb();
        return db.all('SELECT * FROM notes');
    } catch (error) {
        console.error('Failed to fetch notes', error);
        throw error;
    }
}

export async function createNote(title, content) {
    try {
        const db = await openDb();
        await db.run('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content]);
    } catch (error) {
        console.error('Failed to create note', error);
        throw error;
    }
}

export async function updateNote(id, title, content) {
    try {
        const db = await openDb();
        await db.run('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, id]);
    } catch (error) {
        console.error('Failed to update note', error);
        throw error;
    }
}

export async function deleteNote(id) {
    try {
        const db = await openDb();
        await db.run('DELETE FROM notes WHERE id = ?', [id]);
    } catch (error) {
        console.error('Failed to delete note', error);
        throw error;
    }
}
