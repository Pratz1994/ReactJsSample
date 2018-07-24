import React, {Component} from 'react'

class Loader extends Component {

    constructor(props) {
        super(props)
        
    }

    render() {
        return (
            
            <div id="overlay" className={this.props.loading ? "overlay-loading" : "overlay-hide"}>
                <div className="spinner">
                </div>
            </div>
        )
    }

}

export default Loader