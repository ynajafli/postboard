import { useFetch } from "../hooks/useFetch";
import type { Post } from "../types";
import { useState } from "react";
import PageIndicator from "../components/PageIndicator";
import PaginationControls from "../components/PaginationControls";
import { Link } from "react-router-dom";

function HomePage() {
    const { data, isLoading, error } = useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts");
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 10;
    const visiblePosts = data ? data.slice((PAGE_SIZE * currentPage) - PAGE_SIZE, PAGE_SIZE * currentPage) : []
    const totalPages = data ? Math.ceil(data.length / PAGE_SIZE) : 0
    

    return (
        <>
            <h1>Home</h1>
            {isLoading && <p>loading...</p>}

            {data && (
                <>
                    <PageIndicator currentPage={currentPage} totalPages={totalPages} />
                    <ul>
                        {visiblePosts.map(post => (
                            <li key={post.id}><Link to={`/posts/${post.id}`}>{post.title}</Link></li>
                        ))}
                    </ul>
                    <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
                </>
            )}

            {error && (
                <p>{error}</p>
            )}
        </>
    );
}

export default HomePage;