import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Post, User, Comment } from "../types";

function PostDetailPage() {
    
    const { id } = useParams<{ id: string }>();
    const { data: post, isLoading: postLoading, error: postError } = useFetch<Post>(id ? `https://jsonplaceholder.typicode.com/posts/${id}` : null)
    const { data: user, isLoading: userLoading, error: userError } = useFetch<User>(post ? `https://jsonplaceholder.typicode.com/users/${post.userId}` : null)
    const { data: comments, isLoading: commentsLoading, error: commentsError } = useFetch<Comment>(id ? `https://jsonplaceholder.typicode.com/comments/${post?.id}` : null)

    if (!id) return <p>No post found.</p>

    return (
        <>
            <h1>Post Detail</h1>
            {postLoading && <p>loading...</p>}

            {post && user && comments && (
                <>
                    <h2>{post.title}</h2>
                    <h3>By {user.name}</h3>
                    <p>{post.body}</p>
                    <h4>Comments</h4>
                    <p>{comments.body}</p>
                </>
            )}

            {postError && (
                <p>{postError}</p>
            )}
        </>
    );
}

export default PostDetailPage;