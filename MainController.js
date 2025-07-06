const express = require('express')
const fs = require('fs')
const path = require('path')

const MainController = {
    getalljsoins: async (req, res) => {
        try {
            const dataDir = path.join(process.cwd(), 'data');
            fs.readdir(dataDir, (err, files) => {
                if (err) {
                    return res.json({ error: 'Failed to read directory' });
                }

                const jsonFiles = files.filter(file => file.endsWith('.json'));

                const fileDetails = jsonFiles.map(file => {
                    const filePath = path.join(dataDir, file);
                    const stats = fs.statSync(filePath);
                    const sizeKB = (stats.size / 1024).toFixed(2);

                    let count = 0;
                    try {
                        const content = fs.readFileSync(filePath, 'utf8');
                        const jsonData = JSON.parse(content);
                        count = Array.isArray(jsonData) ? jsonData.length : 0;
                    } catch (e) {
                        count = 0;
                    }

                    return {
                        name: file,
                        sizeKB,
                        count
                    };
                });

                res.json({ files: fileDetails });
            });
        }
        catch (err) {
            console.log(err)
            res.json({ error: 'Server error' });
        }
    }
};

module.exports = MainController;
