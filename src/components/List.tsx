import React from "react";

interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    emptyMessage?: string
}

function List<T>({ items, renderItem, emptyMessage }: ListProps<T>) {
    if (items.length === 0) return <p>{emptyMessage ?? 'No items'}</p>
    return <ul>{items.map(renderItem)}</ul>
}

export default List;