'use strict';
var _ = require('lodash')
  , compat = require('./compat')

var ic = module.exports = {


  propType: function(handler, propType) {

    return compat.propType(function(props, propName, componentName, location){
      if(props[propName] !== undefined){
        if ( !props[handler] )
          return new Error('ReactWidgets: you have provided a `' + propName
            + '` prop to `' + componentName + '` with an `' + handler + '` handler, effectively making it read-only.'
            + ' either provide the handler or make the prop `uncontrolled` by setting it to `undefined`')

        return propType && propType(props, propName, componentName, location)
      }
    })
  },

  defaults: function(props, map) {

    return _.transform(map, function(state, val, key){
      var defaultKey = 'default' + key.charAt(0).toUpperCase() + key.substr(1)

      state[key] = _.has(props, defaultKey)
        ? props[defaultKey]
        : val
    })
  },

  defaultFromProps: function(key, props){
    key = 'default' + key.charAt(0).toUpperCase() + key.substr(1)
    return props[key]
  },

  valuePropType: function(type){
    return ic.propType('onChange', type)
  },

  mixin: {

    get: function(key, props, state){
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

    notify: function(type, values, state){
      var key = this.controlledValuesHandlerMap[type]
        , controlled = this.isProp(key);

      if( this.props[type] )
        this.props[type].apply(this, [].concat(values))

      if(!controlled && state)
        this.setState(state)

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