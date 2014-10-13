'use strict';
var _ = require('lodash')
  , compat = require('./compat')

var ic = module.exports = {


  propType: function(handler, propType) {

    return compat.propType(function(props, propName, componentName, location){
      if(props[propName] !== undefined){
        if ( !props[handler] )
          return new Error('ReactWidgets: you have provided a `' + propName
            + '` prop to `' + componentName + '` without an `' + handler + '` handler, effectively making it read-only.'
            + ' either provide the handler or make the prop `uncontrolled` by setting it to `undefined`')

        return propType && propType(props, propName, componentName, location)
      }
    })
  },

  valuePropType: function(type){
    return ic.propType('onChange', type)
  },

  mixin: {

    getValue: function(key, props, state){
      var isControlled;

      props = props || this.props
      state = state || this.state

      isControlled = props[key] !== undefined

      return  props[key] === undefined
        ? state[key]
        : props[key]
    },

    isProp: function(prop){
      return this.props[prop] !== undefined;
    },

    controlledDefaults: function() {
      var props = this.props
        , keys  = _.keys(this.controlledValues);

      return _.transform(keys, function(state, key){
        var defaultKey = 'default' + key.charAt(0).toUpperCase() + key.substr(1)

        state[key] = props[defaultKey]
      }, {})
    },

    setOrNotify: function(prop, value, additionalArgs){
      var handler    = this.controlledValues[prop]
        , controlled = handler && this.isProp(prop)
        , args       = [ value ].concat(additionalArgs);

      if( this.props[handler] ) 
        this.props[handler].apply(this, args)

      if( !controlled ) {
        var st = {}
        st[prop] = args[0]
        this.setState(st)
      }

      return !controlled
    }
  }
}




function Event(type, props){
  this._prevented = false
  _.defaults(this, props)
}

Event.prototype = {

  preventDefault: function(){
    this._prevented = true
  },

  isDefaultPrevented: function(){
    return !!this._prevented
  }

}