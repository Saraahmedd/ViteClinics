import React, { useState } from 'react';

export default Table = (props) => {
    const { headers, data, itemsPerPageOptions } = props;

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

    // Calculate the index of the first and last item to display based on pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change the current page
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Change the number of items per page
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1); // Reset to the first page when changing items per page
    };

    return (
        <>
            <table className={`table table-striped table-bordered table-hover mx-2 my-2 ${props.className}`}>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={`col${index}`} scope="col">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((row, index) => (
                        <tr key={`tr${index}`}>
                            {row.map((node, index2) => (
                                <td key={`td${index * row.length + index2}`}>{node}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination controls */}
            <div className="pagination mx-2 my-2">
                <span>Items per page:</span>
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    {itemsPerPageOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>

                <span>Page:</span>
                {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                    <>
                        <a
                            key={`page${index + 1}`}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </a>&nbsp;
                    </>
                ))}
            </div>
        </>
    );
}