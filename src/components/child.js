import React ,{ Component } from "react";

class Child extends Component {
    render(){
        return (
            <div>
                
                <h1 style={{ color: this.props.usercolor }}>
                    hello user
                </h1>
            </div>
        );
    }
}
 
export default Child;
 