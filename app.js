const express = require('express');
const mongoose = require('mongoose');
const app = express();
const fileUpload = require('express-fileupload');
const path = require('path');
const { userRouter, authRouter } = require('./routers');

const { constants } = require('./constants');
_mongooseConnector();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload({}));
app.use('/users', userRouter);
app.use('/auth', authRouter);


app.use(_handleErrors);
app.listen(constants.PORT, () => {
    console.log(`App has been started on port ${constants.PORT}...`);
});

function _handleErrors(err, req, res, next) {
    res
        .status(err.status || 200)
        .json({
            message: err.message || 'Unknown error',
            customCode: err.code || 0,
        });
}

function _mongooseConnector() {
    mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true });
}