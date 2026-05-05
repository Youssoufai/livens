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

export default function AddBankModal({ visible, onClose, onSelectBank }) {
    const [banks, setBanks] = useState([]);
    const [selectedBank, setSelectedBank] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");

    const isDisabled =
        !selectedBank || accountNumber.length !== 10 || !amount;

    // Fetch banks
    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const res = await fetch("https://nigerianbanks.xyz");
                const text = await res.text();
                let data = [];
                try {
                    data = JSON.parse(text);
                } catch {
                    console.log("Banks raw response:", text);
                }
                setBanks(data);
            } catch (err) {
                console.error("Error fetching banks:", err);
            }
        };
        fetchBanks();
    }, []);

    const handleAddBank = () => {
        const mockRecipientCode = `RCP_${Date.now()}`;
        onSelectBank({
            bank_name: selectedBank.name,
            bank_code: selectedBank.code,
            account_number: accountNumber,
            amount: Number(amount),
            recipient_code: mockRecipientCode,
        });
        setSelectedBank(null);
        setAccountNumber("");
        setAmount("");
        onClose();
    };

    return (
        <Modal transparent visible={visible} animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.sheet}>
                    <View style={styles.sheetHeader}>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={22} />
                        </TouchableOpacity>
                        <Text style={styles.sheetTitle}>Add bank account</Text>
                        <View style={{ width: 22 }} />
                    </View>

                    <Text style={styles.label}>Choose bank</Text>
                    <TouchableOpacity
                        style={styles.selectInput}
                        onPress={() => setShowDropdown(!showDropdown)}
                    >
                        <Text style={!selectedBank && styles.placeholder}>
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
                                        />
                                        <Text style={styles.bankName}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    )}

                    <Text style={styles.label}>Account number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0000000000"
                        keyboardType="number-pad"
                        value={accountNumber}
                        onChangeText={setAccountNumber}
                        maxLength={10}
                    />

                    <Text style={styles.label}>Amount</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter amount"
                        keyboardType="number-pad"
                        value={amount}
                        onChangeText={setAmount}
                    />

                    <TouchableOpacity
                        style={[styles.submit, isDisabled && styles.submitDisabled]}
                        disabled={isDisabled}
                        onPress={handleAddBank}
                    >
                        <Text style={[styles.submitText, isDisabled && styles.submitTextDisabled]}>
                            Add bank account
                        </Text>
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
    placeholder: { color: "#777" },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 14,
        fontSize: 15,
        marginBottom: 10,
    },
    submit: {
        backgroundColor: "#000",
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 25,
    },
    submitText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 15,
    },
    submitDisabled: { backgroundColor: "#E2E2E2" },
    submitTextDisabled: { color: "#A0A0A0" },
    bankRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
    bankLogo: { width: 30, height: 30, marginRight: 10, borderRadius: 4 },
    bankName: { fontSize: 16, color: "#333" },
    dropdown: { maxHeight: 200, borderWidth: 1, borderColor: "#ddd", borderRadius: 8, marginTop: 4, marginBottom: 10 },
    dropdownItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
});
