

interface PageIndicatorProps {
    currentPage: number;
    totalPages: number
}

function PageIndicator({ currentPage, totalPages }: PageIndicatorProps) {


    return(
        <p>Page: {currentPage} of {totalPages}</p>
    );
}

export default PageIndicator;