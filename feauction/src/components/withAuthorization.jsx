import React from 'react';
import NoPage from '../pages/NotFound/NotFound';

const WithAuthorization = (allowedRoles) =>(WrappedComponent) => {

        return class extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    userRole: 'guest',
                };
            }

            componentDidMount() {
             if(localStorage.getItem('accessToken')){
                this.setState({
                    userRole: localStorage.getItem('roleUser'),
                  });
             }
            }

            render() {
                if (allowedRoles.includes(this.state.userRole)) {
                    return <WrappedComponent {...this.props} />;
                } else {
                    return <NoPage/>;
                }
            }
        };
    };


export default WithAuthorization;
