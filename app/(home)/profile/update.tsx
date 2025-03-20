import { DatePicker, Form, Input, List, Picker } from "@ant-design/react-native";
import { useForm } from "@ant-design/react-native/lib/form/Form";
import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

type DataGender = {
    label: string,
    value: string
};

const dataGender: DataGender[] = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" }
];

const UpdateProfileScreen = () => {
    const [form] = useForm();
    const [fullName, setFullName] = useState("Huy Huynh");
    const [email, setEmail] = useState("huyhk.dev@gmail.com");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState<Date>();
    const [about, setAbout] = useState("");
    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <ScrollView style={styles.container}>
            <Form layout="vertical" onFinish={onSubmit} form={form} style={styles.formContainer}>
                <Text style={styles.title}>Public Profile</Text>
                <Text style={styles.subtitle}>Add information about yourself</Text>

                <Form.Item style={styles.formItem} label="Full Name" name="fullName" rules={[{ required: true, message: "Full Name is required" }]}>
                    <Input style={styles.input} value={fullName} onChangeText={setFullName} />
                </Form.Item>

                <Form.Item style={styles.formItem} label="Email" name="email" rules={[{ required: true, type: "email", message: "Enter a valid email" }]}>
                    <Input style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
                </Form.Item>

                <Form.Item style={styles.formItem} label="Gender" name="gender" rules={[{ required: true, message: "Please select gender" }]}>
                    <Picker
                        data={dataGender}
                        cols={1}
                        value={[gender]}
                        onChange={(value) => setGender(value[0] as string)}
                    >
                        <TouchableOpacity style={[styles.input, { padding: 10 }]}>
                            <Text style={{ fontSize: 16 }}>{gender || "Select Gender"}</Text>
                        </TouchableOpacity>
                    </Picker>
                </Form.Item>

                <Form.Item style={styles.formItem} label="Birthday" name="birthday" rules={[{ required: true, message: "Select your birthday" }]}>
                    <DatePicker
                        value={birthday}
                        precision="day"
                        onChange={setBirthday}
                        format="YYYY-MM-DD"
                    >
                        <List.Item arrow="horizontal">Select Date</List.Item>
                    </DatePicker>
                </Form.Item>

                <Form.Item style={styles.formItem} label="About you" name="about">
                    <Input
                        style={[styles.input, {minHeight: 50}]}
                        value={about}
                        onChangeText={setAbout}
                        multiline
                        maxLength={100}
                    />
                </Form.Item>
                <TouchableOpacity style={styles.button} onPress={() => form.submit()}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </Form>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: 1200
    },
    formContainer: {
        marginTop: 20,
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20,
        color: "gray",
    },
    formItem: {
        height: 110
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 5,
        fontSize: 16,
        marginTop: 5,
    },
    button: {
        backgroundColor: "#6200ea",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default UpdateProfileScreen;
