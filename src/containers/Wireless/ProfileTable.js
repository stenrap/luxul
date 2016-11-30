import React from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHeaderColumn, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';

export default class ProfileTable extends React.Component {
    render() {
        const { profiles, handleDelete } = this.props;

        return (
            <Table className="profileTable" selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Band</TableHeaderColumn>
                        <TableHeaderColumn>SSID</TableHeaderColumn>
                        <TableHeaderColumn>SSID Broadcast</TableHeaderColumn>
                        <TableHeaderColumn>Client Isolation</TableHeaderColumn>
                        <TableHeaderColumn>Security Mode</TableHeaderColumn>
                        <TableHeaderColumn>Actions</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {profiles.map((profile, i) => {
                        return (
                            <TableRow key={i}>
                                <TableRowColumn>{profile.radio}</TableRowColumn>
                                <TableRowColumn>{profile.ssid}</TableRowColumn>
                                <TableRowColumn>
                                    {profile.ssidBroadcast ? "Enabled" : "Disabled"}
                                </TableRowColumn>
                                <TableRowColumn>
                                    {profile.clientIsolation ? "Enabled" : "Disabled"}
                                </TableRowColumn>
                                <TableRowColumn>{profile.security}</TableRowColumn>
                                <TableRowColumn>
                                    <IconButton
                                        tooltip="Delete"
                                        onTouchTap={() => handleDelete(i)}
                                    >
                                        <DeleteForever />
                                    </IconButton>
                                </TableRowColumn>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        )
    }
}

ProfileTable.propTypes = {
    profiles: React.PropTypes.arrayOf(React.PropTypes.object),
    handleDelete: React.PropTypes.func
};