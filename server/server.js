require("dotenv").config({path:"./.env"});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const itemRoutes = require("./routes/ItemRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const volunteerRoutes = require("./routes/VolunteerRoutes");

const app = express();
const port = process.env.PORT;
const db_url = process.env.DB_URL;

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(value => console.log(`Connection to ${db_url} has been established successfully.`))
    .catch(err => console.log(`Error: ${err}`));

app.use(cors());
app.use(express.json());
app.use('/item', itemRoutes);
app.use('/category', categoryRoutes);
app.use('/volunteer', volunteerRoutes);

app.listen(port, () => {
    console.log(`Listening on localhost: ${port}`);
});