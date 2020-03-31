import {Segment, Table} from "semantic-ui-react";
import React from "react";

export const DataTable = (props) => {
    const data = props.data
    const keys = Object.keys(data)
    console.log(keys)
    if (data) {
        return (<div>
            <Segment>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Trade Type</Table.HeaderCell>
                            <Table.HeaderCell>Count</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {keys.map((ev) => {

                            return (
                                <Table.Row>
                                    <Table.Cell>{ev}</Table.Cell>
                                    <Table.Cell>{data[ev]}</Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </Segment>
        </div>)
    }
}