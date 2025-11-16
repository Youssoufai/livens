import React, { useState } from 'react';

const WithdrawScreens = () => {
    const [currentScreen, setCurrentScreen] = useState('initial');
    const [formData, setFormData] = useState({
        bank: '',
        accountNumber: '',
        accountName: ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const InitialScreen = () => (
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
                <span style={styles.headerTitle}>Withdraw</span>
            </div>

            <div style={styles.content}>
                <h1 style={styles.mainTitle}>Choose account to withdraw funds into.</h1>
                <p style={styles.subtitle}>You have not added any bank accounts.</p>

                <button
                    style={styles.addBankButton}
                    onClick={() => setCurrentScreen('addBank')}
                >
                    <span style={styles.plusIcon}>+</span>
                    <span style={styles.addBankText}>Add bank account</span>
                </button>
            </div>

            <button style={styles.withdrawButton}>Withdraw</button>
            <div style={styles.homeIndicator}></div>
        </div>
    );

    const AddBankScreen = () => (
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
                <button style={styles.backButton} onClick={() => setCurrentScreen('initial')}>←</button>
                <span style={styles.headerTitle}>Withdraw earnings</span>
            </div>

            <div style={styles.content}>
                <h1 style={styles.mainTitle}>Choose an account to withdraw your earnings to</h1>
                <p style={styles.subtitle}>You have not added any bank accounts.</p>

                <div style={styles.formCard}>
                    <div style={styles.formHeader}>
                        <button style={styles.closeButton} onClick={() => setCurrentScreen('initial')}>×</button>
                        <span style={styles.formTitle}>Add bank account</span>
                    </div>

                    <div style={styles.formBody}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Choose bank</label>
                            <div style={styles.selectWrapper}>
                                <select
                                    style={styles.select}
                                    value={formData.bank}
                                    onChange={(e) => handleInputChange('bank', e.target.value)}
                                >
                                    <option value="">Choose bank</option>
                                    <option value="access">Access Bank</option>
                                    <option value="gtb">GTBank</option>
                                    <option value="first">First Bank</option>
                                    <option value="uba">UBA</option>
                                    <option value="zenith">Zenith Bank</option>
                                </select>
                            </div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Account number</label>
                            <input
                                type="text"
                                style={styles.input}
                                placeholder="0000000000"
                                value={formData.accountNumber}
                                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                                maxLength="10"
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Account name</label>
                            <input
                                type="text"
                                style={styles.input}
                                placeholder="John Doe"
                                value={formData.accountName}
                                onChange={(e) => handleInputChange('accountName', e.target.value)}
                            />
                        </div>

                        <button style={styles.addAccountButton}>Add bank account</button>
                    </div>
                </div>
            </div>

            <div style={styles.homeIndicator}></div>
        </div>
    );

    return currentScreen === 'initial' ? <InitialScreen /> : <AddBankScreen />;
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        backgroundColor: '#F9FAFB',
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
    },
    statusBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 20px',
        fontSize: '14px',
        fontWeight: '600',
        position: 'relative',
        backgroundColor: '#FFFFFF',
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
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #F3F4F6',
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
        fontSize: '16px',
        fontWeight: '500',
        color: '#000000',
    },
    content: {
        padding: '24px 16px',
        flex: '1',
    },
    mainTitle: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#000000',
        marginBottom: '12px',
        lineHeight: '1.3',
    },
    subtitle: {
        fontSize: '14px',
        color: '#6B7280',
        marginBottom: '24px',
    },
    addBankButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 16px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        cursor: 'pointer',
        width: '100%',
        fontSize: '15px',
    },
    plusIcon: {
        fontSize: '20px',
        fontWeight: '300',
    },
    addBankText: {
        color: '#000000',
        fontWeight: '400',
    },
    withdrawButton: {
        margin: '0 16px 24px',
        padding: '16px',
        backgroundColor: '#E5E7EB',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        color: '#9CA3AF',
        cursor: 'not-allowed',
    },
    homeIndicator: {
        position: 'absolute',
        bottom: '8px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '134px',
        height: '5px',
        backgroundColor: '#000000',
        borderRadius: '100px',
    },
    formCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        overflow: 'hidden',
        marginTop: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    formHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        borderBottom: '1px solid #F3F4F6',
        position: 'relative',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '28px',
        cursor: 'pointer',
        padding: '0',
        color: '#000000',
        marginRight: '12px',
        lineHeight: '1',
    },
    formTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#000000',
    },
    formBody: {
        padding: '20px 16px',
    },
    inputGroup: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        fontSize: '14px',
        fontWeight: '500',
        color: '#374151',
        marginBottom: '8px',
    },
    selectWrapper: {
        position: 'relative',
    },
    select: {
        width: '100%',
        padding: '12px 16px',
        fontSize: '15px',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
        color: '#9CA3AF',
        appearance: 'none',
        cursor: 'pointer',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'12\' height=\'8\' viewBox=\'0 0 12 8\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1.5L6 6.5L11 1.5\' stroke=\'%239CA3AF\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 16px center',
        paddingRight: '40px',
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        fontSize: '15px',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
        outline: 'none',
        boxSizing: 'border-box',
    },
    addAccountButton: {
        width: '100%',
        padding: '14px',
        backgroundColor: '#E5E7EB',
        border: 'none',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: '600',
        color: '#9CA3AF',
        cursor: 'not-allowed',
        marginTop: '8px',
    },
};

export default WithdrawScreens;