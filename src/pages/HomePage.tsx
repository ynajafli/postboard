import { useFetch } from "../hooks/useFetch";
import type { Post } from "../types";

function HomePage() {
    const { data, isLoading, error } = useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts");
    
    return (
        <>
            <h1>Home</h1>
            {isLoading && <p>loading...</p>}

            {data && (
                <ul>
                    {data.map(post => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            )}

            {error && (
                <p>{error}</p>
            )}
        </>
    );
}

export default HomePage;