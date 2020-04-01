import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { OrderContext } from '../contexts/OrderContext';
import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    root: {
        marginTop: 10,
        maxWidth: 600,
        overflowX: 'auto',
        [theme.breakpoints.down('sm')]: {
            marginRight: 10,
            marginLeft: 10,
        },
    },
    chip: {
        marginRight: 5,
        marginBottom: 5,
    }
}));

export default function CategoryList() {
    const { categoryList, modifyQuery, category, setCategory } = useContext(OrderContext)
    const classes = useStyles();
    const handleCategory = (e) => {
        e.preventDefault();
        categoryList.data.rows.map(value => {
            if(value.name.toLowerCase() === e.target.innerText.toLowerCase()){
                if(category !== value.id){
                    setCategory(value.id)
                    modifyQuery({offset: 0, categoryId: value.id, resetSearch: true})
                }
                else{
                    setCategory(null)
                    modifyQuery({offset: 0, categoryId: null, resetSearch: true})
                }
                    
                value.isClicked = !value.isClicked
            } else {
                value.isClicked = false;
            }
            return value
        })
    }
    return (
        <div className={classes.wrapper}>
            <div className={classes.root}>
                {categoryList.success && categoryList.data.rows.map(value => {
                    return (
                    <Button 
                        key={value.id} 
                        variant={value.isClicked ? 'contained' : 'outlined'} 
                        size="small" 
                        color="primary" 
                        className={classes.chip}
                        onClick={handleCategory}
                    >
                        {value.name}
                    </Button>
                    )
                })}
            </div>
        </div>
    )
}
