/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, Text, View } from 'react-native';

import Separator from './Separator';

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlightedRowIndex: undefined,
    };

    this.handleHighlightRow = index =>
      !this.state.highlightedRowIndex &&
      this.setState({ highlightedRowIndex: index });
    this.handleUnHighlightRow = () =>
      this.setState({ highlightedRowIndex: undefined });
  }
  render() {
    const {
      allowFontScaling,
      children,
      hideSeparator,
      sectionTintColor,
      separatorInsetLeft,
      separatorInsetRight,
      separatorTintColor,
    } = this.props;

    /**
     * Merge styles with props
     */
    // eslint-disable-next-line no-underscore-dangle
    const _styles = {
      ...styles,
      section: [
        styles.section,
        {
          backgroundColor: sectionTintColor
        },
      ],
    };

    /**
     * Render Cell and add Border
     * @param  {Cell} child [description]
     * @param  {Int} index [description]
     * @return {View}       [description]
     */
    const renderChild = (child, index) => {
      if (!child) {
        return null;
      }
      const propsToAdd = {
        onHighlightRow: () => this.handleHighlightRow(index),
        onUnHighlightRow: this.handleUnHighlightRow,
      };

      // Skip rendering of separator
      if (
        hideSeparator ||
        !Array.isArray(children) ||
        React.Children.count(children) === 1 ||
        index === React.Children.count(children) - 1
      ) {
        return React.cloneElement(child, propsToAdd);
      }

      const invisibleSeparator =
        this.state.highlightedRowIndex === index ||
        this.state.highlightedRowIndex === index + 1;

      // Add margin, if Image is provided
      if (child.props.image) {
        // Only update if not manually updated
        const insetLeft = separatorInsetLeft !== 15 ? separatorInsetLeft : 60;
      }

      return (
        <View>
          {React.cloneElement(child, propsToAdd)}
          <Separator
            isHidden={invisibleSeparator}
            backgroundColor={child.props.backgroundColor}
            tintColor={separatorTintColor}
            insetLeft={separatorInsetLeft}
            insetRight={separatorInsetRight}
          />
        </View>
      );
    };

    return (
      <View style={_styles.section}>
        <View style={styles.section_inner}>
          {React.Children.map(children, renderChild)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {},
  section_inner: {
    borderColor: '#C8C7CC',
  },
});

Section.propTypes = {
  allowFontScaling: PropTypes.bool,
  children: PropTypes.node,
  hideSeparator: PropTypes.bool,
  sectionTintColor: PropTypes.string,
  separatorInsetLeft: PropTypes.number,
  separatorInsetRight: PropTypes.number,
  separatorTintColor: PropTypes.string,
};

Section.defaultProps = {
  allowFontScaling: true,
  children: null,
  hideSeparator: false,
  sectionTintColor: '#EFEFF4',
  separatorInsetLeft: 15,
  separatorInsetRight: 0,
  separatorTintColor: '#C8C7CC',
};

export default Section;
