module.exports = (res, data) => {
    console.log("Error occured")
    return res.status(500).json({
        success: false,
        data
    }).end()
}