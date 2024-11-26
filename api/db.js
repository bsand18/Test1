const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database initialization
const dbPath = path.resolve(process.cwd(), 'survey.db');
const db = new sqlite3.Database(dbPath);

// Create table if not exists
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS survey_responses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT,
            last_name TEXT,
            email TEXT,
            work TEXT,
            responsibilities TEXT,
            location TEXT,
            coding_rank INTEGER,
            requirements_rank INTEGER,
            testing_rank INTEGER,
            ui_design_rank INTEGER,
            project_management_rank INTEGER,
            experience TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

module.exports = db;
