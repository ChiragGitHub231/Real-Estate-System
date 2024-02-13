import expess from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { getUsers, getListingsDetails, getUserQueries, deleteListing, deleteUser, deleteUserQuery, getUserInfo, getListingInfo } from '../controllers/admin.controller.js';

const router = expess.Router();

router.get('/getusers', verifyToken, getUsers);
router.get('/getlistings', verifyToken, getListingsDetails);
router.get('/getqueries', verifyToken, getUserQueries);

router.delete('/listings/delete/:id', verifyToken, deleteListing);
router.delete('/users/delete/:id', verifyToken, deleteUser);
router.delete('/queries/delete/:id', verifyToken, deleteUserQuery);

router.get('/users/:id', verifyToken, getUserInfo);
router.get('/listings/:id', verifyToken, getListingInfo);

export default router;