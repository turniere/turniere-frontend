
export function findTeam(teams, id) {
    for(let i = 0; i < teams.length; i++) {
        if(teams[i].id === id) {
            return teams[i];
        }
    }
    return null;
}
