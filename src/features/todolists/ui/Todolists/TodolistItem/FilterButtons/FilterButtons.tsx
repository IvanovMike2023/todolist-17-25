import {useAppDispatch} from "@/common/hooks"
import {containerSx} from "@/common/styles"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

type Props = {
    todolist: any
    filterselection: (f: number) => void
}

export const FilterButtons = ({todolist,filterselection}: Props) => {
    const {id, filter} = todolist

    const changeFilter = (filter: number) => {
        filterselection(filter)
    }

    return (
        <Box sx={containerSx}>
            <Button variant={filter === "all" ? "outlined" : "text"} color={"inherit"}
                    onClick={() => changeFilter(0)}>
                All
            </Button>
            <Button
                variant={filter === "active" ? "outlined" : "text"}
                color={"primary"}
                onClick={() => changeFilter(1)}
            >
                Active
            </Button>
            <Button
                variant={filter === "completed" ? "outlined" : "text"}
                color={"secondary"}
                onClick={() => changeFilter(2)}
            >
                Completed
            </Button>
        </Box>
    )
}
