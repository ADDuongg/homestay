import Admin from '../admin/admin';
import Post from '../admin/posts/post';
import User from '../admin/user/user';
import ListRoom from '../admin/room/listRoom';
import FacilitiesAdmin from '../admin/facilities/facilitiesAdmin';
import ProfileAdmin from '../admin/profileAdmin';
import NotFound from '../error/NotFound';
import AddUserForm from '../admin/user/addUserForm';
import AddPost from '../admin/posts/addPost';
import UpdatePost from '../admin/posts/updatePost';
import UpdateUser from '../admin/user/updateUser';
import AddFacilities from '../admin/facilities/addFacilities';
import UpdateFacilities from '../admin/facilities/updateFacilities';
import AddRoom from '../admin/room/addRoom';
import UpdateRoom from '../admin/room/updateRoom';
import AddRoomFacilities from '../admin/room/addRoomFacilities';
import DeleteRoomFacilities from '../admin/room/deleteRoomFacilities';
import Reservation from '../admin/reservation/reservation';
import Comment from '../admin/comment/comment';
import UpdateComment from '../admin/comment/updateComment';

const routeAdmin = [
    {
        path: '/admin',
        element: <Admin />,
        errorElement: <NotFound />,
    },
    {
        path: '/admin/post',
        element: <Post />,
        errorElement: <NotFound />,
    },
    {
        path: '/admin/listroom',
        element: <ListRoom />,
        errorElement: <NotFound />,
    },
    {
        path: '/admin/bookroom',
        element: <Reservation />,
        errorElement: <NotFound />,
    },
    {
        path: '/admin/facilities',
        element: <FacilitiesAdmin />,
        errorElement: <NotFound />,
    },
    {
        path: '/admin/comment',
        element: < Comment />,
        errorElement: <NotFound />,
    },
    {
        path: '/admin/user',
        element: <User />,
        errorElement: <NotFound />,
    },
    {
        path: '/admin/profile',
        element: <ProfileAdmin />,
        errorElement: <NotFound />,
    },
    {
        path: '/addUser',
        element: <AddUserForm />,
        errorElement: <NotFound />,
    },
    {
        path: '/addPost',
        element: <AddPost />,
        errorElement: <NotFound />,
    },
    {
        path: '/updatePost/:id',
        element: <UpdatePost />,
        errorElement: <NotFound />,
    },
    {
        path: '/updateUser/:id',
        element: <UpdateUser />,
        errorElement: <NotFound />,
    },
    {
        path: '/addFacilities',
        element: <AddFacilities />,
        errorElement: <NotFound />,
    },
    {
        path: '/updateFacilities',
        element: < UpdateFacilities />,
        errorElement: <NotFound />,
    },
    {
        path: '/addRoom',
        element: <AddRoom />,
        errorElement: <NotFound />,
    },
    {
        path: '/updateRoom/:id',
        element: < UpdateRoom />,
        errorElement: <NotFound />,
    },
    {
        path: '/addRoomFacilities/:id',
        element: < AddRoomFacilities />,
        errorElement: <NotFound />,
    },
    {
        path: '/deleteRoomFacilities/:id',
        element: < DeleteRoomFacilities />,
        errorElement: <NotFound />,
    },
    {
        path: '/updateComment/:id',
        element: < UpdateComment />,
        errorElement: <NotFound />,
    },
    

]

export default routeAdmin
