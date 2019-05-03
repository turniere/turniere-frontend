
export function findTeam(teams, id) {
    for(var team of teams) {
        if(team.id === id) {
            return team;
        }
    }
    return null;
}
