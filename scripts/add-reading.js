#!/usr/bin/env node
/**
 * Usage: node scripts/add-reading.js <url> [date]
 * Example: node scripts/add-reading.js https://example.com/article
 * Example: node scripts/add-reading.js https://example.com/article 2025-12-09
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function extractMetadata(html, url) {
    const $ = cheerio.load(html);

    // Try various sources for title
    const title =
        $('meta[property="og:title"]').attr('content') ||
        $('meta[name="twitter:title"]').attr('content') ||
        $('title').text() ||
        'Untitled';

    // Try various sources for author
    const author =
        $('meta[name="author"]').attr('content') ||
        $('meta[property="article:author"]').attr('content') ||
        $('meta[property="og:author"]').attr('content') ||
        null;

    // Try various sources for published date
    const publishedDate =
        $('meta[property="article:published_time"]').attr('content') ||
        $('meta[name="date"]').attr('content') ||
        $('meta[property="og:published_time"]').attr('content') ||
        $('time[datetime]').attr('datetime') ||
        null;

    return {
        url,
        title: title.trim(),
        author: author ? author.trim() : null,
        publishedDate: publishedDate ? publishedDate.split('T')[0] : null,
    };
}

async function addReading(url, customDate) {
    console.log(`Fetching metadata for: ${url}`);

    // Fetch the page
    const response = await fetch(url);
    const html = await response.text();

    // Extract metadata
    const metadata = await extractMetadata(html, url);

    // Prepare entry
    const entry = {
        ...metadata,
        addedDate: customDate || new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };

    console.log('Extracted metadata:', entry);

    // Ensure data directory exists
    const dataDir = join(__dirname, '..', 'data');
    try {
        mkdirSync(dataDir, { recursive: true });
    } catch (err) {
        // Directory already exists
    }

    // Read existing data
    const dataPath = join(dataDir, 'reading.json');
    let readings = [];

    try {
        const fileContent = readFileSync(dataPath, 'utf-8');
        readings = JSON.parse(fileContent);
    } catch (err) {
        console.log('No existing reading.json found, creating new one.');
        readings = [];
    }

    // Add new entry at the beginning (reverse chronological)
    readings.unshift(entry);

    // Sort by addedDate (most recent first)
    readings.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));

    // Write back
    writeFileSync(dataPath, JSON.stringify(readings, null, 2));
    console.log(`✅ Added to reading log!`);
}

// Parse CLI arguments
const args = process.argv.slice(2);
const url = args[0];
const customDate = args[1];

if (!url) {
    console.error('Usage: node scripts/add-reading.js <url> [date]');
    process.exit(1);
}

addReading(url, customDate).catch((err) => {
    console.error('Error:', err);
    process.exit(1);
});
