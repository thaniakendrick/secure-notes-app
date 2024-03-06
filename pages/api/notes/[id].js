import { getNoteById, updateNote, deleteNote } from '../../../lib/db';
import { encryptText, decryptText } from '../../../lib/encryption';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const note = await getNoteById(id);
    note.content = decryptText(note.content);
    res.status(200).json(note);
  } else if (req.method === 'PUT') {
    const { title, content } = req.body;
    await updateNote(id, title, encryptText(content));
    res.status(200).send({ message: 'Note updated' });
  } else if (req.method === 'DELETE') {
    await deleteNote(id);
    res.status(200).send({ message: 'Note deleted' });
  }
}
