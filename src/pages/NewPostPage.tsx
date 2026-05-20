import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import type { User } from "../types";

function NewPostPage() {
    const { data: users, isLoading, error: usersError } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [errors, setErrors] = useState<{ title?: string; text?: string; author?: string }>({});
    const [success, setSuccess] = useState(false);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAuthor(e.target.value);
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: { title?: string; text?: string; author?: string } = {};

        if (title.trim().length < 5) newErrors.title = 'Title must be at least 5 characters';
        if (text.trim().length < 20) newErrors.text = 'Body must be at least 20 characters';
        if (author.length === 0) newErrors.author = 'Please select an author';

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;
        
        const authorUser = users?.find(user => user.name === author);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {  'Content-Type': 'application/json'  },
            body: JSON.stringify({ title, body: text, userId: authorUser?.id})
        });

        if (response.ok) {
            setTitle('');
            setText('');
            setAuthor('');
            setErrors({});

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }
    }


    return (
        <>
            <h1>New Post</h1>
            {isLoading && <p>loading...</p>}

            {users && (
                <>
                    <form onSubmit={handleSubmit}>
                        <input type="text" onChange={handleTitleChange} value={title} placeholder="Title"/>
                        {errors.title && <p>{errors.title}</p>}
                        <textarea onChange={handleTextChange} value={text} placeholder="Post details"/>
                        {errors.text && <p>{errors.text}</p>}
                        <select onChange={handleAuthorChange} value={author}>
                            <option value="">Select an Author</option>
                            {users.map(user => <option key={user.id} value={user.name}>{user.name}</option>)}
                        </select>
                        {errors.author && <p>{errors.author}</p>}
                        <button type="submit">Submit</button>
                    </form>
                    {success && <p>Post created successfully!</p>}
                </>
            )}

            {usersError && (
                <p>{usersError}</p>
            )}
            
        </>
    );
}

export default NewPostPage;