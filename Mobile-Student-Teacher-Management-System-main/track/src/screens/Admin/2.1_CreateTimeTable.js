/* VERSION_FIX_2026_03_13_V2 */
import React, { useState, useMemo } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
} from "react-native";
import trackerApi from "../../api/tracker";
import SelectDropdown from "react-native-select-dropdown";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

const BatchCodes = ["2027A", "2027B", "2026A", "2026B", "2025A", "2025B"];

const ATimeTable = () => {
    const [batchCode, setBatchCode] = useState("");
    const [numSets, setNumSets] = useState(1);
    
    // Stable initial date to prevent re-render loops in some picker versions
    const [pickerDate, setPickerDate] = useState(new Date());

    function createInitialFormData() {
        const placeholders = [
            "Module Name",
            "Module Code",
            "Venue",
            "Session Start Time",
            "Session End Time",
            "Session Start Date",
            "Session End Date",
        ];
        return placeholders.map((placeholder) => ({
            placeholder,
            value: "",
        }));
    }

    const [formData, setFormData] = useState([createInitialFormData()]);
    
    // Picker State
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [pickerMode, setPickerMode] = useState("date");
    const [activeSet, setActiveSet] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const showPicker = (set, index, placeholder) => {
        setActiveSet(set);
        setActiveIndex(index);
        
        if (placeholder.includes("Time")) {
            setPickerMode("time");
        } else {
            setPickerMode("date");
        }
        // Set picker date to current time to ensure it is valid
        setPickerDate(new Date());
        setPickerVisible(true);
    };

    const hidePicker = () => {
        setPickerVisible(false);
    };

    const handleConfirm = (date) => {
        let formattedValue = "";
        if (pickerMode === "time") {
            formattedValue = format(date, "HH:mm");
        } else {
            formattedValue = format(date, "yyyy-MM-dd");
        }
        
        handleInputChange(activeSet, activeIndex, formattedValue);
        hidePicker();
    };

    const handleInputChange = (set, index, text) => {
        const updatedData = [...formData];
        if (updatedData[set] && updatedData[set][index]) {
            updatedData[set][index] = { ...updatedData[set][index], value: text };
            setFormData(updatedData);
        }
    };

    const addPlaceholders = () => {
        setNumSets(numSets + 1);
        setFormData([...formData, createInitialFormData()]);
    };

    const handleSubmit = async () => {
        if (!batchCode) {
            Alert.alert("Error", "Please select a Batch Code");
            return;
        }
        try {
            await trackerApi.post("/api/saveTimetable", {
                batchCode,
                timetable1: formData,
            });
            setBatchCode("");
            setFormData([createInitialFormData()]);
            setNumSets(1);
            Alert.alert("Success", "Timetable saved successfully!");
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to save timetable.");
        }
    };

    const renderPlaceholders = () => {
        return formData.map((setFormData, set) => (
            <View key={`set_wrapper_${set}`}>
                {set > 0 && (
                    <View style={{ marginTop: 20, alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                            Set {set + 1}
                        </Text>
                    </View>
                )}
                {setFormData.map((placeholderData, i) => {
                    const inputValue = placeholderData.value;
                    const isDateTimeField = 
                        placeholderData.placeholder.includes("Time") || 
                        placeholderData.placeholder.includes("Date");

                    return (
                        <View key={`input_${set}_${i}`} style={{ padding: 10, alignItems: 'center' }}>
                            {isDateTimeField ? (
                                <TouchableOpacity 
                                    onPress={() => showPicker(set, i, placeholderData.placeholder)}
                                    style={styles.pickerTriggerStyle}
                                >
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ 
                                            color: inputValue ? "black" : "#828282",
                                            fontSize: 16
                                        }}>
                                            {inputValue || placeholderData.placeholder}
                                        </Text>
                                        <Icon 
                                            name={placeholderData.placeholder.includes("Time") ? "clock-outline" : "calendar-range"} 
                                            size={20} 
                                            color="#828282" 
                                        />
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <TextInput
                                    value={inputValue}
                                    onChangeText={(text) => handleInputChange(set, i, text)}
                                    style={styles.inputStyle}
                                    placeholder={`${placeholderData.placeholder}`}
                                    placeholderTextColor={"#828282"}
                                />
                            )}
                        </View>
                    );
                })}
                {set === formData.length - 1 && (
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={addPlaceholders}
                            style={{ padding: 10, marginTop: 10 }}
                        >
                            <Text style={{ fontSize: 40, fontWeight: "bold", color: "#484BF1" }}>
                                +
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        ));
    };

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                alignItems: "center",
                paddingBottom: 50,
            }}
        >
            <View style={styles.topBar}></View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>Create Timetable</Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <SelectDropdown
                    data={BatchCodes}
                    onSelect={(selectedItem) => setBatchCode(selectedItem)}
                    renderButton={(selectedItem, isOpened) => (
                        <View style={styles.dropdownButtonStyle}>
                            <Text style={styles.dropdownButtonTxtStyle}>
                                {selectedItem || "Select Batch Code"}
                            </Text>
                            <Icon
                                name={isOpened ? "chevron-up" : "chevron-down"}
                                style={styles.dropdownButtonArrowStyle}
                            />
                        </View>
                    )}
                    renderItem={(item, index, isSelected) => (
                        <View style={{
                            ...styles.dropdownItemStyle,
                            ...(isSelected && { backgroundColor: "#D2D9DF" }),
                        }}>
                            <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                />
            </View>

            <View style={{ width: '100%', marginTop: 10 }}>
                {renderPlaceholders()}
            </View>

            <View style={{ marginVertical: 30 }}>
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.submitButton}
                >
                    <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>Submit</Text>
                </TouchableOpacity>
            </View>

            <DateTimePickerModal
                isVisible={isPickerVisible}
                mode={pickerMode}
                date={pickerDate}
                value={pickerDate}
                onConfirm={handleConfirm}
                onCancel={hidePicker}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    topBar: {
        backgroundColor: "#484BF1",
        width: "100%",
        height: 18,
    },
    inputStyle: {
        padding: 12,
        borderColor: "#828282",
        borderWidth: 1,
        borderRadius: 12,
        width: 330,
        backgroundColor: "white",
        fontSize: 16,
    },
    pickerTriggerStyle: {
        padding: 12,
        borderColor: "#828282",
        borderWidth: 1,
        borderRadius: 12,
        width: 330,
        backgroundColor: "white",
        flexDirection: "row",
    },
    submitButton: {
        backgroundColor: "#484BF1",
        paddingVertical: 12,
        paddingHorizontal: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        elevation: 3,
    },
    dropdownButtonStyle: {
        width: 330,
        backgroundColor: "white",
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#828282',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 16,
        color: "black",
    },
    dropdownButtonArrowStyle: {
        fontSize: 24,
    },
    dropdownMenuStyle: {
        backgroundColor: "#E9ECEF",
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 16,
        color: "#151E26",
    },
});

export default ATimeTable;
