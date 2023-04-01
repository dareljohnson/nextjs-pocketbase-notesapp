import { useState, useEffect } from 'react';
import { Note } from '../models/note';

const notesList: Note[] = [];

export default function useGetNotes() {
  const [notes, setNotes] = useState(notesList);

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch('http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30');

      // Recommendation: handle errors
      if (!response.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to fetch data');
      }

      const notes = await response.json();
      setNotes(notes?.items);
    };

    fetchNotes();
  }, []);
    return notes;
}