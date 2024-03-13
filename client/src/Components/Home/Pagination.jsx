import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationComponent = ({ totalPages, currentPage, handleChange }) => {
    return (
        <Stack spacing={2} alignItems="center" marginTop={2}>
            <Pagination count={totalPages} page={currentPage} onChange={handleChange} color="primary" />
        </Stack>
    );
};

export default PaginationComponent;
