import React, {Component} from 'react'
import {Button, Form, Segment} from 'semantic-ui-react'

import {render} from "react-dom";
import axios from 'axios';
import {PieChart} from 'react-chartkick'
import 'chart.js'
import Cookies from 'js-cookie'
import {LoaderSpinner} from "./UI/LoaderSpinner";
import {DataTable} from "./UI/DataTable";
import {ErrorHandler} from "./UI/ErrorHandler";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class ShowUploadResults extends Component {

    render() {
        return (<Segment>
            <h1>Trade Breakdown</h1>
            <PieChart
                data={this.props.breakdown}
                legend={"bottom"}
            />
            < DataTable data={this.props.breakdown}/>
            <Button as="label" type="button" onClick={this.props.resetHandler}>
                Upload another?
            </Button>
        </Segment>)
    }
}

class ShowUploadForm extends Component {

    render() {
        const csrftoken = this.props.csrftoken;
        return (
            <Form>
                <Segment>
                    <h1>Upload a Trade File</h1>
                    <Button as="label" htmlFor="file" type="button">
                        Choose data file to upload
                    </Button>
                    <input type="hidden"
                           name="csrfmiddlewaretoken"
                           value={csrftoken}/>
                    <input hidden
                           type="file"
                           id="file"
                           style={{display: "hidden"}}
                           onChange={(e) => {
                               this.props.uploadHandler(e)
                           }}/>
                </Segment>
            </Form>
        )
    }
}

class App extends Component {

    state = {
        breakdown: null,
        updating: false,
        uploaderror: false
    }

    uploadHandler = (event) => {
        this.setState({
            updating: true
        })
        const file = event.target.files[0]
        const formData = new FormData();
        let csrftoken = Cookies.get('csrftoken');
        formData.append("file", file);
        axios.post(
            "/api",
            formData, { // receive two parameter endpoint url ,form data
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                }
            }
        ).then(res => {
            this.setState({
                breakdown: res.data,
                updating: false
            })
        }).catch((error) => {
            this.setState({uploaderror: true, updating: false})
            console.log(error)
        })
    };

    resetHandler = () => {
        this.setState({
            breakdown: null,
            updating: false,
            uploaderror: false
        })
    }

    render() {
        let csrftoken = Cookies.get('csrftoken');
        return (<div>
            <LoaderSpinner loading={this.state.updating}/>
            <ErrorHandler uploaderror={this.state.uploaderror}/>
            {this.state.breakdown ?
                <ShowUploadResults
                    breakdown={this.state.breakdown}
                    resetHandler={this.resetHandler}
                /> : <ShowUploadForm uploadHandler={this.uploadHandler} csrftoken={csrftoken}/>
            }
        </div>)
    }
}

render(<App/>, document.getElementById('app'));
