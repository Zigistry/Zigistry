export const DEFAULT_SORTING_TYPE = 'intelligent';

const ALL_POSSIBLE_SEARCH_SORTS = new Set([
    DEFAULT_SORTING_TYPE,
    'stars',
    'dependents',
    'recently_updated',
    'newly_added',
    'oldest',
    'a_z',
    'z_a',
    'forks',
    'issues_desc',
    'issues_ascending',
    'zig_descending_version',
    'zig_ascending_version'
]);

function simplify(value) {
    return value?.trim().toLowerCase() ?? '';
}

export function apply_sort_check(value) {
    const simplified_string = simplify(value);
    return ALL_POSSIBLE_SEARCH_SORTS.has(simplified_string)
        ? simplified_string
        : DEFAULT_SORTING_TYPE;
}

export function get_search_parameters_from_url(urls_hash_part) {
    const params = new URLSearchParams(urls_hash_part.replace(/^#/, ''));

    return {
        search: simplify(params.get('search')),
        sort: simplify(params.get('sort'))
    };
}

export function create_url_search_part(search, sort) {
    const query = simplify(search);
    if (!query) return '';

    const params = new URLSearchParams({
        search: query,
        sort: apply_sort_check(sort)
    });

    return `#${params}`;
}
