import renderer from "react-test-renderer";
import HomePage from "./HomePage";

test("Home Page should match snapshot", () => {
  const component = renderer.create(<HomePage />);
  expect(component.toJSON()).toMatchSnapshot();
});
