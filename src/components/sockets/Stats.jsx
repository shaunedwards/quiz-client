import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography
} from '@material-ui/core';

const styles = {
  height: `${window.innerHeight - 126}px`,
  textAlign: 'center',
  overflowY: 'auto'
}

function StatCard({ title, value }) {
  return (
    <Card style={{ margin: '0.5em' }}>
      <CardContent style={{ padding: '10px' }}>
        <Typography style={{ fontSize: '2em', fontWeight: 700 }}>
          {value}
        </Typography>
        <Typography>
          {title}
        </Typography>
      </CardContent>
    </Card>
  )
}

function Stats({ socket, players, numQuestions }) {
  const getStat = (stat) => players[socket.id] ? players[socket.id][stat] : null;

  const calcUnanswered = () => {
    const player = players[socket.id];
    return player ? numQuestions - (player.correct + player.incorrect) : null;
  }

  const calcAccuracy = () => {
    const player = players[socket.id];
    return player ? `${Math.floor((numQuestions - (player.incorrect + calcUnanswered())) / numQuestions * 100)}%` : null;
  }

  const calcStanding = () => {
    const leaderboard = Object.values(players);
    leaderboard.sort((a, b) => b.score - a.score);
    return leaderboard.findIndex(player => player.nickname === players[socket.id].nickname) + 1;
  }

  return (
    <div style={styles}>
      <Typography component="p" variant="h5" style={{ marginTop: '1em', fontWeight: 700 }}>
        GAME OVER!
      </Typography>
      <Typography component="p">
        View your performance stats
      </Typography>
      <Grid container style={{ padding: '1em' }}>
        <Grid item xs={6}>
          <StatCard title="Correct" value={getStat('correct')} />
        </Grid>
        <Grid item xs={6}>
          <StatCard title="Incorrect" value={getStat('incorrect')} />
        </Grid>
        <Grid item xs={6}>
          <StatCard title="Unanswered" value={calcUnanswered()} />
        </Grid>
        <Grid item xs={6}>
          <StatCard title="Streak" value={getStat('streak')} />
        </Grid>
        <Grid item xs={6}>
          <StatCard title="Accuracy" value={calcAccuracy()} />
        </Grid>
        <Grid item xs={6}>
          <StatCard title="Standing" value={calcStanding()} />
        </Grid>
      </Grid>
    </div>
  )
}

export default Stats;
