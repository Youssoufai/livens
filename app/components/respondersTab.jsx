import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export const ResponderTab = (loadingResponders, responders) => {
    return (
        <View>
            <>
                {loadingResponders ? (
                    <Text style={{ textAlign: "center", marginTop: 40, color: "#777" }}>
                        Loading responders...
                    </Text>
                ) : responders.length === 0 ? (
                    <Text style={{ textAlign: "center", marginTop: 40, color: "#777" }}>
                        You do not have responses yet.
                    </Text>
                ) : (
                    responders.map((responder) => (
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
                                        {responder.name}
                                    </Text>
                                    <Text
                                        style={{ fontSize: 13, color: "#777" }}
                                        numberOfLines={1}
                                    >
                                        {responder.address}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ marginRight: 4 }}>
                                        {responder.rating}
                                    </Text>
                                    <Ionicons name="star" size={14} />
                                </View>
                            </View>

                            <Text style={{ marginTop: 8, color: "#777", fontSize: 13 }}>
                                {responder.requests} requests
                            </Text>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#ff2d2d",
                                    paddingVertical: 14,
                                    borderRadius: 30,
                                    marginTop: 12,
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontWeight: "600",
                                        textAlign: "center",
                                    }}
                                >
                                    Approve {responder.name?.split(" ")[0]}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </>
        </View>
    )
}

