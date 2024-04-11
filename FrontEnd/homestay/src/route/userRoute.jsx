
import NotFound from '../error/NotFound';
import AboutUs from '../pages/aboutUs';
import Room from '../pages/room';
import ThingToDo from '../pages/thingToDo';
import Facilities from '../pages/facilities';
import Contact from '../pages/contact';
import Blog from '../pages/blog';
import DetailBlog from '../pages/detailBlog';
import DetailRoom from '../pages/detailRoom';
import UserPage from '../pages/userPage';
import Booking from '../pages/booking';
const userRoute = [
    {
        path: '/AboutUs',
        element: <AboutUs />,
        errorElement: <NotFound />,
    },
    {
        path: '/room',
        element: <Room />,
        errorElement: <NotFound />,
    },
    {
        path: '/thingsToDo',
        element: <ThingToDo />,
        errorElement: <NotFound />,
    },
    {
        path: '/facilities',
        element: <Facilities />,
        errorElement: <NotFound />,
    },
    {
        path: '/contact',
        element: <Contact />,
        errorElement: <NotFound />,
    },
    {
        path: '/blog',
        element: <Blog />,
        errorElement: <NotFound />,
    },
    {
        path: '/detailBlog/:id',
        element: <DetailBlog />,
        errorElement: <NotFound />,
    },
    {
        path: '/detailRoom/:id',
        element: <DetailRoom />,
        errorElement: <NotFound />,
    },
    {
        path: '/user',
        element: <UserPage />,
        errorElement: <NotFound />,
    },
    {
        path: '/booking',
        element: <Booking />,
        errorElement: <NotFound />,
    },

]

export default userRoute