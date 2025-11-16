import React, { useState } from 'react';

const NotificationSettings = () => {
    const [notifications, setNotifications] = useState({
        pushRequestUpdates: false,
        pushEarnings: false,
        pushPromotions: false,
        emailRequestUpdates: false,
        emailEarnings: false,
        emailPromotions: false,
    });

    const toggleSwitch = (key) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const NotificationItem = ({ title, description, value, onToggle }) => (
        <div style={styles.notificationItem}>
            <div style={styles.textContainer}>
                <div style={styles.itemTitle}>{title}</div>
                <div style={styles.itemDescription}>{description}</div>
            </div>
            <label style={styles.switch}>
                <input
                    type="checkbox"
                    checked={value}
                    onChange={onToggle}
                    style={styles.switchInput}
                />
                <span style={{
                    ...styles.slider,
                    backgroundColor: value ? '#34D399' : '#E5E7EB'
                }}></span>
            </label>
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.statusBar}>
                <span style={styles.time}>9:41</span>
                <div style={styles.notch}></div>
                <div style={styles.statusIcons}>
                    <span>📶</span>
                    <span>📡</span>
                    <span>🔋</span>
                </div>
            </div>

            <div style={styles.header}>
                <button style={styles.backButton}>←</button>
                <span style={styles.headerTitle}>Notifications</span>
            </div>

            <div style={styles.content}>
                <div style={styles.sectionTitle}>Push Notifications</div>

                <NotificationItem
                    title="Request updates"
                    description="Receive alerts for new requests or status changes."
                    value={notifications.pushRequestUpdates}
                    onToggle={() => toggleSwitch('pushRequestUpdates')}
                />

                <NotificationItem
                    title="Earnings and transactions"
                    description="Be notified instantly when you receive earnings or withdraw money."
                    value={notifications.pushEarnings}
                    onToggle={() => toggleSwitch('pushEarnings')}
                />

                <NotificationItem
                    title="Promotions and offers"
                    description="Receive alerts about new features and special deals."
                    value={notifications.pushPromotions}
                    onToggle={() => toggleSwitch('pushPromotions')}
                />

                <div style={styles.sectionTitle}>Email Notifications</div>

                <NotificationItem
                    title="Request updates"
                    description="Receive alerts for new requests or status changes."
                    value={notifications.emailRequestUpdates}
                    onToggle={() => toggleSwitch('emailRequestUpdates')}
                />

                <NotificationItem
                    title="Earnings and transactions"
                    description="Be notified instantly when you receive earnings or withdraw money."
                    value={notifications.emailEarnings}
                    onToggle={() => toggleSwitch('emailEarnings')}
                />

                <NotificationItem
                    title="Promotions and offers"
                    description="Receive alerts about new features and special deals."
                    value={notifications.emailPromotions}
                    onToggle={() => toggleSwitch('emailPromotions')}
                />
            </div>

            <div style={styles.homeIndicator}></div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        backgroundColor: '#FFFFFF',
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        position: 'relative',
    },
    statusBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 20px',
        fontSize: '14px',
        fontWeight: '600',
        position: 'relative',
    },
    time: {
        fontSize: '15px',
        fontWeight: '600',
    },
    notch: {
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '120px',
        height: '30px',
        backgroundColor: '#000000',
        borderRadius: '0 0 20px 20px',
    },
    statusIcons: {
        display: 'flex',
        gap: '4px',
        fontSize: '12px',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: '1px solid #F3F4F6',
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        marginRight: '12px',
        padding: '0',
        color: '#000000',
    },
    headerTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#000000',
    },
    content: {
        padding: '0 16px',
        paddingBottom: '40px',
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#000000',
        marginTop: '24px',
        marginBottom: '16px',
    },
    notificationItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '16px',
        paddingBottom: '16px',
        borderBottom: '1px solid #F3F4F6',
    },
    textContainer: {
        flex: '1',
        marginRight: '12px',
    },
    itemTitle: {
        fontSize: '15px',
        fontWeight: '500',
        color: '#000000',
        marginBottom: '4px',
    },
    itemDescription: {
        fontSize: '13px',
        color: '#6B7280',
        lineHeight: '1.4',
    },
    switch: {
        position: 'relative',
        display: 'inline-block',
        width: '51px',
        height: '31px',
        flexShrink: '0',
    },
    switchInput: {
        opacity: '0',
        width: '0',
        height: '0',
    },
    slider: {
        position: 'absolute',
        cursor: 'pointer',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        borderRadius: '31px',
        transition: '0.3s',
    },
    homeIndicator: {
        position: 'fixed',
        bottom: '8px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '134px',
        height: '5px',
        backgroundColor: '#000000',
        borderRadius: '100px',
    },
};

export default NotificationSettings;