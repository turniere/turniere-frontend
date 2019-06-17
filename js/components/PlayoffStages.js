import {Stage} from './Stage';
import React from 'react';

export function PlayoffStages(props) {
    return (<div>
        {props.playoffStages.map(stage => <Stage isSignedIn={props.isSignedIn} isOwner={props.isOwner}
            level={getLevelName(stage.level)} matches={stage.matches} key={stage.level}/>)}
    </div>);
}

function getLevelName(levelNumber) {
    const names = ['Finale', 'Halbfinale', 'Viertelfinale', 'Achtelfinale'];
    if (levelNumber < names.length) {
        return names[levelNumber];
    } else {
        return Math.pow(2, levelNumber) + 'tel-Finale';
    }
}
