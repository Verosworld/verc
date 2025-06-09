
import fs from 'fs';
import path from 'path';

const ADMIN_PASSWORD = 'yourpassword123';

export default function handler(req, res) {
  const { key, duration, pass } = req.query;

  if (pass !== ADMIN_PASSWORD) {
    return res.status(401).send('Unauthorized');
  }

  if (!key || !duration) return res.status(400).send('Missing params');

  const filePath = path.resolve(process.cwd(), 'keys.txt');
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n');

  const exists = lines.some(line => line.startsWith(key + '|'));
  if (exists) return res.status(409).send('Key already exists');

  fs.appendFileSync(filePath, `\n${key}|${duration}`);
  res.status(200).send('Key added');
}
