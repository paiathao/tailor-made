import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { connect } from 'react-redux';

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

class EnhancedTableToolbar extends React.Component {

    addServices = (selected) => {
        console.log('click', selected)
        this.props.dispatch({
            type: 'ADD_SERVICES',
            payload: selected,
        })

    }

    render() {
        const { numSelected, classes, selected } = this.props;

        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                <div className={classes.title}>
                    {numSelected > 0 ? (
                        <Typography color="inherit" variant="subheading">
                            {numSelected} selected
            </Typography>
                    ) : (
                            <Typography variant="title" id="tableTitle">
                                Services
            </Typography>
                        )}
                </div>
                <div className={classes.spacer} />
                <div className={classes.actions}>
                    {numSelected > 0 ? (
                        <Tooltip title="Add">
                            <IconButton aria-label="Add">
                                <AddIcon onClick={() => this.addServices(selected)} />
                            </IconButton>
                        </Tooltip>
                    ) : (
                            <Tooltip title="Filter list">
                                <IconButton aria-label="Filter list">
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                </div>
            </Toolbar>
        );
    }

};

const EnhancedTableTool = withStyles(toolbarStyles)(EnhancedTableToolbar);

export default connect()(EnhancedTableTool);