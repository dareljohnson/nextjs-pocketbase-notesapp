"use client";

import Link from "next/link";
import styles from './notes.module.css';
import CreateNote from './createNote';
import { Fragment, useState } from "react";
import Modal from "../components/modal";
import { Note } from "../models/note";
import useGetNotes from "../hooks/uesGetNotes";


function NotesPage() {
  const [showModal, setShowModal] = useState(false);
  const notes = useGetNotes();

  return (
    <div>
        <div className="flex justify-between">
            <h1 className='text-2xl font-bold p-4'>Notes</h1>
            <button className="h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold m-3 py-2 px-4 rounded float-right"
            onClick={() => setShowModal(true)}
            >Create Note
            </button>
        </div>
        <div className="flex flex-wrap">
            { notes?.map((note:Note) => {
                return <Note key={note.id} note={note} />;
            })
            }
        </div>
        <Fragment>
            <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
                <CreateNote />
            </Modal>
        </Fragment> 
    </div>
  )
}   

function Note({ note }: any) {
    const { id, title, content , created} = note || {};
    const createdDate = new Date(created).toLocaleString();

    return (
        <Link href={`/notes/${id}`}>
            <div className="w-80 h-64 bg-yellow-200 p-4 m-2 rounded-md relative">
                <h3 className="text-lg font-bold mb-2 pb-2 border-b border-gray-300">{title}</h3>
                <p className="text-sm mb-4">{content}</p>
                <p className="text-xs text-gray-800 pb-2 border-t border-gray-300 absolute bottom-0 right-0 mb-4 mr-4">{createdDate}</p>
            </div>
        </Link>
    )
}

export default NotesPage;

