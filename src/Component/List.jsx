import { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

/* `const WrappedSingleListItem` is a functional component that takes in four props: `index`,
`isSelected`, `onClickHandler`, and `text`. It returns a `li` element with a background color of
green if `isSelected` is true, and red if it is false. It also has an `onClick` event that calls the
`onClickHandler` function with the `index` prop as an argument. The `text` prop is used as the
content of the `li` element. */
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={()=>onClickHandler(index)}
    >
      {text}
    </li>
  );
};

/* `WrappedSingleListItem.propTypes` is defining the expected data types and requirements for each prop
passed to the `WrappedSingleListItem` component. */
WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
/* `const WrappedListComponent` is a functional component that takes in an object with an `items`
property as its only argument. It uses the `useState` hook to create a `selectedIndex` state
variable and the `useEffect` hook to reset the `selectedIndex` to `null` whenever the `items` prop
changes. It also defines a `handleClick` function that sets the `selectedIndex` state variable to
the index of the clicked item. The component returns an unordered list (`ul`) with each item in the
`items` array rendered as a `SingleListItem` component. The `SingleListItem` component is passed the
`onClickHandler`, `text`, `index`, `isSelected`, and `key` props. */
const WrappedListComponent = ({
  items,
}) => {
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex===index}
          key={index}
        />
      ))}
    </ul>
  )
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
};

WrappedListComponent.defaultProps = {
  items: null,
};

const List = memo(WrappedListComponent);

export default List;

