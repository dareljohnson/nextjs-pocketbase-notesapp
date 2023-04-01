'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function CreateNote() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [charCount, setCharCount] = useState(0);

    const router = useRouter();
    
    const handleContentChange = (event:any) => {
        const input = event.target.value;
        if (input.length <= 150) {
            setContent(input);
            setCharCount(input.length);
        }
    };
    
    const isDisabled = charCount > 150;

    const create = async (e: any) => {
        e.preventDefault();
        
        await fetch('http://127.0.0.1:8090/api/collections/notes/records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                content,
            }),
        });

        setContent('');
        setTitle('');

        router.refresh();
        window.location.reload()
    }

    return (
        <div className='m-2 p-2'>
            <form onSubmit={create}>
                <h3 className='text-2xl font-bold'>Create a new Note</h3>
                <input type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <textarea 
                    placeholder="Type your content here..."
                    value={content}
                    onChange={handleContentChange}
                    style={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        height: "150px",
                        overflowY: "auto",
                    }}
                    className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="mb-2">Character count: {charCount}/150</p>
                <button type="submit" disabled={isDisabled} className="block w-64 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create note</button>
            </form>
        </div>
    );
}