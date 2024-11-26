
           import db from './db.js';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            first_name,
            last_name,
            email,
            work,
            responsibilities,
            location,
            coding,
            requirements,
            testing,
            ui_design,
            project_management,
            experience,
        } = req.body;

        const sql = `
            INSERT INTO survey_responses (
                first_name, last_name, email, work, responsibilities, location, 
                coding_rank, requirements_rank, testing_rank, ui_design_rank, 
                project_management_rank, experience
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            first_name,
            last_name,
            email,
            work,
            responsibilities,
            location,
            coding,
            requirements,
            testing,
            ui_design,
            project_management,
            experience,
        ];

        db.run(sql, values, function (err) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Database error' });
            } else {
                res.status(200).json({ success: true, id: this.lastID });
            }
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
