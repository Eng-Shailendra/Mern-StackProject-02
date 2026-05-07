import mongooes from "mongooes";

export async function connectDB() {
    try {
        await mongooes.connect(process.env.DTATBSE_URL)
        console.log("Data base connecte seccessfully");
    } catch (err) {
        console.log(err);
    }
}