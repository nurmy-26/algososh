import TestRenderer from 'react-test-renderer';
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";


describe('Circle', () => {

  test('Отрисовка круга без буквы', () => {
    const tree = TestRenderer
      .create(<Circle />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Отрисовка круга с буквами', () => {
    const tree = TestRenderer
      .create(<Circle letter="abc" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Отрисовка круга с head', () => {
    const tree = TestRenderer
      .create(<Circle head="head" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Отрисовка круга с react-элементом в head', () => {
    const smallCircle = <Circle isSmall />;
    const tree = TestRenderer
      .create(<Circle head={smallCircle} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Отрисовка круга с tail', () => {
    const tree = TestRenderer
      .create(<Circle tail="tail" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Отрисовка круга с react-элементом в tail', () => {
    const smallCircle = <Circle isSmall />;
    const tree = TestRenderer
      .create(<Circle tail={smallCircle} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Отрисовка круга с index', () => {
    const tree = TestRenderer
      .create(<Circle index={1} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Отрисовка круга с пропом isSmall ===  true', () => {
    const tree = TestRenderer
      .create(<Circle isSmall />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Отрисовка круга в состоянии default', () => {
    const tree = TestRenderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Отрисовка круга в состоянии changing', () => {
    const tree = TestRenderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Отрисовка круга в состоянии modified', () => {
    const tree = TestRenderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

})