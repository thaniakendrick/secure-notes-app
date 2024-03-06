import { getNotes, createNote } from '../../../lib/db';
import { encryptText, decryptText } from '../../../lib/encryption';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const notes = await getNotes();
    // Decrypt content before sending it back
    const decryptedNotes = notes.map(note => ({
      ...note,
      content: decryptText(note.content)
    }));
    res.status(200).json(decryptedNotes);
  } else if (req.method === 'POST') {
    // Encrypt content before saving
    const { title, content } = req.body;
    const encryptedContent = encryptText(content);
    await createNote(title, encryptedContent);
    res.status(201).send({ message: 'Note created' });
  }
}
