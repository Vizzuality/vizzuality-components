import { isValidElement } from 'react';

// After updating rc-slider to ^9.7.1, we noticed that some default styles were applied to the
// marks: https://github.com/react-component/slider/blob/master/src/common/Marks.tsx
// To maintain the same default styles as before (not to break apps), we remove them
const defaultMarkStyle = {
  transform: 'none',
  msTransform: 'none',
};

export const getStyledMarks = (marks) => {
  const keys = Object.keys(marks);
  return keys
    .map((key) => {
      const mark = marks[key];
      const markIsObject = typeof mark === 'object' && !isValidElement(mark);

      if (markIsObject) {
        return { style: defaultMarkStyle, ...mark };
      }

      return { label: mark, style: defaultMarkStyle };
    })
    .reduce((res, mark, index) => ({ ...res, [keys[index]]: mark }), {});
};
