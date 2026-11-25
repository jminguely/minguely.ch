'use strict';

const fs = require('fs');
const path = require('path');
const strapi = require('@strapi/strapi');

const CREDIT_UID = 'api::credit.credit';
const DEFAULT_DATA_PATH = path.join(__dirname, 'data', 'credit.json');

/**
 * Converts a DD.MM.YY date string to ISO YYYY-MM-DD format.
 */
function parseCreditDate(dateStr) {
  const match = /^(\d{2})\.(\d{2})\.(\d{2})$/.exec(String(dateStr || '').trim());
  if (!match) {
    throw new Error(`Invalid date format "${dateStr}" (expected DD.MM.YY)`);
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = 2000 + Number(match[3]);

  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error(`Invalid calendar date "${dateStr}"`);
  }

  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

/**
 * Normalizes a DB date value (string or JS Date) to YYYY-MM-DD.
 */
function normalizeDbDate(value) {
  if (value instanceof Date) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return String(value || '').slice(0, 10);
}

function makeCreditKey(title, date, location) {
  return `${String(title || '').trim()}\0${normalizeDbDate(date)}\0${String(location || '').trim()}`;
}

async function migrateCredits() {
  const inputPath = process.argv[2]
    ? path.resolve(process.cwd(), process.argv[2])
    : DEFAULT_DATA_PATH;

  if (!fs.existsSync(inputPath)) {
    throw new Error(`Credit JSON file not found at: ${inputPath}`);
  }

  const rawCredits = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  if (!Array.isArray(rawCredits)) {
    throw new Error('Expected credit JSON to contain an array of entries');
  }

  const normalizedCredits = rawCredits.map((item, index) => {
    const title = typeof item.title === 'string' ? item.title.trim() : '';
    const location = typeof item.location === 'string' ? item.location.trim() : '';
    if (!title || !location || !item.date) {
      throw new Error(`Missing required field at index ${index}: ${JSON.stringify(item)}`);
    }

    return {
      title,
      date: parseCreditDate(item.date),
      location,
    };
  });

  const backendDir = path.resolve(__dirname, '..');
  const app = await strapi({
    appDir: backendDir,
    distDir: backendDir,
  }).load();

  try {
    const existing = await app.db.query(CREDIT_UID).findMany({
      select: ['title', 'date', 'location'],
    });

    const existingKeys = new Set(
      existing.map((entry) => makeCreditKey(entry.title, entry.date, entry.location))
    );

    const publishedAt = new Date();
    let created = 0;
    let skipped = 0;

    for (const credit of normalizedCredits) {
      const key = makeCreditKey(credit.title, credit.date, credit.location);
      if (existingKeys.has(key)) {
        skipped += 1;
        continue;
      }

      await app.entityService.create(CREDIT_UID, {
        data: {
          ...credit,
          publishedAt,
        },
      });
      existingKeys.add(key);
      created += 1;
    }

    console.log(
      `Credit migration complete: ${created} created, ${skipped} skipped (${normalizedCredits.length} total in source).`
    );
  } finally {
    await app.destroy();
  }
}

migrateCredits()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Credit migration failed:', error);
    process.exit(1);
  });
