const express = require('express');
const dotnev = require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../model/users');

exports.postSignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await user.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "this user already exists" });
        }
        const hashedPassword = await bcrypt
            .hash(password, 5);
        const newUser = new user({
            username: username,
            email: email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(200).json({ message: "user registered successfully!" });
    } catch (err) {
        console.log(`error while registering user : ${err}`);
        res.status(500).json({ message: err });
    }
}

exports.postLogin = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await user.findOne({ username });
        if (!existingUser) {
            return res.status(404).json({ message: "user not found! you need to signup first" });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "incorrect password" });
        }
        const payLoad = {
            id: existingUser._id,
            email: existingUser.email,
            username: existingUser.username
        };
        const token = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: '10m' });
        res.json({ token: token });
    } catch (err) {
        console.log(`errorwhile logging in: ${err}`);
        res.status(500).json({ message: err });
    }
}
