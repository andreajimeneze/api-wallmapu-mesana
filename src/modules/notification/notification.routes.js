import express from 'express';
import { createNotification, getAllNotificationsPagination, getAllNotificationsUserPagination, getNotificationById, getUnreadCount, markAllNotificationsAsRead, markOneNotificationAsRead } from './notification.controller.js';
import { authorizedRoles, jwtMiddleware } from '../auth/auth.middleware.js';


const router = express.Router();

router.get('/pagination',  jwtMiddleware, authorizedRoles('Admin'), getAllNotificationsPagination);
router.get('/user/pagination', jwtMiddleware, authorizedRoles('Admin', 'Lector'), getAllNotificationsUserPagination)

//router.get('/', getAllNotifications);

router.get('/:id', getNotificationById);

//router.get('/user/:userId', getNotificationsUnreadByUserId);

router.get('/user/unread-count', jwtMiddleware, authorizedRoles('Admin', 'Lector'), getUnreadCount);

router.post('/', jwtMiddleware, authorizedRoles('Admin'), createNotification);

//router.delete('/:id', deleteNotificationById);

//router.delete('/user/:userId', deleteNotificationByUserId);
router.put('/user/:userId/read', jwtMiddleware, authorizedRoles('Admin', 'Lector'), markOneNotificationAsRead);

router.put('/user/read-all', jwtMiddleware, authorizedRoles('Admin', 'Lector'), markAllNotificationsAsRead);

export default router;
