export const About = (req, res) => {
    res.send("About")
}



export const postUser = (req, res) => {
    const {name, email, password} = req.body
    console.log(name, email, password)
    res.send("User created successfully")
    
}