/** @jsx React.DOM */
var React = require('react');
var Helloworld = require('./app.js');

    var Container = React.createClass({
        render: function(){
            return (<p>Helloworld 33</p>)
        }
    });

    var Main = React.createClass({
        render: function(){
            return(<div className="container">
                <Container />
                <Helloworld />
                </div>)
        }
    });


React.renderComponent(<Main />, document.body);
