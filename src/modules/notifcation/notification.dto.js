export const notificationDTO = (notif) => ({
    id_notification: notif.idNotification,
    title: notif.title.trim(),
    message: notif.message,
    is_read: notif.isRead,
    user_id: notif.userId
});

export const createNotificationDTO = (data) => {
    return {
        title: data.title.trim() || '',
        message: data.message || '',
        isRead: data.is_read,
        userId: data.user_id
    }
};