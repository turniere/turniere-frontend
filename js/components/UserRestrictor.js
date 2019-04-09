import React from 'react';

/**
 * This component works just like a switch statement, although the conditions of the first items
 * are checked first, and the first component with a condition that is true will be shown.
 * 
 * For single conditions and options any kind of component can be taken, while the Option-component
 * is dedicated for this job. The only important thing is that this component has to have a condition property.
 *
 * You should also give a default option with a condition that always evaluates to true.
 *
 * A quick example would be some content that is only to be shown when the user is logged in:
 *
 * function SomeRestrictedContent(props) {
 *     const { isSignedIn } = props;
 *     
 *     return (
 *         <UserRestrictor>
 *             <Option condition={isSignedIn}>
 *                 < The restricted content >
 *             </Option>
 *             <Option condition={true}>
 *                 < Some default content; in this case some kind of login >
 *             </Option>
 *         </UserRestrictor>
 *     );
 * }
 *
 * In the example you'll have to note that the default option is at the bottom of all the options
 * since it would always be taken otherwise (the options' conditions are checked from top to bottom)
 */
export class UserRestrictor extends React.Component {

    render() {
        const { children } = this.props;

        for(var i in children) {
            var c = children[i];
            
            if(c.props.condition) {
                return c;
            }
        }

        return null;
    }
}

export function Option(props) {
    return props.children;
}
