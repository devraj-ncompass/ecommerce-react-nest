import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';

const SortAndFilter = ({ setSort, setFilter }) => {
    return (
        <div style={{ margin: '20px 0', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <FormControl sx={{ minWidth: 240 }}>
                <InputLabel style={{ wrap: 'nowrap', fullWidth: true }}>Sort By</InputLabel>
                <Select
                    label="Sort By"
                    onChange={(e) => setSort(e.target.value)}
                    defaultValue=""
                >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="rating:DESC">Rating - High to Low</MenuItem>
                    <MenuItem value="rating:ASC">Rating - Low to High</MenuItem>
                    <MenuItem value="product_price:ASC">Price - Low to High</MenuItem>
                    <MenuItem value="product_price:DESC">Price - High to Low</MenuItem>
                    <MenuItem value="availability:ASC">Availability - Low to High</MenuItem>
                    <MenuItem value="availability:DESC">Availability - High to Low</MenuItem>
                </Select>
            </FormControl>
            <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center' }}>
                <Typography variant='h6' gutterBottom>Filter:</Typography>
                <FormGroup row>
                    <FormControlLabel
                        control={<Checkbox onChange={(e) => setFilter(e.target.checked ? 'Phone' : '')} />}
                        label="Phone"
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={(e) => setFilter(e.target.checked ? 'Tablet' : '')} />}
                        label="Tablet"
                    />
                </FormGroup>
            </div>
        </div>
    );
};

export default SortAndFilter;
