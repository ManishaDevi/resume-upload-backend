module.exports = (res, data) => {
    console.log("Success")
    return res.status(201).json({
        success: true,
        data
    }).end()
}