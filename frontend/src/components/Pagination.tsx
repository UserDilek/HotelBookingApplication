interface Pagination {
    currentPage: number;
    totalPages: number;
    onPageClick: any;
}

const Pagination = ({ currentPage, totalPages, onPageClick }: Pagination) => {

    return (
        <div className="p-3 m-2 justify-items-center">
            <div className="container mx-auto flex gap-2">
                {currentPage !== 1 && <button
                    onClick={() => onPageClick({ page: currentPage - 1 })}
                    className="bg-mainColor p-2 rounded-md text-white">
                    {currentPage - 1}
                </button>}
                <button
                    onClick={() => onPageClick({ page: currentPage })}
                    className="bg-mainColor p-2 rounded-md text-white">
                    {currentPage}
                </button>
                {(totalPages >= currentPage + 1) && <button
                    onClick={() => onPageClick({ page: currentPage + 1 })}
                    className="bg-mainColor p-2 rounded-md text-white">
                    {currentPage + 1}
                </button>}
            </div>
        </div>
    );
};

export default Pagination;