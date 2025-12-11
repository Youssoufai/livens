import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AddBankModal({ visible, onClose }) {
    const [banks, setBanks] = useState([]);
    const [selectedBank, setSelectedBank] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    // Fetch banks from Paystack
    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const res = await fetch('https://nigerianbanks.xyz');
                if (!res.ok) {
                    console.error('Failed fetching bank list', await res.text());
                    return;
                }
                const banks = await res.json();     // banks is array of { name, slug, code, logo }
                setBanks(banks);
            } catch (err) {
                console.error('Error fetching banks:', err);
            }
        };

        fetchBanks();
    }, []);


    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.sheet}>
                    {/* Header */}
                    <View style={styles.sheetHeader}>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={22} />
                        </TouchableOpacity>
                        <Text style={styles.sheetTitle}>Add bank account</Text>
                        <View style={{ width: 22 }} />
                    </View>

                    {/* Choose bank */}
                    <Text style={styles.label}>Choose bank</Text>
                    <TouchableOpacity
                        style={styles.selectInput}
                        onPress={() => setShowDropdown((prev) => !prev)}
                    >
                        <Text style={selectedBank ? {} : styles.placeholder}>
                            {selectedBank ? selectedBank.name : "Choose bank"}
                        </Text>
                        <Ionicons name="chevron-down" size={20} color="#777" />
                    </TouchableOpacity>

                    {showDropdown && (
                        <FlatList
                            style={styles.dropdown}
                            data={banks}
                            keyExtractor={(item) => item.code}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        setSelectedBank(item);
                                        setShowDropdown(false);
                                    }}
                                >
                                    <View style={styles.bankRow}>
                                        <Image
                                            source={{ uri: item.logo }}
                                            style={styles.bankLogo}
                                            resizeMode="contain"
                                        />
                                        <Text style={styles.bankName}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />

                    )}

                    {/* Account number */}
                    <Text style={styles.label}>Account number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0000000000"
                        keyboardType="numeric"
                    />

                    {/* Account name */}
                    <Text style={styles.label}>Account name</Text>
                    <TextInput style={styles.input} placeholder="Ex. John Doe" />

                    {/* Add bank account button */}
                    <TouchableOpacity style={styles.submitDisabled} disabled>
                        <Text style={styles.submitTextDisabled}>Add bank account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "flex-end",
    },
    sheet: {
        backgroundColor: "#fff",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    sheetHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    sheetTitle: {
        fontSize: 16,
        fontWeight: "600",
    },
    label: {
        marginBottom: 6,
        color: "#444",
        fontWeight: "500",
        marginTop: 10,
    },
    selectInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    placeholder: {
        color: "#777",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 14,
        fontSize: 15,
        marginBottom: 10,
    },
    submitDisabled: {
        backgroundColor: "#E2E2E2",
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 25,
    },
    bankRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },

    bankLogo: {
        width: 30,
        height: 30,
        marginRight: 10,
        borderRadius: 4,
    },

    bankName: {
        fontSize: 16,
        color: '#333',
    },

    submitTextDisabled: {
        color: "#A0A0A0",
        fontWeight: "600",
        fontSize: 15,
    },
    dropdown: {
        maxHeight: 200,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginTop: 4,
        marginBottom: 10,
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
});
