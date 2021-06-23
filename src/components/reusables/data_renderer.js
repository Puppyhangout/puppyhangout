import React from 'react'
import ReactJson from 'react-json-view'

export class DataRenderer extends React.Component {
    render() {
        return <ReactJson src={this.props.value || this.props.children} theme="monokai" />
    }
}