
import fs from 'fs';
import path from 'path';

const ADMIN_PASSWORD = 'yourpassword123';

export default function handler(req, res) {
  const { key, pass } = req.query;

  if (pass !== ADMIN_PASSWORD) {
    return res.status(401).send('Unauthorized');
  }

  if (!key) return res.status(400).send('Missing key');

  const filePath = path.resolve(process.cwd(), 'keys.txt');
  const content = fs.readFileSync(filePath, 'utf-8');
  const filtered = content
    .split('\n')
    .filter(line => !line.startsWith(key + '|'))
    .join('\n');

  fs.writeFileSync(filePath, filtered.trim());
  res.status(200).send('Key deleted');
}
