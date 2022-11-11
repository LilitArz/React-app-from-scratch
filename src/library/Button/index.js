import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}))

const CustomButton = (props) => {
    const {
        onClick,
        label,
        variant = 'contained',
        type = 'primary',
        disabled,
    } = props
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Button
                variant={variant}
                color={type}
                onClick={onClick}
                disabled={disabled}
            >
                {label}
            </Button>
        </div>
    )
}

export default React.memo(CustomButton)
