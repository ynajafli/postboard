
interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function PaginationControls( {currentPage, totalPages, onPageChange }: PaginationControlsProps ) {
    
    return(
        <>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            <button onClick={() => onPageChange(currentPage -1)} disabled={currentPage === 1} >Previous</button>
        </>
    );
}

export default PaginationControls;