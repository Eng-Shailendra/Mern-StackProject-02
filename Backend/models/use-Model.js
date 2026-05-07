import mongooes from "mongooes";

const User = mongooes.Schema({
    username: {
        type: String,
        required: true,
    }
    
})

