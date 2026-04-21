import { useParams } from "react-router-dom";

function PostDetailPage() {
    
    const { id } = useParams<{ id: string }>();

    if (!id) return <p>No post found.</p>

    return (
        <>
            <h1>Post Detail</h1>
        </>
    );
}

export default PostDetailPage;