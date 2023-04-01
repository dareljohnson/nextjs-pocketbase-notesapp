import { Note } from '@/app/models/note';
import styles from '../notes.module.css';


async function getNote(id: string) {
    const response = await fetch(`http://127.0.0.1:8090/api/collections/notes/records/${id}`,
        { 
            next: { revalidate: 10 } 
        }
    );
    const note: Note = await response.json();
    return note;
}

export default async function NotePage({ params }: any) {
    const note = await getNote(params.id);

    return (
        <div>
            <h2 className="text-lg font-bold p-4 mb-4">note/{ note.id}</h2>
            <div className="w-94 h-full bg-yellow-200 p-4 m-2 rounded-md relative">
                <h3 className="text-lg font-bold mb-2 pb-2 border-b border-gray-300">{note.title}</h3>
                <p className="text-sm mb-4 min-h-max h-24">{note.content}</p>
                <p className="text-xs text-gray-800 pb-2 border-t border-gray-300 absolute bottom-0 right-0 mb-4 mr-4">{note.created}</p>
            </div>
        </div>
    )
}