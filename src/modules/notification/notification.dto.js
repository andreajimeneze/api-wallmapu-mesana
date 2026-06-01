export const notificationDTO = (notif) => ({
    id_notification: notif.idNotification,
    is_read: notif.isRead,
    title: notif.title,
    message: notif.message,
    is_priority: notif.isPriority,
    user_id: notif.userId,
    created_at: notif.created_at,
    email: notif['user.email'],
});

export const createNotificationDTO = (data) => ({

        email: data.email,
        title: data.title.trim() || '',
        message: data.message || '',
        isPriority: data.is_priority,
        sendEmail: data.send_email ?? true,
});
