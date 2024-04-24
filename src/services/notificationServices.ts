export const emailNotification = async (transporter: any, mailOption: any) => {
    try {
        if (!mailOption.to) {
            throw new Error("No recipients defined");
        }
        await transporter.sendMail(mailOption);
    } catch (error) {
        console.error(error);
    }
};

export const notification = async() => {
    
}