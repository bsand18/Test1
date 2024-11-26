import { MongoClient } from 'mongodb';

// MongoDB URI (Replace with your own URI from Atlas)
const uri = 'mongodb+srv://bsand:<aJbrh0EcRTvpqWAC@surveyproject.7iq3i.mongodb.net/?retryWrites=true&w=majority&appName=SurveyProject';
const client = new MongoClient(uri);

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

        try {
            // Connect to MongoDB
            await client.connect();
            const database = client.db('SurveyProject');  // Use the name of your database
            const collection = database.collection('survey_responses');

            // Insert the survey response
            const result = await collection.insertOne({
                first_name,
                last_name,
                email,
                work,
                responsibilities,
                location,
                coding_rank: coding,
                requirements_rank: requirements,
                testing_rank: testing,
                ui_design_rank: ui_design,
                project_management_rank: project_management,
                experience,
            });

            // Respond with success
            res.status(200).json({ success: true, id: result.insertedId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database error' });
        } finally {
            // Close the connection
            await client.close();
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

         
           
