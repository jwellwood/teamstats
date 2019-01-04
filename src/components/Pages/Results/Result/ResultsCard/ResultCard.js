import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
// Components
import ScoreBox from './ScoreBox';
import ResultDate from './ResultDate';
import BoxContainer from '../../../../hoc/BoxContainer';
// Helpers
import { colors, matchTypes } from '../../../../../assets/styles/colors';

const styles = theme => ({
  dateBar: {
    fontSize: '12px',
    padding: '0px 0px 0px 5px ',
    backgroundColor: '#444',
    borderRadius: '2px 2px 0px 0px',
  },
  matchTypeBar: {
    fontSize: '12px',
    padding: '0 5px',
    backgroundColor: '#333',
  },
  resultMarker: { width: '39px' },
  avatar: {
    margin: 5,
    width: 20,
    height: 20,
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#111',
  },
  date: { color: 'white', margin: 5 },
  matchType: { marginBottom: 2 },
  forfeit: { fontSize: '10px', padding: '0 2px', margin: '0 auto', color: '#666' },
  iconButton: { width: '20px', height: '20px' },
  editButton: {
    color: theme.palette.primary.light,
    cursor: 'pointer',
    fontSize: '15px',
  },
});

const ResultCard = props => {
  const { classes, result } = props;
  const { matchType, resultIndicator } = result;
  let resultColor = colors.draw;
  switch (resultIndicator) {
    case 'W':
      resultColor = colors.win;
      break;
    case 'D':
      resultColor = colors.draw;
      break;
    case 'L':
      resultColor = colors.lose;
      break;
    default:
      return resultColor;
  }

  let matchTypeColor = matchTypes.league;
  switch (matchType) {
    case 'League':
      matchTypeColor = matchTypes.league;
      break;
    case 'Cup':
      matchTypeColor = matchTypes.cup;
      break;
    case 'Friendly':
      matchTypeColor = matchTypes.friendly;
      break;
    case 'Tournament':
      matchTypeColor = matchTypes.tournament;
      break;
    default:
      return matchTypeColor;
  }
  return (
    <BoxContainer>
      <Paper
        elevation={20}
        style={{
          margin: '20px 0px',
          borderLeft: '3px solid',
          borderColor: resultColor,
          cursor: 'pointer',
        }}
      >
        <Grid container direction="row" alignItems="center" justify="space-between">
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
            className={classes.dateBar}
          >
            <Avatar className={classes.avatar} style={{ background: resultColor }}>
              {result.resultIndicator}
            </Avatar>
            <ResultDate result={result} />
            {/* <IconButton
              className={classes.iconButton}
              size="small"
              component={Link}
              to={`/results/${result.id}/edit`}
            >
              <Icon className={classes.editButton}>equalizer</Icon>
            </IconButton> */}
          </Grid>
          <Grid container className={classes.matchTypeBar}>
            <div className={classes.matchType} style={{ color: matchTypeColor }}>
              {result.matchType}
            </div>
          </Grid>
          <ScoreBox result={result} />
          {result.forfeitedMatch ? (
            <div className={classes.forfeit}>*Automatic 7-0 due to forfeit</div>
          ) : null}
        </Grid>
      </Paper>
    </BoxContainer>
  );
};

ResultCard.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  result: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ResultCard);