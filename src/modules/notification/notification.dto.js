export const notificationDTO = (notif) => ({
    id_notification: notif.idNotification,
    title: notif.title,
    message: notif.message,
    is_read: notif.isRead,
    user_id: notif.userId
});

export const createNotificationDTO = (data) => ({

        email: data.email,
        title: data.title.trim() || '',
        message: data.message || '',
        isPriority: data.is_priority,
         sendEmail: data.send_email ?? true,
});
