/**
 * External Dependencies
 */
import moment from 'moment'
import './style.scss';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, Spinner, ButtonGroup, Table, Row, Col, Button, Form, FormGroup, Label, Input, Nav, NavLink, NavItem, TabContent, TabPane, CustomInput, Badge } from 'reactstrap';
import PageTitle from '../../components/page-title';
import DatePicker from '../../components/date-time-picker';
import Select from 'react-select';
import {
    addToast as actionAddToast,
} from '../../actions';
/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';
import Icon from '../../components/icon';
import dateFormat from 'dateformat';
import Cookies from 'js-cookie';
import Tabs from '../../components/tabs';
import { format } from 'date-fns';

import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';
import { Line, Bar, Pie } from 'react-chartjs-2';


import html2canvas from 'html2canvas';

// import dateFormat from 'dateformat';

/**
 * Component
 */

const device_width = window.innerWidth;
var height = window.innerHeight;
//  ////console.log("admin_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//  ////console.log("admin_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height / 2) - 100;
//  ////console.log("admin_gk",gk);
if (device_width < 600) {
    var gk = (my_height / 2) - 50;
}



class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            heading: "Add User",
            button: "SAVE",
            isLoading: "block",
            activeTab2: 'contact',
            start_time: "",
            end_time: "",
            credit_msg: "",
            office_time_msg: "",
            win_percent_msg: "",
            draw_time_msg: "",
            retailer_array: [],
            pending_spinner: "none",
            no_data: "none",
            retailer_report: "",
            no_data_mess: "none",
            no_account_data: "none",
            fetch_retailer_account: [],
            account_start_date: new Date().setDate(new Date().getDate() - 8),
            account_end_date: new Date(),
            fetch_single_data: [],
            name: "",
            city: "",
            check1: false,
            check2: false,
            deleteModal: false,
            retailer_p: "",
            company_p: "",
            generate_no: "",
            addcredit: "",
            startDate: new Date().setDate(new Date().getDate() - 8),
            endDate: new Date(),
            retailer_report_line_data: [],
            date_range_new: [],
            total_sale_array: [],
            total_win_array: [],
            total_profit_array: [],
            displayCount: 20,
            page: 1,
            isLoadingNew: false,
            data_spinner: "none",
            visibleRows: 10,
            current_page: 1,
            app_user_array: [],
            app_user_status_data: [],
            no_data_app_user: "none",
            retailer_balance_amount: 0,
            add_credit_for_app: "",
            credit_blance_error: "",
            startDateApp: "",
            endDateApp: "",
            current_page_app_user: 1,
            app_data_spinner: 'none',
            app_user_account_array: [],
            app_user_single_array: [],
            app_data_spinner: "none",

            wins_user_array: [],
            wins_user_id: "",
            no_data_wins_user: "none",
            current_page_wins_data: 1,
            wins_start_date: new Date().setDate(new Date().getDate() - 8),
            wins_end_date: new Date(),
            wins_data_spinner: "none",
            ipad_width: "none",
            ipad_emp_list: "block",



            userName: "",
            user_array: [],
            isLoading: "block",
            mobile: "",
            eyeOnOff: false,
            companyShare: ""

        };
        this.fetch_all_user()
        this.toggle = this.toggle.bind(this);
        this.deleteModal = this.deleteModal.bind(this)

    }

    deleteModal() {
        this.setState((prevState) => ({
            deleteModal: !prevState.deleteModal,
        }));
    }

    toggle() {
        this.setState((prevState) => ({
            modalOpen: !prevState.modalOpen,
            heading: "Add User",
            button: "SAVE",
            button: "SAVE",
            name: "",
            mobile: "",
            userName: "",
            password: "",
            companyShare: ""
        }));
    }






    fetch_all_user = () => {
        const { settings } = this.props;
        const res = fetch(settings.api_url + "api/users/fetch_all_user", {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Fetch All  User Response  ****", json)
                var data = json;
                if (data.status == true) {
                    var user_array = data.data
                    for (let i = 0; i < user_array.length; i++) {
                        user_array[i].eyeOnOff = false;
                    }
                    this.setState({
                        user_array: user_array,
                        isLoading: "none",
                        no_data: "none", eyeOnOff: false,
                    });
                }
                else {
                    this.setState({
                        user_array: [],
                        no_data: "block",
                        isLoading: "none",
                    });
                    //console.log("something wrong");
                }
            })
    }



    switch_function = () => {

        if (this.state.button === "SAVE") {
            this.add_user()
        }
        else {
            this.edit_user()
        }
    }


    add_user = () => {

        const {
            addToast, settings
        } = this.props;;

        const { name, mobile, userName, password } = this.state

        if (name == "" || name == undefined || userName == "" || userName == undefined || mobile == "" || mobile == undefined || password == "" || password == undefined) {
            this.setState({
                userErrorMessage: "Please Fill all the feilds",
                borderData: true
            })
        } else {

            this.setState({
                loading: true
            })
            var params = {
                name: name,
                user_name: userName,
                mobile_no: mobile,
                password: password,
                company_share: Number(this.state.companyShare)

            }

            console.log("params************", params);
            const res = fetch(settings.api_url + 'api/users/add_user', {
                method: 'POST',
                body: JSON.stringify(params),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
                .then((response) => response.json())
                .then(json => {
                    console.log("Add Users", { params: params, response: json })

                    var data = json;

                    if (data.status === true) {
                        this.setState({
                            modalOpen: false,
                            loading: false,
                            button: "SAVE",
                            name: "",
                            mobile: "",
                            userName: "",
                            password: "",
                            heading: "Add Reatiler",
                            userErrorMessage: "",
                            companyShare: ""
                        })
                        addToast({
                            title: 'BigWin',
                            content: data.message,
                            time: new Date(),
                            duration: 1000,
                        });
                        this.fetch_all_user()
                    }
                    else {
                        this.setState({
                            userErrorMessage: data.message,
                            loading: false
                        })
                        addToast({
                            title: 'BigWin',
                            content: data.message,
                            time: new Date(),
                            duration: 1000,
                        });

                    }

                });
        }


    }



    edit_user = () => {

        const {
            addToast, settings
        } = this.props;;

        const { name, mobile, userName, password } = this.state

        if (name == "" || name == undefined || userName == "" || userName == undefined || mobile == "" || mobile == undefined || password == "" || password == undefined) {
            this.setState({
                userErrorMessage: "Please Fill all the feilds",
                borderData: true
            })
        } else {

            this.setState({
                loading: true
            })

            if (this.state.user_name_updated == this.state.userName) {
                var user_name_updated = false
            } else {
                var user_name_updated = true
            }
            var params = {
                name: name,
                user_name: userName,
                mobile_no: mobile,
                password: password,
                user_name_updated: user_name_updated,
                user_id: this.state.user_id,
                company_share: Number(this.state.companyShare)
            }

            console.log("Edit params************", params);
            const res = fetch(settings.api_url + 'api/users/update_user', {
                method: 'PUT',
                body: JSON.stringify(params),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
                .then((response) => response.json())
                .then(json => {
                    console.log("Edit Users", { params: params, response: json })

                    var data = json;

                    if (data.status === true) {
                        this.setState({
                            modalOpen: false,
                            loading: false,
                            button: "SAVE",
                            name: "",
                            mobile: "",
                            userName: "",
                            password: "",
                            heading: "Add User",
                            userErrorMessage: "",
                            companyShare: ""
                        })
                        addToast({
                            title: 'BigWin',
                            content: data.message,
                            time: new Date(),
                            duration: 1000,
                        });
                        this.fetch_all_user()
                    }
                    else {
                        this.setState({
                            userErrorMessage: data.message,
                            loading: false
                        })
                        addToast({
                            title: 'BigWin',
                            content: data.message,
                            time: new Date(),
                            duration: 1000,
                        });

                    }

                });
        }


    }





    //-------------------------------------------------------------------DELETE--------------------------------------------------------------------------//
    delete_user = (user_id) => {
        const {
            addToast, settings
        } = this.props;;
        var params = {
            user_id: user_id
        }
        console.log("DELETE PARAMS", params)


        const res = fetch(settings.api_url + 'api/users/delete_user', {
            method: 'DELETE',
            body: JSON.stringify(params),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((response) => response.json())
            .then(json => {
                console.log("Delete User Response", { params: params, response: json })

                this.fetch_all_user()
                this.setState({
                    deleteModal: false
                })
            });
    }







    UserNameGenerate = (name, userName) => {
        if (userName == undefined) {
            var newUserName = name.replace(/ /g, '')
        } else {
            var newUserName = userName.replace(/ /g, '')
        }

        console.log("newUserName", newUserName);
        this.setState({
            userName: newUserName.toLowerCase(),
            name: name
        })
    }

    ShowPassword = (index) => {
        var arrayNew = this.state.user_array
        arrayNew[index].eyeOnOff = !arrayNew[index].eyeOnOff
        console.log("arrayNew--------------", arrayNew);
        this.setState({
            user_array: arrayNew
        })
    }
    render() {


        const customStyles = {
            control: (css, state) => {
                return {
                    ...css,
                    borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#eaecf0',
                    '&:hover': {
                        borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#eaecf0',
                    },
                    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(114, 94, 195, 0.2)' : '',
                };
            },
            option: (css, state) => {
                let bgc = '';

                if (state.isSelected) {
                    bgc = '#725ec3';
                } else if (state.isFocused) {
                    bgc = 'rgba(114, 94, 195, 0.2)';
                }

                return {
                    ...css,
                    backgroundColor: bgc,
                };
            },
            multiValueLabel: (css) => {
                return {
                    ...css,
                    color: '#545b61',
                    backgroundColor: '#eeeeef',
                };
            },
        };



        const {
            mobile, companyShare
        } = this.state;

        return (
            <Fragment>
                <PageTitle className="slot_new">
                    <div className="row title_newww">
                        <div className="col-lg-6 col-md-6 i_pad_bottom">
                            <h1 style={{ paddingTop: '5px' }}>Users</h1>
                        </div>
                        <div className="col-lg-6 col-md-6 add_buttonData" style={{ display: "inline-flex" }}>
                            <Button style={{ color: "#fff", whiteSpace: "nowrap" }} color="warning" onClick={this.toggle}>
                                Add Users
                            </Button>
                            <div style={{ display: device_width < 769 ? this.state.ipad_width : "block" }}>
                                <Button className="my_new_nnnn" color="brand" style={{ marginLeft: "5px", height: '42px', textTransform: "capitalize", display: device_width < 769 ? "inline-flex" : "none", paddingTop: "5px" }}
                                    onClick={() => {
                                        this.setState({
                                            ipad_emp_list: "block",
                                            ipad_width: "none"
                                        })
                                    }}>Back</Button>
                            </div>

                        </div>
                    </div>
                </PageTitle>
                <Spinner color="warning" className="spinner_css_12345666" style={{ marginTop: gk, display: this.state.isLoading }} />
                <div style={{ display: this.state.isLoading == "none" ? "block" : "none" }}>
                    <h3 style={{ display: this.state.no_data, padding: "15px", textAlign: "center", color: " #a4a3a3", width: "100%", marginTop: gk }}>No Data Found</h3>
                    <div className="" style={{ display: this.state.no_data == "none" ? "block" : "none" }}>
                        <div className="row padd_new_data">
                            <div className="col-lg-12 mycalendar height_sales" style={{ height: my_height - 69, paddingRight: "0px", display: this.state.ipad_emp_list }}>
                                <div className="">
                                    <div className="table-responsive-lg">
                                        <Table striped>
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="userTableCss"> Name</th>
                                                    <th scope="col" className="userTableCss">Mobile No</th>
                                                    <th scope="col" className="userTableCss">User Name</th>
                                                    <th scope="col" className="userTableCss">Password</th>
                                                    <th scope="col" className="userTableCss">Company Share</th>
                                                    <th scope="col" className="userTableCss">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.user_array.map((value, index) => {

                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row" className="userTableCss">{value.name}</th>
                                                            <th scope="row" className="userTableCss">{value.mobile_no}</th>
                                                            <th scope="row" className="userTableCss">{value.user_name}</th>
                                                            <th scope="row" className="userTableCss">
                                                                <div style={{ display: "inline-flex" }}>
                                                                    <span style={{marginRight:"15px"}} className={value.eyeOnOff == true ? "" : "hidePasworddd"}>{value.password}</span>
                                                                    {/* <Input type={value.eyeOnOff == true ? "text" : "password"} value={value.password} className="passWordReatilerr" /> */}
                                                                    <div style={{ cursor: "pointer" }} aria-hidden="true" onClick={() => {
                                                                        this.setState({
                                                                            // eyeOnOff: !this.state.eyeOnOff,
                                                                            user_id: value._id,
                                                                        })
                                                                        this.ShowPassword(index)
                                                                    }}>
                                                                        <Icon name={value.eyeOnOff == true ? "eye-off" : "eye"} />
                                                                    </div>
                                                                </div>
                                                            </th>
                                                            
                                                            <th scope="row" className="userTableCss">{value.company_share != 0 && (
                                                                <>{value.company_share && value.company_share + "%"}</>
                                                            )}</th>

                                                            <th scope="row" className="userTableCss">
                                                                <div className="actionButton">
                                                                    <Button color="success" onClick={() => {
                                                                        this.setState({
                                                                            modalOpen: true,
                                                                            loading: false,
                                                                            button: "Update",
                                                                            name: value.name,
                                                                            mobile: value.mobile_no,
                                                                            userName: value.user_name,
                                                                            password: value.password,
                                                                            user_id: value._id,
                                                                            heading: "Edit User",
                                                                            userErrorMessage: "",
                                                                            user_name_updated: value.user_name,
                                                                            companyShare: value.company_share ? value.company_share.toString() : ""
                                                                        })
                                                                    }}>Edit</Button>
                                                                    <Button color="danger" onClick={() => {
                                                                        this.setState({
                                                                            deleteModal: true,
                                                                            user_id: value._id
                                                                        })
                                                                    }}>Delete</Button>
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    )
                                                })}


                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <Modal
                    isOpen={this.state.modalOpen}
                    toggle={this.toggle}
                    className={this.props.className, "modal-dialog-centered widthh_model"}
                    fade
                >
                    <div className="modal-header">
                        <h5 className="modal-title h2">{this.state.heading}</h5>
                        <Button className="close" color="" onClick={this.toggle}>
                            <Icon name="x" />
                        </Button>
                    </div>
                    <ModalBody>
                        <Form>
                            <Row>
                                {/*Name*/}
                                <Col md={6} className='mb-2'>
                                    <FormGroup>
                                        <Label for="exampleName">Full Name<span className="starMark">*</span></Label>
                                        <Input id="exampleName" type='text' name="name" value={this.state.name}
                                            placeholder='Full Name'
                                            invalid={this.state.borderData && this.state.name == "" ? true : false}
                                            onChange={(e) => {
                                                this.UserNameGenerate(e.target.value, undefined)
                                            }}></Input>
                                    </FormGroup>
                                </Col>
                                {/*User Name*/}
                                <Col md={6} className='mb-2'>
                                    <FormGroup>
                                        <Label >User Name<span className="starMark">*</span></Label>
                                        <Input type='text' name="namenew" value={this.state.userName}
                                            placeholder='User Name'
                                            invalid={this.state.borderData && this.state.userName == "" ? true : false}
                                            onChange={(e) => {
                                                this.UserNameGenerate(this.state.name, e.target.value)
                                            }}></Input>
                                    </FormGroup>
                                </Col>
                                {/*Mobile*/}
                                <Col md={6} className='mb-2'>
                                    <FormGroup>
                                        <Label for="exampleMobile">Mobile No<span className="starMark">*</span></Label>
                                        <Input id="exampleMobile" type='text' name="mobile" value={mobile.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')}
                                            placeholder='Mobile'
                                            invalid={this.state.borderData && this.state.mobile == "" ? true : false}
                                            maxLength="10"
                                            pattern="[0-9]*"
                                            onChange={(e) => {
                                                this.setState({
                                                    mobile: e.target.value
                                                })
                                            }}
                                        ></Input>
                                    </FormGroup>
                                </Col>
                                {/*Password*/}
                                <Col md={6} className='mb-2'>
                                    <FormGroup>
                                        <Label >Password<span className="starMark">*</span></Label>
                                        <Input type={this.state.password == "" ? '' : 'password'} name="passwordnew" value={this.state.password}
                                            placeholder='Password'
                                            invalid={this.state.borderData && this.state.password == "" ? true : false}
                                            onChange={(e) => {
                                                this.setState({
                                                    password: e.target.value
                                                })
                                            }}></Input>
                                    </FormGroup>
                                </Col>
                                <Col md={6} className='mb-2'>
                                    <FormGroup>
                                        <Label for="examplecompanyShare">Company Share</Label>
                                        <Input id="examplecompanyShare" type='text' name="companyShare" value={companyShare.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')}
                                            placeholder='Company Share'
                                            maxLength="3"
                                            pattern="[0-9]*"
                                            onChange={(e) => {
                                                this.setState({
                                                    companyShare: e.target.value
                                                })
                                            }}
                                        ></Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                    <ModalFooter className="foot">
                        <p style={{ color: "red", marginBottom: "0px", width: "35%" }}>{this.state.userErrorMessage}</p>
                        <Button color="secondary" onClick={this.toggle}>CANCEL</Button>
                        {' '}
                        <Button style={{ color: "#fff" }} color="warning" disabled={this.state.loading} onClick={() => this.switch_function()}>{this.state.button}{this.state.loading ? (
                            <Spinner />
                        ) : ''}</Button>
                    </ModalFooter>
                </Modal>







                <Modal
                    style={{ width: '300px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.deleteModal}
                    toggle={this.deleteModal}
                    className={this.props.className, "del_model"}
                    fade
                >
                    <ModalBody>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.deleteModal}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '50px' }}>
                            <p >Are you sure you want to Delete ?</p>

                        </div>
                        <div style={{ height: '50px', width: '100%' }}>
                            <Button style={{ marginRight: "20px" }} color="secondary" onClick={this.deleteModal}>no</Button>

                            <Button color="warning"
                                style={{ color: "#fff" }}
                                onClick={() => {
                                    this.delete_user(this.state.user_id)

                                }}
                            >yes</Button>
                            {'             '}
                        </div>

                    </ModalBody>
                </Modal>


            </Fragment>
        );
    }
}

export default connect(({ settings }) => (
    {
        settings,
    }
), { addToast: actionAddToast })(Content);
