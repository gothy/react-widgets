/**
 * @jsx React.DOM
 */

var React = require('react');

var GettingStarted = React.createClass({

  render: function() {
    return this.transferPropsTo(
      <section>
        <h1 className="page-header">Getting Started</h1>
        <p>
          React-widgets offers a {'set'} UI widgets, built from scratch with React. The suite is based on the excellent 
          work done by Kendo UI Core, and jQuery UI, but built as true components, instead of as library wrappers. By 
          building each widget entirely in React, it can leavage all of the benefits of the React ecosystem 
          and <a href='http://facebook.github.io/react/blog/2013/11/05/thinking-in-react.html'>
            philosophy <i className="fa fa-external-link"></i>
          </a>.
          A big thanks to both of these libraries for solving most of the difficult problems already, and providing an 
          excellent reference for what works, and what does not, in ui inputs.
        </p>
        <p>
          In keeping with the React's&nbsp;
          <a href='http://facebook.github.io/react/docs/forms.html#controlled-components'>
            approach <i className="fa fa-external-link"></i>
          </a> form input components, Each widget does not manage its own value. 
          Instead it is up to the parent component to provide the value, and adjust it as the widget reports a change.
          To accomplish this, widgets implement the same simple interface as other form inputs, the props: 
          <code>value</code> and <code>onChange()</code>. For the dropdown list, combobox, select widgets there 
          is an additional <code>data</code> prop that is an array of possible values.
        </p>
        <p>
          React-widgets can be "bound", meaning that they can be backed by some sort of data structure 
          (traditionally a model). While they work just as well with data primitives such as strings, numbers, and 
          arrays, they really shine in providing hassle free visual representations of data, without needing to map 
          the data over and over.
        </p>

        <h2>Install</h2>
        <p>
          The prefered way is to use NPM <code>npm install react-widgets</code> and make use of something like Webpack or 
          Browserify to bundle the lib. 
          There is also a traditional browser build available for download in the <strong>browser</strong> folder. 
          It does not bundle any dependencies listed below, and 
          attaches itself to the <code>window</code> as <code>ReactWidgets</code>
        </p>
        <p>
          Compiled CSS, images, and fonts are found in the <code>dist</code> directory. 
          Included icons are provided by - <a href="http://fontawesome.io">Font Awesome by Dave Gandy</a>
        </p>
        <strong>
          Note: versions prior to 1.1.0 require a build step (transpilation from JSX) when using the NPM package.
          As of 1.1.0 the package comes precompiled, and no build step is needed.
        </strong>

        <h2>External Dependencies</h2>
        <p>
          React-widgets is compatible with <code>React</code> 0.9.0+, and expects it to be bundled. 
          Comsumers of the NPM package should note that React is not listed as direct, or peer dependency. This is help 
          reduce the friction that Peer Dependencies can cause. This means that NPM will not warn you if you try to use 
          react-widgets with an incompatible React version.
        </p>
        <p>
          If you use Browserify or Webpack to build your projects, the dependencies listed below will automatically be 
          included. They are listed for the sake of those who wish to externalize the lib dependencies to reduce 
          duplication, or wish to use a different, compatible library (such as underscore).

          <ul>
            <li>
              <a href="http://lodash.com/">lodash</a> if you are using underscore consider making the switch :).
            </li>
            <li>
              <a href="https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468">Globalize</a>&nbsp; 
              used for date and number localization. Requires a 0.x.x version (not the upcoming 1.0.0)
            </li>
          </ul>
        </p>

        <h2>Accessibility and Read Direction</h2>
        <p>
          React-widgets tries to be as inclusive and wide reaching as possible. Along with an included solution for 
          date and number localization, there is first class support for cultures and languages that read 
          right to left (with the <code>isRtl</code> prop).
        </p>
        <p>
          Each widget also has appropriate ARIA roles and attributes for the benefit of screen readers and visually 
          impaired users. Keyboard only navigation of widgets is also supported, for those who prefer to not, 
          or cannot use a mouse. to help ensure maximum accessibility, every widget should have 
          an <code>id</code> attribute. If you do not wish to provide an id attrbute, the widget will generate 
          the necessary id's to properly label and annotate the widget ARIA.
        </p>

        <h2>Styling</h2>
        <p>
          Styling each widget should be a simple matter of adjusting the relevant LESS variables to suit your needs. 
          Included by default is a "Twitter Bootstrap" theme that mimics the look and feel of Twitter Bootstrap 3.0. 
          This is less an actual theme and more a neutral starting point for creating your own theme.

          <ul>
            <li>
              Widget styles with LESS variables (see <code>./src/less/bootstrap-theme.less</code> for reference).
            </li>
            <li>
              Icon fonts can be swapped out in the <code>./src/less/icons.less</code> file
            </li>
          </ul> 
        </p>
      </section>
    );
  }

});

module.exports = GettingStarted;