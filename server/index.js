const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const activityRouter = require('./routes/activity');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/activity', activityRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
