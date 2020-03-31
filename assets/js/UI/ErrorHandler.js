import {Icon, Segment} from "semantic-ui-react";
import React from "react";

export const ErrorHandler = (props) => {
    if (props.uploaderror) {
        return (<div>
            <Segment>
                <Icon circular inverted color='red' name='exclamation triangle'/>
                Something went wrong!
            </Segment>
        </div>)
    } else {
        return null
    }
}