import {Dimmer, Loader, Segment} from "semantic-ui-react";
import React from "react";

export const LoaderSpinner = (props) => {
    if (props.loading) {
        return (<div>
            <Segment>
                <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer>
            </Segment>
        </div>)
    } else {
        return null
    }
}