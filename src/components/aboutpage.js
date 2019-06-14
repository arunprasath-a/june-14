import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Prompt } from "react-router-dom";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import { bindActionCreators } from 'redux';
import { onLogOut } from "../store/actions/actions";
import axios from "axios";



class AboutUsPageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           header:[],
           row:[]
        }
    }

    componentDidMount() {
        // fetch("../test.json")
        //     .then(res => res.json())
        //     .then(data => this.setState({
        //         qwe: data,
        //     }))
        //     .then(data => console.log(data));
        //  console.log(this.state.qwe); 
         
        //  fetch("../test.json")
        // .then(res => res.json())
        // .then(res => {
        //     console.log(res[0].columnDefs);
        //      console.log(res[0].rowData);
                
        //     });

        axios.get("../test.json")
            .then(response => {
                this.setState({
                    header: response.data[0].columnDefs,
                    row: response.data[0].rowData,
                })
                //console.log(response.data[0].columnDefs);
                //console.log(response.data[0].rowData);
                
            })
        
        
        
        
}



    render() {
       
        return (

            <React.Fragment>


                <Prompt when={true} message={"Are you sure want to redirect ?"} ></Prompt>

                <Navbar color="light" light expand="md">
                    <NavbarBrand href="#">Welcome {sessionStorage.getItem("name")} !</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink to="/" onClick={this.props.onLogOut} onClickCapture={() => sessionStorage.removeItem("name")} >LogOut</NavLink>
                        </NavItem>
                        {/* <NavItem>
                            |
                        </NavItem>
                        <NavItem>
                            <NavLink to="/TestPage/">TestPage</NavLink>
                        </NavItem> */}
                    </Nav>
                </Navbar>


                <hr />
                <div className="ag-theme-balham" style={{ height: "600px", width: '100%' }}>
                    <AgGridReact
                        columnDefs={this.state.header}
                        rowData={this.state.row}>
                    </AgGridReact>
                </div>

               
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        username: state.mainReducer.userName,
        columnDefs: state.agGridReducer.columnDefs,
        rowData: state.agGridReducer.rowData
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onLogOut: onLogOut,
    }, dispatch)
}




export default connect(mapStateToProps, mapDispatchToProps)(AboutUsPageComponent);