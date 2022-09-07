import MainBox from '../layouts/MainBox';
import Detail from '../pages/Detail';
import Home from '../pages/Home';
import Welcome from "../pages/welcome";

export default [
  {
    path: '/main',
    element: <MainBox />,
    children: [
      {
        path: 'Home',
        element: <Home />,
      },
    ],
  },
  {
    path: '/welcome',
    element: <Welcome />,
  },
];
