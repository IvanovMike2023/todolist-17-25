import React, {memo} from "react";

export const Child=React.memo((props:any)=>{
    console.log('Child')
    console.log(props)
    return (
        <div>c11115</div>
    )
})