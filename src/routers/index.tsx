import Detail from '../pages/Detail';
import Home from '../pages/Home';
import MainBox from "../layouts/MainBox";

export default [
  {
    path: '/main',
    element: <MainBox />,
    children:[{
      path: 'Home',
      element: <Home />,
    }]
  },
  {
    path: '/Detail',
    element: <Detail />,
  },
];
