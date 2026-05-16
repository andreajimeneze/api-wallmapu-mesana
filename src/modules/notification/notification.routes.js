import express from 'express';
import { createNotification, deleteNotificationById, deleteNotificationByUserId, getAllNotifications, getAllNotificationsPagination, getAllNotificationsUserPagination, getNotificationById, getUnreadCount } from './notification.controller.js';
import { authorizedRoles, jwtMiddleware } from '../auth/auth.middleware.js';


const router = express.Router();

router.get('/pagination',  jwtMiddleware, authorizedRoles('Admin'), getAllNotificationsPagination);
router.get('/user/pagination', jwtMiddleware, authorizedRoles('Admin', 'Lector'), getAllNotificationsUserPagination)

router.get('/', getAllNotifications);

router.get('/:id', getNotificationById);

//router.get('/user/:userId', getNotificationsUnreadByUserId);

router.get('/user/unread-count', jwtMiddleware, authorizedRoles('Admin', 'Lector'), getUnreadCount);

router.post('/', createNotification);

router.delete('/:id', deleteNotificationById);

router.delete('/user/:userId', deleteNotificationByUserId);

export default router;
