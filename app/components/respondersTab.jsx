import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BASE_URL } from "../constants/url";
import { fetchResponders } from "../lib/fetchResponders";
import { getToken } from "../utils/secureStore";

export const ResponderTab = ({ requestId }) => {
    const [loadingResponders, setLoadingResponders] = useState(true);
    const [responders, setResponders] = useState([]);
    const [approvingIds, setApprovingIds] = useState([]); // loading per button

    // Fetch responders and set approval immediately if status === 'success'
    const loadResponders = async () => {
        setLoadingResponders(true);
        try {
            const data = await fetchResponders(requestId);

            // If status at top-level is 'success', mark all responders as approved
            const isApprovedGlobal = data?.status === "success";

            const mapped = (data?.data || []).map((r) => ({
                ...r,
                isApproved: isApprovedGlobal || r.is_approved || false,
            }));

            setResponders(mapped);
        } catch (err) {
            console.log("Failed to fetch responders:", err);
            setResponders([]);
        } finally {
            setLoadingResponders(false);
        }
    };

    useEffect(() => {
        loadResponders();
    }, [requestId]);

    // Approve a single responder
    const approveResponder = async (userId) => {
        try {
            setApprovingIds((prev) => [...prev, userId]);
            const token = await getToken("token");

            const res = await fetch(`${BASE_URL}/response-approval`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.replace(/"/g, "")}`,
                },
                body: JSON.stringify({
                    request_id: requestId,
                    user_id: userId,
                }),
            });

            const data = await res.json();
            console.log("Approval response:", data);

            if (data?.status === "success") {
                setResponders((prev) =>
                    prev.map((r) =>
                        r.user.id === userId ? { ...r, isApproved: true } : r
                    )
                );
            }
        } catch (err) {
            console.log("Failed to approve responder:", err);
        } finally {
            setApprovingIds((prev) => prev.filter((id) => id !== userId));
        }
    };

    return (
        <View>
            {loadingResponders ? (
                <Text style={{ textAlign: "center", marginTop: 40, color: "#777" }}>
                    Loading responders...
                </Text>
            ) : !responders?.length ? (
                <Text style={{ textAlign: "center", marginTop: 40, color: "#777" }}>
                    You do not have responses yet.
                </Text>
            ) : (
                responders.map((responder) => {
                    const isApproving = approvingIds.includes(responder.user.id);
                    const isApproved = responder.isApproved;

                    return (
                        <View
                            key={responder.id}
                            style={{
                                borderWidth: 1,
                                borderColor: "#eee",
                                borderRadius: 14,
                                padding: 14,
                                marginBottom: 16,
                            }}
                        >
                            {/* User Row */}
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 22,
                                        backgroundColor: "#e5e5e5",
                                        marginRight: 12,
                                    }}
                                />

                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: "600", fontSize: 15 }}>
                                        {responder.user?.name || "Unknown"}
                                    </Text>

                                    <Text style={{ fontSize: 13, color: "#777" }} numberOfLines={1}>
                                        {responder.user?.address || "No address"}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ marginRight: 4 }}>{responder.rating || 0}</Text>
                                    <Ionicons name="star" size={14} />
                                </View>
                            </View>

                            <Text style={{ marginTop: 8, color: "#777", fontSize: 13 }}>
                                {responder.requests || 0} requests
                            </Text>

                            {/* Approve Button */}
                            <TouchableOpacity
                                disabled={isApproved || isApproving}
                                onPress={() => approveResponder(responder.user.id)}
                                style={{
                                    backgroundColor: isApproved ? "#4caf50" : "#ff2d2d",
                                    paddingVertical: 14,
                                    borderRadius: 30,
                                    marginTop: 12,
                                    opacity: isApproving ? 0.7 : 1,
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontWeight: "600",
                                        textAlign: "center",
                                    }}
                                >
                                    {isApproving
                                        ? "Approving..."
                                        : isApproved
                                            ? "Approved"
                                            : `Approve ${responder.user?.name?.split(" ")[0] || "User"}`}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                })
            )}
        </View>
    );
};
