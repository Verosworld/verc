
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.resolve(process.cwd(), 'keys.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(fileContent);
}
