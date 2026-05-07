import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import type { User } from "../types";

function NewPostPage() {
    const { data: users, isLoading, error: usersError } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');

    const [title, setTItle] = useState('');
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTItle(e.target.value);
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAuthor(e.target.value);
    }


    return (
        <>
            <h1>New Post</h1>
            {isLoading && <p>loading...</p>}
            <h2>{author}</h2>

            {users && (
                <form>
                    <input type="text" onChange={handleTitleChange} placeholder="Title"/>
                    <textarea onChange={handleTextChange} placeholder="Post details" />
                    <select onChange={handleAuthorChange}>
                        {users.map(user => <option value={user.name}>{user.name}</option>)}
                    </select>
                </form>
            )}

            {usersError && (
                <p>{usersError}</p>
            )}
            
        </>
    );
}

export default NewPostPage;