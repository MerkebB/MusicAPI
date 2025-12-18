const express = require('express');
const ejs = require('ejs');
const songSchema = require('../model/songs');

exports.getLandingPage = async (req, res) => {
    res.render('landing.ejs');
}

exports.getAllSongs = async (req, res) => {
    try {
        const songs = await songSchema.find();
        res.status(200).json(songs);
    } catch (err) {
        console.log(`error while loading songs: ${err}`);
        res.status(500).json({ message: err });
    }
}
exports.getSongByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const song = await songSchema.findOne({ title: title });
        if (!song) {
            return res.status(404).json({ message: "The song you're trying to search is not uploaded yet!" });
        }
        res.status(200).json(song);
    } catch (err) {
        console.log(`erorr while searching for a song by it's title:  ${err}`);
        res.status(500).json({ message: err });
    }
}