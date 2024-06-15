const path = [
    { name: "Free Fire", path: "FREEFIRE" },
    { name: "Mobile Legends Bang Bang", path: "MOBILE_LEGENDS" },
    { name: "Call of Duty Mobile", path: "CALL_OF_DUTY" }
]

export const pathCheckUsername = (name: string) => {
    const trimmedName = name.trim();

    const result = path.find((data) => data.name === trimmedName);
    return result?.path;
};