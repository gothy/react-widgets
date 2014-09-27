var React   = require('react')
  , filter  = require('../util/filter')
  , compose = require('../util/compose')
  , transferProps  = require('../util/transferProps')
  , mergeIntoProps = transferProps.mergeIntoProps
  , cloneWithProps = transferProps.cloneWithProps
  , cx = require('../util/cx')
  , $ = require('../util/dom')
  , _  = require('lodash');

var DefaultListItem = React.createClass({

  mixins: [ 
    require('../mixins/DataHelpersMixin'),
    require('../mixins/RtlChildContextMixin')
  ],

  render: function(){
      var item = this.props.item;

      return this.transferPropsTo(<li>{ item ? this._dataText(item) : '' }</li>)
  }
})

module.exports = React.createClass({

  displayName: 'List',

  mixins: [ 
    require('../mixins/DataHelpersMixin')
  ],

  propTypes: {
    data:          React.PropTypes.array,
    value:         React.PropTypes.any,
    listItem:      React.PropTypes.component,
    valueField:    React.PropTypes.string,
    textField:     React.PropTypes.string,

    optID:         React.PropTypes.string,

    messages:      React.PropTypes.shape({
      emptyList:   React.PropTypes.string
    }),
  },


  getDefaultProps: function(){
    return {
      delay:         500,
      optID:         '',
      messages: {
        emptyList:   "There are no items in this list"
      }
    }
  },

  componentDidMount: function(prevProps, prevState){
    this._setScrollPosition()
  },

  componentDidUpdate: function(prevProps, prevState){
    if ( prevProps.focusedIndex !== this.props.focusedIndex)
      this._setScrollPosition()
  },

	render: function(){
    var self = this
      , emptyList   = <li>{ this.props.messages.emptyList }</li>
      , emptyFilter = <li>{ this.props.messages.emptyFilter }</li>
      , len = Math.min(this.state.displayEnd, this.props.data.length - 1)
      , items;

    
    //console.log('render', this.state.displayEnd)  
    items = this._eachVisible(this.props.data, function(item, idx){
      var focused = idx === self.props.focusedIndex;

      return (
        <li 
          key={'item_' + idx}
          role='option'
          id={ focused ? self.props.optID : '' }
          aria-selected={ idx === self.props.selectedIndex }
          className={cx({ 
            'rw-state-focus':    focused,
            'rw-state-selected': idx === self.props.selectedIndex,
          })}
          onClick={_.partial(self.props.onSelect, item, idx)}>
          { self.props.listItem 
              ? self.props.listItem({ item: item })
              : self._dataText(item)
           }
        </li>
      );
    })
      
		return mergeIntoProps(
      _.omit(this.props, 'data', 'selectedIndex'),
			<ul 
        className="rw-list" 
        ref='scrollable'
        role='listbox'
        tabIndex={this.props.tabIndex || -1}
        onScroll={this.props.itemHeight && _.throttle(this.onScroll, 10)}>

        { !this.props.data.length 
          ? emptyList 
          : items }
			</ul>
		)
	},

  _data:function(){
    return this.props.data
  },

  _setScrollPosition: function(){
    var list = this.getDOMNode()
      , selected = list.children[this.props.focusedIndex]
      , scrollTop, listHeight, selectedTop, selectedHeight, bottom;

    scrollTop   = list.scrollTop
    listHeight  = list.clientHeight

    selectedTop =  selected.offsetTop
    selectedHeight = selected.offsetHeight

    bottom =  selectedTop + selectedHeight

    list.scrollTop = scrollTop > selectedTop
      ? selectedTop
      : bottom > (scrollTop + listHeight) 
          ? (bottom - listHeight)
          : scrollTop
  }

})