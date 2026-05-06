import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Post, User, Comment } from "../types";

function PostDetailPage() {
    
    const { id } = useParams<{ id: string }>();
    const { data: post, isLoading: postLoading, error: postError } = useFetch<Post>(id ? `https://jsonplaceholder.typicode.com/posts/${id}` : null)
    const { data: user, isLoading: userLoading, error: userError } = useFetch<User>(post ? `https://jsonplaceholder.typicode.com/users/${post.userId}` : null)
    const { data: comments, isLoading: commentsLoading, error: commentsError } = useFetch<Comment[]>(post ? `https://jsonplaceholder.typicode.com/posts/${post.id}/comments` : null)

    if (!id) return <p>No post found.</p>

    return (
        <>
            <Link to='/'>Back</Link>
            <h1>Post Detail</h1>
            {(postLoading || userLoading || commentsLoading) && <p>loading...</p>}

            {post && user && comments && (
                <>
                    <h2>{post.title}</h2>
                    <h3>By {user.name}</h3>
                    <p>{post.body}</p>
                    <h4>Comments</h4>
                    {comments.map(comment => (
                        <li key={comment.id}>{comment.body}</li>
                    ))}
                </>
            )}

            {postError && (
                <>
                    <p>post error:</p>
                    <p>{postError}</p>
                </>
            )}

            {userError && (
                <>
                    <p>user error:</p>
                    <p>{userError}</p>
                </>
            )}

            {commentsError && (
                <>
                    <p>comments error:</p>
                    <p>{commentsError}</p>
                </>
            )}
        </>
    );
}

export default PostDetailPage;