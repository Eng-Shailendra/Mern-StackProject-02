export function regesterUser(req, res) {
    try {
        const { username, email, password } = req.body();
        if (!username || !email || !password) {
            res.status(500).json({
                success: false,
                message: "Envalid inpute fields"
            })
        }
        let user = 
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal error"
        })
    }
}

export function loginUser(req, res) {
    try {

    } catch (err) {
        console.log(err);
    }
}