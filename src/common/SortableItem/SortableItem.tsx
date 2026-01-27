import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {TodolistItem} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.js";
interface Props {
    id: string; // или UniqueIdentifier из @dnd-kit/core
    children: React.ReactNode;
}
export function SortableItem({ id, children }: Props ) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: '10px',
        border: '1px solid #ccc',
        marginBottom: '5px',
        backgroundColor: 'white',
        cursor: 'grab'
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
}