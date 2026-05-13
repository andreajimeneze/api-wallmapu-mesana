import express from 'express';
import { createNotification, deleteNotificationById, deleteNotificationByUserId, getAllNotifications, getAllNotificationsPagination, getNotificationById, getNotificationsUnreadByUserId } from './notification.controller.js';


const router = express.Router();

router.get('/pagination', getAllNotificationsPagination);

router.get('/', getAllNotifications);

router.get('/:id', getNotificationById);

router.get('/user/:userId', getNotificationsUnreadByUserId);

router.post('/', createNotification);

router.delete('/:id', deleteNotificationById);

router.delete('/user/:userId', deleteNotificationByUserId);

export default router;
