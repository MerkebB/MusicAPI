const express = require('express');
const ejs = require('ejs');
const songSchema = require('../model/songs');
const uploading = require('../middleware/upload');

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
        const title = req.query.title ? req.query.title.trim() : '';
        if (!title) {
            return res.status(400).json({ message: "No song title provided" });
        }
        const song = await songSchema.findOne({ title: new RegExp(`^${title.trim()}$`, 'i') });
        if (!song) {
            return res.status(404).json({ message: "The song you're trying to search is not uploaded yet!" });
        }
        res.status(200).json(song);
    } catch (err) {
        console.log(`error while searching for a song by its title:  ${err}`);
        res.status(500).json({ message: err });
    }
}

exports.deleteSong = async (req, res) => {
    const title = req.query.title ? req.query.title.trim() : '';
    if (!title) {
        return res.status(400).json({ message: "No song title provided" });
    }

    const song = await songSchema.findOne({ title: new RegExp(`^${title.trim()}$`, 'i') });
    if (!song) {
        return res.status(404).json({ message: "this song is not found!" });
    }
    try {
        await songSchema.deleteOne({ title });
        res.status(200).json({ message: "song deleted successfully!" });
    } catch (err) {
        console.log(`error while deleting a song ${err}`);
        res.status(500).json({ message: err });
    }
}


exports.postUpload = async (req, res) => {
    try {
        const { title, artist } = req.body;
        const file = req.file;
        if (!title || !artist || !file) {
            return res.status(404).json({ message: "enter the title, artist name  or upload the audio" });
        }
        const song = new songSchema({
            title: title,
            artist: artist,
            filePath: file.path
        });
        await song.save();
        res.status(200).json({ message: "song uploaded successfully!" });
    } catch (err) {
        console.log(`error while uploading the audio ${err}`);
        res.status(500).json({ message: err });
    }
};
