import {containerSx} from "@/common/styles"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import styles from "./TasksSkeleton.module.css"

export const TaskSkeleton = () => (
    <Paper className={styles.container}>
        {Array(4)
            .fill(null)
            .map((_, id) => (
                <Box key={id} sx={containerSx}>
                    <div className={styles.tasks}>
                        <Skeleton width={20} height={40}/>
                        <Skeleton width={150} height={40}/>
                    </div>
                    <Skeleton width={20} height={40}/>
                </Box>
            ))}

    </Paper>
)