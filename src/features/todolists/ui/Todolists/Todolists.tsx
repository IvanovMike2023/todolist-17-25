import {
    closestCenter,
    DndContext,
    DragEndEvent,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {useEffect, useState} from "react";
import {useGetTodolistsQuery} from "@/features/todolists/api/todolistsApi";
import {DomainTodolist} from "@/features/todolists/api/todolistsApi.types";
import {containerSx} from "@/common/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {TodolistItem} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem";
import Box from "@mui/material/Box";
import {SortableItem} from "@/common/SortableItem/SortableItem";
import {getTheme} from "@/common/theme";
import {useAppSelector} from "@/common/hooks";
import {selectThemeMode} from "@/app/app-slice";
import {TodolistSkeleton} from "@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton";
import {loginSchema} from "@/features/auth/lib/schemas";


export const Todolists = () => {
    const {data: todolists, isLoading} = useGetTodolistsQuery();

    // Локальный стейт для управления порядком
    const [items, setItems] = useState<DomainTodolist[]>([]);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10, // Разрешает клики по кнопкам без начала drag
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250, // Для мобилок: зажать на 250мс, чтобы начать тащить
                tolerance: 5,
            },
        })
    );
    // Синхронизация данных при загрузке
    useEffect(() => {
        if (todolists) setItems(todolists);
    }, [todolists]);

    if (isLoading) {
        return <Box sx={containerSx} style={{gap: "32px"}}>{<TodolistSkeleton/>}</Box>;
    }

    // Правильный тип события - DragEndEvent
    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event;
        // over может быть null, если бросили мимо цели
        if (over && active.id !== over.id) {
            setItems((prev) => {
                const oldIndex = prev.findIndex((i) => i.id === active.id);
                const newIndex = prev.findIndex((i) => i.id === over.id);
                return arrayMove(prev, oldIndex, newIndex);
            });
        }
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map(it => it.id)} strategy={verticalListSortingStrategy}>
                <Grid container spacing={4} sx={containerSx}>
                    {items.map((todolist) => (
                        <Grid key={todolist.id} size={{xs: 12, md: 6, lg: 4}}>
                            <Paper sx={{p:  "0 20px 20px 20px"}}>
                                <SortableItem id={todolist.id}>
                                    <TodolistItem  todolist={todolist}/>
                                </SortableItem>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </SortableContext>
        </DndContext>
    );
};
