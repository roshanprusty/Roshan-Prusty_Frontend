
# 


### 1.	Explain what the simple List component does.
The List component in React generates an unordered list of items by accepting an array of objects as props. Each item can be clicked and its background color toggles between green and red.
The default background color of each element in the unordered list is red, but it changes to green when you click it. This feature can be used to indicate to the user that a particular element is being selected. Only one element can be selected at a time. After multiple clicks, only the last clicked element will be highlighted in green, and the rest of the elements will turn red.

### 2.	What problems / warnings are there with code?

- The onClick handler for the li element in the SingleListItem component should reference a function, but it is currently calling onClickHandler immediately instead of passing it as a function. It should be replaced with:
```bash
onClick={() => onClickHandler(index)}
```
- The isSelected prop is passes as a boolean in the SingleListItem component, but it should be passed as an index value that matches the index prop so that the selected item can be correctly highlighted. It should be replaced with:
```bash
isSelected={selectedIndex === index}
```
- In the WrappedListComponent component, the item prop type PropTypes.arrayOf should be used instead of PropTypes.array, and the shape should be defined as an object with a text property. It should be changed to:
```bash
items: PropTypes.arrayOf(
  PropTypes.shape({
    text: PropTypes.string.isRequired,
  })
 	)
```
- The WrappedListComponent component is misusing the useState hook. The first input to useState should be the initial state value, but it is currently being used as a setter function. To fix this issue, use the following code:
```bash
const [selectedIndex, setSelectedIndex] = useState(null);
```
### 3. Please fix, optimize, and/or modify the component as much as you think is necessary.
```bash
import { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
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

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
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
    <ul style={{textAlign:'center',width: 'fit-content',display: 'inline-block', fontSize: '30px' }}>
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
```