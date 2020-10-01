export class Pagination {
    page: number;
    size: number;
    total: number;
    rows: any;
    loading: false;
};

export const Filter = {
    page: 1,
    size: 10,
    order: '',
    field: ''
};