/**  React.DOM */
var React = require('react')
  , cx    = require('../util/cx')
  , dates = require('../util/dates')
  , chunk = require('../util/chunk')
  , directions = require('../util/constants').directions
  , mergeIntoProps = require('../util/transferProps').mergeIntoProps
  , _ = require('lodash')

var opposite = {
  LEFT: directions.RIGHT,
  RIGHT: directions.LEFT
};

module.exports = React.createClass({

  displayName: 'YearView',
  
  mixins: [
    require('../mixins/RtlChildContextMixin'),
    require('../mixins/DateFocusMixin')('year', 'month')
  ],

  propTypes: {
    value:        React.PropTypes.instanceOf(Date),
    min:          React.PropTypes.instanceOf(Date),
    max:          React.PropTypes.instanceOf(Date),
    onChange:     React.PropTypes.func.isRequired
  },


  render: function(){
    var months = dates.monthsInYear(dates.year(this.props.value))
      , rows = chunk(months, 4);

    return mergeIntoProps(
      _.omit(this.props, 'max', 'min', 'value', 'onChange'),
      React.DOM.table({tabIndex: this.props.disabled ? '-1' : "0", 
        ref: "table", 
        role: "grid", 
        className: "rw-calendar-grid rw-nav-view", 
        'aria-activedescendant': this._id('_selected_item'), 
        onKeyUp: this._keyUp}, 
        React.DOM.tbody(null, 
           _.map(rows, this._row)
        )
      )
    )
  },

  _id: function(suffix){
    this._id_ || (this._id_ = _.uniqueId('rw_'))
    return (this.props.id || this._id_)  + suffix
  },

  _row: function(row, i){
    // if (this.isRtl()) row.reverse()

    return (
      React.DOM.tr({key: i}, 
      _.map(row, function(date, i)  {
        var focused  = dates.eq(date, this.state.focusedDate,  'month')
          , selected = dates.eq(date, this.props.value,  'month')
          , id       = this._id('_selected_item');

        return dates.inRange(date, this.props.min, this.props.max, 'month') 
          ? (React.DOM.td({key: i}, 
              btn({onClick: _.partial(this.props.onChange, date), tabIndex: "-1", 
                id: focused ? id : undefined, 
                'aria-selected': selected, 
                'aria-disabled': this.props.disabled, 
                disabled: this.props.disabled, 
                className: cx({ 
                  'rw-state-focus':    focused,
                  'rw-state-selected': selected
                })}, 
                 dates.format(date, dates.formats.MONTH_NAME_ABRV) 
              )
            ))
          : React.DOM.td({key: i, className: "rw-empty-cell"}, " ")
      }.bind(this))
    ))
  },

  focus: function(){
    this.refs.table.getDOMNode().focus();
  },

  move: function(date, direction){
    if ( this.isRtl() && opposite[direction])
      direction =  opposite[direction]

    if ( direction === directions.LEFT)
      date = dates.subtract(date, 1, 'month')

    else if ( direction === directions.RIGHT)
      date = dates.add(date, 1, 'month')

    else if ( direction === directions.UP)
      date = dates.subtract(date, 4, 'month')

    else if ( direction === directions.DOWN)
      date = dates.add(date, 4, 'month')

    return date
  }

});

var _id;
var btn = require('../common/btn')