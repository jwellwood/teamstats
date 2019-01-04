import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import StatsHeader from '../../../../layout/Stats/StatsHeader';
import ScoreBox from '../ResultsCard/ScoreBox';
// Helpers
import { colors } from '../../../../../assets/styles/colors';
import formatDate from '../../../../../helpers/results/date';

const styles = theme => ({
  bigAvatar: {
    border: '1px solid',
    borderColor: theme.palette.primary.dark,
    margin: '10px auto',
    width: 60,
    height: 60,
  },
  details: { padding: '1px 10px' },
  number: { fontWeight: 'bold', padding: '10px' },
});

const MatchDetails = props => {
  const { classes, result } = props;

  const date = formatDate(result.date);
  const { day, month, year } = date;

  let matchPoints = '-';
  let color = null;
  if (result.matchType === 'League') {
    switch (result.resultIndicator) {
      case 'W':
        matchPoints = 3;
        color = colors.win;
        break;
      case 'D':
        matchPoints = 1;
        color = colors.draw;
        break;
      case 'L':
        matchPoints = 0;
        color = colors.lose;
        break;
      default:
        return matchPoints;
    }
  }

  let numberOfPlayers = 'Coming soon';
  if (result.forfeitedMatch) {
    numberOfPlayers = 'Forfeit';
  }

  let id = 0;
  const createData = (title, value, textColor) => {
    id += 1;
    return { id, title, value, textColor };
  };

  const listItems = [
    createData('Date', `${day} ${month} ${year}`, ''),
    createData('Match Type', result.matchType, ''),
    createData('Points', matchPoints, color),
    createData('No. of players', numberOfPlayers, colors.draw),
  ];

  return (
    <div>
      <StatsHeader title="Details" />
      <Grid container style={{ fontFamily: 'Varela Round' }}>
        <ScoreBox result={result} />
      </Grid>

      {listItems.map(item => (
        <List dense key={item.id}>
          <ListItem>
            <ListItemText
              primary={<span style={{ textTransform: 'uppercase' }}>{item.title}</span>}
            />
          </ListItem>
          <ListItemSecondaryAction>
            <Typography className={classes.number} style={{ color: item.textColor }}>
              {item.value}
            </Typography>
          </ListItemSecondaryAction>
        </List>
      ))}
    </div>
  );
};

MatchDetails.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  result: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(MatchDetails);