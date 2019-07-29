import React from 'react'

export default ({ data, title}) => (
            <table>
                <tbody>
                    <tr>
                        <th>{title}</th>
                        <th>Total messages</th>
                        <th>Sent</th>
                        <th>Failed</th>
                    </tr>
                    {data && data.map(item => {
                        return (
                            <tr key={`${item.name}`}>
                                <td>{item.name + ` ${item.percentage}`}</td>
                                <td>{item.total}</td>
                                <td>{item.success}</td>
                                <td>{item.failed}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
)