import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

class ReactChart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ResponsiveContainer width='100%' height={400}>
                <BarChart data={this.props.data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="letter" stroke="#4682B4" />
                    <YAxis stroke="#4682B4" />
                    <Tooltip cursor={{ fill: '#8baac4' }} />
                    <Legend />
                    <Bar dataKey="productivity" fill="#8ee2ae" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

export default ReactChart;