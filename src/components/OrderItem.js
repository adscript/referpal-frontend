import React from 'react'
import {
    Card,
    CardContent,
    Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card_root: {
        minWidth: 600,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        background: '#ededed',
        [theme.breakpoints.down('xs')]: {
            minWidth: 500,
            maxWidth: 500
          },
    },
    boxed_photo: {
        marginTop: 22,
        marginLeft: 20,
        height: 70,
        width: 70,
        background: '#2e2e2e'   
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    root: {
        marginTop: 10,
        maxWidth: 600,
        overflowX: 'auto'
    },

}));

export default function OrderItem(props) {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className={classes.root}>
                <Card className={classes.card_root}>
                    <div className="content-left">
                        <div className={classes.boxed_photo}>
                        </div>
                    </div>
                    <CardContent>
                        <Typography variant="h5" component="h4">
                            {props.position ? props.position : 'No Position'}
                </Typography>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {props.clientName}
                </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {props.address}
                </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
