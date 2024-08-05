const express = require('express');
const authRoutes = require('./auth');

exports.routesInit = (app) => {
    app.use('/api/auth', authRoutes);
    app.use("*", (req, res) => {
        res.status(404).json({ msg: "Page/endpoint not found, 404" });
    });
}
