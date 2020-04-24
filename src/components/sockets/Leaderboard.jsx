import React from 'react';
import {
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer
} from '@material-ui/core';
import { FiAward } from 'react-icons/fi';

const awards = [
  '#ffd700',
  '#c0c0c0',
  '#cd7f32'
];

function Leaderboard({ socket, players }) {
  const getLeaderboard = () => Object.values(players).sort((a, b) => b.score - a.score);
  return (
    <Grid container style={{ textAlign: 'center', overflowY: 'auto' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right" style={{ fontWeight: 700 }}>#</TableCell>
              <TableCell style={{ fontWeight: 700 }}>Nickname</TableCell>
              <TableCell align="right" style={{ fontWeight: 700 }}>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players ? getLeaderboard().map((player, index) => (
              <TableRow key={index} style={{ background: player.nickname === players[socket.id].nickname ? '#eee' : null }}>
                <TableCell align="right">{index < 3 ? <FiAward color={awards[index]} /> : index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {player.nickname}
                </TableCell>
                <TableCell align="right">{player.score}</TableCell>
              </TableRow>
            )) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default Leaderboard;
